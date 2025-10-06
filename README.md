# 🎬 Stream List

Este projeto é uma aplicação desenvolvida em **Vue 3** que consome a **API pública do The Movie Database (TMDB)** para exibir informações sobre filmes. O usuário pode navegar por páginas de filmes populares, filtrar resultados por gênero e país de origem, além de realizar buscas personalizadas por nome de filme.

---

## Funcionalidades

* Listagem de filmes populares com paginação.
* Filtros por **gênero** e **país de origem**.
* Campo de busca com **debounce**, evitando requisições desnecessárias.
* Armazenamento de dados em **Session Storage** e **Local Storage** para otimizar desempenho.
* Exibição de detalhes de filmes com cache local, evitando chamadas repetidas à API.
* Feedback de erros e estados de carregamento.
* Mudança de tema (Dark ou Light).

---

## Tecnologias e Conceitos Utilizados

* **Vue 3 (Composition API)** – estrutura principal do projeto.
* **Pinia** – gerenciamento de estado global simples e reativo, utilizado para armazenar filmes, gêneros e países de origem.
* **Axios** – comunicação com a API do TMDB.
* **Session Storage** – utilizado para salvar dados temporários, como listas de gêneros e países, evitando novas requisições a cada carregamento.
* **Local Storage** – usado para armazenar preferências persistentes do usuário.
* **Debounce** – técnica aplicada no campo de busca para retardar requisições até que o usuário pare de digitar, melhorando a performance e experiência.
* **Interceptores Axios** – para tratar erros globais de requisição (status 400, 401, 404, 500, etc.).

---

## Como o sistema evita requisições desnecessárias

* Antes de buscar gêneros e países, o sistema verifica se os dados já estão salvos em **Session Storage**.
* A função `getMovieById` procura no cache local antes de realizar novas chamadas à API.
* O `debounce` impede chamadas sucessivas enquanto o usuário está digitando no campo de busca.
* As páginas de filmes são armazenadas no cache (`MovieCache`), permitindo reuso das informações já obtidas.

---

## Aprendizados

Durante o desenvolvimento deste projeto, aprofundei meu entendimento sobre:

* O ciclo de vida dos componentes no **Vue 3** (`mounted`, `created`, `watch`, `computed`).
* O funcionamento e vantagens do **Pinia** comparado a outros gerenciadores de estado.
* O uso eficiente de **armazenamento local (session/local storage)** para otimização de aplicações SPA.
* Estratégias de **debounce** e **cache local** para reduzir consumo de API e melhorar performance.
* Boas práticas no consumo de APIs com **Axios** e tratamento global de erros.
* Uso de padrões de commits.

---

## Conclusão

Este projeto serviu como um excelente estudo prático para aplicar conceitos de **reatividade, cache, gerenciamento de estado e otimização de requisições** no ecossistema Vue.
Além de consolidar fundamentos técnicos, também proporcionou um aprendizado sobre **boas práticas de arquitetura e performance em SPAs modernas**.


## Como usar

1 - Clone o repositório com o comando:
```bash
git clone https://github.com/dandinCode/StreamList.git
```

2 - Instale as dependências digitando no terminal: 
```bash
npm install
```

3 - Execute o projeto digitando o comando:
```bash
npm run dev
```

4 - Acesse [http://localhost:3000](http://localhost:3000)

