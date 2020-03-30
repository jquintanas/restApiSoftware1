import { Request, Response } from "express";
let db = require('./../../models');
let estudiantes = db.estudiantes;
class AppController {

    public async getData(req: Request, res: Response): Promise<void> {
        estudiantes.findAll().then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!!" });
            console.log(err);
            return;
        });

    }

    public async postData(req: Request, res: Response): Promise<void> {
        let est = {
            matricula: req.body.matricula,
            nombre: req.body.nombre,
            semestre: req.body.semestre
        }
        estudiantes.create(est).then((rs: any) => {
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
        estudiantes.destroy({ where: { matricula: id } }).then((data: any) => {
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

    public async updateData(req: Request, res: Response): Promise<void> {
        let {id} = req.params;
        let { matricula, nombre, semestre } = req.body;
        let est = {
            matricula: matricula,
            nombre: nombre,
            semestre: semestre,
            updatedAt: new Date()
        }
        estudiantes.update(est, { where: { matricula: id } }).then((rs: any) => {
            if (rs[0] === 1) {
                res.status(200).json({ log: "El usuario se actualizo." })
                return;
            }
        }, (err: any) => {
            res.status(500).json({ log: "Error del servidor" });
            console.log(err);
            return;
        })
    }


    public async index(req: Request, res: Response): Promise<void> {
        //codigo aquí
        res.send("token");
    }
    public async json(req: Request, res: Response): Promise<void> {
        //codigo aquí
        res.json({ log: "mensaje" });
    }
}
export default new AppController();