"use strict";



/************************/
/********* INIT *********/
/************************/


//data base needs to have these keys, ISBN, titulo, autor, categoria, preco, promocao, rating, imagem
//promotion can be a relative number (0 to 1) or a boolean
const db = [
    { "ISBN": "0001", "titulo": "HTML5, CSS3, JavaScript para Principiantes", "autor": "Zé dos Anzóis", "categoria": "Front number", "preco": 300, "promocao": true, "rating": 5, "imagem": "curso1.jpg" },
    { "ISBN": "0002", "titulo": "Curso de Comida Vegetariana", "autor": "Zé dos Anzóis", "categoria": "Culinária", "preco": 200, "promocao": true, "rating": 4, "imagem": "curso2.jpg" },
    { "ISBN": "0003", "titulo": "Guitarra para Principiantes", "autor": "Zé dos Anzóis", "categoria": "Música", "preco": 200, "promocao": true, "rating": 4, "imagem": "curso3.jpg" },
    { "ISBN": "0004", "titulo": "A horta em casa", "autor": "Zé dos Anzóis", "categoria": "Jardinagem", "preco": 200, "promocao": false, "rating": 4, "imagem": "curso4.jpg" },
    { "ISBN": "0005", "titulo": "Decoração com produtos artesanais", "autor": "Zé dos Anzóis", "categoria": "Artes", "preco": 200, "promocao": true, "rating": 4, "imagem": "curso5.jpg" },
]; 

//global variables
let globalPromotion = 15;
let currPage = 1;
let arrayAllElem;
let arrayBuilder;
const app = new App();

function init() {
    buildBodyHtml();
    buildFilterBar()
    createArrayBuilder(db);
    buildPage(currPage);
    buildCarrinho();
    initializeFilterBarEventListeners();
    // localStorage.clear();
}

function buildFilterBar(){
    const cateSection = document.getElementById('category-select');
    const categories = db.map(curso => curso.categoria);

    for (const category of categories){
        const elem = document.createElement('option');
        elem.value = category;
        elem.innerHTML = category;
        cateSection.appendChild(elem);
    }
    cateSection.parentNode.appendChild(creareElemPerPage());
}


/************************/
/********* Utils ********/
/************************/

function findParentElementId(element) {
    while (element) {
        if (element.id) {
            return element.id;
        }
        element = element.parentElement;
    }
    return null;
}

