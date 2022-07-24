//---------------------------------------------- IDS DE USO GENERAL ----------------------------------------------

const addOperationButton = document.getElementById('addOperationButton');
const followedContainer = document.getElementById('followedContainer');
const addFollowedButton = document.getElementById('addFollowedButton');
const tableRowsContainer = document.getElementById('table__rows');
const footerParagraph = document.getElementById("tableFooter");
const followedWidget = document.getElementById('followed');
const idFooter = document.getElementById("tableFooter");
const body = document.getElementById('body');

//---------------------------------------------------- DATOS -----------------------------------------------------

let openOperations = [];
let followedCoins = [];
let closedOperations = [];

//------------------------------------------ RECUPERACIÓN LOCALSTORAGE -------------------------------------------

let checkFromStorage = localStorage.getItem('openOperations');
checkFromStorage == null ? localStorage.setItem('openOperations', '[]') : openOperations = JSON.parse(checkFromStorage);

checkFromStorage = localStorage.getItem('followedCoins');
checkFromStorage == null ? localStorage.setItem('followedCoins', '[]') : followedCoins = JSON.parse(checkFromStorage);

checkFromStorage = localStorage.getItem('alreadyVisited');
((checkFromStorage == null) || (checkFromStorage != 1)) && welcomeMsg();

//------------------------------------------- FUNCIONES DE USO GENERAL -------------------------------------------

function showError(input, errorclass) {
    input.classList.add(errorclass);
    setTimeout(errorInputOff, 400);
    function errorInputOff() {
        input.classList.remove(errorclass);
    }
}

const toastify = (text, background) => {
    Toastify({
      text: text,
      duration: 3000,
      newWindow: true,
      gravity: "top",
      position: "right",
      style: {
        background: background,
      },
    }).showToast();
}  

function createComponent(type, classname, idname, innerhtml, idtoappend) {
    const element = document.createElement(type);
    element.setAttribute('class', classname);
    element.setAttribute('id', idname);
    element.innerHTML = innerhtml;
    document.getElementById(idtoappend).appendChild(element);
}

//---------------------------------------------- MENSAJE BIENVENIDA ----------------------------------------------

function welcomeMsg() {
    createComponent('section', 'welcome__container', 'welcomeContainer', welcomeMsgStructure, 'body');
    const getStartedButton = document.getElementById('getStartedButton');
    getStartedButton.addEventListener('click', () => { welcomeContainer.remove() });
    localStorage.setItem('alreadyVisited', '1');
}

//------------------------------------------ FUNCIONAMIENTO MENU MOBILE ------------------------------------------

const mobileButtonContainer = document.getElementById('mobileButtonContainer');

mobileButtonContainer.addEventListener('click', () => {
    createComponent('section', 'menu__mobile', 'menuMobile', menuMobileStructure, 'body');
    
    const menuMobileItem4 = document.getElementById('menuMobileItem4');
    menuMobileItem4.addEventListener('click', () => searchCoinTrigger());
    
    const menuMobileItem1 = document.getElementById('menuMobileItem1');
    menuMobileItem1.addEventListener('click', () => loginTrigger());

    const menuMobileItem2 = document.getElementById('menuMobileItem2');
    checkFromStorage = localStorage.getItem('hideFollowed');

    if (checkFromStorage == '1') {
        menuMobileItem2.innerHTML = `<img src="./public/img/radar1.png">Mostrar Radar`;
    } else {
        menuMobileItem2.innerHTML = `<img src="./public/img/radar1.png">Ocultar Radar`;
    }

    menuMobileItem2.addEventListener('click', () => {
        checkFromStorage = localStorage.getItem('hideFollowed');
        if (checkFromStorage == null) { 
            localStorage.setItem('hideFollowed', '0');
        } else {
            checkFromStorage == 1 ? followed.show() : followed.hide(); 
        }
    });
});

