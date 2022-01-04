const inquirer = require('inquirer');
const { dbCreate } = require('./utils/db');
const { validateText, validateUrl } = require('./utils/validate');
const tags = require('./utils/tags');

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

module.exports = { createRecord };
