package com.manu.LetMeBuyThat.controller;

import com.manu.LetMeBuyThat.model.Meal;
import com.manu.LetMeBuyThat.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @Autowired
    MealService mealService;

    @GetMapping("/")
    public String indexPage(Model model) {
        model.addAttribute("allMeals", mealService.getAllMealsOrdered());
        return "index";
    }

    @GetMapping("/meal")
    public @ResponseBody Meal getSpecificMeal(@RequestParam Long id) {
        Meal meal = mealService.findById(id);
        return meal;
    }
}