document.addEventListener('click', function handleClickOutsideBox(event) {
    const menuMobile = document.getElementById('menuMobile');
    const mobileButton = document.getElementById('mobileButton');
    const menuMobileContainer = document.getElementById('mobileButtonContainer')

    if ((menuMobile != null) && (event.target != mobileButton) && (event.target != menuMobileContainer)) {
        document.getElementById('menuMobile').remove();
    }
});

//------------------------------------------------------------------------------------------------------------------
//----------------------------------------------- OBTENCIÓN DE DATOS -----------------------------------------------
//------------------------------------------------------------------------------------------------------------------

const getData = () => {
    // DATOS DE TABLA
    openOperations.forEach(element => {
        const { id, token1, token2, entryPrice, entryAmount } = element;
        let url = "https://min-api.cryptocompare.com/data/price?fsym=" + token1 + "&tsyms=" + token2;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                element.currentPrice = data.USD;
                document.getElementById("currentprice" + id).innerHTML = element.currentPrice + " " + token2;

                const percentageEntry = document.getElementById("percentage" + id);
                const profitEntry = document.getElementById("profit" + id);
                const percentage = (((element.currentPrice - entryPrice) / entryPrice) * 100);
                const profit = ((entryAmount + ((percentage / 100) * entryAmount)) - entryAmount);

                if (element.currentPrice > entryPrice) {
                    percentageEntry.innerHTML = "+" + percentage.toFixed(2) + " %";
                    profitEntry.innerHTML = "+" + profit.toFixed(2) + " " + token2;
                    percentageEntry.className = "positiveValue";
                    profitEntry.className = "positiveValue";
                } else {
                    percentageEntry.innerHTML = percentage.toFixed(2) + " %";
                    profitEntry.innerHTML = profit.toFixed(2) + " " + token2;
                    percentageEntry.className = "negativeValue";
                    profitEntry.className = "negativeValue";
                }
            });
    });

    getEarnings();
    
    // DATOS DE SEGUIDAS
    followedCoins.forEach(element => {
        const { id, token1 } = element;
        let urlToFetch = `https://min-api.cryptocompare.com/data/generateAvg?fsym=${token1}&tsym=USD&e=Kraken`
        fetch(urlToFetch)
            .then(response => response.json())
            .then(data => {
                document.getElementById("card" + id).innerHTML = data.DISPLAY.PRICE;
                if (data.DISPLAY.CHANGEPCT24HOUR > 0) {
                    document.getElementById("average" + id).innerHTML = `(+${data.DISPLAY.CHANGEPCT24HOUR}%)`;
                    document.getElementById("average" + id).className = "positiveValue";
                } else {
                    document.getElementById("average" + id).innerHTML = `(${data.DISPLAY.CHANGEPCT24HOUR}%)`;
                    document.getElementById("average" + id).className = "negativeValue";
                }
            });
      });
}

getData();

// TEMPORIZADOR
tcount = setInterval(function () {
    tcount++;
    if (tcount == 10) {
        getData();
        whosMax();
        tcount = 0;
    }
    idFooter.innerHTML = 'Próxima actualización en ' + (10 - tcount) + ' segundos.'
}, 1000);

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------ REFRESCAR TABLA -------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

