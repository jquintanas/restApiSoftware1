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
 * @const Novedad
 * @desc Import of the model New from the database.
 */
const novelty = require("./../../models").Novedads;
/**
 * @classdesc Novelty controlling class.
 * @desc Creation Date: 04/11/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {alertController} noveltyController
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class alertController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method is responsible for searching for news according to the user <br> CreationDate: 06/25/2020
     * @param {Request} req Object Request
     * @param {Response} res Object Response
     * @type {Promise<void>} Void type promise.
     */
    getAlertsUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dataId = res.locals;
            let id = dataId.post;
            novelty.findAll({
                attributes: ['idnovedad', 'idusuarioReportado', 'descripcion', 'createdAt'],
                where: {
                    idusuarioReporta: id
                },
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
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method is in charge of searching for news <br> Creation Date: 06/25/2020
     * @param {Request} req Object Request
     * @param {Response} res Object Response
     * @type {Promise<void>} Void type promise.
     */
    getAlerts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            novelty.findAll({
                attributes: ['idnovedad', 'idusuarioReporta', 'idusuarioReportado', 'descripcion', 'createdAt', 'updatedAt'],
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
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method is in charge of searching for the novelty based on the ID provided in the url. <br> Creation Date: 04/11/2020
     * @param {Request} req Object Request
     * @param {Response} res Object Response
     * @type {Promise<void>} Void type promise.
     */
    findById(req, res) {
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
            novelty.findOne({
                where: {
                    idnovedad: id
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }).then((data) => {
                if (data == null) {
                    res.status(404).json({ log: "No Existen datos a mostrar para el ID." });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error" });
                return;
            });
        });
    }
    /**
    * @async
    * @method
    * @public
    * @version 1.0.0
    * @author Jonathan Quintana <jiquinta@espol.edu.ec>
    * @returns {JSON} JSON with the data obtained from the query.
    * @desc This method is in charge of searching the news based on the user that was reported provided in the url. <br> Creation Date: 04/11/2020
    * @param {Request} req Object Request
    * @param {Response} res Object Response
    * @type {Promise<void>} Void type promise.
    */
    findByReported(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { reportado } = req.params;
            novelty.findAll({
                where: {
                    idUsuarioreportado: reportado
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }).then((data) => {
                if (data.length == 0) {
                    res.status(404).json({ log: "No Existen datos a mostrar para el ID." });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error" });
                return;
            });
        });
    }
    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc  This method is in charge of looking for news based on the user who reports provided in the url. <br> Creation Date: 04/11/2020
   * @param {Request} req Object Request
   * @param {Response} res Object Response
   * @type {Promise<void>} Void type promise.
   */
    findByReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { reporta } = req.params;
            novelty.findAll({
                where: {
                    idUsuarioreporta: reporta
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }).then((data) => {
                if (data.length == 0) {
                    res.status(404).json({ log: "No Existen datos a mostrar para el ID." });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error" });
                return;
            });
        });
    }
    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc  This method is responsible for finding all the news. <br> Creation Date: 04/11/2020
   * @param {Request} req Object Request
   * @param {Response} res Object Response
   * @type {Promise<void>} Void type promise.
   */
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            novelty.findAll({
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }).then((data) => {
                if (data == null) {
                    res.status(404).json({ log: "No Existen datos a mostrar." });
                    return;
                }
                res.status(200).json(data);
                return;
            }, (err) => {
                console.log(err);
                res.status(500).json({ log: "Error" });
                return;
            });
        });
    }
    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JThey are with the response of the transaction.
   * @desc  This method is responsible for adding the novelty provided by the user after verifying the data
     and its integrity. <br> Creation Date: 04/11/2020
   * @param {Request} req Object Request
   * @param {Response} res Object Response
   * @type {Promise<void>} Void type promise.
   */
    addAlerts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { hash } = req.body;
            //aqui desencriptar los datos
            let data = {
                descripcion: req.body.descripcion,
                idusuarioReporta: req.body.idusuarioReporta,
                idusuarioReportado: req.body.idusuarioReportado
            };
            let hashInterno = security_1.Security.hashJSON(data);
            if (hashInterno != hash) {
                res.status(401).json({ log: "Violación de integridad de datos, hash invalido." });
                return;
            }
            novelty.create(data).then((resp) => {
                if (resp._options.isNewRecord) {
                    res.status(202).json({
                        log: "Ingresado",
                        uri: global_1.default.globals.urlNoveltyBase + resp.dataValues.idnovedad
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
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON with the transaction response.
   * @desc This method is responsible for modifying the novelty provided by the user, only the description is updated. <br> Creation Date: 04/11/2020
   * @param {Request} req Object Request
   * @param {Response} res Object Response
   * @type {Promise<void>} Void type promise.
   */
    updateAlerts(req, res) {
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
            let { descripcion } = req.body;
            let { reportado, reporta } = req.params;
            let data = {
                descripcion: descripcion,
                idusuarioReporta: reporta,
                idusuarioReportado: reportado,
                updatedAt: new Date()
            };
            novelty.update(data, {
                where: {
                    idnovedad: id
                }
            }).then((rs) => {
                if (rs[0] == 1) {
                    res.status(200).json({ log: "Novedad actualizada." });
                    return;
                }
                res.status(202).json({ log: "No se pudo actualizar." });
                return;
            }, (err) => {
                console.error(err);
                res.status(500).json({ log: "Error" });
                return;
            });
        });
    }
}
exports.default = new alertController();
