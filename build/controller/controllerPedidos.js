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
let pedidos = db.pedidos;
class pedidosController {
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            pedidos.findAll().then((data) => {
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
            let ped = {
                idcompra: req.body.idcompra,
                idproducto: req.body.idproducto,
                cantidad: req.body.cantidad,
                subtotal: req.body.subtotal,
                cubiertos: req.body.cubiertos,
                createdAt: new Date()
            };
            pedidos.create(ped).then((rs) => {
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
            pedidos.destroy({ where: { idpedido: id } }).then((data) => {
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
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //codigo aquí
            res.send("token recibido");
        });
    }
    json(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //codigo aquí
            res.status(500).json({ log: "mensaje" });
        });
    }
}
exports.default = new pedidosController();
