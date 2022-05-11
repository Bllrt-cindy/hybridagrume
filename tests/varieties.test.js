require('dotenv').config();
const varieties = require("../src/models/varieties");

test("findAll test", async () => {
	const response = await varieties.findAll();
	const expectedOutput = [
		{
			"id": 1,
			"full_name": "Citrus sinensis L. Osbeck",
			"juiciness": 5,
			"bitterness": 4
		},
		{
			"id": 2,
			"full_name": "Citrus sinensis L. Moro",
			"juiciness": 5,
			"bitterness": 5
		},
		{
			"id": 3,
			"full_name": "Citrus sinensis L. Sanguinello",
			"juiciness": 5,
			"bitterness": 2
		},
		{
			"id": 4,
			"full_name": "Citrus aurantium L. Hook",
			"juiciness": 0,
			"bitterness": 3
		},
		{
			"id": 5,
			"full_name": "Citrus maxima Honey",
			"juiciness": 3,
			"bitterness": 5
		},
		{
			"id": 6,
			"full_name": "Citrus maxima Sweetie",
			"juiciness": 5,
			"bitterness": 2
		},
		{
			"id": 7,
			"full_name": "Citrus maxima Chandler",
			"juiciness": 1,
			"bitterness": 2
		},
		{
			"id": 8,
			"full_name": "Citrus x paradisi Oro blanco",
			"juiciness": 1,
			"bitterness": 0
		},
		{
			"id": 9,
			"full_name": "Citrus x paradisi Rio star",
			"juiciness": 2,
			"bitterness": 2
		},
		{
			"id": 10,
			"full_name": "Citrus x tangelo Seminole",
			"juiciness": 1,
			"bitterness": 2
		},
		{
			"id": 11,
			"full_name": "Citrus x limon Bonnie Brae",
			"juiciness": 0,
			"bitterness": 0
		},
		{
			"id": 12,
			"full_name": "Citrus x limon Eureka",
			"juiciness": 5,
			"bitterness": 3
		},
		{
			"id": 13,
			"full_name": "Citrus medica L. Etrog",
			"juiciness": 2,
			"bitterness": 2
		},
		{
			"id": 14,
			"full_name": "Citrus medica L. Sarcodactylis",
			"juiciness": 4,
			"bitterness": 3
		},
		{
			"id": 15,
			"full_name": "Citrus hystrix Westeri",
			"juiciness": 0,
			"bitterness": 4
		},
		{
			"id": 16,
			"full_name": "Citrus aurantiifolia sur Macrophylla",
			"juiciness": 3,
			"bitterness": 0
		},
		{
			"id": 17,
			"full_name": "Citrus bergamia Bergamia",
			"juiciness": 0,
			"bitterness": 0
		},
		{
			"id": 18,
			"full_name": "Citrus x clementina Algérienne",
			"juiciness": 2,
			"bitterness": 3
		},
		{
			"id": 19,
			"full_name": "Citrus x clementina Clémenvilla",
			"juiciness": 1,
			"bitterness": 5
		},
		{
			"id": 20,
			"full_name": "Citrus x clementina Clémenule",
			"juiciness": 4,
			"bitterness": 3
		},
		{
			"id": 21,
			"full_name": "Citrus reticulata Deliciosa",
			"juiciness": 5,
			"bitterness": 4
		},
		{
			"id": 22,
			"full_name": "Citrus reticulata Tachibana",
			"juiciness": 1,
			"bitterness": 3
		},
		{
			"id": 23,
			"full_name": "Citrus reticulata Ponkan",
			"juiciness": 4,
			"bitterness": 0
		},
		{
			"id": 24,
			"full_name": "Citrus x tangerina Tanger",
			"juiciness": 3,
			"bitterness": 3
		},
		{
			"id": 25,
			"full_name": "Citrus x tangerina Moragne",
			"juiciness": 5,
			"bitterness": 0
		},
		{
			"id": 26,
			"full_name": "Citrus x tangerina Dancy",
			"juiciness": 1,
			"bitterness": 5
		},
		{
			"id": 27,
			"full_name": "Citrus japonica Marumi",
			"juiciness": 3,
			"bitterness": 5
		},
		{
			"id": 28,
			"full_name": "Citrus japonica Meiwa",
			"juiciness": 1,
			"bitterness": 0
		},
		{
			"id": 29,
			"full_name": "Citrus japonica Swinglei",
			"juiciness": 4,
			"bitterness": 5
		},
		{
			"id": 30,
			"full_name": "Citrus x floridana Eustis",
			"juiciness": 4,
			"bitterness": 0
		},
		{
			"id": 31,
			"full_name": "Citrus x floridana Margarita",
			"juiciness": 0,
			"bitterness": 5
		}
	];
	return expect(response).toStrictEqual(expectedOutput);
});

