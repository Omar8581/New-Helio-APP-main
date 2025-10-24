import { Response } from 'express';
import { supabase } from '../config/database';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getTransportation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);
  const { data: items, error, count } = await supabase.from('drivers').select('*', { count: 'exact' }).order('created_at', { ascending: false }).range(offset, offset + Number(limit) - 1);
  if (error) throw new AppError('فشل في جلب البيانات', 500);
  res.json({ items, pagination: { totalItems: count || 0, totalPages: Math.ceil((count || 0) / Number(limit)), currentPage: Number(page), pageSize: Number(limit) } });
});

export const getTransportationById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { data: item, error } = await supabase.from('drivers').select('*').eq('id', id).single();
  if (error || !item) throw new AppError('غير موجود', 404);
  res.json({ item });
});

export const createTransportation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  const { data: item, error } = await supabase.from('drivers').insert({...req.body, user_id: userId}).select().single();
  if (error) throw new AppError('فشل في الإضافة', 500);
  res.status(201).json({ message: 'تم الإضافة بنجاح', item });
});

export const updateTransportation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { data: item, error } = await supabase.from('drivers').update(req.body).eq('id', id).select().single();
  if (error) throw new AppError('فشل في التحديث', 500);
  res.json({ message: 'تم التحديث بنجاح', item });
});

export const deleteTransportation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('drivers').delete().eq('id', id);
  if (error) throw new AppError('فشل في الحذف', 500);
  res.json({ message: 'تم الحذف بنجاح' });
});
