document.getElementById("nova_partida").style.display = "none";

var apiNumber = 0;

var request = new XMLHttpRequest();
request.open(
    "GET",
    "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300",
    true
);
request.onload = function () {
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        apiNumber = data.value;
    } else if (request.status == 502) {
        const msg = "ERRO";
        document.getElementById("palpite").innerText = "502";
        document.getElementById("palpite").style.color = "#CC3300";
        document.getElementById("resposta").innerText = msg;
        document.getElementById("resposta").style.color = "#CC3300";
        document.getElementById("nova_partida").style.display = "block";
        document.getElementById("enviar_btn").disabled = true;
        document.getElementById("numero").readOnly = true;
    } else {
        const errorMessage = document.createElement("marquee");
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
};

function getPalpite() {
    const palpite = document.getElementById("numero").value;

    if (palpite != "") {
        if (apiNumber < palpite) {
            setPalpite("É menor!", palpite, false);
        } else if (apiNumber > palpite) {
            setPalpite("É maior!", palpite, false);
        } else {
            setPalpite("Você acertou!!! ", palpite, true);
            document.getElementById("nova_partida").style.display = "block";
            document.getElementById("enviar_btn").disabled = true;
            document.getElementById("numero").readOnly = true;
        }
    } else {
        const msg = "É necessário inserir um valor!";
        document.getElementById("resposta").innerText = msg;
        document.getElementById("resposta").style.color = "#CC3300";
        document.getElementById("resposta").style.fontWeight = "700";
    }
    palpite = document.getElementById("numero").value = "";
}

function setPalpite(srt, num, color) {
    if (color == true) {
        document.getElementById("resposta").innerText = srt;
        document.getElementById("resposta").style.color = "#32BF00";
        document.getElementById("resposta").style.fontWeight = "700";
        document.getElementById("palpite").innerText = num;
    } else {
        document.getElementById("resposta").innerText = srt;
        document.getElementById("resposta").style.color = "#EF6C00";
        document.getElementById("resposta").style.fontWeight = "700";
        document.getElementById("palpite").innerText = num;
    }
}

request.send();

function novaPartida() {
    document.location.reload(true);
}

function ledSeven(number) {
    var arrLed = Array();

    switch (number) {
        case 0:
            arrLed = [true, true, true, true, true, true, false];
            break;

        case 1:
            arrLed = [false, true, true, false, false, false, false];
            break;

        case 2:
            arrLed = [true, true, false, true, true, false, true];
            break;

        case 3:
            arrLed = [true, true, true, true, false, false, true];
            break;

        case 4:
            arrLed = [false, true, true, false, false, true, true];
            break;

        case 5:
            arrLed = [true, false, true, true, false, true, true];
            break;

        case 6:
            arrLed = [true, false, true, true, true, true, true];
            break;

        case 7:
            arrLed = [true, true, true, false, false, false, false];
            break;

        case 8:
            arrLed = [true, true, true, true, true, true, true];
            break;

        case 9:
            arrLed = [true, true, true, true, false, true, true];
            break;
    }

    return arrLed;
}

function writeNumbers(numberSrt) {
    let myFunc = (num) => Number(num);

    var arrNumber = Array.from(String(numberSrt), myFunc);

    for (let index = 0; index < arrNumber.length; index++) {
        console.log(ledSeven(arrNumber[index]));
    }

    return arrNumber;
}
