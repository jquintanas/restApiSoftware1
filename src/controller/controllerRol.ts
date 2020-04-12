import { Request, Response } from "express";
const rols = require("./../../models").Rols;

class rolsController {
  public async getData(req: Request, res: Response): Promise<void> {
    rols.findAll().then(
      (data: any) => {
        res.status(200).json(data);
        return;
      },
      (err: any) => {
        res.status(500).json({ log: "Error!! No hay datos en la base" });
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
    rols
      .findOne({
        where: {
          idrol: id,
        },
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

  public async postData(req: Request, res: Response): Promise<void> {
    let rol = {
      idrol: req.body.idrol,
      createdAt: new Date(),
      updatedAt: new Date(),
      descripcion: req.body.descripcion,
    };

    rols.create(rol).then(
      (rs: any) => {
        res.status(200).json(rs);
        return;
      },
      (err: any) => {
        res.status(500).json({ log: "Error!! No se pudo crear el rol" });
        console.log(err);
        return;
      }
    );
  }

  public async deleteData(req: Request, res: Response): Promise<void> {
    let { id } = req.params;
    rols.destroy({ where: { idrol: id } }).then(
      (data: any) => {
        if (data == 1) {
          res.status(200).json({ log: "Rol eliminado exitosamente" });
          return;
        } else {
          res.status(200).json({ log: "No existe el rol" });
          return;
        }
      },
      (err: any) => {
        res.status(500).json({ log: "Error!!" });
        console.log(err);
        return;
      }
    );
  }


}

export default new rolsController();
