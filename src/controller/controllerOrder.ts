import { Request, Response } from "express";
import { ordersInterface } from "../interfaces/ordersInterface";
import global from "../utils/global";
import { Security } from "../utils/security";
/** 
 * @const {Orders} 
 * @desc Import Order model from data base.
 */
const pedidos = require('./../../models').Pedidos;
/** 
 * @const {Purchases} 
 * @desc Import Purchase model from data base.
 */
const compras = require('./../../models').compras;

/**
 * @classdesc Order controller class.
 * @desc FechaCreacion: 01/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {orderController} orderController
 * @author Danny Rios <dprios@espol.edu.ec>
 */
class orderController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the transaction response.
     * @desc This method search all the orders by user<br> Creation Date: 25/06/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void Promise.
     */
    public async getOrdersUser(req: Request, res: Response): Promise<void> {
        let dataId = res.locals;
        let id: number = dataId.post;


        pedidos.findAll(
            {

                attributes: ['idpedido', 'idcompra', 'idproducto', 'cantidad', 'subtotal', 'cubiertos'],
                include: [
                    {
                        model: compras,
                        required: true,
                        attributes: ['entregaDomocilio', 'horaEntrega'],
                        where: {
                            idusuario: id
                        },
                    }
                ]
            }
        ).then((data: any) => {
            if (data == null) {
                res
                  .status(404)
                  .json({ log: "No hay pedidos" });
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
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the transaction response.
     * @desc This method will sear all the orders <br> Creation Date: 25/06/2020
     * @param {Request} req Request Object
     * @param {Response} res Response Object
     * @type {Promise<void>} Void Promise.
     */
    public async getOrders(req: Request, res: Response): Promise<void> {
        pedidos.findAll(
            {

                attributes: ['idpedido', 'idcompra', 'idproducto', 'cantidad', 'subtotal', 'cubiertos'],
                include: [
                    {
                        model: compras,
                        required: true,
                        attributes: ['entregaDomocilio', 'horaEntrega'],
                    }
                ]
            }
        ).then((data: any) => {
            if (data == null) {
                res
                  .status(404)
                  .json({ log: "No existe el pedido" });
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
   * @author Danny Rios <dprios@espol.edu.ec>
   * @returns {JSON} JSON with the transaction response.
   * @desc  This method will add a new order after it verify the data and it's integrity. <br> Creation Date: 01/04/2020
   * @param {Request} req Request Object
   * @param {Response} res Response Object
   * @type {Promise<void>}  Void Promise.
   */
    public async postData(req: Request, res: Response): Promise<void> {
        let { hash } = req.body;
        let pedido: ordersInterface = {
            idpedido: req.body.idpedido,
            idcompra: req.body.idcompra,
            idproducto: req.body.idproducto,
            cantidad: req.body.cantidad,
            subtotal: req.body.subtotal,
            cubiertos: req.body.cubiertos
        }

        let hashInterno = Security.hashJSON(pedido);
        pedido.createdAt = new Date();
        if (hashInterno != hash) {
            res.status(401).json({ log: "Violación de integridad de datos, hash invalido." });
            return;
        }
        pedidos.create(pedido).then((resp: any) => {
            if (resp._options.isNewRecord) {
                res.status(202).json(
                    {
                        log: "Pedido ingresado con éxito",
                        uri: global.globals.urlBasePedidos + resp.dataValues.idpedido
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
    * @author Danny Rios <dprios@espol.edu.ec>
    * @returns {JSON} JSON with the transaction response.
    * @desc  This method is responsible for deleting a order method based on the ID that is provided by the url. <br> Creation Date: 01/04/2020
    * @param {Request} req Request Object
    * @param {Response} res Response Object
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
        pedidos.destroy({ where: { idpedido: id } }).then((data: any) => {
            if (data == 1) {
                res.status(200).json({ log: "Pedido eliminado correctamente" });
                return;
            }
            else {
                res.status(404).json({ log: "No existe el pedido que desea eliminar." });
                return;
            }
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
   * @returns {JSON} JSON with the transaction response.
   * @desc  This method find a order that match with the ID in the url. The search is performed in the database. <br> Creation Date: 01/04/2020
   * @param {Request} req Request Object
   * @param {Response} res Response Object
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
            res.status(400).json({ log: "El ID introducido no es valido, debe ser un entero." });
            return;
        }

        pedidos.findOne(
            {
                where: {
                    idpedido: id
                },
                attributes: ['idpedido', 'idcompra', 'idproducto', 'cantidad', 'subtotal', 'cubiertos'],
                include: [
                    {
                        model: compras,
                        required: true,
                        attributes: ['idcompra', 'fechacompra', 'entregaDomocilio', 'horaEntrega']
                    }
                ]


            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error" });
            return;
        }
        );
    }
}
export default new orderController();
