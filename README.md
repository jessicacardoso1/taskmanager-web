# Gerenciador de Tarefas - Frontend

Sistema de gerenciamento de tarefas desenvolvido com React e Material-UI, integrado com uma API ASP.NET Core.

## 🚀 Funcionalidades

- ✅ Listagem de tarefas com filtro por status
- ✅ Criação de novas tarefas
- ✅ Edição de tarefas existentes
- ✅ Exclusão de tarefas
- ✅ Gerenciamento de status (Pendente, Em Progresso, Concluída)
- ✅ Interface responsiva e moderna
- ✅ Feedback visual com notificações
- ✅ Validação de campos
- ✅ Tratamento de erros

## 🛠 Tecnologias Utilizadas

- React 18
- Material-UI v5
- React Router v6
- Axios para chamadas à API

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- API do backend em execução

## 🔧 Configuração do Projeto

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd taskmanager-web
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure o arquivo `.env` na raiz do projeto:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Inicie o projeto:
```bash
npm start
# ou
yarn start
```

O aplicativo estará disponível em `http://localhost:3000`.

## 📁 Estrutura do Projeto

```
taskmanager-web/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── pages/
│   │   ├── ListaTarefas.js    # Lista principal de tarefas
│   │   ├── CreateTarefa.js    # Formulário de criação
│   │   └── EditarTarefa.js    # Formulário de edição
│   ├── services/
│   │   └── api.js            # Configuração do Axios
│   ├── theme.js              # Tema personalizado do Material-UI
│   ├── App.js                # Componente principal e rotas
│   └── index.js              # Ponto de entrada da aplicação
├── package.json
└── README.md
```

## 💡 Funcionalidades Detalhadas

### Lista de Tarefas
- Visualização de todas as tarefas
- Filtro por status
- Ações rápidas (editar/excluir)
- Exibição de datas de criação e conclusão
- Feedback visual do status com cores diferentes

### Criação de Tarefas
- Formulário validado
- Status inicial como "Pendente"
- Limite de 100 caracteres no título
- Descrição opcional
- Feedback visual de sucesso/erro

### Edição de Tarefas
- Edição de todos os campos
- Atualização de status
- Data de conclusão automática
- Validações de campos
- Feedback visual de sucesso/erro

## 🔍 Integração com Backend

O frontend se integra com uma API ASP.NET Core através dos seguintes endpoints:

- GET /api/Tarefas - Lista todas as tarefas
- GET /api/Tarefas/{id} - Obtém uma tarefa específica
- POST /api/Tarefas - Cria uma nova tarefa
- PUT /api/Tarefas/{id} - Atualiza uma tarefa existente
- DELETE /api/Tarefas/{id} - Remove uma tarefa

## 🎨 Tema e Estilização

- Cores consistentes para status:
  - �� Laranja: Pendente
  - 🔵 Azul: Em Progresso
  - 🟢 Verde: Concluída
- Interface moderna com Material-UI
- Notificações elegantes para feedback
- Layout responsivo

## 📦 Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm build`: Cria a versão de produção
- `npm test`: Executa os testes
- `npm eject`: Ejeta as configurações do Create React App

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença [MIT](https://choosealicense.com/licenses/mit/).
