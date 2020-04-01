/*
  Fcreación: 30/03/2020
  Fmodificación: 01/04/2020
  Ucreación: Danny
  Umodificación: Danny 
  Comentarios: se argego un mensaje en el async get para verificar si detectaba el requerimiento
  */
import { Request, Response } from "express";
let db = require('./../../models');
let pedidos = db.pedidos;
class pedidosController {
    public async getData(req: Request, res: Response): Promise<void> {
        pedidos.findAll().then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!!" });
            console.log(err);
            return;
        });

    }
    public async postData(req: Request, res: Response): Promise<void> {
        let ped = {
            idcompra: req.body.idcompra,
            idproducto: req.body.idproducto,
            cantidad: req.body.cantidad,
            subtotal: req.body.subtotal,
            cubiertos: req.body.cubiertos,
            createdAt: new Date()
        }
        pedidos.create(ped).then((rs: any) => {
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
                res.status(200).json({ log: "Exito!!!!" });
                return;
            }
            else {
                res.status(200).json({ log: "Sin datos a eliminar." });
                return;
            }
        }, (err: any) => {
            res.status(500).json({ log: "Error!!" });
            console.log(err);
            return;
        });
    }

    public async index(req: Request, res: Response): Promise<void> {
        //codigo aquí
        res.send("token recibido");
    }
    public async json(req: Request, res: Response): Promise<void> {
        //codigo aquí
        res.json({ log: "mensaje" });
    }
}
export default new pedidosController();
