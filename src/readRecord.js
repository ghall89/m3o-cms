const inquirer = require('inquirer');
const { dbRead } = require('./utils/db');

// get data from database and display chosen item

const readRecord = async () => {
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
			}
		])
		.then(answers => {
			if (answers) {
				console.log(data.records[answers.choice]);
			}
		})
		.catch(err => {
			throw err;
		});
};

module.exports = { readRecord };
