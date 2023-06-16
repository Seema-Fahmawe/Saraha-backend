import Joi from "joi";

export const signupSchema =
{
    body: Joi.object({
        userName: Joi.string().alphanum().required().messages({
            'string.empty': 'username is required',
            'any.required': 'username is required',
        }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
            'string.empty': 'email is required',
            'any.required': 'email is required'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'password is required',
            'any.required': 'password is required'
        }),
        cPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'string.empty': 'cPassword is required',
            'any.required': 'cPassword is required',
            'any.only': 'cPassword must ba password'
        }),
    }).required(),
}




export const loginSchema =
{
    body: Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'email is required',
            'any.required': 'email is required'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'password is required',
            'any.required': 'password is required'
        })
    }).required(),
}
