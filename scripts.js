/**
 * Deixa o botão de nova partida não visível
 */
document.getElementById("nova_partida").style.display = "none";

/**
 *
 */
var divDisplay = document.getElementById("display");

var imgEl = document.createElement("img");
imgEl.src = "normal" + "/" + "normal" + "-00.svg";
imgEl.height = "50";
imgEl.id = 1;
divDisplay.appendChild(imgEl);

imgEl = document.createElement("img");
imgEl.src = "normal" + "/" + "normal" + "-00.svg";
imgEl.height = "50";
imgEl.id = 2;
divDisplay.appendChild(imgEl);

imgEl = document.createElement("img");
imgEl.src = "normal" + "/" + "normal" + "-00.svg";
imgEl.height = "50";
imgEl.id = 3;
divDisplay.appendChild(imgEl);

/**
 * Inicia a variável que receberá o valor da requisição
 */
var apiNumber = 0;

/**
 * Utilizei a API XMLHttpRequest para transmitir dados entre cliente e serviço
 */
var request = new XMLHttpRequest();
request.open(
    "GET",
    "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300",
    true
);

/**
 * Faço o parser para json do objeto data resultado da requisição
 */
request.onload = function () {
    var data = JSON.parse(this.response);

    /**
     * Tratamento de status de serviço. Caso status entre
     * 200 e 400, a variável apiNumber recebe o valor da
     * requisição. Caso o status seja 502, retorno a função
     * setErro502, se não, erro diferentes, são exibidos
     * na div error.
     */
    if (request.status >= 200 && request.status < 400) {
        apiNumber = data.value;
    } else if (request.status == 502) {
        removeElement(1);
        removeElement(2);
        removeElement(3);
        writeNumbers(502, "erro");
        setErro502();
    } else {
        const errorDiv = document.getElementById("error");
        const errorMessage = document.createElement("marquee");
        errorMessage.textContent = "It's not working!";
        errorDiv.appendChild(errorMessage);
    }
};

/**
 * Função chamada no botão de enviar palpite.
 * Recebe o valor do input e atribui a palpite,
 * através da função setPalpite. Caso o valor
 * da requisição seja menor que o palpite,
 * setPalpite recebe "É menor!", o palpite e
 * falso, caso não, setPalpite recebe "É maior",
 * palpite e falso, caso não, retorna setPalpite
 * com "Você acertou!", palpite e true, além da
 * função setAcerto. Caso palpite tenha valor
 * nulo, retorna a função setErrNull. Já,
 * setErrNegative, verifica se o valor do palpite
 * é menor do que zero. Por fim, reseta o valor
 * de palpite com string vazia.
 */
function getPalpite() {
    var palpite = document.getElementById("numero").value;

    if (palpite < 0) {
        setErrNegative();
    } else {
        if (palpite != "") {
            if (document.getElementById("1") != null) {
                removeElement(1);
            }

            if (document.getElementById("2") != null) {
                removeElement(2);
            }

            if (document.getElementById("3") != null) {
                removeElement(3);
            }

            if (apiNumber < palpite) {
                writeNumbers(palpite, "menor");
                setPalpite("É menor!", palpite, false);
            } else if (apiNumber > palpite) {
                writeNumbers(palpite, "maior");
                setPalpite("É maior!", palpite, false);
            } else {
                writeNumbers(palpite, "igual");
                setPalpite("Você acertou!!! ", palpite, true);
                setAcerto();
            }
        } else {
            setErrNull();
        }
    }

    document.getElementById("numero").value = "";
}

function removeElement(num) {
    const element = document.getElementById(num);
    element.remove();
}

/**
 * Função que recebe como parâmetros uma string
 * com frase, o número do palpite e um parâmetro
 * booleano para definir o estilo dos elements
 * resposta e palpite, utilizando para isso, as
 * funções setPalpiteElementTrue e
 * setPalpiteElementFalse.
 * @param {*} srt
 * @param {*} num
 * @param {*} color
 */
function setPalpite(srt, num, color) {
    if (color == true) {
        setPalpiteElementTrue(srt, num);
    } else {
        setPalpiteElementFalse(srt, num);
    }
}

