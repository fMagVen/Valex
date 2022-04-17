import { Request, Response } from "express";
import * as cardsService from '../services/cardsService.js'

export async function createCard(req: Request, res: Response){
	const {type, cpf} = req.body
	const card = await cardsService.createCard(type, cpf)
	res.status(201).send(card)
}

export async function activateCard(req: Request, res: Response){
	const {cardNumber, cvc, newPassword} = req.body
	const card = await cardsService.activateCard(cardNumber, cvc, newPassword)
	res.status(200).send('Card activated!')
}