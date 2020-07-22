import { Request, Response } from "express";
const pagos = require("./../../models").Pagos;
const formasPagos = require("./../../models").formasPagos;
import { PaymentInterface } from "../interfaces/paymentInterface";
import globales from "../utils/global";
import { Security } from "../utils/security";

/**
 * @classdesc Payment controller class.
 * @desc Creation Date: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {PaymentController} PaymentController
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class PaymentController {
  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON with the transaction response.
   * @desc This method find a payment that match with the ID in the url. The search is performed in the database. <br> Creation Date: 11/04/2020
   * @param {Request} req Request Object
   * @param {Response} res Response Object
   * @type {Promise<void>} Promesa de tipo void.
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
    pagos
      .findOne({
        where: {
          idpago: id,
        },
        attributes: ["idPago", "idformaPago", "total", "imagen"],
        include: [
          {
            model: formasPagos,
            required: true,
            attributes: ["id", "nombre", "descripcion"],
          },
        ],
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
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON with the transaction response.
   * @desc   This method adds the data of the payment made by the user, the integrity of the same must be validated, when the data is successfully entered the pertinent message is returned and the url of the resource. <br> Creation Date: 11/04/2020
   * @param {Request} req Request Object
   * @param {Response} res Response Object
   * @type {Promise<void>} Void Promise.
   */
  public async addPayment(req: Request, res: Response): Promise<void> {
    let { hash } = req.body;
    let data: PaymentInterface = {
      idformaPago: req.body.idformaPago,
      imagen: req.body.imagen,
      total: req.body.total,
    };
    let hashInterno = Security.hashJSON(data);
    data.createdAt = new Date();
    if (hashInterno != hash) {
      res
        .status(401)
        .json({ log: "Violación de integridad de datos, hash invalido." });
      return;
    }
    pagos.create(data).then(
      (resp: any) => {
        if (resp._options.isNewRecord) {
          res.status(202).json({
            log: "Ingresado",
            uri: globales.globals.urlPaymentBase + resp.dataValues.idPago,
          });
          return;
        }
        res.status(404).json({ log: "No se ingresaron los datos." });
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
  * @author Jonathan Quintana <jiquinta@espol.edu.ec>
  * @returns {JSON} JSON with the transaction response.
  * @desc   This method is responsible for deleting a payment method based on the ID that is provided by the url. <br> Creation Date: 11/04/2020
  * @param {Request} req Request Object
  * @param {Response} res Response Object
  * @type {Promise<void>} Void Promise.
  */
  public async deletePayment(req: Request, res: Response): Promise<void> {
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
    pagos.destroy({ where: { idPago: id } }).then(
      (data: any) => {
        if (data == 1) {
          res.status(200).json({ log: "Eliminado" });
          return;
        } else {
          res.status(404).json({ log: "Sin datos a eliminar." });
          return;
        }
      },
      (err: any) => {
        res.status(500).json(err);
        return;
      }
    );
  }
}

export default new PaymentController();
