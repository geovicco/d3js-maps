# Translating D3 Code from Blocks/Observable into a React App
Reference: https://reactfordataviz.com/articles/how-you-can-translate-any-random-d3-example-to-react/

# Setting Up React Project
> npx create-react-app .
> mkdir src/components
> npm install d3 topojson
> cd src
> rm App.test.js logo.svg setupTests.js

# Copy everything under <Style> tag into App.css
# Create a component called USCongressionalDistricts
> touch src/components/USCongressionalDistricts.js
