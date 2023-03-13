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
    
    for (i = 0; i < data.length; i++) {
        console.log(data[i]);
        
        const inputbox = document.createElement("input");
        inputbox.type = "checkbox";
        inputbox.value = data[i].adress;
        inputbox.setAttribute("data-id", data[i].id);

        const labelforbox = document.createElement("label");
        labelforbox.textContent = data[i].adress;

        mailscontainer.appendChild(inputbox);
        mailscontainer.appendChild(labelforbox);
    }

    const sendbutton = document.createElement("button");
    sendbutton.onclick = function() {sendShoppingList();};
    sendbutton.textContent = "an Emails senden";

    mailscontainer.appendChild(sendbutton);
}

function saveAdress() {
    const email = {
        adress : document.querySelector("#addmailscontainer > input").value
    }

    fetch("/saveemail", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(email)
    })
    .then(getAllAdresses());
}

function areEmails(data) {
    console.log(data.length);
    if(data.length < 1) {
        return false;
    } else {
        return true;
    }
}

function sendShoppingList() {
    const emails = {
        emails : getSelectedEmails()
    };
    
    fetch("/sendto", {      
        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(emails)
    });
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