import { celebrate, Joi } from 'celebrate';

const Validation = (body: Body) => {
    return celebrate({
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
    })
}

export default Validation;