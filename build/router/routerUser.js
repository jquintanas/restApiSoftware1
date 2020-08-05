"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerUser_1 = __importDefault(require("../controller/controllerUser"));
const security_1 = require("../utils/security");
/**
 * @classdesc User router class.
 * @desc Creation Date: 04/11/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerUser} router
 * @author Karla B. Burgos Gayrey <kbburgos@espol.edu.ec>
 */
class routerUser {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]
        //this.router.get("/", Seguridad.verificarToken, userController.findAll);
        this.router.get("/:id", security_1.Security.checkToken, controllerUser_1.default.findByID);
        this.router.get("/", security_1.Security.checkToken, controllerUser_1.default.getUsers);
        this.router.post("/", security_1.Security.checkToken, controllerUser_1.default.addUser);
        this.router.delete("/:id", security_1.Security.checkToken, controllerUser_1.default.deleteUser);
        this.router.put("/update/:id", security_1.Security.checkToken, controllerUser_1.default.updateUsuario);
    }
}
const appRoutes = new routerUser();
exports.default = appRoutes.router;
