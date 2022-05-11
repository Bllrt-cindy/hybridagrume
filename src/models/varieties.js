const { max } = require('pg/lib/defaults');
const knex = require('./knexClient');

/**
 * Un objet JS représentant les caractéristiques des variétés de fruits
 * @typedef Cultivar
 * @property {id} - l'id d'une variété
 * @property {name} - le nom de la variété
 * @property {juiciness} - la jutosité de la variété
 * @property {bitterness} - l'amertume de la variété
 * @property {species_id} - l'id de l'espèce correspondante
 */

/**
 * Un objet JS qui représente les espèces et familles des variétés de fruit
 * @typedef Species
 * @property {id} - l'id de l'espèce
 * @property {scientific_name} - le nom scientifique de l'espèce
 * @property {vernacular_name} - le nom vernaculaire de l'espèce
 * @property {family} - la famille correspondante
 */

/**
 * on va chercher tous les cultivars de la table cultivar
 * on les classe par id
 * et retourne un tableau d'objets
 * @async
 * @returns {Array<Cultivar>} - l'ensemble des cultivars
 */
const findAll = async () => {
	try {
		return (await knex.raw(`SELECT cultivar.id, species.scientific_name || ' ' || cultivar.name AS full_name, cultivar.juiciness, cultivar.bitterness
		FROM cultivar
		JOIN species ON species.id = cultivar.species_id
		ORDER BY id;`)).rows;
		// return await knex('cultivar').select().orderBy('id');
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Ajoute un cultivar dans la base de données
 * @async
 * @param {object} payload - le payload contenant les propriétés du cultivar à insérer
 */
const create = async (payload) => {
	try {
		return await knex('cultivar').insert(payload).returning('*');
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Va chercher des cultivars filtrés grâce au paramètre entré, dont notamment la jutosité minimale/maximale ainsi que l'amertume minimale/maximale
 * @async
 * @param {number} payload - le payload contenant les propriétés depuis lesquelles filtrer
 */
const filterByScores = async (payload) => {
	if (Object.keys(payload).length === 0) {
		throw new Error("Entry cannot be empty");
	};

	// Vérification ultime de s'il s'agit d'un nombre ou pas
	try {
		// Je viens boucler sur toutes les propriétés de l'objet payload
		Object.keys(payload).forEach(property => {
			// Je vérifie que les propriétés de l'objet payload sont correctes
			if (!["juiciness", "bitterness"].includes(property)) {
				throw new Error(`Cannot find property "${property}"`);
			};
			// Je viens boucler sur toutes les propriétés de chaque propriété de l'objet payload
			Object.keys(payload[property]).forEach(minMax => {
				// Je vérifie que les propriétés dans chaque propriété de l'objet payload sont correctes
				if (!["min", "max"].includes(minMax)) {
					throw new Error(`Property ${minMax} in ${property} not found`);
				};
				// Je vérifie qu'il s'agisse bien d'un nombre
				if (!Number.isInteger(parseInt(payload[property][minMax]))) {
					throw new Error(`The value "${payload[property][minMax]}" is invalid`);
				};
			});
		});

		// Récupération des valeurs minimales et maximales de la base de données, stockées dans l'objet defaultScores. Note : Le nommage en SQL ne prend pas en compte les majuscules, ainsi nous abandonnerons le camel case au profit du snake case.
		const defaultScore = (await knex.raw(`SELECT
			MIN(juiciness) AS min_juiciness,
			MAX(juiciness) AS max_juiciness,
			MIN(bitterness) AS min_bitterness,
			MAX(bitterness) AS max_bitterness
			FROM cultivar;
		`)).rows[0];

		// Récupération des données avec les filtres entrés.
		// Pour chaque valeur non renseigné par l'utilsateur, la valeur minimale ou maximale présente dans la base de données sera utilisée à la place.
		return await knex('cultivar').select("cultivar.id", "cultivar.name", "cultivar.juiciness", "cultivar.bitterness").join("species", "species.id", "=", "cultivar.species_id").whereRaw(`juiciness >= ? AND juiciness <= ? AND bitterness >= ? AND bitterness <= ?`, [
			!payload.hasOwnProperty('juiciness') ? defaultScore.min_juiciness :
				!payload.juiciness.hasOwnProperty('min') ? defaultScore.min_juiciness : payload.juiciness.min,
			!payload.hasOwnProperty('juiciness') ? defaultScore.max_juiciness : 
				!payload.juiciness.hasOwnProperty('max') ? defaultScore.max_juiciness : payload.juiciness.max,
			!payload.hasOwnProperty('bitterness') ? defaultScore.min_bitterness : 
				!payload.bitterness.hasOwnProperty('min') ? defaultScore.min_bitterness : payload.bitterness.min,
			!payload.hasOwnProperty('bitterness') ? defaultScore.max_bitterness : 
				!payload.bitterness.hasOwnProperty('max') ? defaultScore.max_bitterness : payload.bitterness.max
		]).orderBy("id");
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Créer une jointure entre la table Cultivar et la table Species 
 * pour afficher l'espèce associée au cultivar
 * @async
 * @returns {Array<Cultivar>} retourne les cultivars rangées par id avec leur espèce associée 
 */
const findAllJoinSpecies = async () => {
	try {
		return await knex('cultivar').join('species', 'species.id', '=', 'cultivar.species_id').select('cultivar.id', 'cultivar.name', 'cultivar.juiciness', 'cultivar.bitterness', 'species.vernacular_name', 'species.scientific_name').orderBy('cultivar.id');
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Va chercher un cultivar dans la db et le retourne sous forme d'objet
 * @async
 * @param {string} name - le nom du cultivar recherché
 * @returns {Cultivar} le cultivar correspondant
 */
const findByName = async (name) => {
	name = name.trim();
	try {
		if (name === "") {
			throw new Error("Veuillez entrer un nom valide.");
		};
		if (!name.match(/([A-Z][a-z])([^0-9]*)/g)) {
			throw new Error(`Le nom "${name}" n'est pas valide.`);
		};
		return (await knex.raw(`SELECT cultivar.id, species.scientific_name || ' ' || cultivar.name AS full_name, cultivar.juiciness, cultivar.bitterness
		FROM cultivar
		JOIN species ON species.id = cultivar.species_id
		WHERE cultivar.name = ?;`, [name])).rows[0];
		// return await knex('cultivar').join("species", "species.id", "=", "cultivar.species_id").select(["cultivar.id", "cultivar.name", "cultivar.juiciness", "cultivar.bitterness", "species.scientific_name"]).whereRaw(`LOWER(name) = '${name.toLowerCase()}'`).first();
	}  catch (err) {
		throw new Error(err);
	};
	
};

/**
 * Va chercher des varieties en fonction de leur espèce dans la db et le retourne sous forme d'objet
 * @async
 * @param {string} name - le nom de l'espèce des cultivar recherchés
 * @returns {Cultivar} le cultivar correspondant
 */
const filterBySpecies = async (name) => {
	name = name.trim();
	try {
		if (name === "") {
			throw new Error("Veuillez entrer un nom valide.");
		};
		// if (!name.match(/([A-Z][a-z])([^0-9]*)/g)) {
		// 	throw new Error(`Le nom "${name}" n'est pas valide.`);
		// };
		name = `%${name}%`;
		return (await knex.raw(`SELECT cultivar.id, species.scientific_name || ' ' || cultivar.name AS full_name, species.vernacular_name, cultivar.juiciness, cultivar.bitterness
		FROM cultivar
		JOIN species ON species.id = cultivar.species_id
		WHERE species.vernacular_name LIKE ?;`, [name])).rows;
		// return await knex('cultivar').join("species", "species.id", "=", "cultivar.species_id").select(["cultivar.id", "cultivar.name", "cultivar.juiciness", "cultivar.bitterness", "species.scientific_name"]).whereRaw(`LOWER(name) = '${name.toLowerCase()}'`);
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Créer une jointure entre la table Cultivar et la table Species 
 * pour afficher l'espèce associée au cultivar
 * Va chercher des cultivars à une certaine jutosité minimum et les retourne sous forme de tableau d'objets
 * @async
 * @param {number} minJu - la jutosité minimum du cultivar
 */
const findBymin_juiciness = async (minJu) => {
	try {
		if (!Number.isInteger(parseInt(minJu))) {
			throw new Error(`La valeur "${minJu}" ne peut pas être utilisée dans le cadre de cette opération.`);
		};
		return await knex('cultivar').select(["cultivar.id", "cultivar.name", "cultivar.juiciness", "cultivar.bitterness"]).where('juiciness', '>=', minJu);
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Va chercher des cultivars à une certaine jutosité maximum et les retourne sous forme de tableau d'objets
 * @async
 * @param {number} maxJu - la jutosité maximum du cultivar
 */
const findBymax_juiciness = async (maxJu) => {
	try {
		if (!Number.isInteger(parseInt(maxJu))) {
			throw new Error(`La valeur "${maxJu}" ne peut pas être utilisée dans le cadre de cette opération.`);
		};
		return await knex('cultivar').select(["cultivar.id", "cultivar.name", "cultivar.juiciness", "cultivar.bitterness"]).where('juiciness', '<=', maxJu);
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Va chercher des cultivars à une certaine amertume minimum et les retourne sous forme de tableau d'objets
 * @async
 * @param {number} minBi - l'amertume minimum du cultivar
 */
const findBymin_bitterness = async (minBi) => {
	try {
		if (!Number.isInteger(parseInt(minBi))) {
			throw new Error(`La valeur "${minBi}" ne peut pas être utilisée dans le cadre de cette opération.`);
		};
		return await knex('cultivar').select(["cultivar.id", "cultivar.name", "cultivar.juiciness", "cultivar.bitterness"]).where('bitterness', '>=', minBi);
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Va chercher des cultivars à une certaine amertume maximum et les retourne sous forme de tableau d'objets
 * @async
 * @param {number} maxBi - l'amertume maximum du cultivar
 */
const findBymax_bitterness = async (maxBi) => {
	try {
		if (!Number.isInteger(parseInt(maxBi))) {
			throw new Error(`La valeur "${maxBi}" ne peut pas être utilisée dans le cadre de cette opération.`);
		};
		return await knex('cultivar').select(["cultivar.id", "cultivar.name", "cultivar.juiciness", "cultivar.bitterness"]).where('bitterness', '<=', maxBi);
	} catch (err) {
		throw new Error(err);
	}
};

/**
 * Va chercher un cultivar dans la db et le retourne sous forme d'objet
 * @async
 * @param {number} id - l'id recherché
 * @returns {Cultivar} le cultivar correspondant
 */
 const findById = async (id) => {
	try {
		if (!Number.isInteger(parseInt(id))) {
			throw new Error(`The value "${id}" is not a number`);
		};
		const response = (await knex.raw(`SELECT cultivar.id, species.scientific_name || ' ' || cultivar.name AS full_name, cultivar.juiciness, cultivar.bitterness
		FROM cultivar
		JOIN species ON species.id = cultivar.species_id
		WHERE cultivar.id = ?;`, [id])).rows[0];
		if (response === undefined) {
			throw new Error(`Variety with id ${id} not found`);
		};
		return response;
	} catch (err) {
		throw new Error(err);
	}
	
	// return await knex('cultivar').select().where({id: Math.abs(id)}).first();
};

/**
 * Met à jour un cultivar dans la base de données
 * @async
 * @param {number} id - l'id du cultivar à modifier
 * @param {object} payload - le payload contenant les propriétés du cultivar à modifier
 */
const update = async (id, payload) => {
	try {
		const verif = await knex('cultivar').select().where({id});
		if (verif.length <= 0) {
			throw new Error(`id ${id} not found`);
		};
		return await knex('cultivar').update(payload).where({id}).returning('*');
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Supprime un cultivar dans la base de données
 * @async
 * @param {number} id - l'id du cultivar à supprimer
 */
const destroy = async (id) => {
	try {
		// Je vérifie que l'id est bien un nombre
		if (!Number.isInteger(parseInt(id))) {
			throw new Error(`incorrect id "${id}"`);
		};
		const exists = await knex('cultivar').select('id').where({id});
		if (exists.length <= 0) {
			throw new Error(`id "${id}" not found`);
		};
		return await knex('cultivar').delete().where({id}).returning('*');
	} catch (err) {
		throw new Error(err);
	};
};

module.exports = {
	findAll,
	filterByScores,
	findByName,
	filterBySpecies,
	findAllJoinSpecies,
	findBymin_juiciness,
	findBymax_juiciness,
	findBymin_bitterness,
	findBymax_bitterness,
	findById,
	create,
	update,
	destroy
};