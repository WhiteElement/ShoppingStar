package com.manu.LetMeBuyThat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Email {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long Id;

    private String adress;

    public Email() {}

    public Email(Long id, String adress) {
        Id = id;
        this.adress = adress;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }
}
