package com.manu.LetMeBuyThat.model;

import jakarta.persistence.*;

@Entity
public class Ingredient {

    @Id @GeneratedValue
    private Long Id;

    private String name;
    private String measure;

    @ManyToOne(fetch = FetchType.LAZY)
    private Meal meal;

    public Ingredient() {}

    public Ingredient(String name, String measure) {
        this.name = name;
        this.measure = measure;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMeasure() {
        return measure;
    }

    public void setMeasure(String measure) {
        this.measure = measure;
    }
}
