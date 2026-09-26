# CraveBite Spring Boot Backend

Spring Boot REST API for the CraveBite food delivery application.

## Stack

- Java 17
- Spring Boot
- Spring Data JPA / Hibernate
- MySQL
- Aiven Cloud
- Docker

## Environment variables

- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

Database schema is created/updated by Hibernate. The application seeds the menu when the menu table is empty.

## API

GET /health
GET /ready
GET /api/menu
POST /api/orders

The database password is supplied through environment variables and is not committed to GitHub.