const refreshTable = () => {
    tableRowsContainer.innerHTML = ``;
    if (openOperations.length == 0) {
        textToInner =  `<p>Parece que no existe ninguna operación abierta en nuestra base de datos <b>:(</b></p>
                        <p>Presiona <b>+</b> para comenzar a usar Cripto Tracker!</p>`;
        createComponent('div', 'empty__row', 'emptyRow', textToInner, 'table__rows');
        footerParagraph.setAttribute("style", "display: none;");
    } else {
        openOperations.forEach(element => {
            const { id, token1, token2, entryAmount, entryPrice } = element;

            textToInner = `   <div class="token__entry--tokenid"><p>${token1} / ${token2}</p></div>
                                <div class="token__entry--initialamount"><p>${entryAmount} ${token2}</p></div>
                                <div class="token__entry--entryprice"><p>${entryPrice} ${token2}</p></div>
                                <div class="token__entry--quantity"><p>${(entryAmount / entryPrice).toFixed(3)} ${token1}</p></div>
                                <div class="token__entry--currentprice"><p id="currentprice${id}"></p></div>
                                <div class="token__entry--percentage"><p id="percentage${id}">%</p></div>
                                <div class="token__entry--profit"><p id="profit${id}"></p></div>
                                <div class="token__entry--remove"><button id="removeButton${id}">-</button></div>`;

            createComponent('div', 'table__row', `operation${id}`, textToInner, 'table__rows');

            const removeButton = document.getElementById("removeButton" + id);

            removeButton.addEventListener('click', () => {
                createComponent('section', 'remove__modal', `removeModal`, removeOperationStructure, 'body');
                const coinIdentifier = document.getElementById('coinIdentifier');
                coinIdentifier.innerHTML = `(${token1} / ${token2})`;

                // Asignación de función boton cancelar
                const removeCancel = document.getElementById('removeCancel');
                removeCancel.addEventListener('click', () => { removeModal.remove(); });

                // Asignación de función boton elimninar operación
                const deleteOp = document.getElementById('deleteOp');
                deleteOp.addEventListener('click', () => {
                    tableTitle.innerHTML = `Operaciones abiertas`;
                    const findObject = openOperations.find(element => element.id === id);
                    openOperations.splice(openOperations.indexOf(findObject), 1);
                    removeModal.remove();
                    refreshTable();
                })
            });
        });
    }
    getData();
    getEarnings();
    let arrayToString = JSON.stringify(openOperations);
    localStorage.setItem('openOperations', arrayToString);
}

refreshTable();

//-------------------------------------------- AGREGAR MONEDAS AL ARRAY --------------------------------------------

addOperationButton.addEventListener('click', () => {
    createComponent('section', 'modal__container', `modalContainer`, addOperationStructure, 'body');

    const modalClose = document.getElementById('modalClose');
    modalClose.addEventListener('click', () => { modalContainer.remove() });

    const modalAccept = document.getElementById('modalAccept');
    modalAccept.addEventListener('click', () => {
        const modalInput1 = document.getElementById('modalInput1');
        const modalInput2 = document.getElementById('modalInput2');
        const modalInput3 = document.getElementById('modalInput3');

        if (modalInput1.value.length == 0) {
            showError(modalInput1, 'input__error');
            checkInput1 = 0;
        } else { checkInput1 = 1; }

        if ((modalInput2.value.length == 0) || isNaN(modalInput2.value) || (modalInput2.value < 1)) {
            showError(modalInput2, 'input__error');
            checkInput2 = 0;
        } else { checkInput2 = 1; }

        if ((modalInput3.value.length == 0) || isNaN(modalInput3.value) || (modalInput3.value < 0) || (modalInput3.value == 0)) {
            showError(modalInput3, 'input__error');
            checkInput3 = 0;
        } else { checkInput3 = 1; }

        if ((checkInput1 == 1) && (checkInput2 == 1) && (checkInput3 == 1)) {

            let urlToFetch = `https://min-api.cryptocompare.com/data/price?fsym=${modalInput1.value.toUpperCase()}&tsyms=USD`
            fetch(urlToFetch)
                .then(res => res.json())
                .then(data => {
                    if (data.Response == 'Error') {
                        toastify("El par no existe en la base de datos", "linear-gradient(to right, #b00000, #c93d3d)");
                        showError(modalInput1, 'input__error');
                    } else {
                        openOperations.push({id: getFreeSpace(openOperations), token1: modalInput1.value.toUpperCase(), token2: 'USD', entryPrice: Number(modalInput3.value), entryAmount: Number(modalInput2.value)})
                        modalContainer.remove();
                        refreshTable();
                    }
                })
        }
    });
    
    modalInput1.addEventListener('click', () => modalInput1.parentElement.classList.add('active__input'))
    modalInput1.addEventListener('blur', () => modalInput1.parentElement.classList.remove('active__input'))
    modalInput2.addEventListener('click', () => modalInput2.parentElement.classList.add('active__input'))
    modalInput2.addEventListener('blur', () => modalInput2.parentElement.classList.remove('active__input'))
    modalInput3.addEventListener('click', () => modalInput3.parentElement.classList.add('active__input'))
    modalInput3.addEventListener('blur', () => modalInput3.parentElement.classList.remove('active__input'))
});

