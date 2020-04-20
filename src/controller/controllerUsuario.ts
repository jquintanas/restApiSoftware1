import { Request, Response } from "express";
import globales from "./../utils/globales";
import { usuariointerface } from "./../interfaces/usuarioInterface";
const rols = require("./../../models").rols;
import { Seguridad } from "./../utils/seguridad";

const seguridad_1 = require("./../utils/seguridad");

const usuarios = require("./../../models").Usuarios;

class usuariosController {
  public async addUsuario(req: Request, res: Response): Promise<void> {
    let token = true;
    if (!token) {
      res.status(401).json({ log: "Token invalido." });
      return;
    }
    let { hash } = req.body;
    //aqui desencriptar los datos
    let data: usuariointerface = {
      cedula: req.body.cedula,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      email: req.body.email,
      direccion: req.body.direccion,
      contrasenia: req.body.contrasenia,
      rol: req.body.rol,
    };
    let hashInterno = Seguridad.hashJSON(data);
    //aqui se debe desencriptar el hash
    data.createdAt = new Date();
    if (hashInterno != hash) {
      res
        .status(401)
        .json({ log: "Violación de integridad de datos, hash invalido." });
      return;
    }

    usuarios.create(data).then(
      (resp: any) => {
        if (resp._options.isNewRecord) {
          res.status(202).json({
            log: "Ingresado",
            uri: globales.globales.urlBaseUsuario + resp.dataValues.cedula,
          });
          return;
        }
        res.status(200).json({ log: "No se ingresaron los datos." });
        return;
      },
      (err: any) => {
        res.status(500).json({ log: "Error" });
        console.log(err);
        return;
      }
    );
  }

  public async findByID(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;
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
    usuarios
      .findOne({
        where: {
          cedula: id,
        },
        attributes: ["cedula", "nombre", "apellido", "direccion", "rol"],
        include: [
          {
            model: rols,
            required: true,
            attributes: ["idrol"],
          },
        ],
      })
      .then(
        (data: any) => {
          if (data == null) {
            res
              .status(404)
              .json({ log: "No Existen datos a mostrar para el ID." });
            return;
          }
          res.status(200).json(data);
          return;
        },
        (err: any) => {
          res.status(500).json(err);
          return;
        }
      );
  }

  public async deleteUsuario(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;
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
    usuarios.destroy({ where: { cedula: id } }).then(
      (data: any) => {
        if (data == 1) {
          res.status(200).json({ log: "Eliminado" });
          return;
        } else {
          res.status(200).json({ log: "Sin datos a eliminar." });
          return;
        }
      },
      (err: any) => {
        res.status(500).json({ log: "Error" });
        console.log(err);
        return;
      }
    );
  }

  }
export default new usuariosController();
