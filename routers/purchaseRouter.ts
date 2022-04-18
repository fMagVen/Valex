import { Router } from "express";
import { makePurchase } from "../controllers/paymentsController.js";
import validateSchema from "../middlewares/validadeSchemaMiddleware.js";
import { purchaseSchema } from "../schemas/purchaseSchema.js";

const purchaseRouter = Router()

purchaseRouter.post('/buy', validateSchema(purchaseSchema), makePurchase)

export default purchaseRouter