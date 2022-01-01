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
