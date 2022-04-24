# EAuditoria_Locadora

Programa de alugueis de filmes e controle de clientes utilizando C# como back-end e react como front-end;

Para executar é necessario ter os sequintes requisitos:
- Dotnet 6.1;
- Docker com suporte a ambiente linux (ou MySql server instalado);
- Nodejs;

Como executar:
- Ativar o servidor MySql (possui um arquivo docker-compose);
- Alterar o arquivo "EAuditoria_Locadora\Locadora_EAuditoria\appsettings.json" para a connection string de acordo com o usuario e senha;
- Executar "dotnet run" no servidor (EAuditoria_Locadora\Locadora_EAuditoria);
- Executar o client react;

