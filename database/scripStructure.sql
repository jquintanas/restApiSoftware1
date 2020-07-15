 DROP DATABASE OmiPali;

CREATE DATABASE if not exists OmiPali;

use OmiPali;


create table if not exists Rol(
idrol int auto_increment primary key,
descripcion varchar(20));


create table if not exists Usuario(
cedula varchar(10) primary key not null,
nombre varchar (20) not null,
apellido varchar (20) not null,
telefono varchar (10) not null,
email varchar (50) not null,
direccion varchar (50) not null,
contrasenia varchar (20),
rol int,
FOREIGN KEY (rol) REFERENCES Rol(idrol)
);


create table if not exists Novedad(
idnovedad int auto_increment primary key,
idusuarioReporta varchar(10) not null,
idusuarioReportado varchar(10) not null,
descripcion varchar (50) not null,
FOREIGN KEY (idusuarioReporta) REFERENCES Usuario(cedula),
FOREIGN KEY (idusuarioReportado) REFERENCES Usuario(cedula));

create table if not exists Pago(
idpago int auto_increment primary key,
idformaPago int not null,
total float,
imagen text);

create table if not exists compra(
idcompra int auto_increment primary key,
idusuario varchar(10) not null,
fechacompra date,
idformaEntega int not null,
hotaEntrega time,
FOREIGN KEY (idusuario) REFERENCES Usuario(cedula)
);

create table if not exists Pedido(
idpedido int auto_increment primary key,
idcompra int,
idproducto int,
cantidad int,
subtotal float,
cubiertos boolean,
FOREIGN KEY (idcompra) REFERENCES Compra(idcompra)
);

create table if not exists Factura(
idfactura int auto_increment primary key,
idpedido int,
idpago int,
FOREIGN KEY (idpedido) REFERENCES Pedido(idpedido),
FOREIGN KEY (idpago) REFERENCES Pago(idpago)
);
