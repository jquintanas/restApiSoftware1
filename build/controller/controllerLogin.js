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
    findByID(req, res) {
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
                    rol: globales_1.default.globales.idRolGeneral
                },
                attributes: ["cedula", "nombre", "apellido", "telefono", "email", "direccion"]
            }).then((data) => {
                if (data == null) {
                    res.status(404).json({ log: "No Existen datos a mostrar para el ID." });
                    return;
                }
                let opcionesToken = {
                    expiresIn: 3600
                };
                let token = jwt.sign({ id }, globales_1.default.globales.secretToken, opcionesToken);
                res.status(200).json({ data, token });
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error" });
                return;
            });
        });
    }
}
exports.default = new loginController();
