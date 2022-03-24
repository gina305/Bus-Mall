'use strict';

// The app’s purpose is to have the group members choose which product, of the three displayed images, that they would be most likely to purchase, and then store, calculate, and visually display the resulting data.

// To keep the product selection process as untainted as possible, you have been instructed to not allow any results to be shown to users until there have been a total of 25 selections made.

// The marketing team is not only interested in the total number of clicks, but also the percentage of times that an item was clicked when it was shown. So, you’ll also need to keep track of how many times each image is displayed and do the calculations.

// don’t forget a custom font, color palette, layout with semantic HTML, and so on.
let productArray = [];

// Number of voting rounds
let rounds = 5; 

//Hold the images in an array
let images =['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'bathroom.jpg', 'boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];


function getRandomIndex(){
  // got from w3resource.com
  return Math.random() * (productArray.length - 0) + 0;
  //return Math.floor(Math.random()* productArray.length);
};



//Define a shop object constructor function
function Product(name, fileExtension = 'jpg'){
  this.productName = `./img/${name}`;
  this.views = 0;
  this.clicks = 0;
  //Push the data to the productArray
   productArray.push(this);
}
//Create a loop for creating new poduct images
for (let i = 0; i < images.length; i++) {
  new Product(images[i]);
};
function calculate(a,b){
        //Create random # of customers
        let min = Math.floor(a);
        let max = Math.ceil(rounds);
        return Math.ceil(Math.random() * (max - min) + min);
        };
//Loop though products and select two non-like products
for (let i = 0; i < rounds.length; i++){
let image1 = images[i];
let image2 = images[i];
var num1 = Math.floor(Math.random() * 10);
console.log(num1);
};

function getRandomIndex(){
  // got from w3resource.com
  return Math.floor(Math.random()* productArray.length);
};

let x = 
console.table(productArray);

// ********** HELPER FUNCTIONS *************

