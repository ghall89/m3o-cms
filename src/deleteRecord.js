const inquirer = require('inquirer');
const { dbRead, dbDelete } = require('./utils/db');

//get user input and pass it to dbDelete

const deleteRecord = async () => {
	const data = await dbRead();

	const options = [];

	for (let i = 0; i < data.records.length; i++) {
		options.push(data.records[i].title);
	}

	if (options.length < 1) {
		console.log('Database is empty.');
		return;
	}

	inquirer
		.prompt([
			{
				name: 'choice',
				type: 'list',
				message: 'Choose a record:',
				choices: options,
				filter: input => {
					return options.indexOf(input);
				}
			},
			{
				name: 'confirm',
				type: 'confirm',
				message: 'Are you sure you want to delete this record?'
			}
		])
		.then(answers => {
			if (answers.confirm) {
				dbDelete(data.records[answers.choice]);
			}
		});
};

module.exports = { deleteRecord };