request.send();

/**
 * Atualiza a página quando o botão
 * de nova partida é pressionado.
 */
function novaPartida() {
    document.location.reload(true);
}

/**
 * Função para alterar o estado dos elements que exibem
 * o palpite, a resposta, exibe o botão de nova partida,
 * desabilita o botão de enviar palpite e não permite
 * escrita no campo de texto.
 */
function setErro502() {
    document.getElementById("resposta").innerText = "ERRO";
    document.getElementById("resposta").style.color = "#CC3300";
    document.getElementById("nova_partida").style.display = "block";
    document.getElementById("enviar_btn").disabled = true;
    document.getElementById("numero").readOnly = true;
}

/**
 * Função para alterar o estado dos elements nova_partida,
 * tornando-o visível, o element enviar_btn, desabilitando-o
 * e, o element numero, tornando-o apenas de leitura.
 */
function setAcerto() {
    document.getElementById("nova_partida").style.display = "block";
    document.getElementById("enviar_btn").disabled = true;
    document.getElementById("numero").readOnly = true;
}

/**
 * Função para alterar o estado dos elements que exibem
 * a resposta, com formato de mensagem de erro.
 */
function setErrNull() {
    const msg = "É necessário inserir um valor!";
    document.getElementById("resposta").innerText = msg;
    document.getElementById("resposta").style.color = "#CC3300";
    document.getElementById("resposta").style.fontWeight = "700";
}

/**
 * Função para alterar o estado dos elements que exibem
 * a resposta, com formato de mensagem de erro.
 */
function setErrNegative() {
    const msg = "Maior ou igual a zero!";
    document.getElementById("resposta").innerText = msg;
    document.getElementById("resposta").style.color = "#CC3300";
    document.getElementById("resposta").style.fontWeight = "700";
}

/**
 * Função para alterar o estado dos elements que exibem
 * a resposta e o palpite como acerto.
 * @param {*} srt
 * @param {*} num
 */
function setPalpiteElementTrue(srt, num) {
    document.getElementById("resposta").innerText = srt;
    document.getElementById("resposta").style.color = "#32BF00";
    document.getElementById("resposta").style.fontWeight = "700";
}

/**
 * Função para alterar o estado dos elements que exibem
 * a resposta e o palpite como não acerto.
 * @param {*} srt
 * @param {*} num
 */
function setPalpiteElementFalse(srt, num) {
    document.getElementById("resposta").innerText = srt;
    document.getElementById("resposta").style.color = "#EF6C00";
    document.getElementById("resposta").style.fontWeight = "700";
}

/**
 *
 * @param {*} number
 * @returns {[]}
 */
function ledSeven(number, count, resp) {
    var arrLed = Array();

    let imgElement = "";
    var imgPath = "";

    if (count == 1) {
        imgElement = "inicial_01";
    }

    if (count == 2) {
        imgElement = "inicial_02";
    }

    if (count == 3) {
        imgElement = "inicial_03";
    }

    if (resp == "menor") {
        imgPath = "normal";
    }

    if (resp == "maior") {
        imgPath = "normal";
    }

    if (resp == "igual") {
        imgPath = "green";
    }

    if (resp == "erro") {
        imgPath = "red";
    }

    var divDisplay = document.getElementById("display");

    switch (number) {
        case 0:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-00.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 1:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-01.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 2:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-02.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 3:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-03.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 4:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-04.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 5:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-05.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 6:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-06.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 7:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-07.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 8:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-08.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;

        case 9:
            var imgEl = document.createElement("img");
            imgEl.src = imgPath + "/" + imgPath + "-09.svg";
            imgEl.height = "50";
            imgEl.id = count;
            divDisplay.appendChild(imgEl);
            break;
    }

    return arrLed;
}

/**
 *
 * @param {*} numberSrt
 * @returns {[]}
 */
function writeNumbers(numberSrt, resp) {
    let myFunc = (num) => Number(num);

    var arrNumber = Array.from(String(numberSrt), myFunc);

    var count = 1;

    for (let index = 0; index < arrNumber.length; index++) {
        ledSeven(arrNumber[index], count, resp);
        count++;
    }

    return arrNumber;
}
