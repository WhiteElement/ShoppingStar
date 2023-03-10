package com.manu.LetMeBuyThat.repository;

import com.manu.LetMeBuyThat.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {

    @Query("from Meal m order by m.name asc")
    List<Meal> findAllOrdered();
}
