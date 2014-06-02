/**
 * EventController
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
    
new: function(req, res) {
		// Response the view with the action's name.
		if (req.isAuthenticated()){
			return res.view();	
		}
		else{
			return res.redirect('/');
		}
		
	},  
find: function(req, res) {

		if(req.isAuthenticated()){
			Event.findByUsuario(req.param('id')).done(function foundEvent(err, event){
				if ( err ) return next(err);
				return res.view({ event: event });
					//return res.json(event);
			});
		}
		else{
			return res.redirect('/');
		}
	},  
create: function(req, res, next) {
		// Create an user using all params.
		// Schema is true, then we will save that we need.
		Event.create( req.params.all(), function createdEvent(err, event){
			if (err) return next(err);
			if (req.wantsJSON) return res.json(201, event);
			else return res.redirect('/event/' + req.param('usuario'));
			
		});
	},
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to EventController)
   */
  _config: {}

  
};
