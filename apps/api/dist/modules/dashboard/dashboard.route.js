"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const _middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
router.use(_middlewares_1.requireAdmin);
router.get("/stats", dashboard_controller_1.DashboardController.getStats);
exports.default = router;
