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
    
    for (i = 0; i < data.length; i++) {

        const inputbox = document.createElement("input");
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

    const addbtn = document.createElement("button");
    addbtn.onclick = function() {openNewMailEdit()};
    addbtn.setAttribute("id", "addbtn");
    addbtn.textContent = "+";

    const sendbutton = document.createElement("button");
    sendbutton.onclick = function() {sendShoppingList();};
    sendbutton.setAttribute("id", "sendbutton");
    sendbutton.textContent = "senden";

    mailscontainer.appendChild(document.createElement("br"));
    mailscontainer.appendChild(addbtn);
    mailscontainer.appendChild(sendbutton);
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
    console.log(JSON.stringify(emails));
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

function openNewMailEdit() {
    const container = document.querySelector("#addmailscontainer");
    container.style.display = '';
}