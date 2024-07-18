# Módulos do Projeto
## 1. Módulo de Conexão com o Banco de Dados (src/models/index.ts)
Este módulo é responsável pela configuração e conexão com o banco de dados MySQL usando Sequelize. Ele utiliza um certificado CA para estabelecer uma conexão segura.

Função connectToDatabase: Autentica a conexão com o banco de dados e exibe mensagens de sucesso ou erro.
## 2. Módulo de Usuários (src/models/UsuarioComum.ts)
Define o modelo UsuarioComum para a tabela usuario_comum, que armazena informações sobre os usuários comuns do sistema.

## 3. Módulo de Atribuição de Badges (src/models/BadgeAssignment.ts)
Define o modelo BadgeAssignment para a tabela badge, que armazena as atribuições de badges aos usuários.

## 4. Controladores (src/controllers/)
Controladores são responsáveis por lidar com as requisições HTTP e interagir com os serviços correspondentes.

userController.ts: Lida com o registro, login e obtenção de informações de usuários.
badgeController.ts: Lida com a atribuição de badges, confirmação de atribuições e obtenção de badges de usuários.
portfolioController.ts: Gera portfólios para os usuários, consolidando suas badges e habilidades.
## 5. Middleware de Tratamento de Erros (src/middleware/errorHandler.ts)
Este middleware captura e trata os erros que ocorrem durante o processamento das requisições, retornando respostas apropriadas ao cliente.

## 6. Serviços (src/services/)
Os serviços encapsulam a lógica de negócio e interagem diretamente com os modelos e outros serviços.

emailService.ts: Gerencia o envio de emails de confirmação usando nodemailer.
userService.ts: Contém a lógica para registro, login e obtenção de informações dos usuários.
badgeService.ts: Contém a lógica para atribuição de badges e confirmação dessas atribuições.
authService.ts: Gerencia a geração e verificação de tokens JWT para autenticação.
pdfGenerator.ts: Gera PDFs que servem como portfólios dos usuários, incluindo informações sobre badges e habilidades.
## 7. Arquivo de Rotas (src/routes.ts)
Define todas as rotas do aplicativo, associando cada rota a um controlador específico.

## 8. Arquivo Principal (src/app.ts)
Configura e inicia o servidor Express, configura middlewares globais e conecta-se ao banco de 
dados.

# Configuração do Ambiente
As variáveis de ambiente são definidas em um arquivo .env, contendo informações sensíveis como credenciais do banco de dados e configurações de email.

# Como Rodar o Projeto
## Instalar Depndências
```
npm install
```

## Configurar Variáveis de Ambiente: Crie um arquivo .env com as seguintes configurações:

```
HOST=mysql-boss-tarefaboss.a.aivencloud.com
USER=avnadmin
PASSWORD=AVNS_uXcTK0pkqnr18XsVMZs
DATABASE=usuariocomumdb
PORT_DATABASE_CONNECTION=11138
SSL=REQUIRED
MAIL_HOST=smtp.seuprovedor.com
MAIL_PORT=587
MAIL_USER=seu_email@provedor.com
MAIL_PASS=sua_senha_de_email
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRATION=3600s
PORT=3000

```

## Para rodar
```
npx ts-node src/app.ts
```
## Para testar o serviço de Email:

```
npx ts-node src/tests/emailServiceTest.ts
```
