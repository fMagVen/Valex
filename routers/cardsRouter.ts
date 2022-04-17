import { Router } from "express";
import { createCard } from "../controllers/cardsController.js";
import { validateAPI } from "../middlewares/validadeAuthMiddleware.js";
import validateSchema from "../middlewares/validadeSchemaMiddleware.js";
import { cardSchema } from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post('/cards/new', validateAPI, validateSchema(cardSchema), createCard)

export default cardsRouter;