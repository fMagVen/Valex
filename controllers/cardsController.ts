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

export async function verifyCardTransactions(req: Request, res: Response){
	const {cardNumber, cvc} = req.body
	const transactions = await cardsService.verifyCardTransactions(cardNumber, cvc)
	res.status(200).send(transactions)
}

export async function rechargeCard(req: Request, res: Response){
	const {type, cpf, amount} = req.body
	await cardsService.rechargeCard(type, cpf, amount)
	res.sendStatus(200)
}

export async function blockCard(req: Request, res: Response){
	const {cardNumber, cvc, password} = req.body
	await cardsService.blockCard(cardNumber, cvc, password)
	res.sendStatus(200)
}