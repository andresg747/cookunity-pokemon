import { Router } from "express";
import CardController from "../controllers/cards";
import BattleController from "../controllers/battle";

const router = Router();

// Cards routes
const cardController = new CardController();
router.post("/cards", cardController.create);
router.get("/cards/:id", cardController.getDetails);
router.get("/cards", cardController.listAll);
router.put("/cards/:id", cardController.update);
router.delete("/cards/:id", cardController.delete);
router.get("/cards/:id/analyze", cardController.analyze);

// Battle routes
const battleController = new BattleController();
router.post("/battle", battleController.fight);

export default router;
