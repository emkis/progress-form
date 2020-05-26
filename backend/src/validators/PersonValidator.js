import { celebrate, Joi, Segments } from 'celebrate'

export const PersonValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(8).required(),
    city: Joi.string().required(),
    fu: Joi.string().length(2).required()
  })
})
