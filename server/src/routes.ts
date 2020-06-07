import express, { response } from 'express';
import { celebrate, Joi } from 'celebrate';
// import { Validation } from './utils/Validation';

import multer from 'multer';
import multerConfig from './config/multer';

import ItemsController from './controllers/itemsController';
import PointsController from './controllers/pointsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// index, show, create, update, delete

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

// Validation({body: { name: name, email: email, whatsapp, }}),
routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false // Realiza validação completa e exibe tudo que está faltando. 
    }),
    pointsController.create);

export default routes;

// Service Pattern
// Repository Pattern (Data Mapper)