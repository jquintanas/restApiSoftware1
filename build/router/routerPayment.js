"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerPayment_1 = __importDefault(require("../controller/controllerPayment"));
const security_1 = require("./../utils/security");
/**
* @classdesc Payment router class.
* @desc Creation Date: 04/11/2020
* @class
* @public
* @version 1.0.0
* @returns {routerPayments} router
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class routerPayments {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        this.router.get("/:id", controllerPayment_1.default.findByID);
        this.router.post("/", security_1.Security.checkToken, controllerPayment_1.default.addPayment);
        this.router.delete("/:id", security_1.Security.checkToken, controllerPayment_1.default.deletePayment);
    }
}
exports.default = new routerPayments().router;
