"use strict";

class App {
    #carrinho = [];
    #favoritos = [];
    #compras = [];
    #loggin = 'noLogin';
    #password = 'noPassword';

	constructor(){// TODO update with storage data
        this.lastLogin();
        this.loadFromLocalStorage();
    }

    set carrinho(item) {
        if (item == null)
            this.#carrinho = [];
        else if (Array.isArray(item))
            this.#carrinho = item;
        this.saveToLocalStorage();
    }

    set favoritos(item) {
        if (item == null)
            this.#favoritos = [];
        else if (Array.isArray(item))
            this.#favoritos = item;
        this.saveToLocalStorage();
    }

    set compras(item) {
        if (item == null)
            this.#compras = [];
        else if (Array.isArray(item))
            this.#compras = item;
        this.saveToLocalStorage();
    }

    set loggin(user) {
        if (user == null || user === '')
            this.#loggin = 'noLogin';
        else if (typeof user === 'string')
            this.#loggin = user;
        let saveLoggin = {user: this.#loggin}
        localStorage.setItem('appLoggin', JSON.stringify(saveLoggin));
    }

    set password(pass) {
        this.#password = pass;
    }

    get password() {
        return this.#password;
    }

    get carrinho() {
        return this.#carrinho;
    }

    get favoritos() {
        return this.#favoritos;
    }

    get compras() {
        return this.#compras;
    }

    get loggin() {
        return this.#loggin;
    }

    add_carrinho(idIsbn) {
        const existingItem = this.#carrinho.find(item => item.id == idIsbn);
        
        if (existingItem) {
            existingItem.qtd++;
        } else {
            let arrayElem = { id: idIsbn, qtd: 1 };
            this.#carrinho.push(arrayElem);
        }
        this.saveToLocalStorage();
    }

    rm_carrinho(idIsbn) {
        const idx = this.#carrinho.findIndex(item => item.id == idIsbn);

        this.#carrinho.splice(idx, 1);
        this.saveToLocalStorage();
    }


    rm_one_carrinho(idIsbn) {
        const existingItem = this.#carrinho.find(item => item.id == idIsbn);
        const idx = this.#carrinho.findIndex(item => item.id == idIsbn);

        if (existingItem) {
            existingItem.qtd--;
            if (existingItem.qtd == 0) {
                this.#carrinho.splice(idx, 1);
            }
        }
        this.saveToLocalStorage();
    }

    add_favourites(idIsbn) {
        const idx = this.#favoritos.indexOf(idIsbn);

        if (idx >= 0) {
            this.#favoritos.splice(idx, 1);
        } else{
            this.#favoritos.push(idIsbn);
        }
        this.saveToLocalStorage();
    }

    add_compras(idIsbn) {
        const existingItem = this.#compras.find(item => item.id == idIsbn);
        const addQtd = this.#carrinho.find(item => item.id == idIsbn).qtd;
        
        if (existingItem) {
            existingItem.qtd += addQtd;
        } else {
            let arrayElem = { id: idIsbn, qtd: addQtd};
            this.#compras.push(arrayElem);
        }
        this.saveToLocalStorage();
    }//TODO mais vendidos

	clearAll() {
		this.#carrinho = [];
		this.#favoritos = [];
		this.#compras = [];
		this.#loggin = 'noLogin';
		this.#password = '';
		this.saveToLocalStorage();
	}

    lastLogin() {
        const user = JSON.parse(localStorage.getItem('appLoggin')) || {};
        if (user)
            this.#loggin = user;
        else
            this.#loggin = 'noLogin';
    }

    checkLogin(loggin, password) {
        // Retrieve the database from local storage
        let db = JSON.parse(localStorage.getItem('appStateDB')) || {};

		console.log(loggin);
        // Check if the login exists in the database
        if (db[loggin]) {
			alert("User already exists");
            // Check if the password is correct
            if (db[loggin].password === password) {
                // Update the app state using the class constructor
                this.#loggin = loggin;
                this.loadFromLocalStorage();
                this.#password = password;
                // this.#carrinho = db[loggin].carrinho || [];
                // this.#favoritos = db[loggin].favoritos || [];
                // this.#compras = db[loggin].compras || [];
				this.clearAll();
                closeModal();
				buildPage();
            }
            else
                alert("incorrect password");
        }
        else
        {
			alert("User created");
            localStorage.setItem('appStateDB', JSON.stringify(db));
            this.#loggin = loggin;
            this.#password = password;
            this.saveToLocalStorage();
            closeModal();
			buildPage();
        }
		console.log(app.carrinho);
		console.log(app.favoritos);
		console.log(app.compras);
		console.log(app.loggin);
    }

    saveToLocalStorage() {
        const state = {
            carrinho: this.#carrinho,
            favoritos: this.#favoritos,
            compras: this.#compras,
            loggin: this.#loggin,
			password: this.#password
        };
        let db = JSON.parse(localStorage.getItem('appStateDB')) || {};
        db[this.#loggin] = state;
        localStorage.setItem('appStateDB', JSON.stringify(db));
    }

    loadFromLocalStorage() {
        const db = JSON.parse(localStorage.getItem('appStateDB')) || {};
        const state = db[this.#loggin];
        if (state) {
            this.#carrinho = state.carrinho || [];
            this.#favoritos = state.favoritos || [];
            this.#compras = state.compras || [];
            this.#loggin = state.loggin || ['noLogin'];
        }
        // else 
        // {
        //     this.#carrinho = [];
        //     this.#favoritos = [];
        //     this.#compras = [];
        //     this.#loggin = 'noLogin';
        // }
    }
}