"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const keyword_controller_1 = require("./keyword.controller");
const _middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
const createKeywordSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Keyword title is required" }).min(1),
    }),
});
const updateKeywordSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Keyword ID is required in params" }),
    }),
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Keyword title is required" }).min(1),
        slug: zod_1.z.string().optional(),
    }),
});
const keywordIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Keyword ID is required in params" }),
    }),
});
router.get("/", keyword_controller_1.KeywordController.getKeywords);
router.post("/", _middlewares_1.requireAdmin, (0, _middlewares_1.validate)(createKeywordSchema), keyword_controller_1.KeywordController.createKeyword);
router.get("/:id", (0, _middlewares_1.validate)(keywordIdSchema), keyword_controller_1.KeywordController.getKeywordById);
router.put("/:id", _middlewares_1.requireAdmin, (0, _middlewares_1.validate)(updateKeywordSchema), keyword_controller_1.KeywordController.updateKeyword);
router.delete("/:id", _middlewares_1.requireAdmin, (0, _middlewares_1.validate)(keywordIdSchema), keyword_controller_1.KeywordController.deleteKeyword);
exports.default = router;