test("findAllJoinSpecies test", async () => {
	const response = await varieties.findAllJoinSpecies();
	const expectedOutput = [
		{
			"id": 1,
			"name": "Osbeck",
			"juiciness": 5,
			"bitterness": 4,
			"vernacular_name": "orange douce",
			"scientific_name": "Citrus sinensis L."
		},
		{
			"id": 2,
			"name": "Moro",
			"juiciness": 5,
			"bitterness": 5,
			"vernacular_name": "orange douce",
			"scientific_name": "Citrus sinensis L."
		},
		{
			"id": 3,
			"name": "Sanguinello",
			"juiciness": 5,
			"bitterness": 2,
			"vernacular_name": "orange douce",
			"scientific_name": "Citrus sinensis L."
		},
		{
			"id": 4,
			"name": "Hook",
			"juiciness": 0,
			"bitterness": 3,
			"vernacular_name": "orange amère",
			"scientific_name": "Citrus aurantium L."
		},
		{
			"id": 5,
			"name": "Honey",
			"juiciness": 3,
			"bitterness": 5,
			"vernacular_name": "pamplemousse",
			"scientific_name": "Citrus maxima"
		},
		{
			"id": 6,
			"name": "Sweetie",
			"juiciness": 5,
			"bitterness": 2,
			"vernacular_name": "pamplemousse",
			"scientific_name": "Citrus maxima"
		},
		{
			"id": 7,
			"name": "Chandler",
			"juiciness": 1,
			"bitterness": 2,
			"vernacular_name": "pamplemousse",
			"scientific_name": "Citrus maxima"
		},
		{
			"id": 8,
			"name": "Oro blanco",
			"juiciness": 1,
			"bitterness": 0,
			"vernacular_name": "pomelo",
			"scientific_name": "Citrus x paradisi"
		},
		{
			"id": 9,
			"name": "Rio star",
			"juiciness": 2,
			"bitterness": 2,
			"vernacular_name": "pomelo",
			"scientific_name": "Citrus x paradisi"
		},
		{
			"id": 10,
			"name": "Seminole",
			"juiciness": 1,
			"bitterness": 2,
			"vernacular_name": "tangelo",
			"scientific_name": "Citrus x tangelo"
		},
		{
			"id": 11,
			"name": "Bonnie Brae",
			"juiciness": 0,
			"bitterness": 0,
			"vernacular_name": "citron jaune",
			"scientific_name": "Citrus x limon"
		},
		{
			"id": 12,
			"name": "Eureka",
			"juiciness": 5,
			"bitterness": 3,
			"vernacular_name": "citron jaune",
			"scientific_name": "Citrus x limon"
		},
		{
			"id": 13,
			"name": "Etrog",
			"juiciness": 2,
			"bitterness": 2,
			"vernacular_name": "cédrat",
			"scientific_name": "Citrus medica L."
		},
		{
			"id": 14,
			"name": "Sarcodactylis",
			"juiciness": 4,
			"bitterness": 3,
			"vernacular_name": "cédrat",
			"scientific_name": "Citrus medica L."
		},
		{
			"id": 15,
			"name": "Westeri",
			"juiciness": 0,
			"bitterness": 4,
			"vernacular_name": "combava",
			"scientific_name": "Citrus hystrix"
		},
		{
			"id": 16,
			"name": "sur Macrophylla",
			"juiciness": 3,
			"bitterness": 0,
			"vernacular_name": "citron vert",
			"scientific_name": "Citrus aurantiifolia"
		},
		{
			"id": 17,
			"name": "Bergamia",
			"juiciness": 0,
			"bitterness": 0,
			"vernacular_name": "bergamote",
			"scientific_name": "Citrus bergamia"
		},
		{
			"id": 18,
			"name": "Algérienne",
			"juiciness": 2,
			"bitterness": 3,
			"vernacular_name": "clémentine",
			"scientific_name": "Citrus x clementina"
		},
		{
			"id": 19,
			"name": "Clémenvilla",
			"juiciness": 1,
			"bitterness": 5,
			"vernacular_name": "clémentine",
			"scientific_name": "Citrus x clementina"
		},
		{
			"id": 20,
			"name": "Clémenule",
			"juiciness": 4,
			"bitterness": 3,
			"vernacular_name": "clémentine",
			"scientific_name": "Citrus x clementina"
		},
		{
			"id": 21,
			"name": "Deliciosa",
			"juiciness": 5,
			"bitterness": 4,
			"vernacular_name": "mandarine",
			"scientific_name": "Citrus reticulata"
		},
		{
			"id": 22,
			"name": "Tachibana",
			"juiciness": 1,
			"bitterness": 3,
			"vernacular_name": "mandarine",
			"scientific_name": "Citrus reticulata"
		},
		{
			"id": 23,
			"name": "Ponkan",
			"juiciness": 4,
			"bitterness": 0,
			"vernacular_name": "mandarine",
			"scientific_name": "Citrus reticulata"
		},
		{
			"id": 24,
			"name": "Tanger",
			"juiciness": 3,
			"bitterness": 3,
			"vernacular_name": "tangerine",
			"scientific_name": "Citrus x tangerina"
		},
		{
			"id": 25,
			"name": "Moragne",
			"juiciness": 5,
			"bitterness": 0,
			"vernacular_name": "tangerine",
			"scientific_name": "Citrus x tangerina"
		},
		{
			"id": 26,
			"name": "Dancy",
			"juiciness": 1,
			"bitterness": 5,
			"vernacular_name": "tangerine",
			"scientific_name": "Citrus x tangerina"
		},
		{
			"id": 27,
			"name": "Marumi",
			"juiciness": 3,
			"bitterness": 5,
			"vernacular_name": "kumquat",
			"scientific_name": "Citrus japonica"
		},
		{
			"id": 28,
			"name": "Meiwa",
			"juiciness": 1,
			"bitterness": 0,
			"vernacular_name": "kumquat",
			"scientific_name": "Citrus japonica"
		},
		{
			"id": 29,
			"name": "Swinglei",
			"juiciness": 4,
			"bitterness": 5,
			"vernacular_name": "kumquat",
			"scientific_name": "Citrus japonica"
		},
		{
			"id": 30,
			"name": "Eustis",
			"juiciness": 4,
			"bitterness": 0,
			"vernacular_name": "limequat",
			"scientific_name": "Citrus x floridana"
		},
		{
			"id": 31,
			"name": "Margarita",
			"juiciness": 0,
			"bitterness": 5,
			"vernacular_name": "limequat",
			"scientific_name": "Citrus x floridana"
		}
	];
	return expect(response).toStrictEqual(expectedOutput);
});

