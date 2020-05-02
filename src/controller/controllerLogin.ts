import { Request, Response } from "express";
import { Seguridad } from "./../utils/seguridad";
import globales from "./../utils/globales";
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
    public async findByID(req: Request, res: Response): Promise<void> {
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
                    rol: globales.globales.idRolGeneral
                },
                attributes: ["cedula", "nombre", "apellido", "telefono", "email", "direccion"]

            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            let opcionesToken = {
                expiresIn: 3600
            }
            let token = jwt.sign({ id }, globales.globales.secretToken,opcionesToken);
            res.status(200).json({ data, token });
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        });
    }

}

export default new loginController();