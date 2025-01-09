const Joi = require("joi");

const createCategoryValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Category name is required.",
  }), // Name is required and should be trimmed
  description: Joi.string().trim().optional().allow(""), // Optional description
});

const updateCategoryValidationSchema = Joi.object({
  name: Joi.string().trim().optional(), // Name is optional for updates
  description: Joi.string().trim().optional().allow(""), // Description is optional
});

module.exports = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
