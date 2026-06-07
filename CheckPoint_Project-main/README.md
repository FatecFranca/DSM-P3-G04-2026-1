# CheckPOINT — Sistema de Gestão de Lazer, Tempo e Finanças

## *Centro Paula Souza – Faculdade de Tecnologia de Franca "Dr. Thomaz Novelino"*

*Curso:* Tecnólogo em Desenvolvimento de Software Multiplataforma (DSM)
*Projeto Orientado (P.O):* Guilherme Barbosa B. Campos
*Integrantes:* Guilherme B. B. Campos, Cauã H. Nascimento, Gabriel H. Ferreira, Rodrigo Avelar Santos
*Ano:* 2026-1

---

# 📘 Descrição do Projeto

O **CheckPOINT** é uma aplicação desenvolvida para auxiliar usuários a equilibrar vida social, tempo e finanças. Ele funciona como um **assistente inteligente** para organização de eventos pessoais e coletivos, fornecendo ferramentas para planejar encontros, dividir despesas, monitorar limites financeiros e visualizar alertas sobre saúde financeira.

A proposta surgiu da dificuldade comum de conciliar lazer, compromissos diários e finanças de forma organizada. O sistema utiliza conceitos práticos de **educação financeira** e **psicologia econômica**, fornecendo insights e relatórios personalizados.

---

# 🚀 Funcionalidades Principais

### ✔ 1. Gestão de Usuário

* Cadastro e login com validação.
* Recuperação de senha.
* Edição de perfil e atualização de foto.

### ✔ 2. Gestão de Amigos

* Busca e adição de amigos por nome de usuário.
* Listagem de amigos com status de conexão.
* Convite para eventos diretamente pela lista de amigos.
* Histórico de despesas compartilhadas com cada amigo.

### ✔ 3. Gestão Financeira e de Tempo

* Cadastro de limite de saldo.
* Monitoramento do orçamento.
* Sistema visual de alerta através do **Semáforo Financeiro**:

  * 🟢 **Verde:** Gastos seguros.
  * 🟡 **Amarelo:** Atenção.
  * 🔴 **Vermelho:** Gastos comprometendo o orçamento.

### ✔ 4. Gestão de Eventos (Rolês)

* Criação de eventos com nome, data, local, quantidade de participantes e gastos.
* Listagem e visualização detalhada de eventos.
* Ligação automática entre gastos e eventos.
* Convite de amigos cadastrados para participar dos eventos.

### ✔ 5. Relatórios e Insights

* Resumo de gastos.
* Cálculo de valores por evento.
* Recomendações financeiras futuras.

---

# 🎨 UX — Experiência do Usuário

O CheckPOINT foi projetado com foco em **clareza e fluidez**, para que qualquer pessoa consiga gerenciar suas finanças sociais sem atrito.

Os principais princípios guiam a interface:

* **Visual intuitivo:** O Semáforo Financeiro comunica a saúde financeira do usuário de forma imediata, sem necessidade de leitura de números.
* **Fluxos curtos:** Cadastrar um gasto ou criar um evento leva poucos passos, reduzindo abandono.
* **Feedback imediato:** Alertas e indicadores atualizam em tempo real conforme o usuário registra despesas.
* **Hierarquia clara:** As informações mais críticas (saldo disponível, status do semáforo, próximos eventos) ficam em destaque no dashboard principal.
* **Consistência:** Cores, ícones e padrões de navegação são mantidos ao longo de todas as telas, reduzindo a carga cognitiva do usuário.

---

# 🧭 Estórias de Usuário (User Stories)

* Registrar disponibilidade de tempo.
* Adicionar amigos e convidá-los para eventos.
* Dividir despesas automaticamente com outros participantes.
* Receber alertas de gastos.
* Visualizar relatórios após cada evento.
* Compartilhar informações com uma futura comunidade de usuários.

---

# 📌 Requisitos Funcionais

* **RF001:** Cadastro de usuário.
* **RF002:** Definir orçamento e disponibilidade.
* **RF003:** Visualizar painel de gestão.
* **RF004:** Dividir despesas.
* **RF005:** Sistema de semáforo financeiro.
* **RF006:** Relatórios pós-evento.
* **RF007:** Alertas financeiros.
* **RF008:** Gerenciar lista de amigos.
* **RF009:** Convidar amigos para eventos.

# 🔒 Requisitos Não Funcionais

* Interface intuitiva.
* Segurança dos dados (criptografia de senha).
* Alta disponibilidade.
* Código modular.
* Privacidade configurável.

---

# 📂 Casos de Uso

* **UC001:** Gerenciar usuário.
* **UC002:** Gerenciar orçamento e tempo.
* **UC003:** Visualizar painel.
* **UC004:** Gerenciar despesas de eventos.
* **UC005:** Gerenciar amigos e convites.

---

# 🛠 Tecnologias Utilizadas

### Frontend:

* HTML5, CSS3, JavaScript

### Backend:

* Node.js (Express)
* Middleware de sessão (express-session)

### Banco de Dados:

* **MongoDB** (via Mongoose)
* Coleções: **users**, **events**, **gastos**, **friends**

---

# ▶ Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone (https://github.com/FatecFranca/DSM-P3-G04-2026-1)

### 2. Entrar na pasta backend

```bash
cd CheckPoint_Project-main
cd Backend
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Configurar o Banco de Dados

* Ter o MongoDB instalado localmente ou usar uma instância na nuvem (ex: MongoDB Atlas).
* Configurar a string de conexão no arquivo `conexao.js`:

```js
mongoose.connect('mongodb://localhost:27017/checkpoint');
```

### 5. Rodar o servidor

```bash
node app.js
```

Ou, se usar nodemon:

```bash
npm start
```

### 6. Acessar no navegador

```
http://localhost:4000
```

---

# 👨‍💻 Equipe

* **Guilherme Barbosa B. Campos**
* **Cauã Henrique Nascimento**
* **Gabriel Henrique Ferreira**
* **Rodrigo Avelar Santos**

---

# 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais.
