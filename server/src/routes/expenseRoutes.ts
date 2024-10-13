import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenseContoller";

const router = Router();
router.get("/", getExpensesByCategory);

export default router;
