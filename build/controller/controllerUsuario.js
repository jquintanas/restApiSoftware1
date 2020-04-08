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
const usuarios = require('./../../models').Usuarios;
class usuariosController {
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            usuarios.findAll().then((data) => {
                res.status(200).json(data);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error!! No hay datos en la base" });
                console.log(err);
                return;
            });
        });
    }
    postData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuario = {
                cedula: req.body.cedula,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                direccion: req.body.direccion,
                contrasenia: req.body.contrasenia,
                rol: req.body.rol,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            usuarios.create(usuario).then((rs) => {
                res.status(200).json(rs);
                return;
            }, (err) => {
                res.status(500).json({ log: "Error!! No se pudo crear el usuario" });
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
                res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
                return;
            }
            usuarios.findOne({
                where: {
                    cedula: id
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
    deleteData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            usuarios.destroy({ where: { cedula: id } }).then((data) => {
                if (data == 1) {
                    res.status(200).json({ log: "Usuario eliminado exitosamente" });
                    return;
                }
                else {
                    res.status(200).json({ log: "No existe el usuario" });
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
            console.log(id);
            let { cedula, nombre, apellido, telefono, email, direccion, contrasenia, rol, createdAt } = req.body;
            let est = {
                cedula: cedula,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                email: email,
                direccion: direccion,
                contrasenia: contrasenia,
                rol: rol,
                createdAt: createdAt,
                updatedAt: new Date()
            };
            usuarios.update(est, { where: { cedula: id } }).then((rs) => {
                if (rs[0] === 1) {
                    res.status(200).json({ log: "El usuario se actualizó." });
                    return;
                }
                else {
                    res.status(200).json({ log: "No se pudo modificar el usuario" });
                    return;
                }
            }, (err) => {
                res.status(500).json({ log: "Error del servidor" });
                console.log(err);
                return;
            });
        });
    }
}
exports.default = new usuariosController();
