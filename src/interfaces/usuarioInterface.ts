/**
 * @interface usuarioInterface
 * @author Karla Burgos <kbburgos@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Interfaz para modelo usuario.
 */

export interface usuariointerface {
    cedula?: String;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    direccion: string;
    contrasenia: string;
    createdAt?: Date;
    rol: number;
    updatedAt?: Date;
}