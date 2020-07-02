"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerUsuario_1 = __importDefault(require("../controller/controllerUsuario"));
const security_1 = require("../utils/security");
class routerUsuarios {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        //this.router.get("/", Seguridad.verificarToken, usuarioController.findAll);
        this.router.get("/:id", security_1.Security.checkToken, controllerUsuario_1.default.findByID);
        this.router.post("/", security_1.Security.checkToken, controllerUsuario_1.default.addUsuario);
        this.router.delete("/:id", security_1.Security.checkToken, controllerUsuario_1.default.deleteUsuario);
        this.router.put("/:id/:reporta/:reportado", security_1.Security.checkToken, controllerUsuario_1.default.updateUsuario);
    }
}
const appRoutes = new routerUsuarios();
exports.default = appRoutes.router;
