import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { getTransactionsById } from "../helpers/transactionsHelper.js";
import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import bcrypt from "bcrypt"
import "dotenv/config"


export async function createCard(type: cardRepository.TransactionTypes, cpf: string){

	const employee = await employeeRepository.findByCpf(cpf)
	if(!employee) throw { type: 404, message: 'cpf of employee mispelled or not found' }

	const existingCardType = await cardRepository.findByTypeAndEmployeeCpf(type, cpf)
	if(existingCardType) throw { type: 409, message: 'employee already has a card of that type' }

	let cardNumber = faker.datatype.bigInt().toString()
	let existingCardNumber = await cardRepository.findByNumber(cardNumber)
	while(existingCardNumber){
		cardNumber = faker.datatype.bigInt().toString()
		existingCardNumber = await cardRepository.findByNumber(cardNumber)
	}

	const separatedName = employee.fullName.split(' ')
	let joinedName = ''
	for(let i = 0; i < separatedName.length; i++){
		if(separatedName[i][0] == separatedName[i][0].toUpperCase()){
			if(i == 0 || i == separatedName.length - 1) joinedName += separatedName[i].toUpperCase() + ' '
			else joinedName += separatedName[i][0].toUpperCase() + ' '
		}
	}
	joinedName.slice(-1)

	const date = dayjs().add(5, 'y').format('MM/YY')

	const cvc = faker.datatype.number({min: 100, max: 999}).toString()
	const salty = process.env.SALT
	const cryptoCvc = bcrypt.hashSync(cvc, 3)

	const password = faker.datatype.number({min: 1000, max: 9999}).toString()

	const finalCardData: cardRepository.CardInsertData = {
		employeeId: employee.id,
		number: cardNumber,
		cardholderName: joinedName,
		securityCode: cryptoCvc,
		expirationDate: date,
		isVirtual: false,
		isBlocked: true,
		type
	}

	await cardRepository.insert(finalCardData)

	return {...finalCardData, securityCode: cvc}
}

export async function activateCard(number: string, cvc: string, newPassword: string){

	const card = await cardRepository.findByNumber(number)
	if(!card) throw {type: 404, message: 'mispelled card number or non existant card'}
	if(card.expirationDate < Date.now()) throw {type: 401, message: 'card already expired'}
	if(card.password) throw {type: 400, message: 'card already activated'}
	if(!bcrypt.compareSync(cvc, card.securityCode)) throw {type: 401, message: 'wrong cvc number'}

	const cryptoPassword = bcrypt.hashSync(newPassword, 3)
	const updatedCardData: cardRepository.CardUpdateData = {password: cryptoPassword}
	await cardRepository.update(card.id, updatedCardData)
}

export async function verifyCardTransactions(cardNumber: string, cvc: string){
	const card = await cardRepository.findByNumber(cardNumber)
	if(!card) throw {type: 404, message: 'mispelled card number or non existant card'}
	if(!bcrypt.compareSync(cvc, card.securityCode)) throw {type: 401, message: 'wrong cvc number'}

	const transactions = await getTransactionsById(card.id)
	return transactions
}

export async function rechargeCard(type: cardRepository.TransactionTypes, cpf: string, amount: number){
	const card = await cardRepository.findByTypeAndEmployeeCpf(type, cpf)
	if(!card) throw {type: 404, message: 'card with given number and employee cpf not found'}
	if(card.date < Date.now()) throw {type: 400, message: 'card already expired'}
	const insertData = {
		cardId: card.id,
		amount
	}
	await rechargeRepository.insert(insertData)
}