/**
 * @interface userInterface
 * @author Karla Burgos <kbburgos@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc User interface model.
 */

export interface userinterface {
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