// Función para conseguir un ID libre en un array

function getFreeSpace(array) {
    let previousID;
    if (array.length == 0) {
        return array.length;
    } else {
        for (i = 0; i < array.length; i++) {
            if (array[i].id != 0) {
                if ((array[i].id - 1) != (previousID)) {
                    const findObject = array.find(element => element.id === (array[i].id -1));
                    if (findObject == undefined) {
                        return (array[i].id - 1);
                    }
                }
            }
            previousID = array[i].id;
            if ((array[i].id + 1) == array.length) {
                return array.length;
            }
        }
    }
}

//------------------------------------------------------------------------------------------------------------------
//----------------------------------------------- REFRESCAR SEGUIDAS -----------------------------------------------
//------------------------------------------------------------------------------------------------------------------

const refreshFollowed = () => {
    followedContainer.innerHTML = null;
    if (followedCoins.length == 0) {
        textToInner = `<p>No hay pares en nuestra base de datos</p>
                        <p>Presione <b>+</b> para comenzar a seguir</p>`;
        createComponent('div', 'nodb__card', `nodbCard`, textToInner, 'followedContainer');

    } else {
        followedCoins.forEach(element => {
            const { id, token1, token2, currentPrice } = element;

            textToInner = ` <div class="followed__card--token"><p>${token1} / ${token2}</p><button class="followed__card--button" id="removeFollowedButton${id}">⛌</button></div>
                            <div class="followed__card--price" id="followedCardPrice">
                                <p id="card${id}">${currentPrice}</p>
                                <p id="average${id}">-</p>
                            </div> `;

            createComponent('div', 'followed__card', `followedCard${id}`, textToInner, 'followedContainer');

            const removeFollowedButton = document.getElementById("removeFollowedButton" + id);
            removeFollowedButton.addEventListener('click', () => {
                const findObject = followedCoins.find(element => element.id === id);
                const indexOfObject = followedCoins.indexOf(findObject); 
                followedCoins.splice(indexOfObject, 1);
                refreshFollowed();
            });
        });
    }
    getData();
    arrayToString = JSON.stringify(followedCoins);
    localStorage.setItem('followedCoins', arrayToString);
}

