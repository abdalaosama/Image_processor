# Image Processor

This project Helps you server all your images to your users in the most reliable, scalable and convenient way.

My attempt at udacity's first Project

## Endpoints
### /gallery
/gallery

### /serve
serves the actual image content
example: 
```
/serve/example.jpg ?width=100 &height=100
```
Query Parameters 
width
height

### npm scripts
    start-direct:   "tsc && npm run start",
    test:           "npm run build && npm run jasmine",
    start:          "node ./dist",
    jasmine:        "jasmine",
    build:          "tsc",
    lint:           "eslint ./src",
    fix-lint:       "eslint ./src --fix"

```bash
npm install
```
