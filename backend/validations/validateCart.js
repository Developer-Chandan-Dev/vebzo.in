const Joi = require("joi");

const cartValidationSchema = Joi.object({
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validate ObjectId format
    .required(), // User is required
  cartItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/) // Validate ObjectId format for product
          .required(),
        quantity: Joi.number().integer().min(1).default(1).required(),
      })
    )
    .min(1) // At least one cart item is required
    .required(),
});

const updateCartValidationSchema = Joi.object({
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validate ObjectId format
    .required(), // User is required
  cartItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/) // Validate ObjectId format for product
          .required(),
        quantity: Joi.number().integer().min(1).default(1).required(),
      })
    )
    .min(1) // At least one cart item is required
    .required(),
});

module.exports = { cartValidationSchema, updateCartValidationSchema };
