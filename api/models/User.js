/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	email: {
		type: 'string',
		required: true,
		email: true,
		unique: true
	},

	password: {
		type: 'string',
		required: true
	},
   	 
	toJSON: function() {
		var obj = this.toObject();
		delete obj.password;
		return obj;
	}
  }

};