addFollowedButton.addEventListener('click', () => {
    const nodbCard = document.getElementById('nodbCard');
    ((followedCoins.length == 0) && (nodbCard != null)) && nodbCard.remove();
    const emptyCard = document.getElementById("emptyCard");
    if (emptyCard != null) {
        showError(emptyCard, 'input__error');
      } else {
        createComponent('article', 'followed__card', `emptyCard`, addFollowedStructure, 'followedContainer');

        const emptyCard = document.getElementById("emptyCard");
        const followedCancel = document.getElementById('followedCancel');
        
        followedCancel.addEventListener('click', () => {
            emptyCard.remove();
            refreshFollowed();
        });

        const followedAccept = document.getElementById('followedAccept');
        followedAccept.addEventListener('click', () => {
            const inputToVerify = document.getElementById('addInput');

            if (inputToVerify.value == '') {
                showError(inputToVerify, 'input__error');
            } else {
                let verifyExistence = 0;
                followedCoins.forEach(element => {
                    const { id, token1 } = element;
                    inputValue = inputToVerify.value.toUpperCase();
                    if (token1 == inputValue) {
                        const existingCard = document.getElementById(`followedCard${id}`); 
                        showError(existingCard, 'input__error');
                        verifyExistence = 1;
                    }
                });
                if (verifyExistence == 0) {
                    const inputToPush = document.getElementById('addInput').value.toUpperCase();
                    let urlToFetch = `https://min-api.cryptocompare.com/data/generateAvg?fsym=${inputToPush}&tsym=USD&e=Kraken`
                    fetch(urlToFetch)
                        .then(res => res.json())
                        .then(data => {
                            if (data.Response == 'Error') {
                                showError(inputToVerify, 'input__error');
                                toastify("El par no existe en la base de datos", "linear-gradient(to right, #b00000, #c93d3d)")
                            } else {
                                followedCoins.push({id: getFreeSpace(followedCoins), token1: inputToPush, token2: "USD", currentPrice: 0, average24: 0});
                                refreshFollowed();
                            }
                        });
                }
            }
        });
      }
});

refreshFollowed();

// OCULTAR SEGUIDAS
const followedButton = document.getElementById('followedButton');
const followedText = document.getElementById('followedText');

const followed = {
    show() {
        followedWidget.removeAttribute('style')
        followedText.innerHTML = `Ocultar radar`;
        localStorage.setItem('hideFollowed', '0');  
    },
    hide() {
        followedWidget.style.display = "none";
        followedText.innerHTML = `Mostrar radar`;
        localStorage.setItem('hideFollowed', '1'); 
    }
}

followedButton.addEventListener('click', () => followedWidget.style.display == 'none' ? followed.show() : followed.hide() );

checkFromStorage = localStorage.getItem('hideFollowed');
if (checkFromStorage == null) { 
    localStorage.setItem('hideFollowed', '0');
} else {
    checkFromStorage == 1 ? followed.hide() : followed.show(); 
}

//-----------------------------------------------------------------------------------------------------------------
//----------------------------------------------- BUSCADOR EN TABLA -----------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
let searchDone = 0;

searchButton.addEventListener('click', () => {
    const valueToSearch = document.getElementById('searchInput').value;
    let elementFound = 0;

    if (valueToSearch == "") {
        showError(searchInput, 'navbar__search--error');
      } else { 
        if (openOperations.length == 0) {
            const emptyRow = document.getElementById('emptyRow');
            showError(emptyRow, 'input__error');
        } else {
            if (searchDone == 1) {
                openOperations.forEach(element => {
                    const elementToHide = document.getElementById('operation' + element.id);
                    tableTitle.innerHTML = `Mostando resultados de: ${searchInput.value}`;
                    elementToHide.removeAttribute('style');
                    searchDone = 0;
                });
                const emptyRow = document.getElementById('emptyRow');
                emptyRow != null && emptyRow.remove();
            }
            if (searchDone == 0) {
                openOperations.forEach(element => {
                    if (element.token1.toUpperCase() != searchInput.value.toUpperCase()) {
                        const elementToHide = document.getElementById('operation' + element.id);
                        tableTitle.innerHTML = `Mostando resultados de: ${searchInput.value}`;
                        elementToHide.style.display = "none";
                    }
                });
                searchDone = 1;
            }
        }

        openOperations.forEach(element => {
            const elementToCheck = document.getElementById("operation" + element.id);
            if (elementToCheck.style.display != "none") {
                elementFound++;
            }
        });

        const emptyRow = document.getElementById('emptyRow');
        if ((elementFound == 0) && (emptyRow == null)) {
            textToInner = `<p>No se encontraron resultados</p>`;
            createComponent('div', 'empty__row', `emptyRow`, textToInner, 'table__rows');

            searchDone = 1;
        }
    }
    getEarnings();
});

const resetButton = document.getElementById('resetButton')

