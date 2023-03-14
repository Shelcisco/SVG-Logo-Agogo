const inquirer = require('inquirer');
const fs = require('fs');

//SVG to create characters/shape/color
function createSVG(characters, textColor, shape, shapeColor) {
    let shapePath;
    let shapeSize;
    switch (shape) {
      case 'circle':
        shapePath = `<circle cx="50%" cy="50%" r="50%" fill="${shapeColor}" />`;
        shapeSize = { width: 200, height: 200 };
        break;
      case 'triangle':
        shapePath = `<polygon points="100,0 200,200 0,200" fill="${shapeColor}" />`;
        shapeSize = { width: 200, height: 200 };
        break;
      case 'square':
        shapePath = `<rect x="0" y="0" width="100%" height="100%" fill="${shapeColor}" />`;
        shapeSize = { width: 300, height: 200 };
        break;
      default:
        shapePath = '';
        shapeSize = { width: 0, height: 0 };
    }
  
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${shapeSize.width} ${shapeSize.height}">
        ${shapePath}
        <text x="50%" y="50%" text-anchor="middle" fill="${textColor}" font-size="48">${characters}</text>
      </svg>
    `;
  
    return svgString;
  }
  

// inquirer to generate questions
inquirer.prompt([
  {
    type: 'input',
    message: 'Please provide up to 3 letters/characters for the logo',
    name: 'characters',
    validate: (value) => {
      if (value.length <= 3) {
        return true;
      } else {
        return 'Please provide up to 3 letters/characters';
      }
    },
  },
  {
    type: 'input',
    message: "Please choose a color for the text",
    name: 'textColor',
    validate: (value) => {
      if (value.match(/^#[0-9a-fA-F]{6}$/) || value.match(/^[a-zA-Z]+$/)) {
        return true;
      } else {
        return 'Please provide a valid color name or hex code';
      }
    },
  },
  {
    type: 'list',
    message: "Please choose which shape you'd like",
    name: 'shape',
    choices: ['circle', 'triangle', 'square'],
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return 'Please select an option';
      }
    },
  },
  {
    type: 'input',
    message: "Please choose which color you'd like the shape to be",
    name: 'shapeColor',
    validate: (value) => {
      if (value.match(/^#[0-9a-fA-F]{6}$/) || value.match(/^[a-zA-Z]+$/)) {
        return true;
      } else {
        return 'Please provide a valid color name or hex code';
      }
    },
  },
]).then((answers) => {
  const { characters, textColor, shape, shapeColor } = answers;

  // Generate the SVG
  const svg = createSVG(characters, textColor, shape, shapeColor);

  // Write the SVG to a file
  fs.writeFile('logo.svg', svg, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Generated logo.svg');
  });
}).catch((error) => {
  console.error(error);
});
