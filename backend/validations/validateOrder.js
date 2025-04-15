const Joi = require("joi");

const orderValidationSchema = Joi.object({
  firstname: Joi.string().required().trim(),
  lastname: Joi.string().optional(),
  orderItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(), // ObjectId of the product
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
      })
    )
    .min(1)
    .required(),
  shippingAddress: Joi.object({
    address: Joi.string().required(),
    village: Joi.string()
      .valid("Bhogwara", "Udagi", "Savdih", "Belhabandh (Kwajgi patti)", "Nevada", "Bhorai Ka Pura", "Sarai Hariram")
      .required(),
    city: Joi.string().valid("Prayagraj").required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
  }).required(),
  totalPrice: Joi.number().positive().required(),
  grandTotal: Joi.number().positive().optional(),
  status: Joi.string()
    .valid("Pending", "Confirmed", "Out for Delivery", "Delivered", "Cancelled")
    .default("Pending"),
  paymentMethod: Joi.string().valid("COD", "Online").required(),
  paymentStatus: Joi.string()
    .valid("Pending", "Paid", "Failed")
    .default("Pending"),
  deliveredAt: Joi.date().optional(), // Optional as delivery might not happen yet
  buyNow : Joi.boolean().optional(),
  deliveryCharge: Joi.number(),
});

module.exports = { orderValidationSchema };
