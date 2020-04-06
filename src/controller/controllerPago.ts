import { Request, Response } from "express";
const pagos = require('./../../models').Pagos;
class pagosController {

    /*
    FechaCreacion: 06/04/2020
    Usuario: JQuintana
    Comentario: Este metodo se encarga de buscar el pago en base al ID proporcionaro en la url
    */
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
        pagos.findOne(
            {
                where: {
                    idpago: id
                }
            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json(err);
            return;
        }
        );
    }

}

export default new pagosController();