function buildBodyHtml(){
	const body = document.querySelector('body');
	let contentHtml;

	contentHtml = buildHeaderHtml();
	contentHtml += buildHeroHtml();
	contentHtml += buildBarraHtml();
	contentHtml += buildFilterBarHtml();
	contentHtml += buildCursosHtml();
	contentHtml += buildFooterHtml();
	contentHtml += buildModalsHtml();

	body.innerHTML = contentHtml;
}

function buildHeaderHtml(){
	return `
	<header id="header" class="header">
		<div class="container">
			<div class="row">
				<div class="four columns">
				<img src="img/logo.jpg" id="logo">
			</div>
			<div class="two columns u-pull-right">
				<ul>
					<li> <button id="login" class="login"> Login </button>  </li>
					<li class="submenu">
						<img src="img/cart.png" id="img-carrinho">
						<div id="carrinho">
							<table id="lista-carrinho class="button u-full-width"" class="u-full-width">
							<thead>
							<tr>
							<th>Foto</th>
							<th>Nome</th>
							<th>Preço</th>
							<th>Quantidade</th>
							<th></th>
							</tr>
							</thead>
							<tbody></tbody>
							</table>
							<button id="limpar-carrinho" class="button u-full-width">Esvaziar Carrinho</button>
							<button id="finalizar-compra" class="button u-full-width">Finalizar Compra</button>
						</div>
					</li>
					<li class="submenu">
						<img src="img/user.png" id="img-user" class="resized-image">
						<div id="user">
							<button id="logout" class="button u-full-width">Logout</button>
						</div>
					</li>
				</ul>
			</div>
		</div> 
	</header>`
}

function buildHeroHtml(){
	return `
	<div id="hero">
		<div class="container">
			<div class="row">
				<div class="six columns">
					<div class="conteudo-hero">
						<h2>Aprende algo novo</h2>
						<p>Todos os cursos a 15€</p>
						<form action="#" id="pesquisa" method="post" class="formulario">
							<input class="u-full-width" type="text" placeholder="Que gostarias de aprender?" id="buscador">
							<input type="submit" id="submit-buscador" class="submit-buscador">
						</form>
					</div>
				</div>
			</div> 
		</div>
	</div>`;
}

function buildFilterBarHtml() {
    return `
    <div id="filter-bar">
        <div class="container">
            <div class="row">
                <div class="six columns">
                    <div class="filter-options">
                        <label for="category-select">Categoria:</label>
                        <select id="category-select" class="u-full-width">
							<option value="all">Todas</option>
							<option value="favoritos">Favoritos</option>
						</select>
                    </div>
                </div>
				<div class="six columns">
					<div class="filter-options">
						<label for="order-select">Ordenar por:</label>
						<select id="order-select" class="u-full-width">
							<option value="price">Preço</option>
							<option value="rating">Avaliação</option>
							<option value="mostSelled">Mais vendidos</option>
						</select>
            </div>
        </div>
    </div>`;
}

function buildBarraHtml(){
	return `
	<div class="barra">
		<div class="container">
			<div class="row">
				<div class="four columns icon icon1">
					<p>20,000 Cursos online <br>
					Explora os temas mais recentes</p>
				</div>
				<div class="four columns icon icon2">
					<p>Formadores Experientes <br>
					Aprende com estilo</p>
				</div>
				<div class="four columns icon icon3">
					<p>Acesso vitalicio<br>
					Aprende ao teu ritmo</p>
				</div>
			</div>
		</div>
	</div>`;
}

function buildCursosHtml(){
	return `<div id="lista-cursos" class="container"></div>`
}

function buildFooterHtml(){
	return `
	<footer id="footer" class="footer">
		<div class="container">
			<div class="row">
				<div class="four columns">
						<nav id="principal" class="menu">
							<a class="lnk" href="#">Para o teu Negócio</a>
							<a class="lnk" href="#">Torna-te Formador</a>
							<a class="lnk" href="#">Aplicações Móveis</a>
							<a class="lnk" href="#">Suporte</a>
							<a class="lnk" href="#">Temas</a>
						</nav>
				</div>
				<div class="four columns">
						<nav id="secundaria" class="menu">
							<a class="lnk" href="#">Quem Somos?</a>
							<a class="lnk" href="#">Ofertas de Emprego</a>
							<a class="lnk" href="#">Blog</a>
						</nav>
				</div>
			</div>
		</div>
	</footer>`;
}

function buildModalsHtml(){
	return `
	<div id="myModal" class="modal">
		<div class="modal-content">
			<span class="close">&times;</span>
			<div class="barra">
				<div class="container">
					<div class="row">
						<h2 id="barName">Pagamento</h2>
					</div>
				</div>
			</div>
			<div id="modalBody">
			</div>
		</div>
	</div>
	`
}
		
function addScript(){
	return `<script>init()</script>`
}