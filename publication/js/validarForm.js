$(document).ready(function(){

  $("#Registro").validate({

  	 // debug: true,

  	//Contenedor y clase donde se pinta el error
  	errorElement: "div",
  	errorClass: "mensaje-error",

  	//Campos para validar

 	rules: {
	       nombre: 				{required: true, accept: "[a-zA-Z]+" }, 
	       email: 				{required: true, email: true},  
	       password: 			{required: true},
	       Cpass: 				{equalTo: "#password"},
	       fechaNacimiento: 	{required: true, date: true },
	       tarjetaID: 			{required: true, digits: true },
	       Col: 				{required: true},
	       terminos: 			{required: true},
	       Radios: 				{required: true},
	       texto: 				{required: true, maxlength: 500,},
	       rango: 				{required: true, range: [1, 100]},
	       url: 				{required: true, url:true}
	       // archivo: 			{required: true, extension: "jpg|png"}
	       },

	//Mensajes en caso de dar error para cada input
	messages: {
		nombre: 			{required: "debes ingresar un nombre", accept: "Ingresa solo texto"},
		email: 				"ingresa un email válido",
		password: 			"ingresa una contraseña",
		Cpass: 				"las constraseñas no coinciden",
		fechaNacimiento: 	"No haz seleccionado una fecha",
		tarjetaID: 			{required: "Indíca un número", digits: "Ingresa solo números" },
		Col: 				"No haz seleccionado un país",
		terminos: 			"debes aceptar los términos y condiciones",
		Radios: 			"Selecciona una opción",
		texto: 				{required: "Comenta algo", maxlength: "solo puedes escribir máximo 500 caracteres"},
		rango: 				{range: "debe ser mayor a 0"},
		url: 				{url: "ingresa una url válida"},
		archivo: 			{required:"debes seleccionar un archivo", extension: "solo son válidas las extesiones JPG, PNG o GIF "}

         },
         
    //Ubicación del Div de error
    errorPlacement:
        function (error, element) {
        	if (element.is(":checkbox")) {
            	error.appendTo("#auth");
        	} else {
            	error.insertAfter(element);
			}
    }

      });
  });	



