import { celebrate, Joi, Segments } from 'celebrate'

export const ResultValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    realistic: Joi.number().required(),
    investigative: Joi.number().required(),
    entrepreneur: Joi.number().required(),
    conventional: Joi.number().required(),
    artistic: Joi.number().required(),
    social: Joi.number().required()
  })
})
