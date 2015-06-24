$(document).ready(function (){
  
  $("#Btnregistro").click(function(){
    //if($("#Registro").valid()){
      $.ajax({
        url:"guardaRegistro.php",
        method:'post',
        data: $("#Registro").serialize()
      }).success(function(data){
        console.log(data);
      });
   // }
  });
  
});


