const Joi = require("joi");

module.exports.userRegisterSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

module.exports.userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.adminAddShowSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  genre: Joi.string().required(),
  inDate: Joi.string().required(),
  certificate: Joi.string().required(),
  language: Joi.string().required(),
  duration: Joi.string().required(),
  director: Joi.string().required(),
  cast: Joi.string().required(),
});

module.exports.passwordSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
