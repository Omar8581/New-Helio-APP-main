import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: 'APP_ERROR'
    });
  }

  console.error('ERROR:', err);

  res.status(500).json({
    message: 'حدث خطأ في الخادم',
    error: 'INTERNAL_SERVER_ERROR',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'الصفحة المطلوبة غير موجودة',
    error: 'NOT_FOUND'
  });
};
