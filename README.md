## Quick-Credit
[![Build Status](https://travis-ci.org/Merkll/Quick-Credit.svg?branch=develop)](https://travis-ci.org/Merkll/Quick-Credit) [![Coverage Status](https://coveralls.io/repos/github/Merkll/Quick-Credit/badge.svg?branch=develop)](https://coveralls.io/github/Merkll/Quick-Credit?branch=develop)

Quick Credit is an online lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

## Tech/framework used
<b>Built with</b>
- [HTML and CSS]()
- [Node.js]()
- [Express]()
- [Mocha]() for TDD
- [TravisCI]() for Continous Integration and Development (CI/CD)
The above are the core tech/framework used. This project sought to keep external dependencies to the bare minimum by at times reinventing the wheel for learning/development purposes.

## Folder Structure
        ├── server 
        │   ├── dist                  #transpiled server files
        │   ├── docs                  #documents include api doc
        │   ├── src                   #source files
        │   │   ├── controllers       #route controller files
        │   │   ├── helpers           #server helper files
        │   │   ├── lib               #library files
        │   │   ├── middleware        #express middleware files
        │   │   ├── model             #server moel files
        │   │   ├── routes            #express route files
        │   │   └── services          #express services (handles core business logic)
        │   └── test
        │       ├── api
        │       ├── helpers
        │       ├── middleware
        │       ├── model
        │       └── services
        └── UI                        #user interface files
            ├── assets
            │   ├── css
            │   ├── images
            │   └── js
            └── templates             #JS view template files
## Code style
Airbnb javascript style was used in entirety of this project


## Getting Started

These instructions seek to get your copy of the project up and running on your local machine for development and testing purposes. For deployment check the deployment section.

### Prerequisites

What things you need to install the software and how to install them

```
Ensure you have Node.js and npm installed
```

### Installing
Clone this project ```git clone https://github.com/Merkll/Quick-Credit.git```
Run ```npm install``` to install all dependencies
Run ```npm start ```
For development Server run  ```npm run start:dev```

## Running the tests

This project uses Mocha for test driven development. Ensure all test pass by running ```npm test```

## API Reference

The API was documented using Swagger and the docs can be found in this route [/api/v1/docs](https://quick-credit-staging.herokuapp.com/api/v1/docs)

## Demo
### Backend
The demo server is [https://quick-credit-staging.herokuapp.com](https://quick-credit-staging.herokuapp.com)

### UI
UI demo can be found here [https://merkll.github.io/Quick-Credit](https://merkll.github.io/Quick-Credit)


## Credits
- [Keystone.js]() for inspiration to build the dynamically loaded model files

## License
A short snippet describing the license (MIT, Apache etc)

ISC © [toluwase]()