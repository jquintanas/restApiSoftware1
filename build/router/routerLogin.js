"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerLogin_1 = __importDefault(require("../controller/controllerLogin"));
/*
    FechaCreacion: 19/04/2020
    Usuario: JQuintana
    Comentario: Clase router de login.
 */
/**
* @classdesc Clase router de login.
* @desc Fecha Creación: 19/04/2020
* @class
* @public
* @version 1.0.0
* @returns {routerPagos} router
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class routerLogin {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[post]
        this.router.get("/usuario", controllerLogin_1.default.findByID);
    }
}
exports.default = new routerLogin().router;
