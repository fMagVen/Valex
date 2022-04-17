import Joi from "joi";

const cardTypes = [
	'groceries',
	'restaurants',
	'transport',
	'education',
	'health'
]

export const newCardSchema = Joi.object({
	type: Joi.any().valid(...cardTypes).required(),
	cpf: Joi.string().min(11).max(11).required()
})

export const cardTransactionsSchema = Joi.object({
	cardNumber: Joi.string().pattern(/^[0-9]{1,}$/).required(),
	cvc: Joi.string().pattern(/^[0-9]{3}$/).required()
})

export const activateCardSchema = Joi.object({
	cardNumber: Joi.string().pattern(/^[0-9]{1,}$/).required(),
	cvc: Joi.string().pattern(/^[0-9]{3}$/).required(),
	newPassword: Joi.string().pattern(/^[0-9]{4}$/).required()
})