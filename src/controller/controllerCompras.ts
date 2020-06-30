import { Request, Response } from "express";
import { comprasInterface } from "./../interfaces/comprasInterface";
import globales from "./../utils/globales";
import { Security } from "./../utils/seguridad";
import controllerUsuario from "./controllerUsuario";

/** 
 * @const compras
 * @desc Import del modelo compras de la base de datos.
 */

const compras = require('./../../models').compras;


/**
* @classdesc Clase controladora de compras.
* @desc Fecha Creación: 12/04/2020
* @class
* @public
* @version 1.0.0
* @returns {comprasController}  comprasController
* @author Francesca Man Ging <fman@espol.edu.ec>
*/

class comprasController {

  /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar las compras por usuario<br> FechaCreacion: 25/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async getComprasUser(req: Request, res: Response): Promise<void> {   
      let dataId = res.locals; 
      let id : number = dataId.post;   
      console.log('id',id);    
      compras.findAll(
          {
              
              attributes: ['idcompra', 'fechacompra','horaEntrega'],
              where: {
                idusuario: id
              },
          }
      ).then((data: any) => {
          res.status(200).json(data);
          return;
      }, (err: any) => {
          res.status(500).json({ log: "Error!! No hay datos en la base" });
          console.log(err);
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
     * @desc Este método se encarga de buscar las compras <br> FechaCreacion: 25/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async getCompras(req: Request, res: Response): Promise<void> {       
      compras.findAll(
          {
              
              attributes: ['idcompra','idusuario', 'fechacompra','horaEntrega','createdAt'],
          }
      ).then((data: any) => {
          res.status(200).json(data);
          return;
      }, (err: any) => {
          res.status(500).json({ log: "Error!! No hay datos en la base" });
          console.log(err);
          return;
      });

  }
  

  /**
  * @async
  * @method
  * @public
  * @version 1.0.0
  * @author Francesca Man Ging <fman@espol.edu.ec>
  * @returns {JSON} JSON con los datos obtenidos de la consulta.
  * @desc Este método se encarga de buscar la compra en base al ID proporcionado en la url. <br> Fecha Creación: 12/04/2020
  * @param {Request} req Objeto Request
  * @param {Response} res Objeto response
  * @type {Promise<void>} Promesa de tipo void.
  */
  public async findByID(req: Request, res: Response): Promise<void> {
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
    compras.findOne({
        where: {
            idcompra: id
        },
        attributes: ['idcompra', 'idusuario', 'fechacompra','idformaEntrega','horaEntrega'],
      }
      ).then(
        (data: any) => {
          if (data == null) {
            res
              .status(404)
              .json({ log: "No Existen datos a mostrar para el ID." })
            return;
          }
          res.status(200).json(data);
          return;
        },
        (err: any) => {
          res.status(500).json(err);
          return;
        }
      );
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Francesca Man Ging <fman@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de agregar la compra proporcionado por el usuario. <br> Fecha Creación: 12/04/2020
  * @param {Request} req Objeto Request
  * @param {Response} res Objeto response
  * @type {Promise<void>} Promesa de tipo void.
  */
  public async postData(req: Request, res: Response): Promise<void> {
    let { hash } = req.body;
    let compra: comprasInterface = {
      idcompra: req.body.idcompra,
      idusuario: req.body.idusuario,
      fechacompra: new Date(),
      idformaEntrega: req.body.idformaEntrega,
      horaEntrega: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let hashInterno = Security.hashJSON(compra);
    compra.createdAt = new Date();
    if (hashInterno != hash) {
      res.status(401).json({ log: "Violación de integridad de datos, hash invalido.", hash, hashInterno });
      return;
    }
    compras.create(compra).then((rs: any) => {
      if (rs._options.isNewRecord) {
        res.status(202).json(
          {
            log: "Compra ingresado con éxito",
            uri: globales.globals.urlBaseCompras + rs.dataValues.idcompra
          }
        );
        return;
      }
      res.status(200).json({ log: "No se ingresaron los datos." });
      return;
    }, (err: any) => {
      res.status(500).json({ log: "Error, no se pudo crear la compra" });
      console.log(err);
      return;
    });
  }


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Francesca Man Ging <fman@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc   Este método se encarga de eliminar la compra en base al ID que se proporciona por la url. <br> Fecha Creación: 12/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */

  public async deleteData(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;
    
    if (isNaN(id)) {
      res.status(500).json({ log: "El ID introducido no es valido." });
      return;
    }
    id = Number(id);
    if (Number.isInteger(id) == false) {
      res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
      return;
    }
    
    compras.destroy({ where: { idcompra: id } }).then((data: any) => {
      if (data == 1) {
        res.status(200).json({ log: "Compra eliminado correctamente" });
        return;
      }
      else {
        res.status(200).json({ log: "No existe la compra." });
        return;
      }
    }, (err: any) => {
      res.status(500).json({ log: "Error!!" });
      console.log(err);
      return;
    });
  }

}

export default new comprasController();