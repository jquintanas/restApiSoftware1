import { Request, Response } from "express";
import { Security } from "../utils/security";
import global from "../utils/global";
const tokenList: any = {};
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

    public async login(req: Request, res: Response): Promise<void> {
        let { email, clave } = req.body;
        if (email == null || clave == null) {
            res.status(400).json({ log: "Faltan datos, ingrese usuario y clave." });
            return;
        }
        let hashClave = Security.hashPassword(clave);
        user.findOne(
            {
                where:
                {
                    email: email,
                    contrasenia: hashClave,
                    rol: global.globals.idGeneralRole 
                },
                attributes: ["cedula", "nombre", "apellido", "telefono", "email", "direccion"]

            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            data.telefono = Security.decrypt(data.telefono);
            data.direccion = Security.decrypt(data.direccion);
            let id = data.cedula;
            let token = jwt.sign({id} , global.globals.secretToken, { expiresIn: global.globals.lifetimeToken });
            let refreshToken = jwt.sign( {id}, global.globals.refreshToken, { expiresIn: global.globals.lifetimeRefreshToken });
            let response = {
                "user": id,
                "status": "loggin",
                "token": token
            }
            tokenList[refreshToken] = response;
            console.log("tokenlist: ",tokenList);
            res.status(200).json({ data, token, refreshToken });
            return;
        }, (err: any) => {
           
            res.status(500).json({ log: "Error" });
            return;
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
    public async generateToken(req: Request, res: Response): Promise<void> {
        let { id, refreshToken } = req.body;
        console.log(id);
        if ((refreshToken) && (refreshToken in tokenList)) {

            let token = jwt.sign({ id }, global.globals.secretToken, { expiresIn: global.globals.lifetimeToken });
            let newRefreshToken = jwt.sign( {id}, global.globals.refreshToken, { expiresIn: global.globals.lifetimeRefreshToken });
            delete tokenList[refreshToken];           
            let response = {
                "user": id,
                "status": "loggin",
                "token": token
            }
            tokenList[newRefreshToken] = response;
            
            res.status(200).json({ token,newRefreshToken});
            return;
        } else {
            res.status(404).json({ log: "No existe el token en la lista de tokens." });
            return;
        }
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
    public async rejectToken(req: Request, res: Response): Promise<void> {
        let refreshToken = req.body.refreshToken;
        if (refreshToken in tokenList) {
            delete tokenList[refreshToken]
            console.log("lista de tokens: ",tokenList);
            res.status(200).json({ log: "token eliminado" });
            return;
        }else{
            res.status(404).json({ log: "no existe el token" });
            return;
        }      
        
    }

}


export default new loginController();