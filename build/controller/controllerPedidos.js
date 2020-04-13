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
const pedidos = require('./../../models').Pedidos;
const globales_1 = __importDefault(require("./../utils/globales"));
/*
    FechaCreacion: 12/04/2020
    Usuario: Drios96
    Comentario: Clase controladora de pedidos.
 */
class pedidosController {
    /*
    FechaCreacion: 12/04/2020
    Usuario: Drios96
    Comentario: Este método se encarga de buscar los pedidos
    */
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = true;
            if (!token) {
                res.status(401).json({ log: "Token invalido." });
                return;
            }
            pedidos.findAll().then((data) => {
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error!! No hay datos en la base" });
                console.log(err);
                return;
            });
        });
    }
    /*
    FechaCreacion: 12/04/2020
    Usuario: Drios
    Comentario: Este método se encarga de agregar un nuevo pedido
    */
    postData(req, res) {
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
            let pedido = {
                idpedido: req.body.idpedido,
                idcompra: req.body.idcompra,
                idproducto: req.body.idproducto,
                cantidad: req.body.cantidad,
                subtotal: req.body.subtotal,
                cubiertos: req.body.cubiertos,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            pedidos.create(pedido).then((resp) => {
                if (resp._options.isNewRecord) {
                    res.status(202).json({
                        log: "Pedido ingresado con éxito",
                        uri: globales_1.default.globales.urlBasePedidos + resp.dataValues.idpedido
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
    FechaCreacion: 12/04/2020
    Usuario: Drios96
    Comentario: Este método se encarga de eliminar un pedido buscandolo en base al id proporcionado
    por la url.
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
            let token = true;
            if (!token) {
                res.status(401).json({ log: "Token invalido." });
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
    /*
    FechaCreacion: 12/04/2020
    Usuario: Drios96
    Comentario: Este método se encarga de buscar el pago en base al ID proporcionaro en la url
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
                }
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
exports.default = new pedidosController();
