import { Response } from 'express';
import { supabase } from '../config/database';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const getCategories = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { data: categories, error } = await supabase
    .from('categories')
    .select(`
      *,
      sub_categories (*)
    `)
    .order('order_index');

  if (error) throw new AppError('فشل في جلب الفئات', 500);

  res.json({ categories });
});

export const getServices = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    page = 1,
    limit = 20,
    category_id,
    sub_category_id,
    search,
    sortBy = 'created_at',
    order = 'desc'
  } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  let query = supabase
    .from('services')
    .select(`
      *,
      categories (id, name, name_en, icon),
      sub_categories (id, name, name_en),
      reviews (id, rating)
    `, { count: 'exact' });

  if (category_id) {
    query = query.eq('category_id', category_id);
  }

  if (sub_category_id) {
    query = query.eq('sub_category_id', sub_category_id);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  query = query
    .order(sortBy as string, { ascending: order === 'asc' })
    .range(offset, offset + Number(limit) - 1);

  const { data: services, error, count } = await query;

  if (error) throw new AppError('فشل في جلب الخدمات', 500);

  const servicesWithRating = services?.map(service => {
    const reviews = service.reviews || [];
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
      : 0;

    return {
      ...service,
      average_rating: avgRating,
      total_reviews: reviews.length,
      reviews: undefined
    };
  });

  res.json({
    services: servicesWithRating,
    pagination: {
      totalItems: count || 0,
      totalPages: Math.ceil((count || 0) / Number(limit)),
      currentPage: Number(page),
      pageSize: Number(limit)
    }
  });
});

export const getServiceById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { data: service, error } = await supabase
    .from('services')
    .select(`
      *,
      categories (id, name, name_en, icon),
      sub_categories (id, name, name_en),
      reviews (
        id,
        rating,
        comment,
        created_at,
        admin_reply,
        admin_reply_at,
        app_users (id, name, avatar)
      )
    `)
    .eq('id', id)
    .single();

  if (error || !service) {
    throw new AppError('الخدمة غير موجودة', 404);
  }

  const reviews = service.reviews || [];
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length
    : 0;

  const serviceWithRating = {
    ...service,
    average_rating: avgRating,
    total_reviews: reviews.length
  };

  res.json({ service: serviceWithRating });
});

export const createService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError('غير مصرح', 401);
  }

  const serviceData = {
    ...req.body,
    user_id: userId,
    status: 'pending'
  };

  const { data: service, error } = await supabase
    .from('services')
    .insert(serviceData)
    .select()
    .single();

  if (error) {
    throw new AppError('فشل في إضافة الخدمة', 500);
  }

  res.status(201).json({
    message: 'تم إضافة الخدمة بنجاح',
    service
  });
});

export const updateService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const isAdmin = req.user?.isAdmin;

  const { data: existingService } = await supabase
    .from('services')
    .select('user_id')
    .eq('id', id)
    .single();

  if (!existingService) {
    throw new AppError('الخدمة غير موجودة', 404);
  }

  if (!isAdmin && existingService.user_id !== userId) {
    throw new AppError('غير مصرح لك بتعديل هذه الخدمة', 403);
  }

  const { data: service, error } = await supabase
    .from('services')
    .update(req.body)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new AppError('فشل في تحديث الخدمة', 500);
  }

  res.json({
    message: 'تم تحديث الخدمة بنجاح',
    service
  });
});

export const deleteService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    throw new AppError('فشل في حذف الخدمة', 500);
  }

  res.json({
    message: 'تم حذف الخدمة بنجاح'
  });
});

export const addReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId;
  const { rating, comment } = req.body;

  if (!userId) {
    throw new AppError('غير مصرح', 401);
  }

  const { data: existingReview } = await supabase
    .from('reviews')
    .select('id')
    .eq('service_id', id)
    .eq('user_id', userId)
    .maybeSingle();

  if (existingReview) {
    throw new AppError('لقد قمت بتقييم هذه الخدمة من قبل', 400);
  }

  const { data: review, error } = await supabase
    .from('reviews')
    .insert({
      service_id: id,
      user_id: userId,
      rating,
      comment
    })
    .select(`
      *,
      app_users (id, name, avatar)
    `)
    .single();

  if (error) {
    throw new AppError('فشل في إضافة التقييم', 500);
  }

  res.status(201).json({
    message: 'تم إضافة التقييم بنجاح',
    review
  });
});

export const updateReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { serviceId, reviewId } = req.params;
  const userId = req.user?.userId;
  const isAdmin = req.user?.isAdmin;

  const { data: existingReview } = await supabase
    .from('reviews')
    .select('user_id')
    .eq('id', reviewId)
    .single();

  if (!existingReview) {
    throw new AppError('التقييم غير موجود', 404);
  }

  if (!isAdmin && existingReview.user_id !== userId) {
    throw new AppError('غير مصرح لك بتعديل هذا التقييم', 403);
  }

  const { data: review, error } = await supabase
    .from('reviews')
    .update(req.body)
    .eq('id', reviewId)
    .select()
    .single();

  if (error) {
    throw new AppError('فشل في تحديث التقييم', 500);
  }

  res.json({
    message: 'تم تحديث التقييم بنجاح',
    review
  });
});

export const deleteReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { reviewId } = req.params;
  const userId = req.user?.userId;
  const isAdmin = req.user?.isAdmin;

  const { data: existingReview } = await supabase
    .from('reviews')
    .select('user_id')
    .eq('id', reviewId)
    .single();

  if (!existingReview) {
    throw new AppError('التقييم غير موجود', 404);
  }

  if (!isAdmin && existingReview.user_id !== userId) {
    throw new AppError('غير مصرح لك بحذف هذا التقييم', 403);
  }

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId);

  if (error) {
    throw new AppError('فشل في حذف التقييم', 500);
  }

  res.json({
    message: 'تم حذف التقييم بنجاح'
  });
});

export const replyToReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { reviewId } = req.params;
  const { admin_reply } = req.body;

  const { data: review, error } = await supabase
    .from('reviews')
    .update({
      admin_reply,
      admin_reply_at: new Date().toISOString()
    })
    .eq('id', reviewId)
    .select()
    .single();

  if (error) {
    throw new AppError('فشل في إضافة الرد', 500);
  }

  res.json({
    message: 'تم إضافة الرد بنجاح',
    review
  });
});
