import { Request, Response } from "express";
import { purchaseInterface } from "./../interfaces/purchaseInterface";
import globales from "../utils/global";
import { Security } from "../utils/security";

/** 
 * @const purchase
 * @desc Import Purchase model from data base.
 */

const purchases = require('./../../models').compras;


/**
* @classdesc  Purchase controller class.
* @desc Fecha Creación: 12/04/2020
* @class
* @public
* @version 1.0.0
* @returns {purhcaseController}  purchaseController
* @author Francesca Man Ging <fman@espol.edu.ec>
*/

class purchaseController {

  /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the transaction response.
     * @desc This method search all the purchases by user<br> Creation Date: 25/06/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void Promise.
     */
    public async getPurchaseUser(req: Request, res: Response): Promise<void> {   
      let dataId = res.locals; 
      let id : number = dataId.post;  
      if (isNaN(id)) {
        res.status(400).json({ log: "La cédula ingresada no es valida." });
        return;
      } 
      console.log('id',id);    
      purchases.findAll(
          {
              
              attributes: ['idcompra', 'fechacompra','horaEntrega'],
              where: {
                idusuario: id
              },
          }
      ).then((data: any) => {
          if (data == null) {
            res
              .status(404)
              .json({ log: "No existe la compra del usuario" });
            return;
          }
          res.status(200).json(data);
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
     * @author Francesca Man Ging <fman@espol.edu.ec>
     * @returns {JSON} JSON with the transaction response.
     * @desc This method search the Purchase <br> FechaCreacion: 25/06/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void Promise.
     */
  public async getPurchase(req: Request, res: Response): Promise<void> {
    purchases.findAll(
      {

        attributes: ['idcompra', 'idusuario', 'fechacompra', 'horaEntrega', 'createdAt'],
      }
    ).then((data: any) => {
      res.status(200).json(data);
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
  * @author Francesca Man Ging <fman@espol.edu.ec>
  * @returns {JSON} JSON with the transaction response.
  * @desc This method search the purchase by the ID given by the URL. <br> Fecha Creación: 12/04/2020
  * @param {Request} req Objeto Request
  * @param {Response} res Objeto response
  * @type {Promise<void>} Void Promise.
  */
  public async findByID(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ log: "El ID introducido no es valido." });
      return;
    }
    id = Number(id);
    if (Number.isInteger(id) == false) {
      res
        .status(400)
        .json({ log: "El ID introducido no es valido, debe ser un entero." });
      return;
    }
    purchases.findOne({
      where: {
        idcompra: id
      },
      attributes: ['idcompra', 'idusuario', 'fechacompra', 'idformaEntrega', 'horaEntrega'],
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
   * @author Francesca Man Ging <fman@espol.edu.ec>
   * @returns {JSON} JSON with the transaction response.
   * @desc  This method add the puchase fiven by the user. <br> Fecha Creación: 12/04/2020
  * @param {Request} req Object Request
  * @param {Response} res Object response
  * @type {Promise<void>} Void Promise.
  */
  public async postData(req: Request, res: Response): Promise<void> {
    let { hash } = req.body;
    let purchase: purchaseInterface = {
      idcompra: req.body.idcompra,
      idusuario: req.body.idusuario,
      fechacompra: new Date(),
      idformaEntrega: req.body.idformaEntrega,
      horaEntrega: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let hashInterno = Security.hashJSON(purchase);
    purchase.createdAt = new Date();
    if (hashInterno != hash) {
      res.status(401).json({ log: "Violación de integridad de datos, hash invalido.", hash, hashInterno });
      return;
    }
    purchases.create(purchase).then((rs: any) => {
      if (rs._options.isNewRecord) {
        res.status(202).json(
          {
            log: "Compra ingresado con éxito",
            uri: globales.globals.urlBaseCompras + rs.dataValues.idcompra
          }
        );
        return;
      }
      res.status(401).json({ log: "No se ingresaron los datos." });
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
   * @author Francesca Man Ging <fman@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  This method eliminate de purchase by de ID given by the URL.  <br> Fecha Creación: 12/04/2020
   * @param {Request} req Object Request
   * @param {Response} res Object response
   * @type {Promise<void>} Void Promise.
   */

  public async deleteData(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ log: "El ID introducido no es valido." });
      return;
    }
    id = Number(id);
    if (Number.isInteger(id) == false) {
      res.status(400).json({ log: "El ID introducido no es valido, debe ser un entero." });
      return;
    }

    purchases.destroy({ where: { idcompra: id } }).then((data: any) => {
      if (data == 1) {
        res.status(200).json({ log: "Compra eliminado correctamente" });
        return;
      }
      else {
        res.status(404).json({ log: "No existe la compra." });
        return;
      }
    }, (err: any) => {
      res.status(500).json({ log: "Error" });
      return;
    });
  }

}

export default new purchaseController();