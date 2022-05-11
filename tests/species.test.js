require('dotenv').config();
const species = require("../src/models/species");

test("findAll test", async () => {
	const response = await species.findAll();
	const expectedOutput = [
		{
			"id": 1,
			"vernacular_name": "orange douce",
			"scientific_name": "Citrus sinensis L.",
			"family": "orange"
		},
		{
			"id": 2,
			"vernacular_name": "orange amère",
			"scientific_name": "Citrus aurantium L.",
			"family": "orange"
		},
		{
			"id": 3,
			"vernacular_name": "pamplemousse",
			"scientific_name": "Citrus maxima",
			"family": "pamplemousse"
		},
		{
			"id": 4,
			"vernacular_name": "pomelo",
			"scientific_name": "Citrus x paradisi",
			"family": "pamplemousse"
		},
		{
			"id": 5,
			"vernacular_name": "tangelo",
			"scientific_name": "Citrus x tangelo",
			"family": "pamplemousse"
		},
		{
			"id": 6,
			"vernacular_name": "citron jaune",
			"scientific_name": "Citrus x limon",
			"family": "citron"
		},
		{
			"id": 7,
			"vernacular_name": "cédrat",
			"scientific_name": "Citrus medica L.",
			"family": "citron"
		},
		{
			"id": 8,
			"vernacular_name": "combava",
			"scientific_name": "Citrus hystrix",
			"family": "citron"
		},
		{
			"id": 9,
			"vernacular_name": "citron vert",
			"scientific_name": "Citrus aurantiifolia",
			"family": "citron"
		},
		{
			"id": 10,
			"vernacular_name": "bergamote",
			"scientific_name": "Citrus bergamia",
			"family": "citron"
		},
		{
			"id": 11,
			"vernacular_name": "clémentine",
			"scientific_name": "Citrus x clementina",
			"family": "clémentine"
		},
		{
			"id": 12,
			"vernacular_name": "mandarine",
			"scientific_name": "Citrus reticulata",
			"family": "mandarine"
		},
		{
			"id": 13,
			"vernacular_name": "tangerine",
			"scientific_name": "Citrus x tangerina",
			"family": "mandarine"
		},
		{
			"id": 14,
			"vernacular_name": "kumquat",
			"scientific_name": "Citrus japonica",
			"family": "kumquat"
		},
		{
			"id": 15,
			"vernacular_name": "limequat",
			"scientific_name": "Citrus x floridana",
			"family": "kumquat"
		}
	];
	return expect(response).toStrictEqual(expectedOutput);
});

test("findByFamily test", async () => {
	const response = await species.findByFamily('citron');
	const expectedOutput = [
		{
			"id": 6,
			"vernacular_name": "citron jaune",
			"scientific_name": "Citrus x limon",
			"family": "citron"
		},
		{
			"id": 7,
			"vernacular_name": "cédrat",
			"scientific_name": "Citrus medica L.",
			"family": "citron"
		},
		{
			"id": 8,
			"vernacular_name": "combava",
			"scientific_name": "Citrus hystrix",
			"family": "citron"
		},
		{
			"id": 9,
			"vernacular_name": "citron vert",
			"scientific_name": "Citrus aurantiifolia",
			"family": "citron"
		},
		{
			"id": 10,
			"vernacular_name": "bergamote",
			"scientific_name": "Citrus bergamia",
			"family": "citron"
		}
	];
	return expect(response).toStrictEqual(expectedOutput);
});
