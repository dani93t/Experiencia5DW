/**
 * AlumnoController
 *
 * @description :: Server-side logic for managing alumnoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	show:function(req,res){
 			Alumno.find(function foundUser (err, alumnos) {
           	    if(err) console.log(err);
                return res.view('lista',{
                  alumnos: alumnos
                });
              });
	},

	agregar:function (req,res) {
		sails.log(req);
				Alumno.create(req.params.all(), function userCreated(err, alumno) {
                  if (err) console.log(err);
                  res.redirect('/'); 
                });
	},

	traer:function(req,res){
		var id = req.param('id');
		Alumno.find(id,function(err,alumno){
			if(err) return res.send(err);
			else {
				return res.view('cambiar_nota',{alumno:alumno});
			}
		}) 
	},

	modificar:function(req,res){
		var param = req.params.all();
		var id = param.id;
		Alumno.update(id,param,function(err,user){
			if(err) return res.send(err);
			else{
				return res.redirect('lista');
			}

		});
	},


	eliminar:function(req,res){
		sails.log(req);
		var id = req.param('id');
		if (!id) return res.send("No id.",500);

		Alumno.find(id, function foundUser(err, user) {
			if (err) return res.send(err,500);
			if (!Alumno) return res.send("No existe usuario",404);

			Alumno.destroy(id, function userDestroyed(err) {
				if (err) return res.send(err,500);
				return res.redirect('lista');
			});
			
		})
	},


};

