import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../config/database';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, email, password, phone, address } = req.body;

  const { data: existingUser } = await supabase
    .from('app_users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existingUser) {
    throw new AppError('البريد الإلكتروني مستخدم بالفعل', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: user, error } = await supabase
    .from('app_users')
    .insert({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      status: 'active'
    })
    .select('id, name, email, phone, address, status, created_at')
    .single();

  if (error) {
    throw new AppError('فشل إنشاء الحساب', 500);
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({
    message: 'تم إنشاء الحساب بنجاح',
    user,
    accessToken
  });
});

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('app_users')
    .select('id, name, email, password, phone, address, status, role, avatar')
    .eq('email', email)
    .maybeSingle();

  if (error || !user) {
    throw new AppError('البريد الإلكتروني أو كلمة المرور غير صحيحة', 401);
  }

  if (user.status !== 'active') {
    throw new AppError('الحساب غير نشط', 403);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('البريد الإلكتروني أو كلمة المرور غير صحيحة', 401);
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    message: 'تم تسجيل الدخول بنجاح',
    user: userWithoutPassword,
    accessToken
  });
});

export const adminLogin = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { username, password } = req.body;

  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('id, username, name, password, role, permissions')
    .eq('username', username)
    .maybeSingle();

  if (error || !admin) {
    throw new AppError('اسم المستخدم أو كلمة المرور غير صحيحة', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new AppError('اسم المستخدم أو كلمة المرور غير صحيحة', 401);
  }

  const accessToken = generateAccessToken({
    userId: admin.id,
    email: admin.username,
    role: admin.role,
    isAdmin: true
  });

  const refreshToken = generateRefreshToken({
    userId: admin.id,
    email: admin.username,
    role: admin.role,
    isAdmin: true
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  const { password: _, ...adminWithoutPassword } = admin;

  res.json({
    message: 'تم تسجيل الدخول بنجاح',
    admin: adminWithoutPassword,
    accessToken
  });
});

export const refresh = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError('لم يتم العثور على توكن التحديث', 401);
  }

  const decoded = verifyRefreshToken(refreshToken);

  const accessToken = generateAccessToken({
    userId: decoded.userId,
    email: decoded.email,
    role: decoded.role,
    isAdmin: decoded.isAdmin
  });

  res.json({
    accessToken
  });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.clearCookie('refreshToken');

  res.json({
    message: 'تم تسجيل الخروج بنجاح'
  });
});

export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new AppError('غير مصرح', 401);
  }

  let user;

  if (req.user?.isAdmin) {
    const { data } = await supabase
      .from('admin_users')
      .select('id, username, name, role, permissions')
      .eq('id', userId)
      .single();
    user = data;
  } else {
    const { data } = await supabase
      .from('app_users')
      .select('id, name, email, phone, address, status, role, avatar')
      .eq('id', userId)
      .single();
    user = data;
  }

  if (!user) {
    throw new AppError('المستخدم غير موجود', 404);
  }

  res.json({ user });
});
