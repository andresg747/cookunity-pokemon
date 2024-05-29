import { Router } from "express";
import CardController from "../controllers/cards";

const router = Router();

router.post("/cards", CardController.create);
router.get("/cards/:id", CardController.getDetails);
router.get("/cards", CardController.listAll);
router.put("/cards/:id", CardController.update);
router.delete("/cards/:id", CardController.delete);

export default router;
