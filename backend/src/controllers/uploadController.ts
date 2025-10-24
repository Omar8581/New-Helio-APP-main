import { Response } from 'express';
import { AppError, asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../middleware/auth';

export const uploadImages = asyncHandler(async (req: any, res: Response) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    throw new AppError('لم يتم تحميل أي ملفات', 400);
  }
  const urls = req.files.map((f: any) => 'https://via.placeholder.com/400');
  res.json({ message: 'تم رفع الصور بنجاح', urls });
});
