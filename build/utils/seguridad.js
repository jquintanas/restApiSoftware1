"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let crypto = require('crypto');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
class Seguridad {
    static hashJSON(json) {
        let data = "";
        for (let clave in json) {
            if (json.hasOwnProperty(clave)) {
                data += clave + ":" + json[clave] + ",";
            }
        }
        return crypto.createHash('sha256').update(data).digest('hex');
    }
    static cifrar(tipo, cadena) {
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
        let retorno = "";
        if (tipo == 1) {
            retorno = AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
        }
        else {
            let cade = cadena.replace(/-/gi, "/");
            let bytes = AES.decrypt(cade, clave);
            retorno = bytes.toString(CryptoJS.enc.Utf8);
        }
        return retorno;
    }
    static encriptar(cadena) {
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
        return AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
    }
    static desencriptar(cadena) {
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
        let cade = cadena.replace(/-/gi, "/");
        let bytes = AES.decrypt(cade, clave);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
exports.Seguridad = Seguridad;
