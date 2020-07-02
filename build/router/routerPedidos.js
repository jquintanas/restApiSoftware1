"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerPedidos_1 = __importDefault(require("../controller/controllerPedidos"));
const security_1 = require("../utils/security");
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
        this.router.get("/user", security_1.Security.checkToken, controllerPedidos_1.default.getPedidosUser);
        this.router.get("/getAll", controllerPedidos_1.default.getPedidos);
        this.router.get("/:id", security_1.Security.checkToken, controllerPedidos_1.default.findByID);
        this.router.post("/post", security_1.Security.checkToken, controllerPedidos_1.default.postData);
        this.router.delete("/:id", security_1.Security.checkToken, controllerPedidos_1.default.deleteData);
    }
}
const appRoutes = new routerPedidos();
exports.default = appRoutes.router;
