"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerUsuario_1 = __importDefault(require("../controller/controllerUsuario"));
class routerUsuarios {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/get", controllerUsuario_1.default.getData);
        this.router.post("/post", controllerUsuario_1.default.postData);
        this.router.get("/:id", controllerUsuario_1.default.findByID);
        this.router.delete("/:id", controllerUsuario_1.default.deleteData);
        this.router.put("/:id", controllerUsuario_1.default.updateData);
    }
}
const appRoutes = new routerUsuarios();
exports.default = appRoutes.router;
