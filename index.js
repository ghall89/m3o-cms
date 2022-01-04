const inquirer = require('inquirer');

const { dbRead, dbCreate, dbModify, dbDelete } = require('./src/utils/db');
const { validateText, validateUrl } = require('./src/utils/validate.js');

const { readRecord } = require('./src/readRecord');
const { createRecord } = require('./src/createRecord');
const { modifyRecord } = require('./src/modifyRecord');
const { deleteRecord } = require('./src/deleteRecord');

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
