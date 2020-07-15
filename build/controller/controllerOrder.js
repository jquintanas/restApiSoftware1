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
    getOrdersUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataId = res.locals;
            let id = dataId.post;
            pedidos.findAll({
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
            }).then((data) => {
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error!! No hay datos en la base" });
                console.log(err);
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
     * @desc This method will sear all the orders <br> Creation Date: 25/06/2020
     * @param {Request} req Request Object
     * @param {Response} res Response Object
     * @type {Promise<void>} Void Promise.
     */
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            pedidos.findAll({
                attributes: ['idpedido', 'idcompra', 'idproducto', 'cantidad', 'subtotal', 'cubiertos'],
                include: [
                    {
                        model: compras,
                        required: true,
                        attributes: ['entregaDomocilio', 'horaEntrega'],
                    }
                ]
            }).then((data) => {
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error!! No hay datos en la base" });
                console.log(err);
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
   * @desc  This method will add a new order after it verify the data and it's integrity. <br> Creation Date: 01/04/2020
   * @param {Request} req Request Object
   * @param {Response} res Response Object
   * @type {Promise<void>}  Void Promise.
   */
    postData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { hash } = req.body;
            let pedido = {
                idpedido: req.body.idpedido,
                idcompra: req.body.idcompra,
                idproducto: req.body.idproducto,
                cantidad: req.body.cantidad,
                subtotal: req.body.subtotal,
                cubiertos: req.body.cubiertos
            };
            let hashInterno = security_1.Security.hashJSON(pedido);
            pedido.createdAt = new Date();
            if (hashInterno != hash) {
                res.status(401).json({ log: "Violación de integridad de datos, hash invalido." });
                return;
            }
            pedidos.create(pedido).then((resp) => {
                if (resp._options.isNewRecord) {
                    res.status(202).json({
                        log: "Pedido ingresado con éxito",
                        uri: global_1.default.globals.urlBasePedidos + resp.dataValues.idpedido
                    });
                    return;
                }
                res.status(200).json({ log: "No se ingresaron los datos." });
                return;
            }, (err) => {
                res.status(500).json({ log: "Error" });
                console.log(err);
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
    * @desc  This method is responsible for deleting a order method based on the ID that is provided by the url. <br> Creation Date: 01/04/2020
    * @param {Request} req Request Object
    * @param {Response} res Response Object
    * @type {Promise<void>} Void Promise.
    */
    deleteData(req, res) {
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
            pedidos.destroy({ where: { idpedido: id } }).then((data) => {
                if (data == 1) {
                    res.status(200).json({ log: "Pedido eliminado correctamente" });
                    return;
                }
                else {
                    res.status(200).json({ log: "No existe el pedido que desea eliminar." });
                    return;
                }
            }, (err) => {
                res.status(500).json({ log: "Error!!" });
                console.log(err);
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
   * @desc  This method find a order that match with the ID in the url. The search is performed in the database. <br> Creation Date: 01/04/2020
   * @param {Request} req Request Object
   * @param {Response} res Response Object
   * @type {Promise<void>} Void Promise.
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
            pedidos.findOne({
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
            }).then((data) => {
                if (data == null) {
                    res.status(404).json({ log: "No Existen datos a mostrar para el ID." });
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
}
exports.default = new orderController();
