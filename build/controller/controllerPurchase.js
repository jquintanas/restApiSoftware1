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
    getPurchaseUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataId = res.locals;
            let id = dataId.post;
            console.log('id', id);
            purchases.findAll({
                attributes: ['idcompra', 'fechacompra', 'horaEntrega'],
                where: {
                    idusuario: id
                },
            }).then((data) => {
                if (data == null) {
                    res
                        .status(404)
                        .json({ log: "No existe la compra del usuario" });
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
       * @desc This method search the Purchase <br> FechaCreacion: 25/06/2020
       * @param {Request} req Object Request
       * @param {Response} res Object response
       * @type {Promise<void>} Void Promise.
       */
    getPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            purchases.findAll({
                attributes: ['idcompra', 'idusuario', 'fechacompra', 'horaEntrega', 'createdAt'],
            }).then((data) => {
                if (data == null) {
                    res
                        .status(404)
                        .json({ log: "No hay compras" });
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
    * @desc This method search the purchase by the ID given by the URL. <br> Fecha Creación: 12/04/2020
    * @param {Request} req Objeto Request
    * @param {Response} res Objeto response
    * @type {Promise<void>} Void Promise.
    */
    findByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            if (isNaN(id)) {
                res.status(401).json({ log: "El ID introducido no es valido." });
                return;
            }
            id = Number(id);
            if (Number.isInteger(id) == false) {
                res
                    .status(401)
                    .json({ log: "El ID introducido no es valido, debe ser un entero." });
                return;
            }
            purchases.findOne({
                where: {
                    idcompra: id
                },
                attributes: ['idcompra', 'idusuario', 'fechacompra', 'idformaEntrega', 'horaEntrega'],
            }).then((data) => {
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
     * @desc  This method add the puchase fiven by the user. <br> Fecha Creación: 12/04/2020
    * @param {Request} req Object Request
    * @param {Response} res Object response
    * @type {Promise<void>} Void Promise.
    */
    postData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { hash } = req.body;
            let purchase = {
                idcompra: req.body.idcompra,
                idusuario: req.body.idusuario,
                fechacompra: new Date(),
                idformaEntrega: req.body.idformaEntrega,
                horaEntrega: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            let hashInterno = security_1.Security.hashJSON(purchase);
            purchase.createdAt = new Date();
            if (hashInterno != hash) {
                res.status(401).json({ log: "Violación de integridad de datos, hash invalido.", hash, hashInterno });
                return;
            }
            purchases.create(purchase).then((rs) => {
                if (rs._options.isNewRecord) {
                    res.status(202).json({
                        log: "Compra ingresado con éxito",
                        uri: global_1.default.globals.urlBaseCompras + rs.dataValues.idcompra
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
    deleteData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            if (isNaN(id)) {
                res.status(401).json({ log: "El ID introducido no es valido." });
                return;
            }
            id = Number(id);
            if (Number.isInteger(id) == false) {
                res.status(401).json({ log: "El ID introducido no es valido, debe ser un entero." });
                return;
            }
            purchases.destroy({ where: { idcompra: id } }).then((data) => {
                if (data == 1) {
                    res.status(200).json({ log: "Compra eliminado correctamente" });
                    return;
                }
                else {
                    res.status(404).json({ log: "No existe la compra." });
                    return;
                }
            }, (err) => {
                res.status(500).json(err);
                return;
            });
        });
    }
}
exports.default = new purchaseController();
