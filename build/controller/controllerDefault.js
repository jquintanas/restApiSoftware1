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
Object.defineProperty(exports, "__esModule", { value: true });
let db = require('./../../models');
let estudiantes = db.estudiantes;
/**
 * Clase controladora del router default
 * @class
 */
class defaultController {
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            estudiantes.findAll().then((data) => {
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error!!" });
                console.log(err);
                return;
            });
        });
    }
    postData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let est = {
                matricula: req.body.matricula,
                nombre: req.body.nombre,
                semestre: req.body.semestre
            };
            estudiantes.create(est).then((rs) => {
                res.status(200).json(rs);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error!!" });
                console.log(err);
                return;
            });
        });
    }
    deleteData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            estudiantes.destroy({ where: { matricula: id } }).then((data) => {
                if (data == 1) {
                    res.status(200).json({ log: "Exito!!!!" });
                    return;
                }
                else {
                    res.status(200).json({ log: "Sin datos a eliminar." });
                    return;
                }
            }, (err) => {
                res.status(500).json({ log: "Error!!" });
                console.log(err);
                return;
            });
        });
    }
    updateData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let { matricula, nombre, semestre } = req.body;
            let est = {
                matricula: matricula,
                nombre: nombre,
                semestre: semestre,
                updatedAt: new Date()
            };
            estudiantes.update(est, { where: { matricula: id } }).then((rs) => {
                if (rs[0] === 1) {
                    res.status(200).json({ log: "El usuario se actualizo." });
                    return;
                }
            }, (err) => {
                res.status(500).json({ log: "Error del servidor" });
                console.log(err);
                return;
            });
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //codigo aquí
            res.send("token");
        });
    }
    json(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //codigo aquí
            res.json({ log: "mensaje" });
        });
    }
}
exports.default = new defaultController();
