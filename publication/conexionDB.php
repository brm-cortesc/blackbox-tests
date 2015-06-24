<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of conexionDB
 *
 * @author AndresV
 */
class conexionDB {
  private $host;
  private $user;
  private $password;
  private $database;
  private $conex;
  
  function __construct($host, $user, $password, $database) {
    $this->host = $host;
    $this->user = $user;
    $this->password = $password;
    $this->database = $database;
    $this->conex =  new PDO("mysql:host=$host;dbname=$database", "$user", "$password");
    $this->conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  function getHost() {
    return $this->host;
  }

  function getUser() {
    return $this->user;
  }

  function getPassword() {
    return $this->password;
  }

  function getDatabase() {
    return $this->database;
  }

  function setHost($host) {
    $this->host = $host;
  }

  function setUser($user) {
    $this->user = $user;
  }

  function setPassword($password) {
    $this->password = $password;
  }

  function setDatabase($database) {
    $this->database = $database;
  }

  function guardaRegistro($registro){
    $sql = $this->conex->prepare("INSERT INTO registro (id, nombre, email, password, fecha, tarjetaID, Col, terminos, Radios, texto, rango, url, fechaRegistro) VALUES (NULL, :nombre, :email, :password, :fecha, :tarjetaID, :Col, :terminos, :Radios, :texto, :rango, :url,:fechaRegistro)");
    $sql->execute($registro);
  }

}
