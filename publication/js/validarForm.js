$(document).ready(function(){

  $("#Registro").validate({

  	//Contenedor y clase donde se pinta el error
  	errorElement: "div",
  	errorClass: "mensaje-error",

 	rules: {
	       nombre:            {required: true }, 
	       email:             {required: true,
	       						email: true},  
	       password:           "required",
	       Cpass: {equalTo: "#password"}


	       },


	messages: {
		nombre: "debes ingresar un nombre",
		email: "ingresa un email válido",
		password: "ingresa una contraseña",
		Cpass: "las constraseñas con coinciden"

         }

      });
  });	