resetButton.addEventListener('click', () => {
    tableTitle.innerHTML = `Operaciones abiertas`;
    const emptyRow = document.getElementById('emptyRow');
    emptyRow != null && emptyRow.remove();
    searchInput.value = ``;
    refreshTable();
});

//------------------------------------------------------------------------------------------------------------------
//---------------------------------------------- PORCENTAJES Y PROFITS ---------------------------------------------
//------------------------------------------------------------------------------------------------------------------

let profitAverage = document.getElementById('profitAverage');
let percentageAverage = document.getElementById('percentageAverage');

function getEarnings() {
    let percentageDone = 0;
    let profitDone = 0;
  
    setTimeout(() => {
        openOperations.forEach(el => { 
            let elementToCheck = document.getElementById('operation' + el.id);
            let getStyle = elementToCheck.style.getPropertyValue("display");

            if (getStyle != 'none') {
                let percentage = (((el.currentPrice - el.entryPrice) / el.entryPrice) * 100);
                let profit = ((el.entryAmount + ((percentage/100) * el.entryAmount)) - el.entryAmount);
                percentageDone += percentage;
                profitDone += profit;
            }
        });

        if (profitDone > 0) {
            profitAverage.innerHTML = "+" + profitDone.toFixed(2) + " USD";
            profitAverage.className = "headerPositiveValue";
          } else {
            profitAverage.innerHTML = profitDone.toFixed(2) + " USD";
            profitAverage.className = "headerNegativeValue";
          }
        
          if (percentageDone > 0) {
            percentageAverage.innerHTML = "+" + percentageDone.toFixed(2) + " %";
            percentageAverage.className = "headerPositiveValue";
          } else {
            percentageAverage.innerHTML = percentageDone.toFixed(2) + " %";
            percentageAverage.className = "headerNegativeValue";
          }

    }, 1000);
}

getEarnings();

//------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- MODAL LOGIN --------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', () =>  loginTrigger());

loginTrigger = () => {
  if (logged == 0) {
    createComponent('section', 'login__container', `loginContainer`, loginModalStructure, 'body');

    const loginCancel = document.getElementById('loginCancel');
    loginCancel.addEventListener('click', () => { loginContainer.remove() });

    const loginAccept = document.getElementById('loginAccept');
    loginAccept.addEventListener('click', () => {
        if (loginUserInput.value.length == 0 || loginPassInput.value.length == 0) {
            loginUserInput.value.length == 0 && showError(loginUserInput, 'input__error');
            loginPassInput.value.length == 0 && showError(loginPassInput, 'input__error');
      } else { 
        checkLogin(loginUserInput.value, loginPassInput.value) == true ? loginSuccess(loginUserInput.value) : loginFailed();
      }
    });
  } else {
      divCheck = document.getElementById('userMenu');

      if (divCheck == null) {
        textToInner = ` <p class="user__menu--item" id="profileButton">Perfil</p>
                        <p class="user__menu--item" id="logoutButton">Cerrar sesión</p>`;

        createComponent('div', 'user__menu', `userMenu`, textToInner, 'navbarMenu');

        document.addEventListener('click', function handleClickOutsideBox(event) {
          const userMenu = document.getElementById('userMenu');
          if ((event.target != loginButton) && (event.target != userInfo) && (event.target != userMenu)) { userMenu.remove() } 
        });

        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', () => {
          logged = 0;
          const userInfo = document.getElementById('userInfo');
          userInfo.innerHTML = 'Iniciar sesión';
          toastify("Sesión cerrada", "linear-gradient(to right, rgb(0, 0, 20), rgb(0, 0, 70))")
        });
    }
  }
};

let loginUser = class {
  constructor(user, pass) {
    this.user = user;
    this.pass = pass;
  }
};

const usuario1 = new loginUser('admin', 'admin');

// Desestructuración de usuario1 y Operador Ternario
let { user, pass } = usuario1;
let logged = 0;

