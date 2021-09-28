const Joi = require('joi');
//**********************************************************************************************************************
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

//**********************************************************************************************************************
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

//**********************************************************************************************************************
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

//**********************************************************************************************************************
/**
 * Change mail validate
 * @param oldEmail
 * @param newEmail
 * @returns {Joi.ValidationResult}
 */
function validateEditEmail({oldEmail, newEmail}){

	const schemaEditEmail = Joi.object({

		oldEmail: Joi.string()
			.email({ minDomainSegments: 2 })
			.lowercase()
			.required(),

		newEmail: Joi.string()
			.email({ minDomainSegments: 2 })
			.lowercase()
			.required(),
	})
	return schemaEditEmail.validate({oldEmail, newEmail});
}
module.exports.validateEditEmail = validateEditEmail;

//**********************************************************************************************************************
/**
 * Change password validate
 * @param oldPass
 * @param newPass1
 * @param newPass2
 * @returns {Joi.ValidationResult}
 */
function validateEditPass({oldPass, newPass1, newPass2}){

	const schemaEditPass = Joi.object({

		oldPass: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),

		newPass1: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),

		newPass2: Joi.ref('newPass1')
	})
	return schemaEditPass.validate({oldPass, newPass1, newPass2});
}
module.exports.validateEditPass = validateEditPass;

//**********************************************************************************************************************
/**
 *
 * @param email
 * @returns {Joi.ValidationResult}
 */
function validateEmail({email}){

	const schemaEmail = Joi.object({

		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.lowercase()
			.required()
	})
	return schemaEmail.validate({email});
}
module.exports.validateEmail = validateEmail;
