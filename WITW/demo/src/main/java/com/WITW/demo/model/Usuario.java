package com.WITW.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_usuario;

    private String nombre_usuario;
    private String email;
    private String contrasena_hash;

    //modificable por tipo de dato
    //private Date fecharegistro;


    public Usuario(){}

    public Usuario (String nombre_usuario, String email, String contrasena_hash){
        this nombre_usuario = nombre_usuario;
        this email = email;
        this contrasena_hash = contrasena_hash
    }
}