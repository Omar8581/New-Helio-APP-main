import { Response } from 'express';
import { supabase } from '../config/database';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getProperties = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 20, type, minPrice, maxPrice, minArea, maxArea, bedrooms, bathrooms, search, sortBy = 'created_at', order = 'desc' } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  let query = supabase.from('properties').select('*, app_users (id, name, phone, avatar)', { count: 'exact' });

  if (type) query = query.eq('type', type);
  if (minPrice) query = query.gte('price', minPrice);
  if (maxPrice) query = query.lte('price', maxPrice);
  if (minArea) query = query.gte('area', minArea);
  if (maxArea) query = query.lte('area', maxArea);
  if (bedrooms) query = query.eq('bedrooms', bedrooms);
  if (bathrooms) query = query.eq('bathrooms', bathrooms);
  if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,address.ilike.%${search}%`);

  query = query.order(sortBy as string, { ascending: order === 'asc' }).range(offset, offset + Number(limit) - 1);

  const { data: properties, error, count } = await query;
  if (error) throw new AppError('فشل في جلب العقارات', 500);

  res.json({ properties, pagination: { totalItems: count || 0, totalPages: Math.ceil((count || 0) / Number(limit)), currentPage: Number(page), pageSize: Number(limit) } });
});

export const getPropertyById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { data: property, error } = await supabase.from('properties').select('*, app_users (id, name, phone, avatar)').eq('id', id).single();
  if (error || !property) throw new AppError('العقار غير موجود', 404);

  await supabase.from('properties').update({ views: (property.views || 0) + 1 }).eq('id', id);
  res.json({ property });
});

export const createProperty = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw new AppError('غير مصرح', 401);

  const { data: property, error } = await supabase.from('properties').insert({ ...req.body, user_id: userId }).select().single();
  if (error) throw new AppError('فشل في إضافة العقار', 500);
  res.status(201).json({ message: 'تم إضافة العقار بنجاح', property });
});

export const updateProperty = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const isAdmin = req.user?.isAdmin;

  const { data: existingProperty } = await supabase.from('properties').select('user_id').eq('id', id).single();
  if (!existingProperty) throw new AppError('العقار غير موجود', 404);
  if (!isAdmin && existingProperty.user_id !== userId) throw new AppError('غير مصرح لك بتعديل هذا العقار', 403);

  const { data: property, error } = await supabase.from('properties').update(req.body).eq('id', id).select().single();
  if (error) throw new AppError('فشل في تحديث العقار', 500);
  res.json({ message: 'تم تحديث العقار بنجاح', property });
});

export const deleteProperty = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const isAdmin = req.user?.isAdmin;

  const { data: existingProperty } = await supabase.from('properties').select('user_id').eq('id', id).single();
  if (!existingProperty) throw new AppError('العقار غير موجود', 404);
  if (!isAdmin && existingProperty.user_id !== userId) throw new AppError('غير مصرح لك بحذف هذا العقار', 403);

  const { error } = await supabase.from('properties').delete().eq('id', id);
  if (error) throw new AppError('فشل في حذف العقار', 500);
  res.json({ message: 'تم حذف العقار بنجاح' });
});
