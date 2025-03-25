const Joi = require("joi");

const createProductValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Product name is required.",
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Product description is required.",
  }),
  purchasePrice: Joi.number().positive().optional().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be greater than zero.",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be greater than zero.",
  }),
  salesPrice: Joi.number().positive().optional().messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be greater than zero.",
  }),
  stock: Joi.number().integer().min(0).default(0).required().messages({
    "number.base": "Stock must be a number.",
    "number.min": "Stock must be at least 0.",
  }),
  sold: Joi.number().integer().min(0).default(0).optional(),
  category: Joi.string().required().messages({
    "string.empty": "Category is required.",
  }),
  isFeatured: Joi.boolean().optional(),
  imageUrl: Joi.string().uri().optional(),
  imageUrlPublicId: Joi.string().optional(),
  averageRating: Joi.number().min(0).max(5).default(0).optional(),
  totalRatings: Joi.number().integer().min(0).default(0).optional(),
});

const updateProductValidationSchema = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  purchasePrice: Joi.number().optional(),
  price: Joi.number().positive().optional(),
  salesPrice: Joi.number().optional(),
  stock: Joi.number().integer().min(0).optional(),
  sold: Joi.number().integer().min(0).optional(),
  category: Joi.string().optional(),
  isFeatured: Joi.boolean().optional(),
  imageUrl: Joi.string().uri().optional(),
  imageUrlPublicId: Joi.string().optional(),
  averageRating: Joi.number().min(0).max(5).optional(),
  totalRatings: Joi.number().integer().min(0).optional(),
});

module.exports = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
