# TastyTransit
TastyTransit is a backend system cloning the UberEats application built-in Nest.js with Typescript and GraphQL with PostgreSQL as database.


# The packages : 
- cross-env <br>
    I used cross-env so I can configure environment variables on the package.json and access them in the src code to trigger some actions based on them 

- @nestjs/config <br>
    I used it to setup the config file in the app.module and access the configs from anywhere of the application

- if you are using InputType() --> your argument must have a name inside the mutation list of params .. example : Args("data") data : UpdateReqDto
- if you are using ArgsType() --> your argument must have no name inside the mutation list of params .. example : Args() data : CreteReqDto