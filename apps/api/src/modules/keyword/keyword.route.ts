import { Router } from "express";
import { z } from "zod";
import { KeywordController } from "./keyword.controller";
import { validate, requireAdmin } from "@middlewares";

const router = Router();

const createKeywordSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Keyword title is required" }).min(1),
  }),
});

const updateKeywordSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Keyword ID is required in params" }),
  }),
  body: z.object({
    title: z.string({ required_error: "Keyword title is required" }).min(1),
    slug: z.string().optional(),
  }),
});

const keywordIdSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Keyword ID is required in params" }),
  }),
});

router.get("/", KeywordController.getKeywords);
router.post("/", requireAdmin, validate(createKeywordSchema), KeywordController.createKeyword);
router.get("/:id", validate(keywordIdSchema), KeywordController.getKeywordById);
router.put("/:id", requireAdmin, validate(updateKeywordSchema), KeywordController.updateKeyword);
router.delete("/:id", requireAdmin, validate(keywordIdSchema), KeywordController.deleteKeyword);

export default router;

