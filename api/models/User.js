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

	username: {
		type: 'string',
		required: true,
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
	},
	
	validPassword: function(password, callback) {
		var obj = this.toObject();
		if (callback) {
			return bcrypt.compare(password, obj.password, callback);
		}
		return bcrypt.compareSync(password, obj.password);
	}
  },

  beforeCreate: function(values, next) {
	hashPassword(values, next);
  },

  beforeUpdate: function(values, next) {
	if(values.password && values.new_password && values.confirm_password) {
		if (values.new_password === values.confirm_password){
			User.findOne(values.id).done(function(err, user){
				if (err) return next(err);
				if (user.validPassword(values.password)){
					values.password = values.new_password;
					delete values.confirm_password;
					hashPassword(values, next);
				}
			});
		}
	} else {
		User.findOne(values.id).done(function(err, user){
			if (err) {return next(err);}
			else {
				values.password = user.password;
				next();
			}
		});
	}
  }

};

var bcrypt = require('bcrypt');

function hashPassword(values, next) {
	bcrypt.genSalt(10, function(err, salt){
		if (err) return next (err);
		bcrypt.hash(values.password, salt, function(err, hash){
			if (err) return next(err);
			values.password = hash;
			next();
		});
	});
}
