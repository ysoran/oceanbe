import * as express from "express";
import { getShips, getPorts } from "../controllers/appController";
const router = express.Router();

router.get("/getPorts", getPorts);
router.post("/getShips", getShips);

export default router;
