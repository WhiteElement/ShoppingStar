package com.manu.LetMeBuyThat.model;

import java.util.ArrayList;
import java.util.List;

public class EmailWrapper {

    public List<Email> emails = new ArrayList<>();

    public EmailWrapper(List<Email> emails) {
        this.emails = emails;
    }

    public EmailWrapper() {
    }

    public List<Email> getEmails() {
        return emails;
    }

    public void setEmails(List<Email> emails) {
        this.emails = emails;
    }
}
