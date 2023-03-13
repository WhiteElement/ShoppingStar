package com.manu.LetMeBuyThat.controller;

import com.manu.LetMeBuyThat.model.Email;
import com.manu.LetMeBuyThat.model.EmailWrapper;
import com.manu.LetMeBuyThat.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class EmailController {

    @Autowired
    EmailService emailService;

    //send einkaufszettel to mail adresses
    @PostMapping(value = "/sendto")
    public ResponseEntity sendShoppingListTo(@RequestBody EmailWrapper emails) {

        for(Email email : emails.getEmails()) {
            System.out.println(email.getId());
            System.out.println(email.getAdress());
        }
        //send logic

        return new ResponseEntity(HttpStatus.OK);
    }


    //get all email adresses
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


}
