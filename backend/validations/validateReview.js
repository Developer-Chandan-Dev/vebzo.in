const Joi = require("joi");

const validateReview = Joi.object({
  productId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500).optional(),
});

module.exports = validateReview;
