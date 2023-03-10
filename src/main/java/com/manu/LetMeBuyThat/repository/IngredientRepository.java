package com.manu.LetMeBuyThat.repository;

import com.manu.LetMeBuyThat.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
