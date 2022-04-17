import { Router } from "express";
import { createCard, activateCard, verifyCardTransactions } from "../controllers/cardsController.js";
import { validateAPI } from "../middlewares/validadeAuthMiddleware.js";
import validateSchema from "../middlewares/validadeSchemaMiddleware.js";
import { activateCardSchema, newCardSchema, cardTransactionsSchema } from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post('/cards/new', validateAPI, validateSchema(newCardSchema), createCard)
cardsRouter.post('/cards/activate', validateSchema(activateCardSchema), activateCard)
cardsRouter.post('/cards/transactions', validateSchema(cardTransactionsSchema), verifyCardTransactions)

export default cardsRouter;