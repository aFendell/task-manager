# Project

This is a tasks manager fullstack project.
It combines the power of NestJS (node) for the backend and React for the frontend.
Turborepo is helping to streamline development and builds.
Postgresql docker container presist data through development,
while in production data is presisted via a managed postgresql DB.

## Development

- Install all dependencies (In root) > npm install

- Run postgresql docker container > docker-compose up

- Run FE + BE apps in dev mode > npm run dev

## Technologies and libs

### Backend

- NestJS
- Typescript
- TypeORM
- Docker
- Postgresql
- bcrypt
- Passport.js
- Hapi/Joi

### Frontend

- React.js
- Typescript
- Axios
- Tanstack react-query
- TailwindCSS
- Shadcn
- React-Hook-Form
- Zod
