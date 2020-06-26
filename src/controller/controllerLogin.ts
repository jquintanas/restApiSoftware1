import { Request, Response } from "express";
import { Seguridad } from "./../utils/seguridad";
import globales from "./../utils/globales";
const tokenList:any = {};
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

    public async login(req: Request, res: Response): Promise<void> {
        let { id, clave } = req.body;
        if (id == null || clave == null) {
            res.status(401).json({ log: "Faltan datos, ingrese usuario y clave." });
            return;
        }
        let claveDescifrada = Seguridad.desencriptar(clave);
        usuarios.findOne(
            {
                where:
                {
                    cedula: id,
                    contrasenia: clave,
                    rol: globales.globales.idRolGeneral //3
                },
                attributes: ["cedula", "nombre", "apellido", "telefono", "email", "direccion"]

            } 
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            let token = jwt.sign({ id }, globales.globales.secretToken,{expiresIn:globales.globales.tiempoToken});
            let refreshToken = jwt.sign({id},globales.globales.refreshToken,{expiresIn:globales.globales.tiempoRefreshToken});
            let response = {
                "status": "Logged in",
                "token": token
            }
            tokenList[refreshToken] = response;
           
            res.status(200).json({ data, token, refreshToken  });
            return;
        }, (err: any) => {
            console.log(err);
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
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de generar un token a partir del id y refreshtoken recibido por el usuario. <br> Fecha Creación: 22/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async token(req: Request, res: Response) : Promise<void>{
        let {id,refreshToken}= req.body;
    
        if((refreshToken) && (refreshToken in tokenList)){

            let token = jwt.sign({id}, globales.globales.secretToken,{expiresIn:globales.globales.tiempoToken});
            tokenList[refreshToken].token = token;
            res.status(200).json({ token});
        }else{
            res.status(404).json({ log: "No existe el token en la lista de tokens." });
        }
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
    public async rejectToken(req:Request, res:Response)  : Promise<void>{
        let refreshToken = req.body.refreshToken;
        if(refreshToken in tokenList){
            delete tokenList[refreshToken]
        }
        res.status(200).json({ log: "token eliminado"});
    }

}


export default new loginController();