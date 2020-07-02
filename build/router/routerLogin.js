"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerLogin_1 = __importDefault(require("../controller/controllerLogin"));
/**
* @classdesc Login router class.
* @desc Creation Date: 04/19/2020
* @class
* @public
* @version 1.0.0
* @returns {routerLogin} router
* @author Jonathan Quintana <jiquinta@espol.edu.ec>
*/
class routerLogin {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[post]
        this.router.post("/usuario", controllerLogin_1.default.login);
        this.router.post("/token", controllerLogin_1.default.generateToken);
        this.router.post("/reject", controllerLogin_1.default.rejectToken);
    }
}
exports.default = new routerLogin().router;
