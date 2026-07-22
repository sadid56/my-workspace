import { Router } from "express";
import { KeywordController } from "./keyword.controller";

const router = Router();

router.get("/", KeywordController.getKeywords);
router.post("/", KeywordController.createKeyword);
router.get("/:id", KeywordController.getKeywordById);
router.put("/:id", KeywordController.updateKeyword);
router.delete("/:id", KeywordController.deleteKeyword);

export default router;
