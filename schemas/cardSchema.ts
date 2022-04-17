import Joi from "joi";

const cardTypes = [
	'groceries',
	'restaurants',
	'transport',
	'education',
	'health'
]

export const cardSchema = Joi.object({
	type: Joi.any().valid(...cardTypes).required(),
	cpf: Joi.string().min(11).max(11).required()
})