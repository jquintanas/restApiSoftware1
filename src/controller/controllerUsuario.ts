import { Request, Response } from "express";
const usuarios = require('./../../models').Usuarios;

class usuariosController {
    /*
    FechaCreacion: 06/04/2020
    Usuario: Drios
    Comentario: Este metodo se encarga de buscar todos los usuarios que se encuentren en la base
    */
    public async getData(req: Request, res: Response): Promise<void> {
        usuarios.findAll().then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No hay datos en la base" });
            console.log(err);
            return;
        });

    }
    public async postData(req: Request, res: Response): Promise<void> {
        let usuario = {   
            cedula:req.body.cedula,        
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            email: req.body.email,
            direccion: req.body.direccion,
            contrasenia:req.body.contrasenia,
            rol:req.body.rol,
            createdAt:req.body.createdAt,
            updatedAt:req.body.updateAt
        }

        usuarios.create(usuario).then((rs: any) => {
            res.status(200).json(rs);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No se pudo crear el usuario" });
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
        usuarios.findOne(
            {
                where: {
                    cedula: id
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

    public async deleteData(req: Request, res: Response): Promise<void> {
        let { id } = req.params;
        usuarios.destroy({ where: { cedula: id } }).then((data: any) => {
            if (data == 1) {
                res.status(200).json({ log: "Usuario eliminado exitosamente" });
                return;
            }
            else {
                res.status(200).json({ log: "No existe el usuario" });
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
        console.log(id);
        let {cedula,nombre,apellido,telefono, email,direccion,contrasenia, rol, createdAt} = req.body;
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
        }
        usuarios.update(est, { where: { cedula: id } }).then((rs: any) => {
            if (rs[0] === 1) {
                res.status(200).json({ log: "El usuario se actualizó." })
                return;
            }else{
                res.status(200).json({ log: "No se pudo modificar el usuario" });
                return;
            }
        }, (err: any) => {
            res.status(500).json({ log: "Error del servidor" });
            console.log(err);
            return;
        })
    }
}
export default new usuariosController();