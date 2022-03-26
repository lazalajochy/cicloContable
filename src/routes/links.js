const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) =>{
	res.render('links/add');
});

router.post('/add',isLoggedIn, async (req, res) => {
	const { nombre } = req.body;
	const newLink = {nombre	};
	await pool.query('INSERT INTO cuentas set ?', [newLink]);
	req.flash('success','Registro agregada satisfatoriamente!');
	res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
	const links = await pool.query('SELECT * FROM cuentas');
	res.render('links/list', { links });
});

router.get('/deleteDetails/:id', isLoggedIn,  async(req, res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM socios WHERE id = ?', [id]);
	req.flash('success', 'Detalle o Socio removido exitosamente!');
	res.redirect('/links');

});

router.get('/deleteCuenta/:id', isLoggedIn, async(req, res) => {
	const { id } = req.params;
	await pool.query('delete from cuentas where id = ?',[id]);
	req.flash('success', 'Registro removido exitosamente!');
	res.redirect('/links');

})


router.get('/agregarSocio/:id', isLoggedIn,  async (req, res) => {
	const { id } = req.params;
	const links = await pool.query('SELECT id as id, socio as socio, sub_auxiliar as sub_auxiliar, auxiliar as auxiliar, debito as debito, credito as credito,  DATE_FORMAT(fechas, "%d-%m-%Y") as fechas, idCuentas as idCuentas, descripcion as descripcion, balance as balance FROM socios WHERE idCuentas = ?', [id]);
	console.log(links)
	res.render('links/edit', {links});

});

router.get('/addDetails/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const  balance  = await pool.query('select balance as balance from socios where idCuentas = ?', [id]);
	var index = balance.length - 1;
	res.render('links/details', { id, balance: balance[index] })
})

router.post('/addDetails', isLoggedIn, async (req, res) => {
	const currentDetails = await pool.query('select * from socios');
	const newDetails = {socio,sub_auxiliar,auxiliar,debito,fechas, tipo_transacion , idCuentas,credito, descripcion, balance} = req.body;
	await pool.query('insert into socios set ?', [newDetails]);
	req.flash('success', 'Socio o Detalle agregado exitosamente!');
	res.redirect('/links')
})

router.get('/editDetails/:id', isLoggedIn, async(req, res) => {
	const { id } = req.params;
	const details = await pool.query('select * from socios where id = ?', [id]);
	res.render('links/editDetails', {details: details[0]})
});

router.post('/editDetails/:id', isLoggedIn, async(req, res) => {
	const { id } = req.params;
	console.log(id)
	const  updateDetail = { socio, sub_auxiliar, auxiliar,debito, credito, descripcion } = req.body;
	await pool.query('UPDATE socios SET ? WHERE id = ?', [updateDetail, id]);
	req.flash('success', 'Informacion editada exitosamente!');
	res.redirect('/links')
});

router.get('/operacion/:idCuentas', isLoggedIn, async(req, res) => {
	const { idCuentas } = req.params;
	res.render('links/operacion', {idCuentas})
})

router.post('/operacion', isLoggedIn, async(req, res) => {
	const data = {detalleNombre, nombreUno, transacionUno, transacionDos, cantidadUno, cantidadDos, result, idCuentas} = req.body;
	await pool.query('insert into mayores set ?', [data])
	req.flash("success", "Transacion registrada exitosamente!")
	res.redirect('/links')
})

router.get('/listMayores/:id', isLoggedIn, async(req, res) =>{
	const { id } = req.params;
	const data = await pool.query('select * from mayores where idCuentas = ?',[id])
	res.render('links/listMayores',{data:data})
})

router.get('/balanza/:idCuentas', isLoggedIn, async(req, res) => {
	const { idCuentas } = req.params;
	res.render('links/balanza', {idCuentas})
});

router.post('/balanza', isLoggedIn, async(req, res) => {
	const data = {detalleNombre, nombreUno, transacionUno, transacionDos, cantidadUno, cantidadDos, result, idCuentas} = req.body;
	await pool.query('insert  into balanza set ?', [data]);
	req.flash("success", "Transacion registrada exitosamente!");
	res.redirect('/links');
});

router.get('/listBalanza/:id', isLoggedIn, async(req, res) => {
	const { id } = req.params;
	const data = await pool.query('select * from balanza where idCuentas = ?',[id]);
	res.render('links/listBalanza',{data:data})
});

router.get('/asiento/:idCuentas', isLoggedIn, async(req, res) => {
	const { idCuentas } = req.params;
	res.render('links/asiento',{idCuentas})
});

router.post('/asiento', isLoggedIn, async(req, res) => {
	const data = {nombre, cantidad, porciento, result, meses, totalMeses, fecha} = req.body;
	console.log(data)
	await pool.query('insert into asiento set ?', [data])
	res.redirect('/links')
});

router.get('/listAsiento/:id', isLoggedIn, async(req, res) => {
	const { id } = req.params;
	const data = await pool.query('select nombre as nombre, result as result, meses as meses, totalMeses as totalMeses, porciento as porciento, cantidad as cantidad, DATE_FORMAT(fecha, "%d-%m-%Y") as fecha from asiento where idCuentas = ?',[id]);
	console.log(data)
	res.render('links/listAsiento',{data:data})
});

router.get('/balance/:idCuentas', isLoggedIn, async (req, res) => {
	const { idCuentas } = req.params;
	res.render('links/balance', {idCuentas})
});

router.post('/balance', isLoggedIn, async(req, res) => {
	const data = {nombreUno, cantidadUno, nombreDos, cantidadDos, nombreTres, cantidadTres, nombreCuatro, cantidadCuatro, nombreCinco, cantidadCinco, nombreSeis, cantidadSeis, result, idCuentas} = req.body;
	console.log(data);
	await pool.query('insert into balance set ?', [data])
	res.redirect('/links')
});

router.get('/listBalance/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const data = await pool.query('select * from balance where idCuentas = ?',[id]);
	console.log(data)
	res.render('links/listBalance', {data:data})
})


module.exports = router;