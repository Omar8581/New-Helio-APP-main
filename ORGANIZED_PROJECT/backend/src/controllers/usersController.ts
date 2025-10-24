import { Response } from 'express';
import { supabase } from '../config/database';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';
import bcrypt from 'bcryptjs';

export const getUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 20, status, role, search } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let query = supabase.from('app_users').select('id, name, email, phone, address, status, role, avatar, created_at', { count: 'exact' });

  if (status) query = query.eq('status', status);
  if (role) query = query.eq('role', role);
  if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);

  query = query.order('created_at', { ascending: false }).range(offset, offset + Number(limit) - 1);

  const { data: users, error, count } = await query;
  if (error) throw new AppError('فشل في جلب المستخدمين', 500);

  res.json({ users, pagination: { totalItems: count || 0, totalPages: Math.ceil((count || 0) / Number(limit)), currentPage: Number(page), pageSize: Number(limit) } });
});

export const getUserById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { data: user, error } = await supabase.from('app_users').select('id, name, email, phone, address, status, role, avatar, created_at').eq('id', id).single();
  if (error || !user) throw new AppError('المستخدم غير موجود', 404);
  res.json({ user });
});

export const updateUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const isAdmin = req.user?.isAdmin;

  if (!isAdmin && userId !== Number(id)) throw new AppError('غير مصرح لك بتعديل هذا المستخدم', 403);

  const updateData: any = {};
  if (req.body.name) updateData.name = req.body.name;
  if (req.body.phone) updateData.phone = req.body.phone;
  if (req.body.address) updateData.address = req.body.address;
  if (req.body.avatar) updateData.avatar = req.body.avatar;
  if (req.body.password) updateData.password = await bcrypt.hash(req.body.password, 10);
  if (isAdmin && req.body.status) updateData.status = req.body.status;

  const { data: user, error } = await supabase.from('app_users').update(updateData).eq('id', id).select('id, name, email, phone, address, status, role, avatar').single();
  if (error) throw new AppError('فشل في تحديث المستخدم', 500);

  res.json({ message: 'تم تحديث البيانات بنجاح', user });
});

export const deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('app_users').delete().eq('id', id);
  if (error) throw new AppError('فشل في حذف المستخدم', 500);
  res.json({ message: 'تم حذف المستخدم بنجاح' });
});

export const requestDeletion = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  if (userId !== Number(id)) throw new AppError('غير مصرح', 403);

  const { error } = await supabase.from('app_users').update({ status: 'pending_deletion' }).eq('id', id);
  if (error) throw new AppError('فشل في طلب الحذف', 500);
  res.json({ message: 'تم إرسال طلب حذف الحساب بنجاح' });
});

export const updateUserRole = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const { data: user, error } = await supabase.from('app_users').update({ role }).eq('id', id).select('id, name, email, role').single();
  if (error) throw new AppError('فشل في تحديث الدور', 500);
  res.json({ message: 'تم تحديث دور المستخدم بنجاح', user });
});

export const getUserFavorites = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  if (userId !== Number(id) && !req.user?.isAdmin) throw new AppError('غير مصرح', 403);

  const { data: user } = await supabase.from('app_users').select('favorite_services, favorite_properties').eq('id', id).single();
  res.json({ favorites: { services: user?.favorite_services || [], properties: user?.favorite_properties || [] } });
});
