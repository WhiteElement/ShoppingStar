package com.manu.LetMeBuyThat.repository;

import com.manu.LetMeBuyThat.model.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email, Long> {
}
