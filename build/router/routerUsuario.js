"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerUsuario_1 = __importDefault(require("../controller/controllerUsuario"));
const seguridad_1 = require("./../utils/seguridad");
class routerUsuarios {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        //this.router.get("/", Seguridad.verificarToken, usuarioController.findAll);
        this.router.get("/:id", seguridad_1.Seguridad.verificarToken, controllerUsuario_1.default.findByID);
        this.router.post("/", seguridad_1.Seguridad.verificarToken, controllerUsuario_1.default.addUsuario);
        this.router.delete("/:id", seguridad_1.Seguridad.verificarToken, controllerUsuario_1.default.deleteUsuario);
        this.router.put("/:id/:reporta/:reportado", seguridad_1.Seguridad.verificarToken, controllerUsuario_1.default.updateUsuario);
    }
}
const appRoutes = new routerUsuarios();
exports.default = appRoutes.router;
