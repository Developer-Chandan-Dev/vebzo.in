const Joi = require("joi");

// Validation schema for user registration
const userValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().trim().messages({
    "string.base": "Username must be a string",
    "string.min": "Username must be at least 3 characters long",
    "any.required": "Username is required",
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  image: Joi.string().uri().optional(),
  imagePublicId: Joi.string().optional(),
  address: Joi.string().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/) // Ensure the phone number is 10 digits
    .optional(),
  role: Joi.string().valid("user", "admin").default("user"),
  isBlocked: Joi.boolean().default(false),
});

// Validation schema for user updates
const userUpdateValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional().trim().messages({
    "string.base": "Username must be a string",
    "string.min": "Username must be at least 3 characters long",
    "any.required": "Username is required",
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).optional().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .optional()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  image: Joi.string().uri().optional(),
  imagePublicId: Joi.string().optional(),
  address: Joi.string().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional(),
  role: Joi.string().valid("user", "admin").optional(),
  isBlocked: Joi.boolean().optional(),
});

module.exports = { userValidationSchema, userUpdateValidationSchema };
