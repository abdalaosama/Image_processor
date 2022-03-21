# Image Processor

This project Helps you server all your images to your users in the most reliable, scalable and convenient way.

My attempt at udacity's first Project
## installation
run the following commands to install the project
```bash
git clone https://github.com/abdalaosama/Image_processor.git && cd Image_processor
npm i
npm run start-direct
```
## npm scripts
    ```
    // transpiles typescript and runs the project
    start-direct:   "tsc && npm run start", 
    // transpiles typescript and runs the test suite 
    test:           "npm run build && npm run jasmine",
    // starts the project without transpailing typescript
    start:          "node ./dist",
    //runs the test suite 
    jasmine:        "jasmine",
    //transpiles typescript
    build:          "tsc",
    
    lint:           "eslint ./src",
    fix-lint:       "eslint ./src --fix"
    dev:            "nodemon src/index.ts"
    ```

## Endpoints
### /gallery
lists all the images in the full folder
### /serve
serves the actual image content, also you can resize the image by providing the width and height as query parameters
example:
```
/serve/example.jpg ?width=100 &height=100
```

