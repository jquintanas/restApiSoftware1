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
const seguridad_1 = require("./../utils/seguridad");
const globales_1 = __importDefault(require("./../utils/globales"));
const tokenList = {};
const usuarios = require('./../../models').Usuarios;
const jwt = require("jsonwebtoken");
/**
 * @classdesc Clase controladora de Login.
 * @desc Fecha Creación: 19/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {novedadController} novedadController
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class loginController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar el usuario en base a las credenciales proporcionadas y devuelve los datos de este junto con el token de sesión. <br> Fecha Creación: 19/04/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, clave } = req.body;
            if (id == null || clave == null) {
                res.status(401).json({ log: "Faltan datos, ingrese usuario y clave." });
                return;
            }
            let claveDescifrada = seguridad_1.Seguridad.desencriptar(clave);
            usuarios.findOne({
                where: {
                    cedula: id,
                    contrasenia: clave,
                    rol: globales_1.default.globales.idRolGeneral //3
                },
                attributes: ["cedula", "nombre", "apellido", "telefono", "email", "direccion"]
            }).then((data) => {
                if (data == null) {
                    res.status(404).json({ log: "No Existen datos a mostrar para el ID." });
                    return;
                }
                let token = jwt.sign({ id }, globales_1.default.globales.secretToken, { expiresIn: globales_1.default.globales.tiempoToken });
                let refreshToken = jwt.sign({ id }, globales_1.default.globales.refreshToken, { expiresIn: globales_1.default.globales.tiempoRefreshToken });
                let response = {
                    "status": "Logged in",
                    "token": token
                };
                tokenList[refreshToken] = response;
                res.status(200).json({ data, token, refreshToken });
                return;
            }, (err) => {
                console.log(err);
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
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de generar un token a partir del id y refreshtoken recibido por el usuario. <br> Fecha Creación: 22/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    token(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, refreshToken } = req.body;
            if ((refreshToken) && (refreshToken in tokenList)) {
                let token = jwt.sign({ id }, globales_1.default.globales.secretToken, { expiresIn: globales_1.default.globales.tiempoToken });
                tokenList[refreshToken].token = token;
                res.status(200).json({ token });
            }
            else {
                res.status(404).json({ log: "No existe el token en la lista de tokens." });
            }
        });
    }
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga eliminar el token existente en la lista de tokens cuando el usuario cierra sesión. <br> Fecha Creación: 22/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    rejectToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let refreshToken = req.body.refreshToken;
            if (refreshToken in tokenList) {
                delete tokenList[refreshToken];
            }
            res.status(200).json({ log: "token eliminado" });
        });
    }
}
exports.default = new loginController();
