package com.manu.LetMeBuyThat.service;

import com.manu.LetMeBuyThat.model.Meal;
import com.manu.LetMeBuyThat.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealService {

    @Autowired
    MealRepository mealRepository;

    public List<Meal> getAllMealsOrdered() {
        return mealRepository.findAllOrdered();
    }

    public Meal findById(Long id) {
        return mealRepository.findById(id).get();
    }
}
