package com.manu.LetMeBuyThat.service;

import com.manu.LetMeBuyThat.model.ShoppingList;
import com.manu.LetMeBuyThat.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingListService {

    @Autowired
    ShoppingListRepository shoppingListRepository;

    public void save(ShoppingList shoppingList) {
        shoppingListRepository.save(shoppingList);
    }

    public List<ShoppingList> findAll() {
        return shoppingListRepository.findAll();
    }

    public ShoppingList findById(Long id) {
        return shoppingListRepository.findById(id).get();
    }

    public void delete(ShoppingList shoppingList) {
        shoppingListRepository.delete((shoppingList));
    }
}
