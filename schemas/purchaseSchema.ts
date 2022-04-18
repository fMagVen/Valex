import Joi from "joi";

export const purchaseSchema = Joi.object({
	cardNumber: Joi.string().pattern(/^[0-9]{1,}$/).required(),
	password: Joi.string().pattern(/^[0-9]{4}$/).required(),
	businessName: Joi.string().required(),
	amount: Joi.number().min(1).required()
})