<p align="center">
   <img  src="front/src/assets/logo.png" alt="Logo do Meu Aplicativo" width="700">
</p>

# Sistema de gestão de entregas em condominios feito com ❤️

# Pré-requisitos 
### BACK-END em NEST
<p align="center">
   <img  src="https://camo.githubusercontent.com/5f54c0817521724a2deae8dedf0c280a589fd0aa9bffd7f19fa6254bb52e996a/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667" alt="Logo do Meu Aplicativo" width="180">
</p>


Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- docker (versão LTS) 
- Node.js (versão LTS)
- pnpm (você pode rodar ```npm install -g pnpm``` para obter o pnpm)

## Instalação

1. Clone este repositório para o seu ambiente local:

   ```shell
   git clone https://github.com/mathmartins2/DeliveryHub.git
   cd DeliveryHub
   cd back
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
   pnpm run test
   ```

Inicie o aplicativo:

   ```shell
   pnpm run dev
   ```
