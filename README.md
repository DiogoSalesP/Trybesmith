# Trybesmith

## Descrição

Trybesmith é um projeto desenvolvido durante o curso de desenvolvimento web da Trybe. O objetivo do projeto é criar uma aplicação web para compartilhamento de conhecimentos, onde os usuários podem criar posts e interagir com outros usuários por meio de comentários.

## Funcionalidades

Para este projeto, foi criado uma loja de itens medievais, no formato de uma API, utilizando Typescript.

Foi desenvolvido todas as camadas da aplicação (Models, Service e Controllers) em seu código e, por meio dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou CRUD, para as pessoas mais íntimas stuck_out_tongue_winking_eye - Create, Read, Update e Delete).

Foi criado alguns endpoints que irão ler e escrever em um banco de dados, utilizando o MySQL.


<details>
  <summary><strong>🐳 Rodando no Docker vs Localmente</strong></summary><br />

  ## Com Docker


  > Rode os serviços `node` e `db` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers
  - Esses serviços irão inicializar um container chamado `trybesmith` e outro chamado `trybesmith_db`.
  - A partir daqui você pode rodar o container `trybesmith` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it trybesmith bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

  ⚠ Atenção ⚠ Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  ⚠ Atenção ⚠ O **git** dentro do container não vem configurado com suas credenciais. Faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  ⚠ Atenção ⚠ Caso você esteja usando macOS e ao executar o `docker-compose up -d` se depare com o seguinte erro:

  ~~~bash
  The Compose file './docker-compose.yml' is invalid because:
  Unsupported config option for services.db: 'platform'
  Unsupported config option for services.node: 'platform'
  ~~~

> Foram encontradas 2 possíveis soluções para este problema:
> 1. Você pode adicionar manualmente a option `platform: linux/amd64` no service do banco de dados no arquivo docker-compose.yml do projeto, mas essa é uma solução local e você deverá reproduzir isso para os outros projetos.
> 2. Você pode adicionar manualmente nos arquivos .bashrc, .zshenv ou .zshrc do seu computador a linha `export DOCKER_DEFAULT_PLATFORM=linux/amd64`, essa é uma solução global.
> As soluções foram com base [nesta fonte](https://stackoverflow.com/a/69636473).



✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

<img src="images/remote-container.png" width="800px" >

---

  ## Sem Docker

  > Instale as dependências [**Caso existam**] com `npm install`

  ⚠ Atenção ⚠ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  ✨ **Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

</details>

<details>
  <summary><strong>🏦 Conexão com o Banco</strong></summary><br />
  
  A conexão do banco local deverá conter os seguintes parâmetros:

  ```typescript
  import dotenv from 'dotenv';
  import mysql from 'mysql2/promise';

  dotenv.config();

  const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  }); // sua conexão NÃO deve ter o database, este deve ser especificado em cada query

  export default connection;
  ```

  **⚠️ É essencial configurar essas 3 variáveis de ambiente para testar o projeto localmente: ⚠️**

  ```
    host: process.env.MYSQL_HOST
    user: process.env.MYSQL_USER
    password: process.env.MYSQL_PASSWORD
  ```

  **⚠️ Existe um arquivo já criado chamado .env.example onde estão listadas as variáveis de ambiente esperadas no projeto. Variáveis de ambiente além das especificadas no arquivo mencionado não são suportadas, pois não são esperadas pelo avaliador do projeto. ⚠️**

  **⚠️ É essencial que seu arquivo tenha o nome `connection.ts` e esteja no diretório `src/models` ⚠️**

</details>

<details>
  <summary><strong>🪑 Tabelas</strong></summary><br />

  O banco terá três tabelas: pessoas usuárias, produtos e pedidos.

  ```sql
  DROP SCHEMA IF EXISTS Trybesmith;
  CREATE SCHEMA IF NOT EXISTS Trybesmith;

  CREATE TABLE Trybesmith.users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    vocation TEXT NOT NULL,
    level INTEGER NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE Trybesmith.orders (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Trybesmith.users (id)
  );

  CREATE TABLE Trybesmith.products (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    amount TEXT NOT NULL,
    order_id INTEGER,
    FOREIGN KEY (order_id) REFERENCES Trybesmith.orders (id)
  );
  ```

  O arquivo `Trybesmith.sql` contém as _queries_ que criam e populam o banco como o teste faz, e os testes **restauram** o banco de dados após sua execução.

  Para que o avaliador funcione corretamente, tanto local quanto remoto, sua `connection.ts` não deve conter o database e suas _queries_ devem conter o banco de dados explicitamente como o exemplo abaixo:
  ```sh
  SELECT * FROM Trybesmith.products;
  ```

</details>

## Instalação

  1. Clone o repositório

  - `git clone https://github.com/DiogoSalesP/Trybesmith.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd Trybesmith`

  2. Instale as dependências [**Caso existam**]

  - `npm install`

  
  3. Inicie o servidor de desenvolvimento:
  
  - `npm start`
 
  4 - Acesse a aplicação no seu navegador em http://localhost:3000.
  
# ENDPOINT


- O endpoint deve ser acessível através do caminho (`/products`);
- O endpoint deve ser acessível através do caminho (`/users`);
- O endpoint deve ser acessível através do caminho (`/orders`);
- O endpoint deve ser acessível através do caminho (`/login`);
