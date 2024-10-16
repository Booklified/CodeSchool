api:
    image: node:18
    working_dir: /app
    volumes:
      - ./api:/app
    depends_on:
      - mongo
      - mailhog
    ports:
      - '3000:3000'
    environment:
      COOKIE_DOMAIN: yourdomain.com
      HOME_LOCATION: http://localhost:8000
      API_LOCATION: http://localhost:3000
      CHALLENGE_EDITOR_API_LOCATION: http://localhost:3200
      CHALLENGE_EDITOR_CLIENT_LOCATION: http://localhost:3300
      MONGOHQ_URL: mongodb://mongo:27017/freecodecamp?directConnection=true
      MAILHOG_HOST: mailhog
      HOST: 0.0.0.0
    command: >
      bash -c "
      npm install -g pnpm &&
      pnpm install &&
      pnpm run build:curriculum &&
      pnpm run seed &&
      pnpm run develop"
  