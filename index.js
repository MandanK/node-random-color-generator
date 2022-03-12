import chalk from 'chalk';

// If the user has chosen a color
// just for testing> console.log(numberOfArguments);

// ! first, let's write a few generic functions

// a function that produces a random number between two intervals (in our case, the values for R G B should be between 0 and 255)
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// a function that get a single rgb value of a color (between 0 and 255) and converts it to hex
const rgbToHex = function (rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

// a function that gets three values of three R G B colors (each between 0 and 255) and convert all of them to a single Hex color value. For doing so, it uses the rgbToHex function (above)
const fullColorHex = function (r, g, b) {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return red + green + blue;
};

// a function that gets a hex number and prints the expected pattern
const printThePattern = function (hexNumber) {
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

// ! lets start to write the main part of the program

// let's read the number of arguments that the user has entered.
// e.g. the length of "node index.js red dark" is 4;
// e.g. the length of "node index.js red" is 3;
// e.g. the length of "node index.js red" is 2;
const numberOfArguments = process.argv.length; // the number of arguments that the use has entered

// the following three variables are used for the cases that the users specify "red, green, or blue", otherwise, these values are not used and all values are generated randomly
let redValue = 0; // the red value is 0 by default, we set it if needed
let blueValue = 0; // the blue value is 0 by default, we set it if needed
let greenValue = 0; // the green value is 0 by default, we set it if needed

// ! case 1: if the user has not specified the color, i.e. we need a fully random color:
if (numberOfArguments === 2) {
  // If there's no emoji found, print an error message
  // if (!emoji.hasColor(colorInput)) {

  // generating a random Hex number (i.e. color)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // printing the output pattern
  printThePattern(randomColor);
} else if (numberOfArguments >= 3) {
  // ! case 2 and 3: the user has specified the color (hue)
  let wrongInput = false;
  let minValue = 1;
  let maxValue = 255;
  if (numberOfArguments === 4) {
    // ! case 3: the user has specified both hue and luminosity; let's set the luminosity based on the user input
    const luminosity = process.argv[3];
    if (['light', 'dark'].includes(luminosity)) {
      if (luminosity === 'light') {
        maxValue = 50; // it should be light
      } else {
        minValue = 200; // it should be dark
      }
    } else {
      // ! the specified luminosity has a typo; only "dark" and "light" are acceptable
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
    // ! case 2 or 3: let's set the hue based on the specified color
    if (!wrongInput) {
      if (hue === 'red') {
        redValue = randomIntFromInterval(minValue + 1, maxValue); // +1 to prevent black!
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
    // ! the user's input of hue has a typo; only red, green and blue are acceptable
    console.log(
      chalk.hex(fullColorHex(255, 0, 0))(
        'ERROR: Hue should be either red, green, or blue!',
      ),
    );
  }
}
