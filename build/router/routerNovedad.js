"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerNovedad_1 = __importDefault(require("./../controller/controllerNovedad"));
/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase router de pago.
 */
class routerNovedad {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/:id", controllerNovedad_1.default.findById);
        this.router.get("/reportado/:reportado", controllerNovedad_1.default.findByReportado);
        this.router.get("/reporta/:reporta", controllerNovedad_1.default.findByReporta);
        this.router.get("/", controllerNovedad_1.default.findAll);
        this.router.post("/", controllerNovedad_1.default.addNovedad);
        this.router.put("/:id/:reporta/:reportado", controllerNovedad_1.default.updateNovedad);
    }
}
exports.default = new routerNovedad().router;