test("findById test", async () => {
	const response = await varieties.findById(1);
	const expectedOutput = {
		"id": 1,
		"full_name": "Citrus sinensis L. Osbeck",
		"juiciness": 5,
		"bitterness": 4
	};
	return expect(response).toStrictEqual(expectedOutput);
});

test("findByName test", async () => {
	const response = await varieties.findByName('Moro');
	const expectedOutput = {
		"id": 2,
		"full_name": "Citrus sinensis L. Moro",
		"juiciness": 5,
		"bitterness": 5
	};
	return expect(response).toStrictEqual(expectedOutput);
});

test("findBySpecies test", async () => {
    const response = await varieties.filterBySpecies('dou');
    const expectedOutput = [
		{
			"id": 1,
			"full_name": "Citrus sinensis L. Osbeck",
			"vernacular_name": "orange douce",
			"juiciness": 5,
			"bitterness": 4
		},
		{
			"id": 2,
			"full_name": "Citrus sinensis L. Moro",
			"vernacular_name": "orange douce",
			"juiciness": 5,
			"bitterness": 5
		},
		{
			"id": 3,
			"full_name": "Citrus sinensis L. Sanguinello",
			"vernacular_name": "orange douce",
			"juiciness": 5,
			"bitterness": 2
		}
	];
	console.log(response);
	console.log(expectedOutput);
	return expect(response).toStrictEqual(expectedOutput);
});

