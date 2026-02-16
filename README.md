# filtro-com-gerador-json

# 🏢 Consulta de Isenção Fiscal (Baixo Risco) - Microsserviço & Frontend

Este projeto nasceu de uma necessidade real do setor de tributos: a urgência de consultar de forma rápida e eficiente se empresas locais possuem isenção de três taxas municipais específicas (TLFE, TCFAM e TFVS), enquadradas na lei de "Baixo Risco".

O desafio era processar uma base de dados pesada (mais de 35.000 registros) em formato de texto e disponibilizar uma interface de busca instantânea pelo CPF, CNPJ ou Código Econômico do contribuinte.

## 🚀 Arquitetura da Solução

O projeto foi dividido em duas camadas para garantir performance e escalabilidade:

### 1. Backend (Microsserviço de Conversão)
Desenvolvido em **Java com Spring Boot**, atua como um motor de processamento. 
* **Performance:** Utiliza `BufferedReader` e *Java Streams* para ler arquivos de texto gigantescos sob demanda. Isso impede que a memória RAM do servidor estoure, processando milhares de linhas em milissegundos.
* **Flexibilidade:** A API REST recebe o arquivo e os nomes das colunas dinamicamente, gerando um payload JSON estruturado na saída.

### 2. Frontend (Interface de Busca)
Desenvolvido em **HTML, CSS e Vanilla JS**, focado em ser leve e rápido.
* **Fetch API:** Consome o JSON gerado pelo backend de forma assíncrona.
* **Manipulação de DOM & Regex:** O input de busca bloqueia a digitação de caracteres não numéricos em tempo real.
* **Busca Otimizada:** Utiliza funções de array do JavaScript (`.find()`) para varrer os mais de 35 mil registros instantaneamente e exibir as isenções do contribuinte.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Java 21, Spring Boot, Maven.
* **Frontend:** HTML5, CSS3, JavaScript (ES6+).
* **Conceitos aplicados:** RESTful API, CORS, Injeção de Dependências, Try-with-resources, Expressões Regulares (Regex).

## ⚙️ Como executar o projeto

### Rodando o Backend (API)
1. Certifique-se de ter o Java JDK 21+ e o Maven instalados.
2. Navegue até a pasta do backend e execute: `mvn spring-boot:run`
3. A API estará rodando em `http://localhost:8081/api/v1/converter/txt-to-json`

### Rodando o Frontend
1. Utilize o microserviço para converter o seu arquivo `.txt` ou `.csv` para `empresas.json`.
2. Coloque o arquivo `empresas.json` na mesma pasta do arquivo `index.html`.
3. Abra o `index.html` em qualquer navegador (ou use uma extensão como o Live Server do VS Code).
