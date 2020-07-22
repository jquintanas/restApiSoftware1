"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("../utils/global"));
const security_1 = require("../utils/security");
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
    getInvoiceUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataId = res.locals;
            let id = dataId.post;
            console.log(id);
            invoice.findAll({
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
            }).then((data) => {
                if (data == null) {
                    res
                        .status(404)
                        .json({ log: "No existe las facturas del usuario" });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json(err);
                return;
            });
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
    getInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            invoice.findAll({
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
            }).then((data) => {
                if (data == null) {
                    res
                        .status(404)
                        .json({ log: "No hay facturas" });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json(err);
                return;
            });
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
    findByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
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
                .then((data) => {
                if (data == null) {
                    res
                        .status(404)
                        .json({ log: "No Existen datos a mostrar para el ID." });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json(err);
                return;
            });
        });
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
    postData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { hash } = req.body;
            let invoice1 = {
                idfactura: req.body.idfactura,
                idpedido: req.body.idpedido,
                idpago: req.body.idpago,
            };
            let hashInterno = security_1.Security.hashJSON(invoice1);
            if (hashInterno != hash) {
                res.status(401).json({ log: "Violación de integridad de datos, hash invalido.", hash, hashInterno });
                return;
            }
            invoice.create(invoice1).then((rs) => {
                if (rs._options.isNewRecord) {
                    res.status(202).json({
                        log: "Factura ingresado con éxito",
                        uri: global_1.default.globals.urlBaseFacturas + rs.dataValues.idfactura
                    });
                    return;
                }
                res.status(401).json({ log: "No se ingresaron los datos." });
                return;
            }, (err) => {
                res.status(500).json(err);
                return;
            });
        });
    }
}
exports.default = new invoiceController();
