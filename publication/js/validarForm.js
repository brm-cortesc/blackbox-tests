$(document).ready(function(){

  $("#Registro").validate({
 	rules: {
	       nombre:            {required: true }, 
	       fechaDeNacimiento: {required: true}, 
	       identificacion:    {required: true,
	       					   digits:true, 
	       					   minlength: 7},
	       email:             {required: true,
	       						email: true},  
	       colegio:           {required: true},
	       colegioVoto:       {required: true},

	       nombreAcudiente:   {required: true},
	       parentesco:        {required: true }, 
	       cedula:            {required: true,
	       					   digits:true, 
	       					   minlength: 7},       
	       emailAcudiente:    {required: true,
	       					   email: true}, 
	       ciudad:            {required: true,
	       					   maxlength:70},  
	        terminos:    	  {required: true},  
		    privacidad:       {required: true},
		    otro: 		      {required: true},

	       },


	messages: {
	       nombre:            {required: "<span>Debes Ingresar tu Nombre</span>",
	                         
	                          }, 
	       fechaDeNacimiento: {required: "<span>Debes Ingresar tu fecha de Nacimiento</span>",
	                          dateITA:"<span>Error en tu fecha de Nacimiento</span>"},
	       identificacion:   {required: "<span>Debes Ingresar tu Documento</span>",
	                            digits: "<span>Por favor ingresa solo numeros.</span>",
	                            minlength:"<span>Por favor ingresar minimo 7 digitos.</span>"
	                          }, 
	       email:             {required: "<span>Debes Ingresar tu Correo Electronico</span>",
	                             email:"<span>Por favor ingresa una direccion de correo valida.</span>"                            
	                          }, 
	       colegio:           {required:"<span>Debes Elegir el Nombre de tu Colegio"},
	       colegioVoto:       {required:"<span>Debes elgir tu colegio favorito para realizar el voto"},

	        nombreAcudiente:  {required: "<span>Debes Ingresar tu Nombre</span>"},                        
	                          
	        parentesco:       {required: "<span>Debes Seleccionar un parentescos</span>"},  
	                          
	        cedula:           {required: "<span>Debes Ingresar tu Numeró de cedula</span>",
	                             digits: "<span>Por favor ingresa solo numeros.</span>",
	                             minlength:"<span>Por favor ingresar minimo 7 digitos.</span>"
	                          },
	         
	        emailAcudiente:   {required: "<span>Debes Confirmar tu Correo Electronico</span>",
	                            equalTo: "<span>Tus Emails no coinciden</span>"},
			ciudad:           {required: "<span>Debes Ingresar tu Ciudad</spab>"},   
			                        
	        terminos:    	  {required: "<span class='errMensaje'>Debes aceptar los terminos y condiciones</span>"}, 
		    privacidad:  	  {required: "<span class='errMensaje'>Debes aceptar los terminos y condiciones</span>"},

		    otro:  			  {required: "<span class='errMensaje'>Debes Ingresar el Nombre de tu colegio</span>"},

         },

         highlight: function(element, errorClass, validClass)
         {
         	if($(element)[0].id=="terminos"){
         	  $(element.form).find("label[for=" + element.id + "]").removeClass("pintaCheck");
         	};

         	if($(element)[0].id=="privacidad"){
         	  $(element.form).find("label[for=" + element.id + "]").removeClass("pintaCheck");
         	};
         },

         unhighlight: function(element, errorClass, validClass)
         {
         	if($(element)[0].id=="terminos"){
         	  $(element.form).find("label[for=" + element.id + "]").addClass("pintaCheck");
         	};

         	if($(element)[0].id=="privacidad"){
         	  $(element.form).find("label[for=" + element.id + "]").addClass("pintaCheck");
         	};
         },

      });
  });	



