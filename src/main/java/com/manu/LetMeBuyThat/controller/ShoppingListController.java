package com.manu.LetMeBuyThat.controller;

import com.manu.LetMeBuyThat.model.ShoppingList;
import com.manu.LetMeBuyThat.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
public class ShoppingListController {

    @Autowired
    ShoppingListService shoppingListService;

    @PostMapping("/newlist")
    public ResponseEntity<ShoppingList> createShoppingList(@RequestBody ShoppingList list) {

        ShoppingList shoppingList = list;
        Date date = new Date();
        shoppingList.setUpdateDate(date);
        shoppingListService.save(shoppingList);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/shoppinglists")
    public @ResponseBody List<ShoppingList> getAllShoppingLists() {
        return shoppingListService.findAll();
    }

    @DeleteMapping("/deleteshoppinglist")
    public ResponseEntity<ShoppingList> deleteShoppingList(@RequestParam Long id) {
        ShoppingList shoppingList = shoppingListService.findById(id);
        shoppingListService.delete(shoppingList);

        return ResponseEntity.ok(shoppingList);
    }
}
