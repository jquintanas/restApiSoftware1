let crypto = require('crypto');
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



import global from "./global"
/**
 * @classdesc Container class of api security functions.
 * @desc Creation Date: 04/13/2020
 * @class
 * @public
 * @version 1.0.0
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */

export class Security {
  
    /**
     * @static
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {String} Hash sha256 of the entered JSON.
     * @desc This method is in charge of generating the sha256 hash of the JSON that is entered as an argument, proceeds to loop through it and store it as a string to later generate the respective hash. <br> Creation Date: 04/13/2020
     * @param {Any} json JSON to calculate the hash.
     */
    static hashJSON(json: any) {
        let data: string = "";
        for (let pass in json) {
            if (json.hasOwnProperty(pass)) {
                data += pass + ":" + json[pass] + ","
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
     * @returns {String} Encrypted string.
     * @desc It generates an AES encryption of the entered string for its later return and additional processing, we proceed to replace the incompatible characters to be sent in the URL. <br> Creation Date: 04/13/2020
     * @param {String} cadena string to encrypt.
     */
    public static encrypt(cadena: string) {
        let pass = global.globals.secretEncryp;
        //.toString().replace(/\//gi, "-")
        return AES.encrypt(cadena, pass).toString();
    }

    /**
     * @static
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {String} Decrypted string.
     * @desc Decrypts the string that is entered as an argument to transform it into plain text after its processing and regression to the normal AES because the string enters replaced with some characters. <br> Creation Date: 04/13/2020
     * @param {String} cadena string to decrypt.
     */
    public static decrypt(cadena: string) {
        let pass = global.globals.secretEncryp;
        let subString = cadena.replace(/-/gi, "/");
        let bytes = AES.decrypt(subString, pass);
        return bytes.toString(CryptoJS.enc.Utf8);
    }



    /**
     * @static
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @desc middleware function to verify the validity of the sent session token.
     */
    public static checkToken(req: any, res: any, next: any) {
        let bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            let bearer = bearerHeader.split(" ");
            let bearerToken = bearer[1];
            jwt.verify(bearerToken, global.globals.secretToken, (err: any, data: any) => {
                if (err) {
                    res.status(401).json({ error:'El token no es válido'})
                } else {
                    let dataId = data['id'];
                    res.locals.post = dataId;
                    next();
                    return;
                }
            });
        } else {
            res.status(403).json({ log: "No existe el token de sesión." });
        }

    }

    /**
     * @static
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Ríos <dprios@espol.edu.ec>
     * @desc funtion to convert password to 256-bit (32-byte) hash value.
     * @param {String} password string to generate the sha256.
     */
    public static hashPassword(password: string) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }
}