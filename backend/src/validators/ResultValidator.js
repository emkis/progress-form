import { celebrate, Joi, Segments } from 'celebrate'

export const ResultValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    realistic: Joi.string().required(),
    investigative: Joi.string().required(),
    entrepreneur: Joi.string().required(),
    conventional: Joi.string().required(),
    artistic: Joi.string().required(),
    social: Joi.string().required()
  })
})
