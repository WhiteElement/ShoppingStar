package com.manu.LetMeBuyThat.service;

import com.manu.LetMeBuyThat.model.Email;
import com.manu.LetMeBuyThat.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    EmailRepository emailRepository;

    public List<Email> findAll() {
        return emailRepository.findAll();
    }

    public void save(Email email) {
        emailRepository.save(email);
    }
}
