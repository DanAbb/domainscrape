import Joi from 'joi'
import Scrape from './Scrape';

const routes = [
  {
    method: 'POST',
    path: '/Scrape/Test',
    handler: Scrape,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        payload: {
          domain: Joi.string().required(),
          pattern: Joi.array().required(),
          place: Joi.string().required(),
          num: Joi.number().required()
        }
      }
    }
  }
]

export default routes;
