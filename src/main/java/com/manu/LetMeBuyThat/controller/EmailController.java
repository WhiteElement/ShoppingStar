package com.manu.LetMeBuyThat.controller;

import com.manu.LetMeBuyThat.model.Email;
import com.manu.LetMeBuyThat.model.EmailWrapper;
import com.manu.LetMeBuyThat.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
public class EmailController {

    @Autowired
    EmailService emailService;

    @Autowired
    JavaMailSender javaMailSender;

    @PostMapping(value = "/sendto")
    public ResponseEntity sendShoppingListTo(@RequestBody EmailWrapper emails) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("whiteelement1991@web.de");
        msg.setSubject("Einkaufszettel vom 14.03.23");
        msg.setFrom("shoppingstar-no.reply@outlook.com");
        msg.setText("test");
        javaMailSender.send(msg);

//        for(Email email : emails.getEmails()) {
//            SimpleMailMessage msg = new SimpleMailMessage();
//            msg.setTo("whiteelement1991@web.de");
//            msg.setSubject("Einkaufszettel vom 14.03.23");
//            msg.setText("test");
//            javaMailSender.send(msg);
//        }

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
