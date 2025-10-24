import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const adminLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const createServiceSchema = Joi.object({
  name: Joi.string().required(),
  nameEn: Joi.string().optional(),
  category_id: Joi.number().integer().required(),
  sub_category_id: Joi.number().integer().optional(),
  description: Joi.string().required(),
  descriptionEn: Joi.string().optional(),
  phone: Joi.array().items(Joi.string()).min(1).required(),
  address: Joi.string().required(),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }).optional(),
  images: Joi.array().items(Joi.string()).optional(),
  working_hours: Joi.string().optional(),
  website: Joi.string().uri().optional(),
  facebook: Joi.string().uri().optional(),
  instagram: Joi.string().uri().optional()
});

export const createReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(10).max(1000).required()
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  avatar: Joi.string().uri().optional()
});

export const createPropertySchema = Joi.object({
  title: Joi.string().required(),
  titleEn: Joi.string().optional(),
  type: Joi.string().valid('sale', 'rent').required(),
  price: Joi.number().positive().required(),
  area: Joi.number().positive().required(),
  bedrooms: Joi.number().integer().min(0).optional(),
  bathrooms: Joi.number().integer().min(0).optional(),
  description: Joi.string().required(),
  descriptionEn: Joi.string().optional(),
  address: Joi.string().required(),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }).optional(),
  images: Joi.array().items(Joi.string()).optional(),
  amenities: Joi.array().items(Joi.string()).optional(),
  phone: Joi.string().required()
});

export const createPostSchema = Joi.object({
  circle_id: Joi.number().integer().required(),
  type: Joi.string().valid('discussion', 'poll', 'event', 'question').required(),
  content: Joi.string().required(),
  contentEn: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
  poll_options: Joi.when('type', {
    is: 'poll',
    then: Joi.array().items(Joi.string()).min(2).required(),
    otherwise: Joi.forbidden()
  }),
  event_date: Joi.when('type', {
    is: 'event',
    then: Joi.date().iso().required(),
    otherwise: Joi.forbidden()
  }),
  event_location: Joi.when('type', {
    is: 'event',
    then: Joi.string().required(),
    otherwise: Joi.forbidden()
  })
});

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errors: any = {};
      error.details.forEach(detail => {
        errors[detail.path[0]] = detail.message;
      });

      return res.status(422).json({
        message: 'البيانات المدخلة غير صالحة',
        errors
      });
    }

    next();
  };
};
