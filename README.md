# DeliveryHub

![Logo do Meu Aplicativo](front/src/assets/logo.png)

## Pré-requisitos BACK-END

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- docker (versão LTS) 
- Node.js (versão LTS)
- pnpm (você pode rodar ```npm install -g pnpm``` para obter o pnpm)

## Instalação

1. Clone este repositório para o seu ambiente local:

   ```shell
   git clone https://github.com/mathmartins2/DeliveryHub.git
   cd DeliveryHub
   ```
   
2. Instale as dependências do projeto:

   ```shell
   pnpm install
   ```

## Configuração

Antes de executar o aplicativo, você pode precisar configurar algumas variáveis de ambiente ou ajustar outras configurações. Verifique o arquivo .env ou outras configurações relevantes no projeto.

## Execução
   
1. Rode o docker compose:

   ```shell
   docker compose up
   ```
   
2. Inicie o aplicativo:

   ```shell
   pnpm run start:dev
   ```

## Testes

1. Para executar os testes automatizados, utilize o seguinte comando:

   ```shell
   pnpm run start:dev
   ```
