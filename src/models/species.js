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
 * Va chercher les espèces qui appartiennent à une certaine famille
 * @async
 */
const findAll = async () => {
	try {
		const response = await knex('species').select('*').orderBy('id');
		return response;
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Ajoute une species dans la base de données
 * @async
 * @param {object} payload - le payload contenant les propriétés du cultivar à insérer
 */
const create = async (payload) => {
	try {
		Object.keys(payload).forEach(property => {
			if (!["vernacular_name", "scientific_name", "family"].includes(property)) {
				throw new Error(`Incorrect property found in payload : "${property}"`);
			};
		});
		return await knex('species').insert(payload).returning('*');
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Met à jour un species dans la base de données
 * @async
 * @param {number} id - l'id du species à modifier
 * @param {object} payload - le payload contenant les propriétés du species à modifier
 */
const update = async (id, payload) => {
	try {
		// Je vérifie que l'id est bien un nombre
		if (!Number.isInteger(parseInt(id))) {
			throw new Error(`Incorrect id "${id}"`);
		};
		const exists = await knex('species').select('id').where({id});
		if (exists.length <= 0) {
			throw new Error(`id ${id} not found`);
		};
		// Je vérifie que le payload contient des valeurs correctes
		Object.keys(payload).forEach(property => {
			if (!["vernacular_name", "scientific_name", "family"].includes(property)) {
				throw new Error(`Incorrect property found in payload : "${property}"`);
			};
		});
		return await knex('species').update(payload).where({id}).returning('*');
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Supprime un species dans la base de données
 * @async
 * @param {number} id - l'id du species à supprimer
 */
const destroy = async (id) => {
	try {
		// Je vérifie que l'id est bien un nombre
		if (!Number.isInteger(parseInt(id))) {
			throw new Error(`incorrect id "${id}"`);
		};
		const exists = await knex('species').select('id').where({id});
		if (exists.length <= 0) {
			throw new Error(`id "${id}" not found`);
		};
		const response = await knex('species').delete().where({id}).returning('*');
		return response[0];
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Va chercher les species qui appartiennent à une certaine famille
 * @async
 * @param {string} family - la famille du species
 */
const findByFamily = async (family) => {
	try {
		if (family.trim() === "") {
			throw new Error("Incorrect family");
		};
		const response = await knex('species').select().where('family', '=', family);
		return response;
	} catch (err) {
		throw new Error(err);
	};
};

/**
 * Va chercher les espèces qui appartiennent à une certaine famille
 * @async
 * @param {string} family - la famille de l'espèce
 */
 const findById = async (id) => {
	try {
		// Je vérifie qu'il s'agisse bien d'un nombre
		if (!Number.isInteger(parseInt(id))) {
			throw new Error(`Incorrect value "${id}"`);
		};
		id = parseInt(id);
		const response = await knex('species').select('*').where('id', '=', id).first();
		if (response === undefined) {
			throw new Error(`Id ${id} not found`);
		};
		return response;
	} catch (err) {
		throw new Error (err);
	};
};

module.exports = {
	findAll,
	create,
	update,
	destroy,
    findByFamily,
	findById
};