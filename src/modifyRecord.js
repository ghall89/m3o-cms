const inquirer = require('inquirer');
const { dbRead, dbModify } = require('./utils/db');
const { validateText, validateUrl } = require('./utils/validate');
const tags = require('./utils/tags');

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

module.exports = { modifyRecord };
