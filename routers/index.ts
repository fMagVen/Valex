import { Router } from "express"
import cardsRouter from "./cardsRouter.js";
import purchaseRouter from "./purchaseRouter.js";

const router = Router();

router.use(cardsRouter)
router.use(purchaseRouter)

export default router;