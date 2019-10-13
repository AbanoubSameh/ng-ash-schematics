# Table of Contents
  * [ASH Schematics](#ng-ash-schematics)
    * [Installation](#installation)
    * [Features](#features)
        * [Service](#generate-service)
        * [Mock Setup](#generate-mock-setup-using-json-server)
        * [Feature Module UI](#generate-feature-module-ui)
        * [NGRX Store](#generate-ngrx-store)
        * [Feature NGRX Store](#generate-feature-ngrx-store)
        * [Feature](#generate-feature-ui-ngrx)
        * [Post Build Environment](#generate-post-build-environment-setup)
        * [Project Structure](#ash-project-structure)

## ASH Schematics

ASH Schematics is a custom Schematics extends Angular CLI Schematics with some more features/options to fit with enterprise applications

### Installation
To Install @ng-ash/schematics and generate Enterprise Application Structure Run:
```bash
ng add @ng-ash/schematics
```
otherwise you can use @ng-ash/schematics by installing it and start using it's sub features 
```bash
ng g @ng-ash/schematics:[feature-name] [...option]
```
### Features

#### Generate Service
it's the same as Angular CLI Generate Service, except that this one could generate Service with CRUD methods.
```node
ng g @ng-ash/schematics:service [service-name] [--CRUD option paramter]
```
#### Generate Mock Setup using Json-Server
we are using Json-server to mock data/apis so this will generate files and configuration.
```node
ng g @ng-ash/schematics:mock
```
#### Generate Feature Module (ui)
You will be able to generate a stand alone Feature module
```node
ng g @ng-ash/schematics:feature-module [feature-name]
```
#### Generate NGRX Store
You will be able to generate NGRX Root Store with intial configuration to allow for meta reducers, and install npm packages
```node
ng g @ng-ash/schematics:ngrx-store
```
#### Generate Feature NGRX Store
You will be able to generate Feature Store Module, with store files.
```node
ng g @ng-ash/schematics:ngrx-feature [feature-name]
```
#### Generate Feature (ui + ngrx)
this command is to generate both feature ui module and feature ngrx store module
```node
ng g @ng-ash/schematics:feature [feature-name]
```
#### Generate Post Build Environment Setup
Generates files and configuration needed to allow project configuration to be changed after Project Build but before releases, so we can have the same build in different releases/servers with a different configuration.
```node
ng g @ng-ash/schematics:post-build-environment
```
#### ASH Project Structure

You will be able to change your folder structure from default Angular project structure to Ash project structure, which is more scalable and also will make it easier to integrate with our Shared Modules/Component/Schematics.

 Also using this feature will ask you some question if you want to include any of our other features, for example, if you want to add NGRX or Mocking or even have an initial feature while creating the project.

###### install ASH Schematics and modify your project structure
```bash
ng add @ng-ash/schematics
```
###### only to modify your project structure
```bash
ng g @ng-ash/schematics:init
```
###### ASH Project Structure Example
``` folder structure
src
├── app
│   ├── modules
|   │   ├── core
|   |   │   |── pages
|   |   │   ├── components
|   |   │   ├── core-module.ts
|   │   ├── shared
|   |   │   |── components
|   |   │   ├── services
|   |   │   ├── directives
|   |   │   ├── pipes
|   |   │   ├── shared-module.ts
|   │   ├── user (feature Module)
|   |   │   |── pages
|   |   │   ├── components
|   |   │   ├── user.module.ts
|   |   │   ├── user-routing.module.ts
|   │   ├── setup (feature Module)
|   |   │   |── country
|   |   |   │   |── components
|   |   |   │   |── pages
|   |   |   │   |── country.module.ts
|   |   |   │   |── country-routing.module.ts
|   |   │   |── roles
|   |   |   │   |── components
|   |   |   │   |── pages
|   |   |   │   |── rules.module.ts
|   |   │   └── ...
|   |   │   ├── setup-module.ts
|   |   └── ...
|   │   ├── ui-modules.ts
|   ├── state
|   │   ├── user
|   |   │   |── users.service.ts
|   |   │   |── models
|   |   |   │   |── user.interface.ts
|   |   |   │   └── ...
|   │   ├── setup
|   |   │   |── country
|   |   |   │   |── country.service.ts
|   |   |   │   |── models
|   |   |   |   │   |── country.interface.ts
|   |   |   |   │   └── ...
|   |   │   |── roles
|   |   |   │   |── roles.service.ts
|   |   |   │   |── models
|   |   |   |   │   |── role.interface.ts
|   |   |   |   │   └── ...
|   |   │   └── ...
|   │   └── ...
|   │   ├── state.module.ts
├── assets
│   └── ...
│── environment
│   ├── environment.prod.ts
│   ├── environment.mock.ts
│   ├── environment.ts
│   └── ...
└── ...

```
