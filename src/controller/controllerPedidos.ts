import { Request, Response } from "express";
const pedidos = require('./../../models').Pedidos;

class pedidosController {
    public async getData(req: Request, res: Response): Promise<void> {
        pedidos.findAll().then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No hay datos en la base" });
            console.log(err);
            return;
        });

    }
    public async postData(req: Request, res: Response): Promise<void> {
        let pedido = {
            idpedido: req.body.idpedido,
            idcompra: req.body.idcompra,
            idproducto: req.body.idproducto,
            cantidad: req.body.cantidad,
            subtotal: req.body.subtotal,
            cubiertos: req.body.cubiertos,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        pedidos.create(pedido).then((rs: any) => {
            res.status(200).json(rs);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!!" });
            console.log(err);
            return;
        });
    }

    public async deleteData(req: Request, res: Response): Promise<void> {
        let { id } = req.params;
        pedidos.destroy({ where: { idpedido: id } }).then((data: any) => {
            if (data == 1) {
                res.status(200).json({ log: "Pedido eliminado correctamente" });
                return;
            }
            else {
                res.status(200).json({ log: "No existe el pedido." });
                return;
            }
        }, (err: any) => {
            res.status(500).json({ log: "Error!!" });
            console.log(err);
            return;
        });
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
        pedidos.findOne(
            {
                where: {
                    idpedido: id
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
export default new pedidosController();
