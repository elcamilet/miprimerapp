/**
 * Event
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    nombre: {
    	type: 'string',
    	required: true
    },
    descripcion: {
    	type: 'string',
    	required: false
    },
    fecha: {
    	type: 'string',
    	required: false
    },
    usuario: {
      type: 'string',
      required: true
    }
  }

};
