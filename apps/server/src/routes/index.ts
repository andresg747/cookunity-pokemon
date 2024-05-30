import { Router } from "express";
import CardController from "../controllers/cards";
import BattleController from "../controllers/battle";

const router = Router();

// Cards routes
router.post("/cards", CardController.create);
router.get("/cards/:id", CardController.getDetails);
router.get("/cards", CardController.listAll);
router.put("/cards/:id", CardController.update);
router.delete("/cards/:id", CardController.delete);

// Battle routes
router.post("/battle", BattleController.fight);

export default router;
