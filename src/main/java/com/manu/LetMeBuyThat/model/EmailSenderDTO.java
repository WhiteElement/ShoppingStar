package com.manu.LetMeBuyThat.model;


public class EmailSenderDTO {

    private EmailWrapper emailWrapper;
    private ShoppingList shoppingList;

    public EmailSenderDTO() {}

    public EmailSenderDTO(EmailWrapper emailWrapper, ShoppingList shoppingList) {
        this.emailWrapper = emailWrapper;
        this.shoppingList = shoppingList;
    }

    public EmailWrapper getEmailWrapper() {
        return emailWrapper;
    }

    public void setEmailWrapper(EmailWrapper emailWrapper) {
        this.emailWrapper = emailWrapper;
    }

    public ShoppingList getShoppingList() {
        return shoppingList;
    }

    public void setShoppingList(ShoppingList shoppingList) {
        this.shoppingList = shoppingList;
    }
}
