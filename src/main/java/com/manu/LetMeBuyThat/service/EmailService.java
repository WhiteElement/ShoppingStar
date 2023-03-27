package com.manu.LetMeBuyThat.service;

import com.manu.LetMeBuyThat.model.Email;
import com.manu.LetMeBuyThat.model.EmailSenderDTO;
import com.manu.LetMeBuyThat.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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

    @Autowired
    Environment environment;

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

    public void sendShoppingListToAdresses(EmailSenderDTO dto) {

        List<Email> emails = dto.getEmailWrapper().getEmails();
        List<String> items = dto.getShoppingList().getItems();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Einkaufszettel vom 14.03.23");

        String emailaccount = environment.getProperty("spring.mail.username");
        message.setFrom(emailaccount);
        message.setText(items.get(0));

        for(Email email : emails) {
//            message.setTo(email.getAdress());
//            javaMailSender.send(message);
        }
    }
}
