const joi = require('joi')

exports.random = joi.object({
  transport: joi.object({
    host: joi.string().required(),
    port: joi.number().required(),
    secure: joi.boolean().required(),
    username: joi.string().required(),
    password: joi.string().required(),
  }).required(),
  content: joi.object({
    from: joi.string().required(),
    to: joi.string().required(),
    subject: joi.string().required(),
    text: joi.string().required(),
    html: joi.string(),
  }).required()
})
exports.known = joi.object({
  content: joi.object({
    from: joi.string().required(),
    to: joi.string().required(),
    subject: joi.string().required(),
    text: joi.string().required(),
    html: joi.string(),
  }).required()
})