"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerDefault_1 = __importDefault(require("../controller/controllerDefault"));
class routerDefault {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/", controllerDefault_1.default.index);
        this.router.post("/", controllerDefault_1.default.json);
        this.router.get("/getData", controllerDefault_1.default.getData);
        this.router.post("/postData", controllerDefault_1.default.postData);
        this.router.delete("/deleteData/:id", controllerDefault_1.default.deleteData);
        this.router.put("/updateData/:id", controllerDefault_1.default.updateData);
    }
}
const appRoutes = new routerDefault();
exports.default = appRoutes.router;
