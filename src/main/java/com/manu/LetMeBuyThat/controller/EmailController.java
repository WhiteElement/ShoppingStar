package com.manu.LetMeBuyThat.controller;

import com.manu.LetMeBuyThat.model.Email;
import com.manu.LetMeBuyThat.model.EmailSenderDTO;
import com.manu.LetMeBuyThat.model.EmailWrapper;
import com.manu.LetMeBuyThat.model.ShoppingList;
import com.manu.LetMeBuyThat.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
public class EmailController {

    @Autowired
    EmailService emailService;

    @PostMapping("/sendto")
    public ResponseEntity sendShoppingListTo(@RequestBody EmailSenderDTO emailSenderDTO) {
        emailService.sendShoppingListToAdresses(emailSenderDTO);
        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping("/emails")
    public @ResponseBody List<Email> getAllEmails() {
        List<Email> emails = emailService.findAll();
        return emails;
    }

    @PostMapping("/saveemail")
    public ResponseEntity saveEmailAdress(@RequestBody Email email) {
        emailService.save(email);

        return ResponseEntity.ok(email);
    }

    @DeleteMapping("/deletemail")
    public ResponseEntity<Email> deleteEmail(@RequestParam Long id) {
        Email email = emailService.findById(id);
        emailService.delete(email);

        return ResponseEntity.ok(email);
    }


}
