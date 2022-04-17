import { Router } from "express";
import { createCard, activateCard } from "../controllers/cardsController.js";
import { validateAPI } from "../middlewares/validadeAuthMiddleware.js";
import validateSchema from "../middlewares/validadeSchemaMiddleware.js";
import { activateCardSchema, newCardSchema } from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post('/cards/new', validateAPI, validateSchema(newCardSchema), createCard)
cardsRouter.post('/cards/activate', validateSchema(activateCardSchema), activateCard)

export default cardsRouter;