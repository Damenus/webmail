# webmail

[![Build Status](https://travis-ci.org/Damenus/webmail.svg?branch=asp-net-core-spa)](https://travis-ci.org/Damenus/webmail)

## Project management
We use taiga platform for project management. [Homepage our project](https://tree.taiga.io/project/damenus-webmail/)

## About project
Student project consisting in creating a modern webmail client

## Docker Repo

```bash
docker pull damenus/webmail:asp-net-core-spa
docker run -it -d -p 85:80 damenus/webmail:asp-net-core-spa
```

[Link to docker repo](https://hub.docker.com/r/damenus/webmail/)

If you want build docker image localy, go to directory and use this commands.

```bash
docker build -t myapp .
docker run -it -d -p 85:80 myapp
```
The application will work on [localhost:85](http://localhost:85)
