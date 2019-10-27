function validateForm() {

    let name = document.querySelector("#inputName").value;
    let tel = document.querySelector("#inputTel").value;
    let metUs = document.querySelector("#metUs").value;
    let hasSocialMedia = document.querySelectorAll("#formElo [name=socialMedia]:checked");
    let socialMedia;
    let arrSocialMedia = [];

    if (hasSocialMedia[0].value) {
        socialMedia = document.querySelectorAll("#formElo [name=checkSocialMedia]:checked");
    
        // PS.: As opções selecionadas nos campos do tipo checkbox devem ser enviadas em um Array        
        for (let i = 0; i < socialMedia.length; i++) {
            arrSocialMedia.push(socialMedia[i].id);
        }
    }

    // Validação Nome e Telefone
    let regexName = /[A-Z][a-z]* [A-Z][a-z]*/;
    let regexTel = /[0-9]{2} - [0-9]{8}$/;
    let error = false;

    // Nome deve ser obrigatório e conter ao menos um sobrenome
    if ((!regexName.test(name)) | (name.lenght === 0)) {
        alert("O campo 'Nome' deve conter ao menos um sobrenome.");
        document.querySelector("#formElo").focus();
        error = true;
    }

    // Telefone deve possuir somente números no seguinte formato: 99 – 99999999
    if (tel.length > 0) {
        if (!regexTel.test(tel)) {
            alert("O campo 'Telefone' deve possuir o formato:  99 – 99999999");
            document.querySelector("#formElo").focus();
            error = true;
        }
    }
    
    if (error) {
        return false;
    } else {
        // Envie via POST os dados do formulário em formato JSON para o endpoint "http://localhost:8080

        let xhr = new XMLHttpRequest();
        let obj

        xhr.open('POST', 'http://localhost:8080');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        if (hasSocialMedia[0].value == "sim") {
            obj = {
                Nome: name,
                Telefone: tel,
                ComoNosConheceu: metUs,
                PossuiRedeSocial: hasSocialMedia[0].value,
                RedesSociais: arrSocialMedia
            }
        } else {
            obj = {
                Nome: name,
                Telefone: tel,
                ComoNosConheceu: metUs,
                PossuiRedeSocial: hasSocialMedia[0].value
            }
        }

        xhr.send(obj);

        document.querySelector("#formElo").reset();
        // reset(): não reseta valores default, portanto:
        document.querySelector("#Facebook").disabled = true;
        document.querySelector("#Linkedin").disabled = true;
        document.querySelector("#Instagram").disabled = true;
    }
}

function enableSocialMedia() {

    document.querySelector("#Facebook").disabled = false;
    document.querySelector("#Linkedin").disabled = false;
    document.querySelector("#Instagram").disabled = false;
    
}

function disableSocialMedia() {

    document.querySelector("#Facebook").disabled = true;
    document.querySelector("#Linkedin").disabled = true;
    document.querySelector("#Instagram").disabled = true;

    document.querySelector("#Facebook").checked = false;
    document.querySelector("#Linkedin").checked = false;
    document.querySelector("#Instagram").checked = false;
    
}