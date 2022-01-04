// check if input is empty
const validateText = input => {
	if (!input) {
		console.log('Input cannon be blank!');
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

module.exports = {
	validateText,
	validateUrl
};
