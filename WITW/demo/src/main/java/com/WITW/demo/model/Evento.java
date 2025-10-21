package com.WITW.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Evento{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_usuario;

    private String nombre;
    private String descripcion;
    private float precio;
    private int max_asistentes;
    private String ubicacion_texto;
    private Usuario organizador;

    //fecha y hora de inicio y fin por argegar segun formato, li mismo pero para creacion
    
    //latitud y longitud se añaden mediante mapa o api? por verse

    public Evento() {}//obligatorio para JPA

    public Evento(String nombre, String descripcion, float precio, String ubicacion_texto){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ubicacion_texto = ubicacion_texto;
    }
}