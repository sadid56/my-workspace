"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDevice = parseDevice;
const ua_parser_js_1 = require("ua-parser-js");
function parseDevice(userAgent) {
    const parser = new ua_parser_js_1.UAParser(userAgent || "");
    return {
        device: parser.getDevice().type ?? "desktop",
        os: parser.getOS().name,
        browser: parser.getBrowser().name,
    };
}
