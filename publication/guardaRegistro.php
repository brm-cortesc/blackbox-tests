<?php
/**
 * @author Fabian Andres Benavides Valencia
 * @author Cristian Camilo Cortés Pulido
 */
include './conexionDB.php';
include './registro.php';
$conexion = new conexionDB("localhost","root","", "cajanegra");
$varPost = filter_input_array(INPUT_POST);
$registro = new registro();
$estadoRegistro = "registroOk";
foreach ($varPost as $key => $value) {
  if(property_exists('registro',$key)){
    $registro->$key = $value;
  }
}
$registro->fechaRegistro =  date("Y-m-d"); 
try{
  $conexion->guardaRegistro((array)$registro);
}catch(PDOException $e){
    $estadoRegistro = "ERROR: " . $e->getMessage();
  }
echo $estadoRegistro;