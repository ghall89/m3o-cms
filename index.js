require('dotenv').config();

const { DbService } = require('m3o/db');
const inquirer = require('inquirer');
const { table } = require('table');

const dbService = new DbService(process.env.API_KEY);

async function readRecords() {
	const rsp = await dbService.read({
		table: 'portfolio'
	});

	const options = [];

	for (let i = 0; i < rsp.records.length; i++) {
		options.push(rsp.records[i].title);
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
	const rsp = await dbService.create({
		record: {
			title: input.title,
			description: input.description,
			url: input.url,
			github: input.github,
			img: input.img,
			tags: input.tags
		},
		table: 'portfolio'
	});
	console.log(`New entry created with an id of: ${rsp.id}`);
}

async function deleteRecord() {
	const rsp = await dbService.read({
		table: 'portfolio'
	});

	const options = [];

	for (let i = 0; i < rsp.records.length; i++) {
		options.push(rsp.records[i].title);
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
					if (!input) {
						console.log('Input cannot be blank!');
						return false;
					} else {
						return true;
					}
				}
			},
			{
				name: 'description',
				type: 'input',
				message: 'Description:',
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
				name: 'url',
				type: 'input',
				message: 'Project URL:',
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
				name: 'github',
				type: 'input',
				message: 'GitHub URL:',
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
				name: 'img',
				type: 'input',
				message: 'Image URL:',
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
