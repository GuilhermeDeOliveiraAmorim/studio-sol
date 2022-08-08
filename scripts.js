/**
 * Deixa o botão de nova partida não visível
 */
document.getElementById("nova_partida").style.display = "none";

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
 * nulo, retorna a função setErrNull. Por fim,
 * reseta o valor de palpite com string vazia.
 */
function getPalpite() {
    const palpite = document.getElementById("numero").value;

    if (palpite != "") {
        if (apiNumber < palpite) {
            setPalpite("É menor!", palpite, false);
        } else if (apiNumber > palpite) {
            setPalpite("É maior!", palpite, false);
        } else {
            setPalpite("Você acertou!!! ", palpite, true);
            setAcerto();
        }
    } else {
        setErrNull()
    }
    palpite = document.getElementById("numero").value = "";
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
    document.getElementById("palpite").innerText = "502";
    document.getElementById("palpite").style.color = "#CC3300";
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
 * a resposta e o palpite como acerto.
 * @param {*} srt 
 * @param {*} num 
 */
function setPalpiteElementTrue(srt, num) {
    document.getElementById("resposta").innerText = srt;
    document.getElementById("resposta").style.color = "#32BF00";
    document.getElementById("resposta").style.fontWeight = "700";
    document.getElementById("palpite").innerText = num;
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
    document.getElementById("palpite").innerText = num;
}

/**
 * 
 * @param {*} number 
 * @returns {[]}
 */
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

/**
 * 
 * @param {*} numberSrt 
 * @returns {[]}
 */
function writeNumbers(numberSrt) {
    let myFunc = (num) => Number(num);

    var arrNumber = Array.from(String(numberSrt), myFunc);

    for (let index = 0; index < arrNumber.length; index++) {
        console.log(ledSeven(arrNumber[index]));
    }

    return arrNumber;
}