package com.manu.LetMeBuyThat.service;

import com.manu.LetMeBuyThat.model.Meal;
import com.manu.LetMeBuyThat.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public void save(Meal meal) {
        mealRepository.save(meal);
    }

    public Meal getReferenceById(Long id) {
        return mealRepository.getReferenceById(id);
    }

    public void delete(Meal meal) {
        mealRepository.delete(meal);
    }
}
