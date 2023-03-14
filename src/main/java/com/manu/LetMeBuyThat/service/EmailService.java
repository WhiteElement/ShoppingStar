package com.manu.LetMeBuyThat.service;

import com.manu.LetMeBuyThat.model.Email;
import com.manu.LetMeBuyThat.model.EmailWrapper;
import com.manu.LetMeBuyThat.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    EmailRepository emailRepository;

    @Autowired
    JavaMailSender javaMailSender;

    public List<Email> findAll() {
        return emailRepository.findAll();
    }

    public void save(Email email) {
        emailRepository.save(email);
    }

    public Email findById(Long id) {
        return emailRepository.findById(id).get();
    }

    public void delete(Email email) {
        emailRepository.delete(email);
    }

    public void sendShoppingListToAdresses(EmailWrapper emails) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setSubject("Einkaufszettel vom 14.03.23");
        msg.setFrom("shoppingstar-no.reply@outlook.com");
        msg.setText("test");

        for(Email email : emails.getEmails()) {
            msg.setTo(email.getAdress());
            javaMailSender.send(msg);
        }
    }
}
