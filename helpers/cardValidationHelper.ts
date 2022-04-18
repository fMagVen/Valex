import { findByNumber } from "../repositories/cardRepository.js";
import bcrypt from "bcrypt"

export default async function validateCardData(cardData){
	const card = await findByNumber(cardData.cardNumber)
	if(!card) throw {type: 404, message: 'card with given number not found'}
	if(cardData.cvc && !bcrypt.compareSync(cardData.cvc, card.securityCode)) throw {type: 401, message: 'wrong cvc number'}
	if(cardData.activate && card.password) throw {type: 400, message: 'card already activated'}
	if(cardData.password && !bcrypt.compareSync(cardData.password, card.password)) throw {type: 401, message: 'wrong password'}
	if(cardData.providedDate && cardData.expirationDate != card.expirationDate) throw {type: 400, message: 'wrong expiration date'}
	if(cardData.online && cardData.cardHolderName != card.cardholderName) throw {type: 401, message: 'wrong card owner name'}
	if(cardData.checkDate && card.date < Date.now()) throw {type: 400, message: 'card already expired'}
	if(cardData.purchaseAttempt && card.isBlocked) throw {type: 401, message: 'card is blocked'}
	return card
}