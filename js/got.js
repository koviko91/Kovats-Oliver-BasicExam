function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    createDiv(userDatas);

    document.querySelectorAll('.main-left img').forEach(function (e, index, tomb) {

        e.addEventListener('click', function () {
            for (var i = 0; i < tomb.length; i++) {
                tomb[i].removeAttribute('class');
            }
            rightSide(e, userDatas);
            e.setAttribute('class', 'kijelolt');

        });
    });
    document.querySelector('.btn').addEventListener('click', function () {
        searchChar(document.querySelector('.text').value, userDatas);
    });
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/got.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function createDiv(data) {
    var block;
    sortByname(data);
    for (var i in data) {
        if (data[i].dead == "") {
            block = document.createElement('div');
            block.innerHTML = `<img src="${data[i].portrait}" alt="${data[i].name}"><br>${data[i].name}`;
            document.querySelector('.main-left').appendChild(block);
        }
    }
}

function sortByname(data) {
    var temp;
    for (var i = 0; i < data.length - 1; i++) {
        for (var j = i + 1; j < data.length; j++) {
            if (data[i].name > data[j].name) {
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }

}

function rightSide(char, data) {
    for (var i in data) {
        if (data[i].name == char.alt) {

            document.querySelector('.content').innerHTML = `<img src="${data[i].picture}" alt="${data[i].name}" width="90%"><br>
            <span>${data[i].name}</span> <img src="assets/houses/${data[i].house}.png" alt="Nem tartozik egyik házhoz sem" id="logo"><br>
            <p>${data[i].bio}</p>`;
        }
    }

}

function searchChar(text, data) {
    var char = {
        alt: ""
    };
    var kijelol = document.querySelectorAll('.main-left img');

    for (var j in data) {

        if (data[j].name.toLowerCase() == text.toLowerCase()) {
            char.alt = data[j].name;
            rightSide(char, data);
            break;
        }

    }
    for (var i = 0; i < kijelol.length; i++) {
        kijelol[i].removeAttribute('class');
        if (kijelol[i].alt == char.alt && char.alt != "") {
            kijelol[i].setAttribute('class', 'kijelolt');
        }
    }
    if (char.alt == "") {
        document.querySelector('.content').innerHTML = '<h2>Character not found</h2>';
    }


}