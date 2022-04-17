import {Request, Response, NextFunction} from "express";

export default function validateSchema(schema){
	return(req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body)
		if(validation.error){
			throw {type: 422, message: validation.error.message}
		}
		next()
	}
}