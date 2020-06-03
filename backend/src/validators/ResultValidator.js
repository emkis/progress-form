import { celebrate, Joi, Segments } from 'celebrate'

export const ResultValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    realistic: Joi.number().required(),
    investigative: Joi.number().integer().required(),
    entrepreneur: Joi.number().integer().required(),
    conventional: Joi.number().integer().required(),
    artistic: Joi.number().integer().required(),
    social: Joi.number().integer().required()
  })
})
