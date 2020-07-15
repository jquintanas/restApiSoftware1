"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerInvoice_1 = __importDefault(require("../controller/controllerInvoice"));
const security_1 = require("../utils/security");
/**
 * @classdesc Router class for invoice.
 * @desc Creation date: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerInvoice} router
 * @author Francesca Man Ging<fman@espol.edu.ec>
 */
class routerInvoice {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post]
        this.router.post("/post", security_1.Security.checkToken, controllerInvoice_1.default.postData);
        this.router.get("/fuser", security_1.Security.checkToken, controllerInvoice_1.default.getInvoiceUser);
        this.router.get("/getFacturas", security_1.Security.checkToken, controllerInvoice_1.default.getInvoice);
        this.router.get("/:id", security_1.Security.checkToken, controllerInvoice_1.default.findByID);
    }
}
exports.default = new routerInvoice().router;
