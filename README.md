# Api-Rest Omi Pali – Software Engineering 2 

> This API is part of the delivery system of the Omi Pali cafeteria, the API provides the stored information of the cafeteria users.
The data is stored in a relational database to improve query performance and maintain adequate structures.
The system is built with the Framework node JS and implementing the middleware express for the server, ORM sequelize for database management and if you want to switch from the Mysql database to another type of SQL database, it is compatible no need to make changes to the code and helmet to manage API security.
JSON web token is implemented for resource management and authentication measures to ensure that the data delivered corresponds to the user requesting it and to the token that it is using.

[Link del api desplegada](https://omipalisf2.herokuapp.com/api)

Autor: Group #3

[Repositorio Sequelize](https://github.com/sequelize/sequelize)

[Repositorio Sequelize CLI](https://gist.github.com/vapurrmaid/a111bf3fc0224751cb2f76532aac2465)

[documentation on github pages](https://jquintanas.github.io/restApiSoftware1/)


# Documentation 
All available methods are found on the project documentation wiki along with the corresponding description.
[documentation on github pages](https://jquintanas.github.io/restApiSoftware1/)

### Installation
The Rest-Api requires [Node.js] (https://nodejs.org/) and [TypeScript] (https://www.typescriptlang.org/index.html#download-links) to run.

Install the development and production dependencies and start the server.

```sh
$ git clone https://github.com/jquintanas/restApiSoftware1
$ cd restApiSoftware1
$ npm install
$ npm run build
$ npm run dev
```
After this we proceed to go to the config folder and open the file config.json and change the credentials of the database for those of our base server depending on the environment in which you are going to work.

### Additional features
Api-Rest requires the following complements.

| Complemento | Recurso |
| ------ | ------ |
| MySql-Schema | [Descargar.](https://github.com/jquintanas/restApiSoftware1/blob/master/database/scripStructure.sql) |
| MySql - Model | [Descargar.](https://github.com/jquintanas/restApiSoftware1/blob/master/database/relacional.pdf) |

License
----
MIT
