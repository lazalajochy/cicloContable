CREATE DATABASE contable;

USE contable;

CREATE TABLE admi (
  id INT(11) NOT NULL,
  username VARCHAR(150) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);
ALTER TABLE admi
  ADD PRIMARY KEY (id);

ALTER TABLE admi
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

create table cuentas(
  id int(11) AUTO_INCREMENT
  PRIMARY key(id),
  nombre  varchar(100)
)

CREATE TABLE socios (
  id INT(11) AUTO_INCREMENT,
  PRIMARY key(id),
  socio VARCHAR(250),
  sub_auxiliar float,
  auxiliar float,
  debito float,
  credito float,
  fechas Date,
  idCuentas int references cuentas(id),
  descripcion varchar(250),
  balance float
);

ALTER table socios add foreign key(idCuentas) references cuentas(id) 
on delete cascade
on update cascade;


insert into cuentas(nombre) values('juan')

insert into socios(socio,sub_auxiliar,auxiliar,debito,fechas,idCuentas,credito) values('lola',17500,2500,3000,'2022-12-12', 2,12500)

alter table socios add column credito varchar(250);

create table mayores(
  id int(11) AUTO_INCREMENT,
  PRIMARY key(id),
  detalleNombre varchar(250),
  nombreUno varchar(250),
  cantidadUno float,
  cantidadDos float,
  idCuentas int references cuentas(id),
  result float
);
ALTER table mayores add foreign key(idCuentas) references cuentas(id) 
on delete cascade
on update cascade;

create table balanza (
  id int(11) AUTO_INCREMENT,
  PRIMARY key(id),
  detalleNombre varchar(250),
  cantidadUno float,
  cantidadDos float,
  idCuentas int references cuentas(id),
  result float,
  transacionUno varchar(250),
  transacionDos varchar(250),
  nombreUno varchar(250)
);

ALTER table balanza add foreign key(idCuentas) references cuentas(id) 
on delete cascade
on update cascade;

create table asiento(
  id int(11) AUTO_INCREMENT,
  PRIMARY key(id),
  nombre varchar(250),
  result float,
  meses int,
  totalMeses float,
  idCuentas int references cuentas(id)
);

ALTER table asiento add foreign key(idCuentas) references cuentas(id) 
on delete cascade
on update cascade;

create table balance(
  id int(11) AUTO_INCREMENT,
  PRIMARY key(id),
  nombreUno varchar(250),
  cantidadUno float,
  nombreDos varchar(250),
  cantidadDos float,
  nombreTres varchar(250),
  cantidadTres float,
  nombreCuatro varchar(250),
  cantidadCuatro float,
  nombreCinco varchar(250),
  cantidadCinco float,
  nombreSeis varchar(250),
  cantidadSeis float,
  result float,
  idCuentas int references cuentas(id)
);

ALTER table balance add foreign key(idCuentas) references cuentas(id) 
on delete cascade
on update cascade;
