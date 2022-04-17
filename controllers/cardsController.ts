import { Request, Response } from "express";
import * as cardsService from '../services/cardsService.js'

export async function createCard(req: Request, res: Response){
	const {type, cpf} = req.body
	const card = await cardsService.createCard(type, cpf)
	res.status(201).send(card)
}