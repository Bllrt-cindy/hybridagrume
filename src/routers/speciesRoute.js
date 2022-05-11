const {Router} = require('express');
const router = new Router();

const species = require('../models/species');

router.get("/", async (req, res) => {
	try {
		const response = await species.findAll();
		res.status(200).json(response);
	} catch (err) {
		res.status(400).json(err.message);
	};
});

router.post("/", async (req, res) => {
	try {
		const response = await species.create(req.body);
		res.status(201).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.get('/filter/family/:name', async (req, res) => {
	try {
		const response = await species.findByFamily(req.params.name);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.get('/:id', async (req, res) => {
	try {
		const response = await species.findById(req.params.id);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.put('/:id', async (req, res) => {
	try {
		const response = await species.update(req.params.id, req.body);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.delete('/:id', async (req, res) => {
	try {
		const response = await species.destroy(req.params.id);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

module.exports = router;