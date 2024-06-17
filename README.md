## Documentação
https://github.com/willyandan/radix-challenge/wiki

## Como Rodar o Projeto Radix Tech Challenge

Este documento descreve os passos necessários para executar o projeto Radix Challenge localmente.

### Pré-requisitos

* Node.js e npm (ou yarn) instalados: verifique a instalação através do comando `node -v` e `npm -v` (ou `yarn -v`) no terminal.

* Versões:
  * Node: v20.13.1 (LTS)
  * Npm: 10.5.2
### Etapas

1. **Clone o repositório do projeto**

   Use o comando `git clone` para clonar o repositório do projeto Radix Challenge para sua máquina.

   ```bash
   git clone https://github.com/willyandan/radix-challenge.git
   ```

2. **Acesse a pasta do projeto**

   Após o clone ser concluído, navegue até a pasta do projeto usando o comando `cd`:

   ```bash
   cd radix-challenge
   ```

3. **Instale as dependências**

   Execute o seguinte comando para instalar as dependências necessárias:

   ```bash
   npm install
   ```

   Este comando irá baixar e instalar todas as bibliotecas listadas no arquivo `package.json`.

   Execute o seguinte comando para preparar o husky:
   ```bash
   npm run prepare
   ```   
4. **Execute o projeto em desenvolvimento**

   Para iniciar o projeto em modo de desenvolvimento, use o seguinte comando:

   ```bash
   npm run start:dev
   ```

   O comando `npm run start:dev` executará o script `start:dev` definido no `package.json`. Este script irá compilar o código TypeScript para JavaScript e depois iniciar o servidor Node.js usando o `nodemon` para monitorar alterações nos arquivos de código e reiniciar o servidor automaticamente.

   Por padrão, o servidor será iniciado na porta `8080`. Você pode acessar a API do projeto no seguinte endereço:

   ```
   http://localhost:8080
   ```
   O projeto conta com um docker-compose.yaml que contem a imagem do mongo.
   Para executar o docker compose basta rodar o seguinte comando:
   ```bash
   docker-compose up
   ```

5. **Executar o projeto em produção (opcional)**

   Para executar o projeto em um ambiente de produção, é recomendado compilar o código TypeScript para JavaScript antes de iniciar o servidor. Você pode fazer isso usando o seguinte comando:

   ```bash
   npm run build
   ```

   Este comando executará o script `build` definido no `package.json`, que irá compilar o código TypeScript para JavaScript na pasta `build`.

   Depois de compilar o código, você pode iniciar o servidor em produção usando o seguinte comando:

   ```bash
   node build/index.js
   ```

   Este comando irá iniciar o servidor Node.js diretamente usando o arquivo JavaScript compilado (`index.js`) localizado na pasta `build`.

### Conclusão

Seguindo estas etapas, você deverá conseguir executar o projeto Radix Challenge localmente. Lembre-se de que esta documentação foca na execução local. 
