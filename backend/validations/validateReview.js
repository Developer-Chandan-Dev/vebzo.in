const Joi = require("joi");

const validateReview = Joi.object({
  productId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500).optional(),
});

const validateReviewUpdate = Joi.object({
  rating: Joi.number().min(1).max(5).optional(), // Rating should be between 1 and 5
  comment: Joi.string().max(500).optional(), // Comment is optional and max length is 500 characters
});

module.exports = { validateReview, validateReviewUpdate };
