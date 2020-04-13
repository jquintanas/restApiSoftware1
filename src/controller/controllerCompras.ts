import { Request, Response } from "express";
const compras = require('./../../models').Compras;

  class comprasController {
      public async getData(req: Request, res: Response): Promise<void> {
        compras.findAll().then(
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
            compras
              .findOne({
                where: {
                  idcompra: id,
                },
              })
              .then(
                (data: any) => {
                  if (data == null) {
                    res
                      .status(404)
                      .json({ log: "No Existen datos a mostrar para el ID." })
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
        let compra = {
            idcompra: req.body.idcompra,
            idusuario: req.body.idusuario,
            fechacompra: new Date(),
            idformaEntrega : req.body.idformaEntrega,
            horaEntrega: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()

          };

          compras.create(compra).then(
            (rs: any) => {
            res.status(200).json(rs);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error, no se pudo crear la compra" });
            console.log(err);
            return;
        });
      }

      public async deleteData(req: Request, res: Response): Promise<void> {
        let { id } = req.params;
        compras.destroy({ where: { idcompra: id } }).then((data: any) => {
            if (data == 1) {
                res.status(200).json({ log: "Compra eliminado correctamente" });
                return;
            }
            else {
                res.status(200).json({ log: "No existe la compra." });
                return;
            }
        }, (err: any) => {
            res.status(500).json({ log: "Error!!" });
            console.log(err);
            return;
        });
    }
     
}

export default new comprasController();