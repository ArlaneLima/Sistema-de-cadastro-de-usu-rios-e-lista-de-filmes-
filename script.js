// classe que representa um usuário
class Usuario {
  constructor(nome) {
    this.nome = nome;
  }
}

//classe que representa um filme 
class Filme {
  constructor(titulo, genero, classificacao) {
    this.titulo = titulo;
    this.genero = genero;
    this.classificacao = classificacao;
  }
}

//lista que representa os filmes cadastrados
const filmes = [];
//armazena o nome do usuário logado
let usuario = "";

// Mostrar seções e esconder as outras
function esconderTodasSecoes() {
  document.getElementById("cadastro").classList.add("hidden");
  document.getElementById("cadastro-filme").classList.add("hidden");
  document.getElementById("lista-filmes-container").classList.add("hidden");
}

//mostra a seção de cadastro do usuário
function mostrarCadastro() {
  esconderTodasSecoes();
  document.getElementById("cadastro").classList.remove("hidden");
}

//mostra o formulário de cadastro do filme
function mostrarCadastroFilme() {
  if (!usuario) {
    alert("Cadastre um usuário primeiro!");
    return;
  }
  esconderTodasSecoes();
  document.getElementById("cadastro-filme").classList.remove("hidden");
}

//mostra a lista de filmes 
function mostrarListaFilmes() {
  if (!usuario) {
    alert("Cadastre um usuário primeiro!");
    return;
  }
  esconderTodasSecoes();
  atualizarLista();
  document.getElementById("lista-filmes-container").classList.remove("hidden");
}

// Cadastro usuário
function cadastrarUsuario() {
  const nomeInput = document.getElementById("nome");
  const nome = nomeInput.value.trim();
  if (!nome) {
    alert("Digite um nome válido.");
    return;
  }
  usuario = nome;
  alert(`Bem-vindo(a), ${usuario}!`);
  nomeInput.value = "";
}

// Cadastro filme
function cadastrarFilme() {
  const titulo = document.getElementById("titulo").value.trim();
  const genero = document.getElementById("genero").value.trim();
  const classificacao = document.getElementById("classificacao").value.trim();

  if (!titulo || !genero || !classificacao) {
    alert("Preencha todos os campos do filme!");
    return;
  }

  filmes.push(new Filme(titulo, genero, classificacao));
  alert(`Filme "${titulo}" cadastrado com sucesso!`);
  limparFormulario();
}

//atualiza a lista de filmes 
function atualizarLista() {
  const ul = document.getElementById("lista-filmes");
  ul.innerHTML = "";

  if (filmes.length === 0) {
    ul.innerHTML = "<li>Nenhum filme cadastrado.</li>";
    return;
  }

  //pra cada filme, cria um item de lista
  filmes.forEach((filme, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${filme.titulo}</strong> — ${filme.genero} (${filme.classificacao})
      <button onclick="removerFilme(${idx})">Remover</button>
    `;
    ul.appendChild(li);
  });
}

//remove um filme da lista 
function removerFilme(index) {
  if (confirm("Deseja realmente remover este filme?")) {
    filmes.splice(index, 1);
    atualizarLista();
  }
}

//busca um filme na lista 
function buscarFilmes() {
  const termo = document.getElementById("busca-filme").value.toLowerCase();
  const filmesFiltrados = filmes.filter(filme =>
    filme.titulo.toLowerCase().includes(termo) ||
    filme.genero.toLowerCase().includes(termo)
  );

  const ul = document.getElementById("lista-filmes");
  ul.innerHTML = "";

  //filtra com base no termo buscado
  if (filmesFiltrados.length === 0) {
    ul.innerHTML = "<li>Nenhum filme encontrado.</li>";
    return;
  }

  //mostra os filmes filtrados na lista
  filmesFiltrados.forEach((filme, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${filme.titulo}</strong> — ${filme.genero} (${filme.classificacao})
      <button onclick="removerFilme(${filmes.indexOf(filme)})">Remover</button>
    `;
    ul.appendChild(li);
  });
}


//limpa o formulário de cadastro de filme
function limparFormulario() {
  document.getElementById("titulo").value = "";
  document.getElementById("genero").value = "";
  document.getElementById("classificacao").value = "";
}

//mostra o cadastro do usuário
window.onload = () => {
  mostrarCadastro();
};

