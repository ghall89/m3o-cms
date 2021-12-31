require('dotenv').config();

const { DbService } = require('m3o/db');
const inquirer = require('inquirer');
const { table } = require('table');

const dbService = new DbService(process.env.API_KEY);

async function readRecords() {
	const rsp = await dbService.read({
		table: 'names'
	});
	const data = [['FIRST NAME', 'LAST NAME', 'AGE']];
	for (let i = 0; i < rsp.records.length; i++) {
		const arr = [
			rsp.records[i].firstName,
			rsp.records[i].lastName,
			rsp.records[i].age
		];
		data.push(arr);
	}
	console.log(table(data));
}

async function createArecord(input) {
	const rsp = await dbService.create({
		record: {
			firstName: input.firstName,
			lastName: input.lastName,
			age: input.age
		},
		table: 'names'
	});
	console.log(`New entry created with an id of: ${rsp.id}`);
}

const validate = input => {
	if (!input) {
		return false;
	} else {
		return true;
	}
};

const newEntry = () => {
	inquirer
		.prompt([
			{
				name: 'firstName',
				type: 'input',
				message: 'First Name:',
				validate: input => {
					if (!input) {
						console.log('Input cannot be blank!');
						return false;
					} else {
						return true;
					}
				}
			},
			{
				name: 'lastName',
				type: 'input',
				message: 'Last Name:',
				validate: input => {
					if (!input) {
						console.log('Input cannot be blank!');
						return false;
					} else {
						return true;
					}
				}
			},
			{
				name: 'age',
				type: 'input',
				message: 'Age:',
				validate: input => {
					if (!input) {
						console.log('Input cannot be blank!');
						return false;
					} else if (isNaN(input)) {
						console.log('Input must be a number');
						return false;
					} else {
						return true;
					}
				}
			}
		])
		.then(answers => {
			createArecord(answers);
		});
};

inquirer
	.prompt([
		{
			name: 'action',
			type: 'list',
			message: 'Pick an action:',
			choices: ['View Records', 'Add Record']
		}
	])
	.then(answers => {
		switch (answers.action) {
			case 'View Records':
				readRecords();
				break;
			case 'Add Record':
				newEntry();
				break;
		}
	});
