"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerCompras_1 = __importDefault(require("../controller/controllerCompras"));
const security_1 = require("../utils/security");
/*
    FechaCreacion: 11/04/2020
    Usuario: FranManGing
    Comentario: Clase router de compras.
 */
/**
 * @classdesc Clase router de compras.
 * @desc Fecha Creación: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerCompras} router
 * @author Francesca Man Ging<fman@espol.edu.ec>
 */
class routerCompras {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[post]
        this.router.post("/post", security_1.Security.checkToken, controllerCompras_1.default.postData);
        this.router.get("/cuser", security_1.Security.checkToken, controllerCompras_1.default.getComprasUser);
        this.router.get("/getCompras", security_1.Security.checkToken, controllerCompras_1.default.getCompras);
        this.router.get("/:id", security_1.Security.checkToken, controllerCompras_1.default.findByID);
        this.router.delete("/:id", security_1.Security.checkToken, controllerCompras_1.default.deleteData);
    }
}
exports.default = new routerCompras().router;
