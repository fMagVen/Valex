import * as cardRepository from "../repositories/cardRepository.js"
import * as businessRepository from "../repositories/businessRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import getTransactionsById from "../helpers/transactionsHelper.js"
import bcrypt from "bcrypt"

export async function makePurchase(
	cardNumber: string,
	password: string,
	businessName: string,
	amount: number
	){
	const card = await cardRepository.findByNumber(cardNumber)
	if(!card) throw {type: 404, message: 'mispelled card number or non existant card'}
	if(!bcrypt.compareSync(password, card.password)) throw {type: 401, message: 'wrong password'}
	if(card.expirationDate < Date.now()) throw {type: 401, message: 'card expired, contact your employer soliciting a new one'}

	const business = await businessRepository.findByName(businessName)
	if(!business) throw {type: 404, message: 'business not found or name mispelled'}
	if(business.type != card.type) throw {type: 401, message: 'business type different from card type'}

	const {balance} = await getTransactionsById(card.id)
	if(balance < amount) throw {type: 401, message: 'insuficient funds on card to complete purchase'}

	const paymentData: paymentRepository.PaymentInsertData = {
		cardId: card.id,
		businessId: business.id,
		amount
	}
	await paymentRepository.insert(paymentData)
}