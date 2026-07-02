# OneUp

OneUp é uma plataforma gamer fictícia desenvolvida como projeto de portfólio utilizando **HTML, CSS e JavaScript puro**.

O objetivo do projeto é simular uma aplicação onde usuários podem descobrir jogos, favoritar títulos, avaliar experiências, acessar uma loja gamer simulada, interagir em uma comunidade e utilizar um painel administrativo para gerenciar o catálogo.

## Funcionalidades

* Página inicial responsiva;
* Cadastro e login de usuário simulados;
* Login administrativo;
* Painel administrativo para adicionar e remover jogos;
* Catálogo de jogos com busca e filtro por gênero;
* Sistema de favoritos;
* Sistema de avaliação por estrelas;
* Perfil do usuário com favoritos e avaliações;
* Loja gamer simulada;
* Carrinho de compras com total;
* Checkout simulado;
* Comunidade com criação de publicações;
* Sistema de curtidas em posts;
* Página 404 estilizada;
* Persistência local usando `localStorage`.

## Acesso administrativo

Para acessar o painel administrativo, utilize:

```txt
E-mail: admin@oneup.com
Senha: admin123
```

O painel administrativo permite adicionar novos jogos ao catálogo. Os jogos cadastrados aparecem automaticamente na página **Descobrir**.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* LocalStorage
* Git e GitHub

## Estrutura do projeto

```txt
oneup/
├── index.html
├── login.html
├── discover.html
├── loja.html
├── comunidade.html
├── perfil.html
├── admin.html
├── 404.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── games.js
│   │   ├── store.js
│   │   └── community.js
│   └── images/
│       ├── city_background.jpg
│       ├── personagem.png
│       └── personagem2.png
└── README.md
```

## Como executar

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta:

```bash
cd oneup
```

Abra o arquivo `index.html` no navegador.

Também é possível executar com a extensão **Live Server** no VS Code.

## Observação sobre autenticação

O sistema de autenticação é uma simulação feita com `localStorage`, pensada para fins de portfólio e demonstração de fluxo.

Não se trata de autenticação real de produção. Em um ambiente real, seria necessário utilizar backend, banco de dados, criptografia de senhas e controle seguro de sessão.

## Melhorias futuras

* Implementar backend real;
* Criar autenticação segura;
* Persistir dados em banco de dados;
* Adicionar upload de imagens para jogos;
* Melhorar o painel administrativo;
* Criar ranking global real;
* Implementar comentários em jogos;
* Adicionar logos/capas reais ou imagens próprias dos jogos;
* Criar versão em React ou Angular.
