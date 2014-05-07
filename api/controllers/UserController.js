/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
	auth: function(req, res) {
		return res.view();
	}

	login: function(req, res) {
		User.findOne({email: req.param('email')}).done(function foundUser(err, user){
			if ( err || !user ) return res.redirect('/auth');
			require('bcrypt').compare(req.param('password'), user.password, function(err, valid){
				if(err || !valid ) return res.redirect('/auth');
				req.session.authenticated = true;
				req.session.user = user;
				return res.redirect('/user/' + user.id);
			});
		});
	}

	create: function(req, res, next) {
		User.create( req.params.all(), function createdUser(err, user){
			[…]
			req.session.authenticated = true;
			req.session.user = user;
			[…]
		});
	}
  
	logout: function(req, res){
		req.session.destroy();
		return res.redirect('/');
	}

	_config: {}

  
};
