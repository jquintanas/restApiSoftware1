import { Request, Response } from "express";
import globales from "./../utils/globales";
import { rolinterface } from "./../interfaces/rolInterface";



/** 
 * @const Rol
 * @desc Import del modelo Rol de la base de datos.
 */

const rols = require("./../../models").Rols;


/**
 * @classdesc Clase controladora de roles.
 * @desc Fecha Creación: 12/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {rolsController} rolsController
 * @author Karla Burgos <kbburgos@espol.edu.ec>
 */

class rolsController {



  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   * @returns {JSON} JSON con los datos obtenidos de la consulta.
   * @desc  Este método se encarga de buscar todas los roles. <br> Fecha Creación: 12/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */


  public async findAll(req: Request, res: Response): Promise<void> {
    rols
      .findAll({
        attributes: ["idrol", "descripcion"],
      })
      .then(
        (data: any) => {
          if (data == null) {
            res.status(404).json({ log: "No Existen datos a mostrar." });
            return;
          }
          res.status(200).json(data);
          return;
        },
        (err: any) => {
          console.log(err);
          res.status(500).json({ log: "Error" });
          return;
        }
      );
  }


  /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Karla Burgos <kbburgos@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar el rol en base al ID proporcionado en la url. <br> Fecha Creación: 12/04/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    

  public async findById(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;
    if (isNaN(id)) {
      res.status(500).json({ log: "El ID introducido no es valido." });
      return;
    }
    id = Number(id);
    if (Number.isInteger(id) == false) {
      res
        .status(500)
        .json({ log: "El ID introducido no es valido, debe ser un entero." });
      return;
    }
    rols
      .findOne({
        where: {
          idrol: id,
        },
        attributes: ["idrol", "descripcion"],
      })
      .then(
        (data: any) => {
          if (data == null) {
            res
              .status(404)
              .json({ log: "No Existen datos a mostrar para el ID." });
            return;
          }
          res.status(200).json(data);
          return;
        },
        (err: any) => {
          console.log(err);
          res.status(500).json({ log: "Error" });
          return;
        }
      );
  }



  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de agregar el rol proporcionado por el usuario posterior a verificar los datos
    y su integridad. <br> Fecha Creación: 19/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */

  public async addRol(req: Request, res: Response): Promise<void> {
    let JsonValido = true;
    if (!JsonValido) {
      res.status(401).json({ log: "Violación de integridad de datos." });
      return;
    }
    //aqui desencriptar los datos
    let data: rolinterface = {
      descripcion: req.body.descripcion,
      createdAt: new Date(),
    };
    rols.create(data).then(
      (resp: any) => {
        if (resp._options.isNewRecord) {
          res.status(202).json({
            log: "Ingresado",
            uri: globales.globales.urlBaseRol + resp.dataValues.idrol,
          });
          return;
        }
        res.status(200).json({ log: "No se ingresaron los datos." });
        return;
      },
      (err: any) => {
        res.status(500).json({ log: "Error" });
        console.log(err);
        return;
      }
    );
  }



  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc   Este método se encarga de eliminar el rol en base al ID que se proporciona por la url. <br> Fecha Creación: 12/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */

  public async deleteRol(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;
    if (isNaN(id)) {
      res.status(500).json({ log: "El ID introducido no es valido." });
      return;
    }
    id = Number(id);
    if (Number.isInteger(id) == false) {
      res
        .status(500)
        .json({ log: "El ID introducido no es valido, debe ser un entero." });
      return;
    }
    rols.destroy({ where: { idrol: id } }).then(
      (data: any) => {
        if (data == 1) {
          res.status(200).json({ log: "Eliminado" });
          return;
        } else {
          res.status(200).json({ log: "Sin datos a eliminar." });
          return;
        }
      },
      (err: any) => {
        res.status(500).json({ log: "Error" });
        console.log(err);
        return;
      }
    );
  }
}

export default new rolsController();
