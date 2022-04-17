import {Request, Response, NextFunction} from "express"

const TypesAndMessages = {
	401: 'unauthorized',
	404: 'not found',
	409: 'conflict',
	422: 'unprocessable entity'
}

export default function errorHandlingMiddleware(err, req: Request, res: Response, next: NextFunction){
	if(TypesAndMessages[err.type]) return res.status(err.type).send(err.message || TypesAndMessages[err.type])
	else return res.status(500).send(err)
}