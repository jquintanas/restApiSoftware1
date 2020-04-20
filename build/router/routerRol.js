"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerRol_1 = __importDefault(require("../controller/controllerRol"));
const seguridad_1 = require("./../utils/seguridad");
<<<<<<< HEAD
=======



/**
* @classdesc Clase router de Rol.
* @desc Fecha Creación: 12/04/2020
* @class
* @public
* @version 1.0.0
* @returns {routerPagos} router
* @author Karla Burgos <kbburgos@espol.edu.ec>
*/

>>>>>>> f38fda86ff289dbdb7f19d75b64d546c92eae436
class routerRol {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/", seguridad_1.Seguridad.verificarToken, controllerRol_1.default.findAll);
        this.router.get("/:id", seguridad_1.Seguridad.verificarToken, controllerRol_1.default.findById);
        this.router.post("/", seguridad_1.Seguridad.verificarToken, controllerRol_1.default.addRol);
        this.router.delete("/:id", seguridad_1.Seguridad.verificarToken, controllerRol_1.default.deleteRol);
    }
}
exports.default = new routerRol().router;
