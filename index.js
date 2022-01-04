require('dotenv').config();

const { DbService } = require('m3o/db');
const inquirer = require('inquirer');

const dbService = new DbService(process.env.API_KEY);

const tags = [
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
];

// check if input is empty
const validateText = input => {
	if (!input) {
		return false;
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

//get user input and pass it to dbCreate

const createRecord = () => {
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
				choices: tags
			}
		])
		.then(answers => {
			dbCreate(answers);
		});
};

//get user input and pass it to dbModify

const modifyRecord = async () => {
	const data = await dbRead();

	const options = [];

	let oldData;

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
		.then(async answers => {
			oldData = data.records[answers.choice];

			inquirer
				.prompt([
					{
						name: 'title',
						type: 'input',
						message: 'Project Name:',
						default: oldData.title,
						validate: input => {
							return validateText(input);
						}
					},
					{
						name: 'description',
						type: 'input',
						message: 'Description:',
						default: oldData.description,
						validate: input => {
							return validateText(input);
						}
					},
					{
						name: 'url',
						type: 'input',
						message: 'Project URL:',
						default: oldData.url,
						validate: input => {
							return validateUrl(input);
						}
					},
					{
						name: 'github',
						type: 'input',
						message: 'GitHub URL:',
						default: oldData.github,
						validate: input => {
							return validateUrl(input);
						}
					},
					{
						name: 'img',
						type: 'input',
						message: 'Image URL:',
						default: oldData.img,
						validate: input => {
							return validateUrl(input);
						}
					},
					{
						name: 'tags',
						type: 'checkbox',
						message: 'Select Tags',
						default: oldData.tags,
						choices: tags
					}
				])
				.then(answers => {
					dbModify({ ...answers, id: oldData.id });
				});
		});
};

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

// initial menu

inquirer
	.prompt([
		{
			name: 'action',
			type: 'list',
			message: 'Pick an action:',
			choices: ['View Records', 'Add Record', 'Edit Record', 'Delete Record']
		}
	])
	.then(answers => {
		switch (answers.action) {
			case 'View Records':
				readRecord();
				break;
			case 'Add Record':
				createRecord();
				break;
			case 'Edit Record':
				modifyRecord();
				break;
			case 'Delete Record':
				deleteRecord();
				break;
		}
	});
