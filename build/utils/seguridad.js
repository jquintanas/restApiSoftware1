"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seguridad = void 0;
let crypto = require('crypto');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const globales_1 = __importDefault(require("./globales"));
/**
 * @classdesc Clase contenedora de las funciones de seguridad del api.
 * @desc Fecha Creación: 13/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class Seguridad {
    /**
     * @static
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {String} Hash sha256 del JSON ingresado.
     * @desc Este método se encarga de generar el hash sha256 del JSON que se ingresa como argumento, se procede a recorrer el mismo y almacenarlo como un string para posterior generar el hash respectivo. <br> Fecha Creación: 13/04/2020
     * @param {Any} json JSON a calcular el hash.
     */
    static hashJSON(json) {
        let data = "";
        for (let clave in json) {
            if (json.hasOwnProperty(clave)) {
                data += clave + ":" + json[clave] + ",";
            }
        }
        return crypto.createHash('sha256').update(data).digest('hex');
    }
    /**
     * @static
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {String} Cadena cifrada.
     * @desc Genera un cifrado AES de la cadena introducida para su posterior retorno y procesamiento adicional se procede a reemplazar los caracteres incompatibles para poder ser enviados en la URL.<br> Fecha Creación: 13/04/2020
     * @param {String} cadena cadena a encriptar.
     */
    static encriptar(cadena) {
        let clave = globales_1.default.globales.secretEncryp;
        return AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
    }
    /**
     * @static
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {String} Cadena descifrada.
     * @desc Descifra la cadena que se introduce como argumento para transformarla a texto plano luego de su procesamiento y regresión al AES normal debido a que la cadena ingresa reemplazada con algunos caracteres.<br> Fecha Creación: 13/04/2020
     * @param {String} cadena cadena a desencriptar.
     */
    static desencriptar(cadena) {
        let clave = globales_1.default.globales.secretEncryp;
        let cade = cadena.replace(/-/gi, "/");
        let bytes = AES.decrypt(cade, clave);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    /**
     * @static
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @desc función middleware para verificar la valides del token de sesión enviado.
     */
    static verificarToken(req, res, next) {
        let bearerHeader = req.headers["authorization"];
        console.log(bearerHeader);
        if (typeof bearerHeader !== 'undefined') {
            let bearer = bearerHeader.split(" ");
            let bearerToken = bearer[1];
            jwt.verify(bearerToken, globales_1.default.globales.secretToken, (err, data) => {
                if (err) {
                    res.status(403).json({ log: "No tiene permiso para ver el recurso." });
                }
                else {
                    //console.log(data);
                    next();
                    return;
                }
            });
            //res.status(403).json({log: "No tiene permiso para ver el recurso."})
        }
        else {
            res.status(403).json({ log: "No existe el token de sesión." });
        }
    }
}
exports.Seguridad = Seguridad;
