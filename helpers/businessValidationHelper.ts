import * as businessRepository from "../repositories/businessRepository.js"
import getTransactionsById from "./transactionsHelper.js"

export default async function validateBusinessAndPurchase(businessName: string, amount: number, card){
	const business = await businessRepository.findByName(businessName)
	if(!business) throw {type: 404, message: 'business not found or name mispelled'}
	if(business.type != card.type) throw {type: 401, message: 'business type different from card type'}

	const {balance} = await getTransactionsById(card.id)
	if(balance < amount) throw {type: 401, message: 'insuficient funds on card to complete purchase'}
	return business
}