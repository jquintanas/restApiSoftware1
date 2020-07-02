"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerNovedad_1 = __importDefault(require("./../controller/controllerNovedad"));
const security_1 = require("../utils/security");
/**
* @classdesc Novelty router class.
* @desc Creation Date: 04/11/2020
* @class
* @public
* @version 1.0.0
* @returns {routerPagos} router
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class routerAlerts {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/nusuario", security_1.Security.checkToken, controllerNovedad_1.default.getAlertsUser);
        this.router.get("/novedades", security_1.Security.checkToken, controllerNovedad_1.default.getAlerts);
        this.router.get("/:id", security_1.Security.checkToken, controllerNovedad_1.default.findById);
        this.router.get("/reportado/:reportado", security_1.Security.checkToken, controllerNovedad_1.default.findByReported);
        this.router.get("/reporta/:reporta", security_1.Security.checkToken, controllerNovedad_1.default.findByReports);
        this.router.get("/", security_1.Security.checkToken, controllerNovedad_1.default.findAll);
        this.router.post("/", security_1.Security.checkToken, controllerNovedad_1.default.addAlerts);
        this.router.put("/:id/:reporta/:reportado", security_1.Security.checkToken, controllerNovedad_1.default.updateAlerts);
    }
}
exports.default = new routerAlerts().router;