test("findByMinJuiciness test", async () => {
	const response = await varieties.findByMinJuiciness(5);
	const expectedOutput = [
		{
			"id": 1,
			"name": "Osbeck",
			"juiciness": 5,
			"bitterness": 4
		},
		{
			"id": 2,
			"name": "Moro",
			"juiciness": 5,
			"bitterness": 5
		},
		{
			"id": 3,
			"name": "Sanguinello",
			"juiciness": 5,
			"bitterness": 2
		},
		{
			"id": 6,
			"name": "Sweetie",
			"juiciness": 5,
			"bitterness": 2
		},
		{
			"id": 12,
			"name": "Eureka",
			"juiciness": 5,
			"bitterness": 3
		},
		{
			"id": 21,
			"name": "Deliciosa",
			"juiciness": 5,
			"bitterness": 4
		},
		{
			"id": 25,
			"name": "Moragne",
			"juiciness": 5,
			"bitterness": 0
		}
	];
	return expect(response).toStrictEqual(expectedOutput);
});

test("findByMaxJuiciness test", async () => {
	const response = await varieties.findByMaxJuiciness(0);
	const expectedOutput = [
		{
			"id": 4,
			"name": "Hook",
			"juiciness": 0,
			"bitterness": 3
		},
		{
			"id": 11,
			"name": "Bonnie Brae",
			"juiciness": 0,
			"bitterness": 0
		},
		{
			"id": 15,
			"name": "Westeri",
			"juiciness": 0,
			"bitterness": 4
		},
		{
			"id": 17,
			"name": "Bergamia",
			"juiciness": 0,
			"bitterness": 0
		},
		{
			"id": 31,
			"name": "Margarita",
			"juiciness": 0,
			"bitterness": 5
		}
	];
	return expect(response).toStrictEqual(expectedOutput);
});

test("findByMinBitterness test", async () => {
	const response = await varieties.findByMinBitterness(5);
	const expectedOutput = [
		{
			"id": 2,
			"name": "Moro",
			"juiciness": 5,
			"bitterness": 5
		},
		{
			"id": 5,
			"name": "Honey",
			"juiciness": 3,
			"bitterness": 5
		},
		{
			"id": 19,
			"name": "Clémenvilla",
			"juiciness": 1,
			"bitterness": 5
		},
		{
			"id": 26,
			"name": "Dancy",
			"juiciness": 1,
			"bitterness": 5
		},
		{
			"id": 27,
			"name": "Marumi",
			"juiciness": 3,
			"bitterness": 5
		},
		{
			"id": 29,
			"name": "Swinglei",
			"juiciness": 4,
			"bitterness": 5
		},
		{
			"id": 31,
			"name": "Margarita",
			"juiciness": 0,
			"bitterness": 5
		}
	];
	return expect(response).toStrictEqual(expectedOutput);
});

test("findByMaxBitterness test", async () => {
	const response = await varieties.findByMaxBitterness(0);
	const expectedOutput = [
		{
			"id": 8,
			"name": "Oro blanco",
			"juiciness": 1,
			"bitterness": 0
		},
		{
			"id": 11,
			"name": "Bonnie Brae",
			"juiciness": 0,
			"bitterness": 0
		},
		{
			"id": 16,
			"name": "sur Macrophylla",
			"juiciness": 3,
			"bitterness": 0
		},
		{
			"id": 17,
			"name": "Bergamia",
			"juiciness": 0,
			"bitterness": 0
		},
		{
			"id": 23,
			"name": "Ponkan",
			"juiciness": 4,
			"bitterness": 0
		},
		{
			"id": 25,
			"name": "Moragne",
			"juiciness": 5,
			"bitterness": 0
		},
		{
			"id": 28,
			"name": "Meiwa",
			"juiciness": 1,
			"bitterness": 0
		},
		{
			"id": 30,
			"name": "Eustis",
			"juiciness": 4,
			"bitterness": 0
		}
	];
	return expect(response).toStrictEqual(expectedOutput);
});

const createInput = {
	"name": "Fruit",
	"juiciness": 1,
	"bitterness": 2,
	"species_id": 3
};

test("create test", async () => {
	const response = (await varieties.create(createInput))[0];
	const expectedOutput = (await varieties.findAll()).pop();
	return expect(response.id).toStrictEqual(expectedOutput.id);
});

test("update test", async () => {
	const id = (await varieties.findAll()).pop().id;
	const payload = {
		"juiciness" : 5
	};

	const response = (await varieties.update(id, payload))[0];
	const expectedOutput = (await varieties.findAll()).pop();
	return expect(response.juiciness).toStrictEqual(expectedOutput.juiciness);
});

test("delete test", async () => {
	const expectedOutput = (await varieties.findAll()).pop();

	const response = (await varieties.destroy(expectedOutput.id))[0];
	console.log(response);
	console.log(expectedOutput);
	return expect(response.id).toStrictEqual(expectedOutput.id);
});
