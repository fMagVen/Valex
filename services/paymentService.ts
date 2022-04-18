import * as cardRepository from "../repositories/cardRepository.js"
import * as businessRepository from "../repositories/businessRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import getTransactionsById from "../helpers/transactionsHelper.js"
import validateCardData from "../helpers/cardValidationHelper.js"
import bcrypt from "bcrypt"
import validateBusinessAndPurchase from "../helpers/businessValidationHelper.js"

export async function makePurchase(
	cardNumber: string,
	password: string,
	businessName: string,
	amount: number
	){
	const data = {
		cardNumber,
		password,
		purchaseAttempt: true
	}
	const card = await validateCardData(data)

	const business = await validateBusinessAndPurchase(businessName, amount, card)

	const paymentData: paymentRepository.PaymentInsertData = {
		cardId: card.id,
		businessId: business.id,
		amount
	}
	await paymentRepository.insert(paymentData)
}

export async function onlinePurchase(
	cardNumber: string,
	cvc: string,
	expirationDate: string,
	cardHolderName: string,
	businessName: string,
	amount: number
){
	const data = {
		cardNumber,
		cvc,
		expirationDate,
		cardHolderName,
		checkDate: true,
		providedDate: true,
		online: true,
		purchaseAttempt: true
	}
	const card = await validateCardData(data)

	const business = await validateBusinessAndPurchase(businessName, amount, card)

	const paymentData: paymentRepository.PaymentInsertData = {
		cardId: card.id,
		businessId: business.id,
		amount
	}
	await paymentRepository.insert(paymentData)
}