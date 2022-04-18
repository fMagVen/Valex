import { Router } from "express";
import { makePurchase, onlinePurchase } from "../controllers/paymentsController.js";
import validateSchema from "../middlewares/validadeSchemaMiddleware.js";
import { onlinePurchaseSchema, purchaseSchema } from "../schemas/purchaseSchema.js";

const purchaseRouter = Router()

purchaseRouter.post('/buy', validateSchema(purchaseSchema), makePurchase)
purchaseRouter.post('/online', validateSchema(onlinePurchaseSchema), onlinePurchase)

export default purchaseRouter