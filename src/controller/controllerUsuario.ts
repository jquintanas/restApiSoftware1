import { Request, Response } from "express";
import globales from "./../utils/globales";
import { usuariointerface } from "./../interfaces/usuarioInterface";
const rols = require("./../../models").rols;
import { Security } from "./../utils/seguridad";

/**
 * @const Usuarios
 * @desc Import del modelo Usuario de la base de datos.
 */

const usuarios = require("./../../models").Usuarios;

/**
 * @classdesc Clase controladora de usuarios.
 * @desc Fecha Creación: 12/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {usuariosController} usuariosController
 * @author Karla Burgos <kbburgos@espol.edu.ec>
 */

class usuariosController {
  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de agregar el usuario proporcionado por el usuario posterior a verificar los datos
    y su integridad. <br> Fecha Creación: 19/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */

  public async addUsuario(req: Request, res: Response): Promise<void> {
    let {hash}  =  req.body;
    
    //aqui desencriptar los datos
    let data: usuariointerface = {
      cedula: req.body.cedula,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      email: req.body.email,
      contrasenia: req.body.contrasenia,
      rol: req.body.rol,
      direccion: req.body.direccion
    };
    let hashInterno = Security.hashJSON(data);
    //aqui se debe desencriptar el hash
    data.createdAt = new Date();
    if (hashInterno != hash) {
      res
        .status(401)
        .json({log: "Violación de integridad de datos, hash invalido."});
      return;
    }

    usuarios.create(data).then(
      (resp: any) => {
        if (resp._options.isNewRecord) {
          res.status(202).json({
            log: "Ingresado",
            uri: globales.globals.urlBaseUsuario + resp.dataValues.cedula,
          });
          return;
        }
        res.status(200).json({ log: "No se ingresaron los datos." });
        return;
      },
      (err: any) => {
        res.status(500).json({ log: "Error", error: err.original.code });
        console.log(err);
        return;
      }
    );
  }

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   * @returns {JSON} JSON con los datos obtenidos de la consulta.
   * @desc Este método se encarga de buscar el usuario en base a la cedula proporcionado en la url. <br> Fecha Creación: 12/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */

  public async findByID(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;
   
    if (isNaN(id)) {
      
      res.status(500).json({ log: "La cédula introducida no es valido." });
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

  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc   Este método se encarga de eliminar el usuario en base a la cedula que se proporciona por la url. <br> Fecha Creación: 12/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */

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


  /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Karla Burgos <kbburgos@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de modificar el usuario proporcionada por el cliente, se actualizan todos los datos. <br> Fecha Creación: 19/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */

  public async updateUsuario(req: Request, res: Response): Promise<void> {
    let id: any = req.params.id;
    if (isNaN(id)) {
      res.status(500).json({ log: "La cédula ingresada no es valida." });
      return;
    }
    id = String(id);
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
      updatedAt: new Date(),
    };
    let hashInterno = Security.hashJSON(data);
    //aqui se debe desencriptar el hash
    //data.createdAt = new Date();
    if (hashInterno != hash) {
      res
        .status(401)
        .json({ log: "Violación de integridad de datos, hash invalido." });
      return;
    }

    usuarios
      .update(data, {
        where: {
          cedula: id,
        },
      })
      .then(
        (resp: any) => {
          if (resp[0] == 1) {
            res.status(200).json({ log: "Usuario actualizado." });
            return;
          }
          res.status(202).json({ log: "No se pudo actualizar." });
          return;
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
