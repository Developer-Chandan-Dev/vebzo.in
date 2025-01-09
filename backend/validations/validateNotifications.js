const Joi = require("joi");

const createNotificationValidationSchema = Joi.object({
  user: Joi.string().optional().messages({
    "string.base": "User ID must be a string.",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  message: Joi.string().required().messages({
    "string.empty": "Message is required.",
  }),
  type: Joi.string()
    .valid("Order", "Stock", "Account", "Promotion")
    .required()
    .messages({
      "any.only":
        "Type must be one of ['Order', 'Stock', 'Account', 'Promotion'].",
      "string.empty": "Type is required.",
    }),
  read: Joi.boolean().optional().default(false),
  createdAt: Joi.date()
    .optional()
    .default(() => new Date()),
});

const updateNotificationValidationSchema = Joi.object({
  user: Joi.string().optional().messages({
    "string.base": "User ID must be a string.",
  }),
  title: Joi.string().optional(),
  message: Joi.string().optional(),
  type: Joi.string().valid("Order", "Stock", "Account", "Promotion").optional(),
  read: Joi.boolean().optional(),
  createdAt: Joi.date().optional(),
});

module.exports = {
  createNotificationValidationSchema,
  updateNotificationValidationSchema,
};
