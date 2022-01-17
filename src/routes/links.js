const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) =>{
	res.render('links/add');
});

router.post('/add',isLoggedIn, async (req, res) => {
	const { serviceName, price, description } = req.body;
	const newLink = {
		serviceName,
		price,
		description
	};
	await pool.query('INSERT INTO service set ?', [newLink]);
	req.flash('success','Link saved succesfully');
	res.redirect('/links');
});

router.get('/onhold', async (req, res) => {
	const customer = await pool.query("select * from service");
	res.render('links/onhold', { customer });
})

router.get('/', isLoggedIn, async (req, res) => {
	const links = await pool.query('SELECT * FROM service');
	res.render('links/list', { links });

});

router.get('/requestService', async(req, res) => {
	const service = await pool.query("select * from service");
	res.render('links/requestService', { service });
})

router.post('/requestService', async (req, res) => {
	const { customerName, serviceName, description } = req.body;
	const newService = {
		customerName,
		serviceName,
		description
	};
	await pool.query('INSERT INTO customer set ?', [newService]);
	req.flash('success','Request saved successfully');
	res.redirect('/links/onhold')
})


router.get('/delete/:id', isLoggedIn,  async(req, res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM customer WHERE ID = ?', [id]);
	req.flash('success', 'Cliente removido exitosamente!');
	res.redirect('/links/onhold');
});

router.get('/deletes/:id', isLoggedIn,  async(req, res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM service WHERE ID = ?', [id]);
	req.flash('success', 'Servicio removido exitosamente!');
	res.redirect('/links');
});


router.get('/edit/:id', isLoggedIn,  async (req, res) => {
	const { id } = req.params;
	const links = await pool.query('SELECT * FROM service WHERE id = ?', [id]);
	res.render('links/edit', {links: links[0]});

});

router.post('/edit/:id', isLoggedIn,  async (req, res) => {
	const { id } = req.params;
	const { serviceName, price, description } = req.body;
	const newLink = {
		serviceName,
		 price,
		description
	};
	await pool.query('UPDATE service set ? WHERE id = ?', [newLink, id]);
	req.flash('success', 'Servicio editado exitosamente!');
	res.redirect('/links');
});

module.exports = router;