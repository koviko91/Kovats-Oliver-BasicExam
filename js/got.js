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

    userDatas = main.sortByName(userDatas);
    main.create(userDatas);
    var selected = 0;
    document.querySelectorAll('.main-left div').forEach(function (e, index, tomb) {

        e.addEventListener('click', function () {
            tomb[selected].removeAttribute('class');
            main.right(index, userDatas);
            e.setAttribute('class', 'kijelolt');
            selected = index;

        });
    });
    document.querySelector('.btn').addEventListener('click', function () {
        selected = main.search(document.querySelector('.text').value, userDatas, selected);
    });
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/got.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
let main = (function () {
    function createDiv(data = []) {
        var block;
        for (var i in data) {
            block = document.createElement('div');
            block.innerHTML = `<img src="${data[i].portrait}" alt="${data[i].name}"><br>${data[i].name}`;
            document.querySelector('.main-left').appendChild(block);
        }

    }

    function rightSide(i, data) {
        document.querySelector('.content').innerHTML = `<img src="${data[i].picture}" alt="${data[i].name}" width="90%"><br>
                <span>${data[i].name}</span> <img src="assets/houses/${data[i].house}.png" alt="Nem tartozik egyik házhoz sem" id="logo"><br>
                <p>${data[i].bio}</p>`;
    }

    function sortname(data = []) {
        data = data.filter((item) => item.dead == '' ? true : false);
        var temp;
        data.sort((a, b) => a.name < b.name ? -1 : 1);
        return data;
    }

    function searchChar(text, data, selected) {
        var kijelol = document.querySelectorAll('.main-left img');
        console.log(kijelol[selected]);
        kijelol[selected].removeAttribute('class');
        for (var j in data) {
            if (data[j].name.toLowerCase() == text.toLowerCase()) {
                main.right(j, data);
                kijelol[j].setAttribute('class', 'kijelolt');
                break;
            }
            document.querySelector('.content').innerHTML = 'Character not found';
        }
        return j;
    }
    return {
        sortByName: sortname,
        create: createDiv,
        right: rightSide,
        search: searchChar
    }
})();

/* function createDiv(data) {
    var block;
    orderModule.sortByName(data);
    for (var i in data) {
        if (data[i].dead == "") {
            block = document.createElement('div');
            block.innerHTML = `<img src="${data[i].portrait}" alt="${data[i].name}"><br>${data[i].name}`;
            document.querySelector('.main-left').appendChild(block);
        }
    }
} */

/* function sortByname(data) {
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

} */

/* function rightSide(i, data) {
    document.querySelector('.content').innerHTML = `<img src="${data[i].picture}" alt="${data[i].name}" width="90%"><br>
            <span>${data[i].name}</span> <img src="assets/houses/${data[i].house}.png" alt="Nem tartozik egyik házhoz sem" id="logo"><br>
            <p>${data[i].bio}</p>`;
} */

/* function searchChar(text, data, selected) {


    var kijelol = document.querySelectorAll('.main-left img');
    console.log(kijelol[selected]);
    kijelol[selected].removeAttribute('class');
    for (var j in data) {
        if (data[j].name.toLowerCase() == text.toLowerCase()) {
            main.right(j, data);
            kijelol[j].setAttribute('class', 'kijelolt');
            break;
        }
    }
    return j;
} */