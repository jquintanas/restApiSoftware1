"use strict";
/*
  Fcreación: 30/03/2020
  Fmodificación: 01/04/2020
  Ucreación: Danny
  Umodificación: Danny
  Comentarios: se cambiaron las rutas de get y post
  */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerPedidos_1 = __importDefault(require("../controller/controllerPedidos"));
class routerPedidos {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/pedidos", controllerPedidos_1.default.index);
        this.router.post("/pedidos", controllerPedidos_1.default.json);
        this.router.get("/pedidos/getData", controllerPedidos_1.default.getData);
        this.router.post("/pedidos/postData", controllerPedidos_1.default.postData);
        this.router.delete("/pedidos/deleteData/:id", controllerPedidos_1.default.deleteData);
    }
}
const appRoutes = new routerPedidos();
exports.default = appRoutes.router;
