const Joi = require('joi');

/**
 * Registration input data validation
 * @param email
 * @param password
 * @param nickname
 * @returns {Joi.ValidationResult}
 */
function validateRegData({email, password, nickname}) {

	const schemaReg = Joi.object({

		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.lowercase()
			.required(),

		password: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),

		nickname: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required(),
	})
	 return schemaReg.validate({email, password, nickname});
}
module.exports.validateRegData = validateRegData;

/**
 * Login input data validate
 * @param email
 * @param password
 * @returns {Joi.ValidationResult}
 */
function validateLogData({email, password}) {

	const schemaLog = Joi.object({

		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.lowercase()
			.required(),

		password: Joi.string()
			.required(),
	})
	return schemaLog.validate({email, password});
}
module.exports.validateLogData = validateLogData;

/**
 * Tweet text validate
 * @param tweetText
 * @returns {Joi.ValidationResult}
 */
function validateTweetText({tweetText}) {

	const schemaTweet= Joi.object({

		tweetText: Joi.string()
			.min(1)
			.max(280)
			.required(),
	})
	return schemaTweet.validate({tweetText});
}
module.exports.validateTweetText = validateTweetText;
