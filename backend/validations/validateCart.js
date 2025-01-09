const Joi = require("joi");

const cartValidationSchema = Joi.object({
  user: Joi.string().required(), // ObjectId of the user
  cartItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(), // ObjectId of the product
        quantity: Joi.number().integer().min(1).default(1).required(),
      })
    )
    .min(1) // At least one cart item is required
    .required(),
});

const updateCartValidationSchema = Joi.object({
  user: Joi.string().optional(), // ObjectId of the user, optional for updates
  cartItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(), // ObjectId of the product
        quantity: Joi.number().integer().min(1).optional(), // Optional when updating
      })
    )
    .optional(), // The cartItems array is optional for updates
});

module.exports = { cartValidationSchema, updateCartValidationSchema };
