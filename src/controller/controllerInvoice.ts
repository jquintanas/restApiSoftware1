import { Request, Response } from "express";
import { invoiceInterface } from "./../interfaces/invoiceInterface";
import globales from "../utils/global";
import { Security } from "../utils/security";

/** 
 * @const invoice
 * @desc Import the invoice model from the data base.
 */

const invoice = require('./../../models').Facturas;

/** 
 * @const order
 * @desc Import the order model from the data base.
 */

const order = require('./../../models').Pedidos;

/** 
 * @const purchase
 * @desc Import the purchase model from the data base.
 */

const purchase = require('./../../models').compras;

/** 
 * @const payment
 * @desc Import the payment model from the data base.
 */

const payment = require('./../../models').Pagos;
/** 
 * @const paymentMethod
 * @desc Import the paymentMethod model from the data base.
 */

const paymentMethod = require('./../../models').formasPagos;


/**
    * @classdesc Invoice controller class
    * @desc Fecha Creación: 12/04/2020
    * @class
    * @public
    * @version 1.0.0
    * @returns {invoiceController}  invoiceController
    * @author Francesca Man Ging <fman@espol.edu.ec>
    */

class invoiceController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the transaction response.
     * @desc This method will sear all the invoices by user <br> Creation Date: 25/06/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void promise
     */
    public async getInvoiceUser(req: Request, res: Response): Promise<void> {
        let dataId = res.locals;
        let id: number = dataId.post;
        console.log(id)

        invoice.findAll(
            {

                attributes: ['idfactura', 'idpedido', 'idpago'],
                include: [
                    {
                        model: order,
                        required: true,
                        attributes: ['idpedido'],
                        include: [
                            {
                                model: purchase,
                                required: true,
                                attributes: ['idcompra', 'fechacompra', 'entregaDomocilio', 'horaEntrega'],
                                where: {
                                    idusuario: id
                                }
                            }
                        ]

                    },
                    {
                        model: payment,
                        required: true,
                        attributes: ['idPago'],
                        include: [
                            {
                                model: paymentMethod,
                                required: true,
                                attributes: ['id', 'nombre', 'descripcion']
                            }
                        ]

                    }
                ]
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
     * @returns {JSON} JSON with the transaction response.
     * @desc This method will sear all the invoices <br> Creation Date: 25/06/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void promise
     */
    public async getInvoice(req: Request, res: Response): Promise<void> {

        invoice.findAll(
            {

                attributes: ['idfactura', 'idpedido', 'idpago'],
                include: [
                    {
                        model: order,
                        required: true,
                        attributes: ['idpedido'],
                        include: [
                            {
                                model: purchase,
                                required: true,
                                attributes: ['idcompra', 'fechacompra', 'entregaDomocilio', 'horaEntrega'],

                            }
                        ]

                    },
                    {
                        model: payment,
                        required: true,
                        attributes: ['idPago'],
                        include: [
                            {
                                model: paymentMethod,
                                required: true,
                                attributes: ['id', 'nombre', 'descripcion']
                            }
                        ]

                    }
                ]
            }
        ).then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No hay datos en la base", err: err });
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
     * @returns {JSON} JSON with the transaction response.
     * @desc This method will search the invoice by the ID given in the URL. <br> Fecha Creación: 12/04/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void promise
     */


    public async findByID(req: Request, res: Response): Promise<void> {
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

        invoice.findOne({
            where: {
                idfactura: id
            },
            attributes: ['idfactura', 'idpedido', 'idpago'],
        })
            .then((data: any) => {
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
     * @returns {JSON} JSON with the transaction response.
     * @desc  This method will add a new invoice after it verify the data and it's integrity. <br> Fecha Creación: 12/04/2020
     * @param {Request} req Object Request
     * @param {Response} res Object response
     * @type {Promise<void>} Void promise.
     */

    public async postData(req: Request, res: Response): Promise<void> {
        let { hash } = req.body;
        let invoice1: invoiceInterface = {
            idfactura: req.body.idfactura,
            idpedido: req.body.idpedido,
            idpago: req.body.idpago,
        };

        let hashInterno = Security.hashJSON(invoice1);
        if (hashInterno != hash) {
            res.status(401).json({ log: "Violación de integridad de datos, hash invalido.", hash, hashInterno });
            return;
        }

        invoice.create(invoice1).then((rs: any) => {
            if (rs._options.isNewRecord) {
                res.status(202).json(
                    {
                        log: "Factura ingresado con éxito",
                        uri: globales.globals.urlBaseFacturas + rs.dataValues.idfactura
                    }
                );
                return;

            } res.status(200).json(rs);
            return;
        },
            (err: any) => {
                res.status(500).json({ log: "Error, no se pudo crear la factura" });
                console.log(err);
                return;
            }
        );
    }


}

export default new invoiceController();