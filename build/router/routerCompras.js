"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllerCompras_1 = __importDefault(require("../controller/controllerCompras"));
class routerCompras {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.[post]
        this.router.post("/post", controllerCompras_1.default.postData);
        this.router.post("/:id", controllerCompras_1.default.findByID);
        this.router.post("/get", controllerCompras_1.default.getData);
        this.router.post("/:id", controllerCompras_1.default.deleteData);
    }
}
exports.default = new routerCompras().router;
