const Joi = require("joi");

const wishlistValidationSchema = Joi.object({
  user: Joi.string().required(), // ObjectId of the user
  products: Joi.array()
    .items(Joi.string()) // Array of ObjectIds for products
    .optional(), // Optional field, can be empty
});

module.exports = { wishlistValidationSchema };
