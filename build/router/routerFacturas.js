"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerFacturas_1 = __importDefault(require("../controller/controllerFacturas"));
const security_1 = require("../utils/security");
/*
    FechaCreacion: 11/04/2020
    Usuario: FranManGing
    Comentario: Clase router de facturas.
 */
/**
 * @classdesc Clase router de facturas.
 * @desc Fecha Creación: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerFacturas} router
 * @author Francesca Man Ging<fman@espol.edu.ec>
 */
class routerFacturas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post]
        this.router.post("/post", security_1.Security.checkToken, controllerFacturas_1.default.postData);
        this.router.get("/fuser", security_1.Security.checkToken, controllerFacturas_1.default.getFacturasUser);
        this.router.get("/getFacturas", security_1.Security.checkToken, controllerFacturas_1.default.getFacturas);
        this.router.get("/:id", security_1.Security.checkToken, controllerFacturas_1.default.findByID);
    }
}
exports.default = new routerFacturas().router;
