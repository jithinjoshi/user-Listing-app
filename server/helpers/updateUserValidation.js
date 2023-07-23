import Joi from 'joi'

const validator = (schema) => (payload) =>
    schema.validate(payload,{abortEarly:false});

const userSchema = Joi.object({
    username:Joi.string().min(3).max(15),
    email:Joi.string().email(),
})

export const updateUserValidation = validator(userSchema);