const checkLogin = (inputUser, inputPass) => { return ((inputUser == user) && (inputPass == pass) ? true : false); }

const loginSuccess = (loginUser) => {
  const loginContainer = document.getElementById('loginContainer');
  const userInfo = document.getElementById('userInfo');
  loginContainer.remove();
  userInfo.innerHTML = loginUser;
  toastify("Acceso correcto", "linear-gradient(to right, #00b09b, #96c93d)");
  logged = 1;
}

const loginFailed = () => toastify("Datos incorrectos", "linear-gradient(to right, #b00000, #c93d3d)");

//---------------------------------------------- USO DE SPREAD ----------------------------------------------

const tableMax = document.getElementById('tableMax');

function compareMax(beneficios) { 
    openOperations.length != 0 ? tableMax.innerHTML = `El máximo beneficio es: ${Math.max(...beneficios).toFixed(2)} USD` : tableMax.innerHTML = "";
}

let arrayPrices = [];

function whosMax() {
  let arrayPrices = [];
  openOperations.forEach(moneda => {
    let profitGetValue = document.getElementById(`profit${moneda.id}`).textContent;
    profitGetValue != "" && arrayPrices.push(profitGetValue.slice(1, -4));
  });
  compareMax(arrayPrices);
}

//---------------------------------- USO DE LUXON PARA MOSTRAR FECHA Y HORA ----------------------------------

var DateTime = luxon.DateTime;
const nowDate = document.getElementById('nowDate');
const nowTime = document.getElementById('nowTime');

timeCount = setInterval(function() {
  timeCount++; 
  const now = DateTime.now();
  nowDate.innerHTML = DateTime.fromISO(now).toFormat('DDD');
  nowTime.innerHTML = DateTime.fromISO(now).toFormat('tt');
}, 1000);

//---------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------- MODAL BUSCAR MONEDAS --------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

const searchCoinButton = document.getElementById('searchCoinButton');
searchCoinButton.addEventListener('click', () => searchCoinTrigger())

function searchCoinTrigger() {
    createComponent('section', 'login__container', `searchContainer`, searchCoinStructure, 'body');

    const searchInfoInput = document.getElementById('searchInfoInput');
    const searchInfoButton = document.getElementById('searchInfoButton');

    searchInfoButton.addEventListener('click', () => {
        if (searchInfoInput.value == "") {
            showError(searchInfoInput, 'input__error');
        } else {
            let tokenToFetch = searchInfoInput.value;
            let URL = `https://min-api.cryptocompare.com/data/generateAvg?fsym=${tokenToFetch}&tsym=USD&e=Kraken`

            fetch(URL)
            .then(res => res.json())
            .then(data => {
                if (data.Response == 'Error') {
                    price.innerHTML = '-';
                    open24hour.innerHTML = '-';
                    high24hour.innerHTML = '-';
                    low24hour.innerHTML = '-';
                    change24hour.innerHTML = '-';
                    volume24hour.innerHTML = '-';

                    toastify("El par no existe en la base de datos", "linear-gradient(to right, #b00000, #c93d3d)");
                    showError(searchInfoInput, 'input__error');
                } else {
                    const { PRICE, OPEN24HOUR, HIGH24HOUR, LOW24HOUR, CHANGE24HOUR, VOLUME24HOURTO } = data.DISPLAY;
                    price.innerHTML = PRICE;
                    open24hour.innerHTML = OPEN24HOUR;
                    high24hour.innerHTML = HIGH24HOUR;
                    low24hour.innerHTML = LOW24HOUR;
                    change24hour.innerHTML = CHANGE24HOUR;
                    volume24hour.innerHTML = VOLUME24HOURTO;
                }
            })
        }
    });
    const closeInfoModal = document.getElementById('closeInfoModal');
    closeInfoModal.addEventListener('click', () => searchContainer.remove());
}