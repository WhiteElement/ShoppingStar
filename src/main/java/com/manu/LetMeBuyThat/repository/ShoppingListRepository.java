package com.manu.LetMeBuyThat.repository;

import com.manu.LetMeBuyThat.model.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
}
