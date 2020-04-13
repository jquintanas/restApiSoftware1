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
const compras = require('./../../models').compras;
class comprasController {
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            compras.findAll().then((data) => {
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error!! No hay datos en la base" });
                console.log(err);
                return;
            });
        });
    }
    findByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            if (isNaN(id)) {
                res.status(500).json({ log: "El ID introducido no es valido." });
                return;
            }
            id = Number(id);
            if (Number.isInteger(id) == false) {
                res
                    .status(500)
                    .json({ log: "El ID introducido no es valido, debe ser un entero." });
                return;
            }
            compras
                .findOne({
                where: {
                    idcompra: id,
                },
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
    postData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let compra = {
                idcompra: req.body.idcompra,
                idusuario: req.body.idusuario,
                fechacompra: new Date(),
                idformaEntrega: req.body.idformaEntrega,
                horaEntrega: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            compras.create(compra).then((rs) => {
                res.status(200).json(rs);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error, no se pudo crear la compra" });
                console.log(err);
                return;
            });
        });
    }
    deleteData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            compras.destroy({ where: { idcompra: id } }).then((data) => {
                if (data == 1) {
                    res.status(200).json({ log: "Compra eliminado correctamente" });
                    return;
                }
                else {
                    res.status(200).json({ log: "No existe la compra." });
                    return;
                }
            }, (err) => {
                res.status(500).json({ log: "Error!!" });
                console.log(err);
                return;
            });
        });
    }
}
exports.default = new comprasController();
