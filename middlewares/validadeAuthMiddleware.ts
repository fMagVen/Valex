import {Request, Response, NextFunction} from "express"
import { findByApiKey } from "../repositories/companyRepository.js"
import "express-async-errors"

export async function validateAPI(req: Request, res: Response, next: NextFunction){

	const apikey = req.headers["x-api-key"]
	if(!apikey) throw {type: 401, message: 'auth header token or API key must be provided'}

	const company = await findByApiKey(apikey.toString())
	if(!company) throw {type: 401, message: 'api key not found, either mispelled, company does not exist or unauthorized'}

	next()
}