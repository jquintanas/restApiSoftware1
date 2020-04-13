import { Request, Response } from "express";
const facturas = require('./../../models').facturas;

class facturasController {
    public async getData(req: Request, res: Response): Promise<void> {
      facturas.findAll().then(
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
            res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
            return;
        }
        facturas
            .findOne({
                where: {
                    idfactura: id,
                },
            })
            .then((data: any) => {
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
        let factura = {
            idfactura: req.body.idfactura,
            idpedido: req.body.idpedido,
            idpago: req.body.idpago,
          };
          facturas.create(factura).then(
              (rs: any) => {
               res.status(200).json(rs);
               return;
            }, 
            (err: any) => {
                res.status(500).json({ log: "Error, no se pudo crear la factura" });
                console.log(err);
                return;
            }
        );
      }

      
}

export default new facturasController();