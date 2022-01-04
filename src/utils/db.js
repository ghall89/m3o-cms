require('dotenv').config();

const { DbService } = require('m3o/db');

const dbService = new DbService(process.env.API_KEY);

//read function

const dbRead = async () => {
	const rsp = await dbService
		.read({
			table: 'portfolio'
		})
		.catch(err => {
			throw 'No response from db.';
		});
	return rsp;
};

//create function

const dbCreate = async input => {
	const rsp = await dbService
		.create({
			record: input,
			table: 'portfolio'
		})
		.then(rsp => {
			console.log(`New entry created for ${input.title}.`);
		})
		.catch(err => {
			throw 'No response from db.';
		});
};

// modify function

const dbModify = async input => {
	const rsp = await dbService
		.update({
			record: input,
			table: 'portfolio'
		})
		.then(rsp => {
			console.log(`${input.title} was updated!`);
		})
		.catch(err => {
			throw 'No response from db.';
		});
};

//delete function

const dbDelete = async input => {
	const rsp = await dbService
		.delete({
			id: input.id,
			table: 'portfolio'
		})
		.then(rsp => {
			console.log(`${input.title} has been deleted!`);
		})
		.catch(err => {
			throw 'No response from db.';
		});
};

module.exports = { dbRead, dbCreate, dbModify, dbDelete };
