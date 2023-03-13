package com.manu.LetMeBuyThat.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Ingredient {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    private String name;
    private String measure;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
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

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }
}
