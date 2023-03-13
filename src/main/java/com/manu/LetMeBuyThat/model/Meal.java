package com.manu.LetMeBuyThat.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Meal {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private String name;

    @JsonManagedReference
    @OneToMany( cascade = CascadeType.ALL, mappedBy = "meal", orphanRemoval = true)
    private List<Ingredient> ingredients = new ArrayList<>();

    public Meal() {}

    public Meal(String name) {
        this.name = name;
    }

    public Meal(String name, List<Ingredient> ingredients) {
        this.name = name;
        this.ingredients = ingredients;
    }

    public Meal(Long id, String name, List<Ingredient> ingredients) {
        Id = id;
        this.name = name;
        this.ingredients = ingredients;
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

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
}
