require('dotenv').config();

const { DbService } = require('m3o/db');
const inquirer = require('inquirer');
const { table } = require('table');

const dbService = new DbService(process.env.API_KEY);

// check if input is empty
const validateText = input => {
	if (!input) {
	} else {
		return true;
	}
};

// check if URL is valid
const validateUrl = input => {
	const urlPattern =
		/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

	if (urlPattern.test(input)) {
		return true;
	} else {
		console.log('Input must be a valid URL!');
		return false;
	}
};

async function readRecords() {
	const rsp = await dbService
		.read({
			table: 'portfolio'
		})
		.catch(err => {
			throw 'No response from db.';
		});

	const options = [];

	for (let i = 0; i < rsp.records.length; i++) {
		options.push(rsp.records[i].title);
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
			console.log(rsp.records[answers.choice]);
		});
}

async function createArecord(input) {
	const rsp = await dbService
		.create({
			record: {
				title: input.title,
				description: input.description,
				url: input.url,
				github: input.github,
				img: input.img,
				tags: input.tags
			},
			table: 'portfolio'
		})
		.catch(err => {
			throw 'No response from db.';
		});
	console.log(`New entry created with an id of: ${rsp.id}`);
}

async function deleteRecord() {
	const rsp = await dbService
		.read({
			table: 'portfolio'
		})
		.catch(err => {
			throw 'No response from db.';
		});

	const options = [];

	for (let i = 0; i < rsp.records.length; i++) {
		options.push(rsp.records[i].title);
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
		.then(async answers => {
			if (answers.confirm) {
				const rsp2 = await dbService.delete({
					id: rsp.records[answers.choice].id,
					table: 'portfolio'
				});
				console.log(`${options[answers.choice]} has been deleted!`);
			}
		});
}

const newEntry = () => {
	inquirer
		.prompt([
			{
				name: 'title',
				type: 'input',
				message: 'Project Name:',
				validate: input => {
					return validateText(input);
				}
			},
			{
				name: 'description',
				type: 'input',
				message: 'Description:',
				validate: input => {
					return validateText(input);
				}
			},
			{
				name: 'url',
				type: 'input',
				message: 'Project URL:',
				validate: input => {
					return validateUrl(input);
				}
			},
			{
				name: 'github',
				type: 'input',
				message: 'GitHub URL:',
				validate: input => {
					return validateUrl(input);
				}
			},
			{
				name: 'img',
				type: 'input',
				message: 'Image URL:',
				validate: input => {
					return validateUrl(input);
				}
			},
			{
				name: 'tags',
				type: 'checkbox',
				message: 'Select Tags',
				choices: [
					'HTML',
					'CSS',
					'JavaScript',
					'JSON',
					'DOM',
					'jQuery',
					'Bootstrap',
					'Tailwind',
					'Node.js',
					'React',
					'Netlify',
					'Heroku',
					'Electron'
				]
			}
		])
		.then(answers => {
			console.log(answers);
			createArecord(answers);
		});
};

inquirer
	.prompt([
		{
			name: 'action',
			type: 'list',
			message: 'Pick an action:',
			choices: ['View Records', 'Add Record', 'Delete Record']
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
			case 'Delete Record':
				deleteRecord();
				break;
		}
	});
