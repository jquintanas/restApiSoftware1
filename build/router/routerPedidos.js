"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerPedidos_1 = __importDefault(require("../controller/controllerPedidos"));
const seguridad_1 = require("./../utils/seguridad");
/**
 * @classdesc Clase router de pedidos.
 * @desc Fecha Creación: 01/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerPedidos} router
 * @author Danny Ríos <dprios@espol.edu.ec>
 */
class routerPedidos {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]     
        //this.router.get("/get", Seguridad.verificarToken,pedidosController.getData);
        this.router.get("/:id", seguridad_1.Seguridad.verificarToken, controllerPedidos_1.default.findByID);
        this.router.post("/post", seguridad_1.Seguridad.verificarToken, controllerPedidos_1.default.postData);
        this.router.delete("/:id", seguridad_1.Seguridad.verificarToken, controllerPedidos_1.default.deleteData);
    }
}
const appRoutes = new routerPedidos();
exports.default = appRoutes.router;
