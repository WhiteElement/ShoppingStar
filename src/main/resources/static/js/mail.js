function getAllAdresses() {
    fetch("/emails")
    .then(response => response.json())
    .then(data => {
        if(areEmails(data)) {
            generateCheckbox(data);
        } else {
            document.querySelector("#addmailscontainer").style.display = '';
        }
        
    });
}

function generateCheckbox(data) {
    const mailscontainer  = document.querySelector("#mails");
    
    preparefield(mailscontainer);
    mailscontainer.innerHTML = "<h4>Emails auswählen</h4>";

    for (i = 0; i < data.length; i++) {
        const inputbox = document.createElement("input");
        inputbox.classList.add("ms-3");
        inputbox.type = "checkbox";
        inputbox.value = data[i].adress;
        inputbox.setAttribute("data-id", data[i].id);

        const labelforbox = document.createElement("label");
        labelforbox.textContent = data[i].adress;

        const xbtn = document.createElement("a");
        xbtn.innerHTML = "&#10006;"
        xbtn.setAttribute("data-id", data[i].id);
        xbtn.onclick = function() {deleteEmail(this)};
        xbtn.href = "#";

        if(i>0){
            mailscontainer.appendChild(document.createElement("br"));
        }

        mailscontainer.appendChild(inputbox);
        mailscontainer.appendChild(labelforbox);
        mailscontainer.appendChild(xbtn);
    }

    const btncontainer = document.createElement("div");
    btncontainer.classList.add("d-flex", "justify-content-between", "mt-3");

    const addbtn = document.createElement("button");
    addbtn.onclick = function() {openNewMailEdit(this)};
    addbtn.setAttribute("id", "addbtn");
    addbtn.setAttribute("data-edit", "0");
    addbtn.classList.add("btn", "btn-sm", "btn-outline-secondary", "me-1");
    addbtn.textContent = "+";

    const sendbutton = document.createElement("button");
    sendbutton.onclick = function() {sendShoppingList();};
    sendbutton.setAttribute("id", "sendbutton");
    sendbutton.classList.add("btn", "btn-sm", "btn-outline-success");
    sendbutton.textContent = "Abschicken";

    mailscontainer.appendChild(document.createElement("br"));
    btncontainer.appendChild(addbtn);
    btncontainer.appendChild(sendbutton);
    mailscontainer.appendChild(btncontainer);
}

function preparefield(mailscontainer) {
    mailscontainer.textContent = "";
    if (mailscontainer.querySelector("#sendbutton")) {
        mailscontainer.querySelector("#sendbutton").remove();
    };
}

async function saveAdress() {
    const email = {
        adress : document.querySelector("#addmailscontainer > input").value
    }

    await fetch("/saveemail", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(email)
    })
    .then(() =>
    document.querySelector("#addmailscontainer").style.display = "none")
    .then(() => getAllAdresses());
}

function areEmails(data) {

    if(data.length < 1) {
        return false;
    } else {
        return true;
    }
}

function sendShoppingList() {
    const emailwrapper = {
        emails : getSelectedEmails()
    };
    
    const shoppinglist = {
        items : getItems(),
    }

    const emaildto = {
        emailWrapper : emailwrapper,
        shoppingList : shoppinglist
    }
    
    fetch("/sendto", {      
        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(emaildto),
    })
    .then(displayToast("Shopping Star", "Einkaufszettel an Email Adressen gesendet"));
}

function getSelectedEmails() {
    const checkboxes = document.querySelectorAll("div#mails > input[type='checkbox']");
    let emails = [];
    for(i=0; i<checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            let email = {
                id : parseInt(checkboxes[i].dataset.id),
                adress : checkboxes[i].nextElementSibling.textContent
            }
            emails[i] = email;
        }
    }
    return emails;
}

async function deleteEmail(btn) {
    const mailid = btn.dataset.id;
    const url = "/deletemail" + "?id=" + mailid;

    await fetch(url, {
        method: "DELETE",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(() => getAllAdresses());

}

function openNewMailEdit(btn) {
    if(btn.dataset.edit == "1") {
        const container = document.querySelector("#addmailscontainer");
        container.style.display = "none";
        btn.setAttribute("data-edit", "0");
        return;
    }
    const container = document.querySelector("#addmailscontainer");
    container.style.display = '';
    btn.setAttribute("data-edit", "1");
}

function displayToast(heading, text) {
            const alert = document.querySelector(".toast");
            alert.querySelector(".toast-body").textContent = text;
            alert.querySelector(".me-auto").textContent = heading;
            const toast = new bootstrap.Toast(alert);
            toast.show();
}

