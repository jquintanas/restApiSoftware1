"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let crypto = require('crypto');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
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
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
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
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
        let cade = cadena.replace(/-/gi, "/");
        let bytes = AES.decrypt(cade, clave);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
exports.Seguridad = Seguridad;
