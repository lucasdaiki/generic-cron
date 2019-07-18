## Configurando

- Node >= 8

- Copie o `.env.example` para o `.env`
  - `cp .env.example .env`

- Instale os pacotes
  - `npm install`

- Iniciar a aplicação
  - `npm start`

- Para iniciar a aplicação carregando as informações do `.env`:
  - `npm run start:dotenv`

## Testes

- Para executar os testes
  - `npm run test`

## Dev

- Para executar os testes
  - `npm run test:dev`

## Variáveis de ambiente

* ***CRON_FEEDER_INTERVAL*** : Intervalo entre cada execução do Feeder # Default: 0 */5 * * * *
* ***CRON_CONSUMER_INTERVAL*** : Intervalo entre cada execução do Consumer # Default: 0 */5 * * * *
* ***CRON_PORT*** : Porta que a aplicação vai rodar # Default: 3001
* ***LOG_LEVEL*** : # Default: ERROR
