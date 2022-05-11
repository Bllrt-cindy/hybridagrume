const {Router} = require('express');
const router = new Router();

const varieties = require('../models/varieties');

// endpoint qui répond avec l'ensemble des variétés
router.get('/', async (req, res) => {
	try {
		const response = await varieties.findAll();
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

// crée un nouveau cultivar
router.post('/', async (req, res) => {
	try {
		const response = await varieties.create(req.body);
		res.status(201).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

// Filtre les variétés selon leur jutosité min/max et/ou amertume min/max
router.post('/filter/scores', async (req, res) => {
	try {
		const response = await varieties.filterByScores(req.body);
		res.status(200).json(response)
	}	catch (err) {
		res.status(400).send(err.message)
	};
});

// répond avec l'ensemble des variétés et leur espèce correspondante
router.get('/findAllJoinSpecies', async (req, res) => {
	try {
		const response = await varieties.findAllJoinSpecies();
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.get('/name/:name', async (req, res) => {
	try {
		const response = await varieties.findByName(req.params.name);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.get('/filter/species/:name', async (req, res) => {
	try {
		const response = await varieties.filterBySpecies(req.params.name);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.get('/findByMinJuiciness/:juiciness', async (req, res) => {
	try {
		const response = await varieties.findByMinJuiciness(req.params.juiciness);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.get('/findByMaxJuiciness/:juciness', async (req, res) => {
	try {
		const response = await varieties.findByMaxJuiciness(req.params.juciness);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.get('/findByMinBitterness/:bitterness', async (req, res) => {
	try {
		const response = await varieties.findByMinBitterness(req.params.bitterness);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.get('/findByMaxBitterness/:bitterness', async (req, res) => {
	try {
		const response = await varieties.findByMaxBitterness(req.params.bitterness);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

// endpoint qui répond avec la variété qui correspond à l'id demandé
router.get('/:id', async (req, res) => {
	try {
		const response = await varieties.findById(req.params.id);
		res.status(200).json(response);
	} catch (err) {
		if (err.message.includes("not found")) {
			res.status(404).send(err.message);
		} else {
			res.status(400).send(err.message);
		}
	};
});

router.put('/:id', async (req, res) => {
	try {
		const response = await varieties.update(req.params.id, req.body);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

router.delete('/:id', async (req, res) => {
	try {
		const response = await varieties.destroy(req.params.id);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).send(err.message);
	};
});

module.exports = router;