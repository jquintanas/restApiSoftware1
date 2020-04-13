let crypto = require('crypto');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
export class Seguridad {
    static hashJSON(json: any) {
        let data: string = "";
        for (let clave in json) {
            if (json.hasOwnProperty(clave)) {
                data += clave + ":" + json[clave] + ","
            }
        }
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    public static cifrar(tipo: number, cadena: String): String {
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a"
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

    public static encriptar(cadena:string){
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
        return AES.encrypt(cadena, clave).toString().replace(/\//gi, "-");
    }

    public static desencriptar(cadena: string) {
        let clave = "71bec6b99ebd7fbd65d44410eeaf17852de12204f176635b200c17986534d8cfbbab73a34baf7f91f567b90f76d74d61ab6e30f097ed4f49f24d11581527b89a";
        let cade = cadena.replace(/-/gi, "/");
        let bytes = AES.decrypt(cade, clave);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}