function clearAllChilds(parent) {
    while (parent && parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function calculatePromotionPrice(curso) {
    if (typeof curso.promocao === 'number')
        return (curso.preco * curso.promocao);
    else if (typeof curso.promocao === 'boolean' && curso.promocao === true)
        return globalPromotion;
    else
        return curso.preco;
}

function calcTotalPrice(obj) {
    const curso = db.find(curso => curso.ISBN === obj.id);

    const totalPrice = calculatePromotionPrice(curso) * obj.qtd;
    //TODO calculate promotion
    return totalPrice;
}

/************************/
/***** Lista Cursos *****/
/************************/

function buindListaCursos() {
    const listaCursos = document.getElementById('lista-cursos');
    
    clearAllChilds(listaCursos);
    const cabeçalho = document.createElement('div');
    cabeçalho.innerHTML = '<h1 id="cabeçalho" class="cabecalho">Cursos Online</h1>';
    listaCursos.appendChild(cabeçalho);
    let i = 0;
    for (let curso of arrayBuilder) {
        if (i++ % 3 === 0) {
            const row = document.createElement('div');
            row.classList.add('row');
            listaCursos.appendChild(row);
        }//adiciona uma nova linha a cada 3 elementos
        createCursoElem(curso);
    }
    createEventListeners();
    const ElementsPerPage = document.getElementById("ElementsPerPageId").value;
    const nPages = Math.ceil(arrayAllElem.length / ElementsPerPage);
    listaCursos.appendChild(buildPagination(currPage, nPages))
}

function createCursoElem(curso) {
    const listaCursos = document.getElementById('lista-cursos');

    const courseCard = document.createElement('div');
    courseCard.classList.add('four', 'columns');
    courseCard.id = curso.ISBN;
    courseCard.innerHTML = buildCardString(curso);
    const button = courseCard.getElementsByTagName('button')[0];
    button.addEventListener('click', (event) => action(event, button));
    const favorite = courseCard.getElementsByClassName('star')[0];
    const cardImage = courseCard.getElementsByClassName('imagen-curso')[0];
    if (app.favoritos.find(item => item == curso.ISBN))
        favorite.classList.toggle('favorite');
    console.log(courseCard);
    if (cardImage)
        cardImage.addEventListener('click', (event) => openModal(event.target));
    listaCursos.lastChild.appendChild(courseCard);
}

function action(env, ele){
    env.preventDefault();

    const productId = ele.getAttribute('data-id');
    app.add_carrinho(productId);
    buildCarrinho();
}

function buildCardString(curso) {
    return`
    <div class="card">
        <img id="imagem-card" src="img/${curso.imagem}" class="imagen-curso u-full-width">
        <div class="info-card">
            <h4>${curso.titulo}</h4>
            <p>${curso.autor}</p>
            <div class="star-rating" data-rating="${curso.rating}">&nbsp;</div>
            <p class="preco">${curso.promocao > 0 ? curso.preco + '€' : ''} <span class="u-pull-right">${calculatePromotionPrice(curso) + '€'}</span></p>
            <button class="u-full-width button-primary button input adicionar-carrinho" data-id="${curso.ISBN}">Adicionar ao Carrinho</button>
            <div class="star" onclick="toggleFavorite(this)"></div>
        </div>
    </div>
    `
}


/************************/
/******* Favourite ******/
/************************/


function toggleFavorite(element) {
    app.add_favourites(findParentElementId(element));
    // buindListaCursos();
    buildPage(1);
}



/************************/
/******* Carrinho *******/
/************************/

function buildCarrinho() {
    const carrinhoList = carrinho.querySelector('tbody');
    const objArray = app.carrinho;
    let totalPrice = 0;
    
    clearAllChilds(carrinhoList);
    for (const objElem of objArray) {
        totalPrice += calcTotalPrice(objElem);
        const newListing = carrinhoElem(objElem);
        const buttons = Array.from(newListing.getElementsByTagName('button'));

        buttons.forEach(button => {
            button.addEventListener('click', (event) => listingAction(event, button));
        });
        carrinhoList.appendChild(newListing);
    }
    const total = document.createElement('tr');
    const total_cell = document.createElement('td');

    // total_cell.style.textAlign = 'right';
    total_cell.innerHTML = `Total: ${totalPrice}€`; //TODO css to total
    total.appendChild(total_cell);
    carrinhoList.appendChild(total);
}

function clearCart() {
    app.carrinho = [];
    buildCarrinho();
}

function carrinhoElem(element) {
    const curso = db.find(curso => curso.ISBN === element.id);
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>  
            <img src="img/${curso.imagem}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${calculatePromotionPrice(curso)}</td>
        <td>${element.qtd} </td>
        <td>
            <div> <button class="btn btn-add">+</button></div>
            <div> <button class="btn btn-subtract">-</button></div>
        </td>
        <td>
            <button class="btn btn-delete">x</button>
        </td>
    `;
    row.id = element.id;
    return row;
}

/************************/
/****** Pagination ******/
/************************/

function buildPagination(currentPage, totalPages) {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&laquo;';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => buildPage(1));
    pagination.appendChild(prevButton);
    // Create page buttons
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerHTML = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => buildPage(i));
        pagination.appendChild(pageButton);
    }
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&raquo;';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => buildPage(totalPages));
    pagination.appendChild(nextButton);
    return pagination;
}

function creareElemPerPage (){
    const elemPerPage = document.createElement('input');
    elemPerPage.type = "number";
    elemPerPage.id = "ElementsPerPageId";
    elemPerPage.required = true;
    elemPerPage.min = 1;
    elemPerPage.value = 10; //std value
    elemPerPage.addEventListener('input', (event) => {
        const elemPerPage = parseInt(event.target.value, 10);
        if (elemPerPage > 0)
            buildPage(1);
    });
    return elemPerPage;
}

function buildPage(page) {
    currPage = page;
    const number = document.getElementById("ElementsPerPageId").value
    const start = number * (page - 1);
    paginationArrayBuilder(start, number);
    buindListaCursos();
    closeModal();
}

function paginationArrayBuilder(start, number){
    arrayBuilder = [];

    for (let i = 0; i < number; i++) {
        if (arrayAllElem[start + i])
            arrayBuilder.push(arrayAllElem[start + i]);
    }
}


/************************/
/***** Env Lisseners*****/
/************************/

function createEventListeners() {
    const objEle = document.getElementsByClassName('u-full-width button-primary button input adicionar-carrinho');

    // carrinho lisseners
    const limparCarrinho = document.getElementById('limpar-carrinho');
    if (limparCarrinho)
        limparCarrinho.addEventListener('click', clearCart);
    
    const finalizarCompra = document.getElementById('finalizar-compra');
    if (finalizarCompra)
        finalizarCompra.addEventListener('click', (event) => openModal(event.target));
 
    // login lisseners
    const loginButton = document.getElementById('login');
    if (loginButton)
        loginButton.addEventListener('click', (event) => openModal(event.target));
    
    const loggoutButton = document.getElementById('logout');
    if (loggoutButton)
        loggoutButton.addEventListener('click', () => app.loggin = null);
    
    // buscador lissener:
    searcherLissener();
    
    //modal lisseners
    const closeModalButton = document.getElementsByClassName('close')[0];
    if (closeModalButton)
    closeModalButton.addEventListener('click', () => closeModal());
}

function searcherLissener() {	
    const form = document.getElementById('pesquisa');
    const input = document.getElementById('buscador');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const query = input.value.trim(); // Get the search query
        if (query)
            searchQuery(query);
    });
}

function searchQuery(query) {
    const objList = db.filter(curso => {
        return Object.values(curso).some(value => 
            value.toString().toLowerCase().includes(query.toLowerCase())
        );
    });
    arrayAllElem = Array.from(objList);
    buildPage(1);
}

function listingAction(event, element) {
    const elemParentId = findParentElementId(element);

    event.preventDefault();
    if (element.classList.contains('btn-add')) {
        app.add_carrinho(elemParentId);
    }
    else if (element.classList.contains('btn-subtract')) {
        app.rm_one_carrinho(elemParentId);
    }
    else if (element.classList.contains('btn-delete')) {
        app.rm_carrinho(elemParentId);
    }
    buildCarrinho();
}

/************************/
/*** Filter lisseners ***/
/************************/

// Function to handle elements per page selection
function handleElementsPerPageChange(event) {
    const selectedElementsPerPage = event.target.value;
    // Add your logic to handle the selected elements per page here
}

function handleCategoryChange(event) {
	const selectedCategory = event.target.value;

    createArrayBuilder(db);
    if (selectedCategory === 'favoritos')
        favArrayBuilder();
    else if (selectedCategory === 'all')
        arrayAllElem = db;
    else if (selectedCategory === 'mostSelled')
        mostSelled();
    else
        filterArrayBuilder(selectedCategory);
    // buindListaCursos();
    buildPage(1);
}


function handleOrderChange(event) {
    const selectedOrder = event.target.value;
    if (selectedOrder === 'price')
        orderArrayBuilder();
    else if (selectedOrder === 'rating')
        invOrderArrayBuilder();
    buildPage(1);
}

// Function to initialize event listeners
function initializeFilterBarEventListeners() {
    console.log('Initializing filter bar event listeners');
	const categorySelect = document.getElementById('category-select');
    const orderSelect = document.getElementById('order-select');
	if (categorySelect)
		categorySelect.addEventListener('change', handleCategoryChange);
    if (orderSelect)
        orderSelect.addEventListener('change', handleOrderChange);
}

/************************/
/***** Array Builder ****/
/************************/


function createArrayBuilder(db) {
    arrayAllElem = db;
}

function favArrayBuilder() {
    const objList = db.filter(curso => app.favoritos.includes(curso.ISBN));
    arrayAllElem = Array.from(objList);
}

function orderArrayBuilder() {
    arrayAllElem.sort((a, b) => a.preco - b.preco);
}

function invOrderArrayBuilder() {
    arrayAllElem.sort((a, b) => b.preco - a.preco);
}

function filterArrayBuilder(categoriaStr) {
    const objList = db.filter(curso => curso.categoria === categoriaStr);
    arrayAllElem = Array.from(objList);
}

function mostSelled() {
        let db = JSON.parse(localStorage.getItem('appStateDB')) || {};
        let array = [];
    
        for (const user in db) {
            for (const elem of db[user].compras) {
                const idx = array.findIndex(item => item.id == elem.id);
                if (idx >= 0) {
                    array[idx].qtd += elem.qtd;
                } else {
                    array.push(elem);
                }
            }
        }
        arrayAllElem = array;
        orderArrayBuilder()
}


/************************/
/***** Modal Actions ****/
/************************/

function openModal(elem) {
    const modal = document.getElementById('myModal');

    if(elem.id === 'login')
        buildLoginModal();
    if(elem.id === 'finalizar-compra')
        buildFinalCompraModal();
    else if(elem.id === 'imagem-card')
        buildCardDetailsModal(elem);
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';

    const barName = document.getElementById('barName');
    const barBody = barName.getElementsByClassName('row')[0];
    clearAllChilds(barBody);
    const modalBody = document.getElementById('modalBody');
    clearAllChilds(modalBody);
}


function buildCardDetailsModal(elem) {
    const curso = db.find(course => course.ISBN === findParentElementId(elem.parentElement));
    if (curso) {
        //modify the barName
        const barName = document.getElementById('barName');
        barName.innerHTML = `
            <h2 id="courseTitle">${curso.titulo}</h2>
            <p id="courseCategory" style="font-size: smaller">categoria: ${curso.categoria}</p>
            <div class="star-rating" data-rating="${curso.rating}">&nbsp;</div>
        `;

        // Create the modal body
        const modalBody = document.getElementById('modalBody');
        clearAllChilds(modalBody);


        const cardDetailsModal = document.createElement('div');
        cardDetailsModal.id = 'cardDetailsModal';
        cardDetailsModal.innerHTML = `
            <hr>
            <div class="course-details">
                <img id="courseImage" src="./img/${curso.imagem}" alt="${curso.titulo}" class="course-image">
                <p id="courseDescription" class="course-description">Descrição: ${curso.descricao}</p>
            </div>
            <p id="courseAuthor">Author: ${curso.autor}</p>
            <p id="coursePrice">Price: $${calculatePromotionPrice(curso)}</p>
        `;
        modalBody.appendChild(cardDetailsModal);
    }
}

function buildFinalCompraModal(){
    const objArray = app.carrinho;
    const finalCompras = document.createElement('div');
    finalCompras.id = 'finalCompras';
    
    //calculate total price
    let totalPrice = 0;
    for (const objElem of objArray) {
        totalPrice += calcTotalPrice(objElem);
    }
    finalCompras.innerHTML = `<hr><h3> Pagamento de ${totalPrice}€ </h3>`;

    //confirm button
    const button = document.createElement('button');
    button.innerHTML = 'Confirmar Pagamento';
    button.addEventListener('click', () => {
        if (app.loggin === 'noLogin')
            alert('Please login to proceed with the payment');
        else {
            app.carrinho.forEach(objElem => app.add_compras(objElem.id)); //TODO change
            clearCart();
        }
        closeModal();
    });
    finalCompras.appendChild(button);

    const modalBody = document.getElementById('modalBody');
    clearAllChilds(modalBody);
    modalBody.appendChild(finalCompras);
}

function buildLoginModal() {
    //modify the barName
    const barName = document.getElementById('barName');
    barName.innerHTML = 'Login';

    //modal modalBody
    const loginModal = document.createElement('div');
    loginModal.innerHTML += `
        <hr>
        <div class="login-modal">
            <form id="loginForm">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <button type="submit">Login</button>
            </form>
            <p id="loginMessage"></p>
        </div>
    `;
    loginModal.id = 'loginForm';
    
    //append
    const modalBody = document.getElementById('modalBody');
    clearAllChilds(modalBody);
    modalBody.appendChild(loginModal);
    
    //loggin form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        app.checkLogin(username, password);
    });
}