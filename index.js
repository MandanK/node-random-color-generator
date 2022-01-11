// CommonJS version that didn't work:
// var chalk = require('chalk');

// ESM version that works:
import chalk from 'chalk';

//const colorInput = process.argv[2];
const numberOfArguments = process.argv.length; //the number of arguments that the use has entered

// If the user has chosen an color
// just for testing> console.log(numberOfArguments);

var redValue = 0;
var blueValue = 0;
var greenValue = 0;

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var rgbToHex = function (rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

var fullColorHex = function (r, g, b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red + green + blue;
};

var printThePattern = function (hexNumber) {
  console.log(chalk.hex(hexNumber)('###############################'));
  console.log(chalk.hex(hexNumber)('###############################'));
  console.log(chalk.hex(hexNumber)('###############################'));
  console.log(chalk.hex(hexNumber)('#####                     #####'));
  console.log(
    chalk.hex(hexNumber)('#####       #' + hexNumber + '       #####'),
  );
  console.log(chalk.hex(hexNumber)('#####                     #####'));
  console.log(chalk.hex(hexNumber)('###############################'));
  console.log(chalk.hex(hexNumber)('###############################'));
  console.log(chalk.hex(hexNumber)('###############################'));
};

if (numberOfArguments === 2) {
  // If there's no emoji found, print an error message
  //if (!emoji.hasColor(colorInput)) {

  //generating a random Hex number (i.e. color)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // printing the output pattern
  printThePattern(randomColor);
} else if (numberOfArguments >= 3) {
  var wrongInput = false;
  var minValue = 1;
  var maxValue = 255;
  if (numberOfArguments === 4) {
    const luminosity = process.argv[3];
    if (['light', 'dark'].includes(luminosity)) {
      if (luminosity === 'light') {
        maxValue = 50; // it should be light
      } else {
        minValue = 200; //it should be dark
      }
    } else {
      console.log(
        chalk.hex(fullColorHex(255, 0, 0))(
          'ERROR: Luminosity should be either dark or light!',
        ),
      );
      wrongInput = true;
    }
  }

  const hue = process.argv[2];
  if (['red', 'green', 'blue'].includes(hue)) {
    if (!wrongInput) {
      if (hue === 'red') {
        redValue = randomIntFromInterval(minValue + 1, maxValue); //+1 to prevent black!
        printThePattern(fullColorHex(redValue, greenValue, blueValue));
      } else if (hue === 'green') {
        greenValue = randomIntFromInterval(minValue + 1, maxValue);
        printThePattern(fullColorHex(redValue, greenValue, blueValue));
      } else {
        blueValue = randomIntFromInterval(minValue + 1, maxValue);
        printThePattern(fullColorHex(redValue, greenValue, blueValue));
      }
    }
  } else {
    console.log(
      chalk.hex(fullColorHex(255, 0, 0))(
        'ERROR: Hue should be either red, green, or blue!',
      ),
    );
  }
}

// !  } else {
// !    // Print chosen emoji
// !    console.log(emoji.get(emojiInput));
// !  }
// !} else {
// !  // Print random emoji
//!  console.log(emoji.random().emoji);
// ! }
