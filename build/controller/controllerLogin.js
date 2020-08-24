"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const security_1 = require("../utils/security");
const global_1 = __importDefault(require("../utils/global"));
const tokenList = {};
const user = require('./../../models').Usuarios;
const jwt = require("jsonwebtoken");
/**
 * @classdesc Login controller class.
 * @desc Creation Date: 04/19/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {loginController} loginController
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class loginController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method is responsible for searching the user based on the provided credentials and returns the user's data along with the session token. <br> Creation Date: 04/19/2020
     * @param {Request} req Object Request
     * @param {Response} res Object Response
     * @type {Promise<void>} Void type promise.
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, clave } = req.body;
            if (email == null || clave == null) {
                res.status(400).json({ log: "Faltan datos, ingrese usuario y clave." });
                return;
            }
            let hashClave = security_1.Security.hashPassword(clave);
            user.findOne({
                where: {
                    email: email,
                    contrasenia: hashClave,
                    rol: global_1.default.globals.idGeneralRole
                },
                attributes: ["cedula", "nombre", "apellido", "telefono", "email", "direccion"]
            }).then((data) => {
                if (data == null) {
                    res.status(404).json({ log: "No Existen datos a mostrar para el ID." });
                    return;
                }
                data.telefono = security_1.Security.decrypt(data.telefono);
                data.direccion = security_1.Security.decrypt(data.direccion);
                let id = data.cedula;
                let token = jwt.sign({ id }, global_1.default.globals.secretToken, { expiresIn: global_1.default.globals.lifetimeToken });
                let refreshToken = jwt.sign({ id }, global_1.default.globals.refreshToken, { expiresIn: global_1.default.globals.lifetimeRefreshToken });
                let response = {
                    "user": id,
                    "status": "loggin",
                    "token": token
                };
                tokenList[refreshToken] = response;
                console.log("tokenlist: ", tokenList);
                res.status(200).json({ data, token, refreshToken });
                return;
            }, (err) => {
                res.status(500).json({ log: "Error" });
                return;
            });
        });
    }
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method is in charge of generating a token from the id and refreshtoken received by the user. <br> Creation Date: 06/22/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void type promise.
     */
    generateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, refreshToken } = req.body;
            console.log(id);
            if ((refreshToken) && (refreshToken in tokenList)) {
                let token = jwt.sign({ id }, global_1.default.globals.secretToken, { expiresIn: global_1.default.globals.lifetimeToken });
                let newRefreshToken = jwt.sign({ id }, global_1.default.globals.refreshToken, { expiresIn: global_1.default.globals.lifetimeRefreshToken });
                delete tokenList[refreshToken];
                let response = {
                    "user": id,
                    "status": "loggin",
                    "token": token
                };
                tokenList[newRefreshToken] = response;
                res.status(200).json({ token, newRefreshToken });
                return;
            }
            else {
                res.status(404).json({ log: "No existe el token en la lista de tokens." });
                return;
            }
        });
    }
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method takes care of removing the existing token in the token list when the user logs out. <br> Creation Date: 06/22/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void type promise.
     */
    rejectToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let refreshToken = req.body.refreshToken;
            if (refreshToken in tokenList) {
                delete tokenList[refreshToken];
                console.log("lista de tokens: ", tokenList);
                res.status(200).json({ log: "token eliminado" });
                return;
            }
            else {
                res.status(404).json({ log: "no existe el token" });
                return;
            }
        });
    }
}
exports.default = new loginController();
