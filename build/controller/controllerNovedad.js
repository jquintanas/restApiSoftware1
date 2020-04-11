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
const globales_1 = __importDefault(require("./../utils/globales"));
const novedad = require("./../../models").Novedads;
/*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Clase controladora de novedades.
 */
class novedadController {
    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar la novedad en base al ID proporcionado en la url
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
            let token = true;
            if (!token) {
                res.status(401).json({ log: "Token invalido." });
                return;
            }
            novedad.findOne({
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
    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar la novedad en base al usuario que fue reportado proporcionado en la url
    */
    findByReportado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { reportado } = req.params;
            let token = true;
            if (!token) {
                res.status(401).json({ log: "Token invalido." });
                return;
            }
            novedad.findAll({
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
    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar las novedades en base al usuario que reporta proporcionado en la url
    */
    findByReporta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { reporta } = req.params;
            let token = true;
            if (!token) {
                res.status(401).json({ log: "Token invalido." });
                return;
            }
            novedad.findAll({
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
    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de buscar todas las novedades
    */
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = true;
            if (!token) {
                res.status(401).json({ log: "Token invalido." });
                return;
            }
            novedad.findAll({
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
    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de agregar la novedad proporcionada por el usuario posterior a verificar los datos
    y su integridad.
    */
    addNovedad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = true;
            if (!token) {
                res.status(401).json({ log: "Token invalido." });
                return;
            }
            let JsonValido = true;
            if (!JsonValido) {
                res.status(401).json({ log: "Violación de integridad de datos." });
                return;
            }
            //aqui desencriptar los datos
            let data = {
                descripcion: req.body.descripcion,
                idusuarioReporta: req.body.idusuarioReporta,
                idusuarioReportado: req.body.idusuarioReportado,
                createdAt: new Date()
            };
            novedad.create(data).then((resp) => {
                if (resp._options.isNewRecord) {
                    res.status(202).json({
                        log: "Ingresado",
                        uri: globales_1.default.globales.urlBaseNovedad + resp.dataValues.idnovedad
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
    /*
    FechaCreacion: 11/04/2020
    Usuario: JQuintana
    Comentario: Este método se encarga de modificar la novedad proporcionada por el usuario, solo se actualiza la descripcion.
    */
    updateNovedad(req, res) {
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
            let token = true;
            if (!token) {
                res.status(401).json({ log: "Token invalido." });
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
            novedad.update(data, {
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
exports.default = new novedadController();
