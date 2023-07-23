import Joi from 'joi'

const validator = (schema) => (payload) =>
    schema.validate(payload,{abortEarly:false});

const signinSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
})

export const validateSignin = validator(signinSchema);

