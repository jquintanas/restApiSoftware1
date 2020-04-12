"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerRol_1 = __importDefault(require("../controller/controllerRol"));
class routerRol {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/get", controllerRol_1.default.getData);
        this.router.get("/:id", controllerRol_1.default.findByID);
        this.router.post("/post", controllerRol_1.default.postData);
        this.router.delete("/:id", controllerRol_1.default.deleteData);
    }
}
exports.default = new routerRol().router;
