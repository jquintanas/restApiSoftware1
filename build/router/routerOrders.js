"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerOrder_1 = __importDefault(require("../controller/controllerOrder"));
const security_1 = require("../utils/security");
/**
 * @classdesc Order router class.
 * @desc Creation Date: 01/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {routerOrder} router
 * @author Danny Ríos <dprios@espol.edu.ec>
 */
class routerOrder {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[get | post | put | delete]     
        this.router.get("/user", security_1.Security.checkToken, controllerOrder_1.default.getOrdersUser);
        this.router.get("/getAll", security_1.Security.checkToken, controllerOrder_1.default.getOrders);
        this.router.get("/:id", security_1.Security.checkToken, controllerOrder_1.default.findByID);
        this.router.post("/post", security_1.Security.checkToken, controllerOrder_1.default.postData);
        this.router.put("/put", security_1.Security.checkToken, controllerOrder_1.default.updateOrder);
        this.router.delete("/:id", security_1.Security.checkToken, controllerOrder_1.default.deleteData);
    }
}
const appRoutes = new routerOrder();
exports.default = appRoutes.router;
