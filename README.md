# Weather app

This weather app displays the weather report of current city.
User also can change city name and find out the weather of another city.
User's current location (and city) gets from [geocode.xyz API](geocode.xyz), 
and weather data from [openweathermap.org](https://openweathermap.org/api).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2. using Components,
Databinding, HTTP, Services, Observables, HTML5, CSS3.

## App features

- Display current weather
- Display daily forecast weather for the week
- Display similar weather report after changing city name

## Prerequisites

1. Install [Node.js and npm](https://nodejs.org/en/download/) (if you don't have yet). You can check theirs versions using:

   ```node -v```

   ```npm -v```

2. Install Angular CLI

   ```npm install -g @angular/cli```

3. Install node packages

    ```npm install```

    

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. Or `ng serve -o` for automatic navigation. The app will reload if you change any of the source files.

## Warnings

[Geocode.xyz API](geocode.xyz) used in this project has limited number of calls, so after they run out app will not work correctly. But you can [get your API key](https://geocode.xyz/api) and put it in [service](src/app/service/wserv.service.ts) where commented request is. For now there is more than 200 calls remainded.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
