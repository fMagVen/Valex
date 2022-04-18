import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function getTransactionsById(id: number){
	const payments = await paymentRepository.findByCardId(id)
	const recharges = await rechargeRepository.findByCardId(id)
	let balance = 0
	for(let i = 0; i < recharges.length; i++){
		balance += recharges[i].amount
	}
	for(let i = 0; i < payments.length; i++){
		balance -= payments[i].amount
	}
	const transactions = {
		balance,
		transactions: payments,
		recharges
	}
	return transactions
}