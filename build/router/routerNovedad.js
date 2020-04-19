"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerNovedad_1 = __importDefault(require("./../controller/controllerNovedad"));
const seguridad_1 = require("./../utils/seguridad");
/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase router de pnovedadago.
 */
/**
* @classdesc Clase router de novedad.
* @desc Fecha Creación: 11/04/2020
* @class
* @public
* @version 1.0.0
* @returns {routerPagos} router
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class routerNovedad {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/:id", seguridad_1.Seguridad.verificarToken, controllerNovedad_1.default.findById);
        this.router.get("/reportado/:reportado", seguridad_1.Seguridad.verificarToken, controllerNovedad_1.default.findByReportado);
        this.router.get("/reporta/:reporta", seguridad_1.Seguridad.verificarToken, controllerNovedad_1.default.findByReporta);
        this.router.get("/", seguridad_1.Seguridad.verificarToken, controllerNovedad_1.default.findAll);
        this.router.post("/", seguridad_1.Seguridad.verificarToken, controllerNovedad_1.default.addNovedad);
        this.router.put("/:id/:reporta/:reportado", seguridad_1.Seguridad.verificarToken, controllerNovedad_1.default.updateNovedad);
    }
}
exports.default = new routerNovedad().router;
