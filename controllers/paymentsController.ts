import { Request, Response } from "express";
import * as paymentService from '../services/paymentService.js'

export async function makePurchase(req: Request, res: Response){
	const {cardNumber, password, businessName, amount} = req.body
	await paymentService.makePurchase(cardNumber, password, businessName, amount)
	res.sendStatus(200)
}

export async function onlinePurchase(req: Request, res: Response){
	const {cardNumber, cvc, expirationDate, cardHolderName, businessName, amount} = req.body
	await paymentService.onlinePurchase(cardNumber, cvc, expirationDate, cardHolderName, businessName, amount)
	res.sendStatus(200)
}