//----------------------------------------------- ESTRUCTURAS ESTÁTICAS -----------------------------------------------

const welcomeMsgStructure = `   <section class="welcome__box">
                                    <div class="welcome__header">
                                        <p>Bienvenido/a a Cripto Tracker!</p>
                                    </div>
                                    <div class="modal__content">
                                        <div class="welcome__main">
                                            <p><b>Cripto Tracker</b> es una aplicación web en desarrollo para llevar un control de operaciones de criptomonedas. 
                                            La misma está pensada para calcular los beneficios porcentuales y absolutos en tiempo real.</p>
                                            <p>Actualmente se encuentra en una versión muy temprana, y es una de sus limitaciones poder trackear únicamente pares USD.</p>
                                            <p>Espero que te sea de utilidad y disfrutes de su uso!</p>
                                        </div>
                                        <div class="welcome__footer">
                                            <div class="button__position">
                                                <button class="welcome__button" id="getStartedButton">Comenzar!</button>
                                            </div>
                                            <p>Cripto Tracker v1.0 © desarrollada por Martín Guevara</p>
                                        </div>
                                    </div>
                                </section> `;


const menuMobileStructure = `   <article class="menu__mobile--header">MENU</article>
                                <article class="menu__mobile--item" id="menuMobileItem1"><img src="./public/img/loginuser.png">Iniciar Sesión</article>
                                <article class="menu__mobile--item" id="menuMobileItem2"><img src="./public/img/radar1.png">Radar</article>
                                <article class="menu__mobile--item" id="menuMobileItem4"><img src="./public/img/lupa.png">Info moneda</article>`; 

const addOperationStructure = ` <article class="modal__box">
                                    <div class="modal__box--header">
                                        <p>Agregar moneda</p>
                                    </div>
                                    <div class="modal__box--content">
                                        <div class="content__main">
                                            <p>Token (ej: BTC)</p>
                                            <div class="token__input">
                                                <input type="text" class="modal--input" placeholder="TOKEN" id="modalInput1"><p>/ USD</p>
                                            </div>
                                            <p>Inversión incial</p>
                                            <div class="token__input">
                                                <input type="text" class="modal--input" placeholder="USD" id="modalInput2"><p>USD</p>
                                            </div>
                                            <p>Precio de entrada</p>
                                            <div class="token__input">
                                                <input type="text" class="modal--input" placeholder="USD" id="modalInput3"><p>USD</p>
                                            </div>
                                        </div>
                                        <div class="content__footer">
                                            <button class="modal__button--cancel" id="modalClose">Cancelar</button>
                                            <button class="modal__button--add" id="modalAccept">Agregar</button>
                                        </div>
                                    </div>
                                </artic> `;

const removeOperationStructure = `  <article class="remove__box">
                                        <div class="remove__header" id="modalHeader">
                                            <p>Desea eliminar o cerrar la operación?</p>
                                            <p id="coinIdentifier"></p>
                                        </div>
                                        <div class="remove__content">
                                            <div class="remove__disclaimer">
                                            <p>Eliminar la operación la eliminará completamente del sistema sin mostrar estadística alguna.</p>
                                            <p>Está seguro que desea eliminarla?</p>
                                            </div>
                                            <div class="remove__buttons">
                                                <div>
                                                    <button class="modal__button--cancel" id="removeCancel">Cancelar</button>
                                                </div>
                                                <div>
                                                    <button class="modal__button--add" id="deleteOp">Eliminar operación</button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>`;

const loginModalStructure = `   <article class="login__modal">
                                    <div class="login__modal--header">Iniciar sesión</div>
                                    <div class="login__modal--main">
                                        <p>Usuario:</p>
                                        <input type="text" class="login--input" placeholder="admin" id="loginUserInput" value="admin">
                                        <p>Contraseña:</p>
                                        <input type="text" class="login--input" placeholder="admin" id="loginPassInput" value="admin">
                                    </div>
                                    <div class="login__modal--footer">
                                        <button id="loginCancel">Cancelar</button>
                                        <button id="loginAccept">Aceptar</button>
                                    </div>
                                </article>`;

const searchCoinStructure = `   <article class="search__modal">
                                    <div class="search__modal--header"><p>Información de moneda</p><button id="closeInfoModal">X</button></div>
                                    <div class="search__modal--main">
                                        <div class="main__searchbar">
                                            <img src="./public/img/lupa.png" alt="">
                                            <input type="text" class="search__input" placeholder="TOKEN" id="searchInfoInput">
                                            <p>/ USD</p>
                                            <button id="searchInfoButton">Buscar</button>
                                        </div>
                                        <div class="main__infodisplay">
                                            <div class="infodisplay__table">
                                                <div class="infodisplay__cell"><div>Precio actual</div><div id="price">-</div></div>
                                                <div class="infodisplay__cell"><div>Precio apertura 24 hs</div><div id="open24hour">-</div></div>
                                                <div class="infodisplay__cell"><div>Precio máximo 24 hs</div><div id="high24hour">-</div></div>
                                                <div class="infodisplay__cell"><div>Precio mínimo 24 hs</div><div id="low24hour">-</div></div>
                                                <div class="infodisplay__cell"><div>Cambio en 24 hs</div><div id="change24hour">-</div></div>
                                                <div class="infodisplay__cell"><div>Volumen en 24 hs</div><div id="volume24hour">-</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </article>`;

const addFollowedStructure = `      <div class="followed__emptycard--input">
                                        <input type="text" class="empty__card--input" placeholder="TOKEN" id="addInput"><p> / USD</p>
                                    </div>
                                    <div class="followed__emptycard--buttons">
                                        <button class="empty__card--cancelbutton" id="followedCancel">⛌</button>
                                        <button class="empty__card--acceptbutton" id="followedAccept">✓</button>
                                    </div> `;