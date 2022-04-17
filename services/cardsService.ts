import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
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