
//Set an empty array for products by default
let productArray = [];

console.log(productArray);
//Retrieve Data
let storageStatus = localStorage.getItem('productData');

//Retieve productData fom local storage if it exists
if  (storageStatus != null){
  retrieveData();
};

// Number of voting rounds
let rounds = 25;

//Click counter
counter = 0;

//Hold the images in an array
let images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

//If there are no product objects in the productArray, create some
if(productArray.length === 0){
//Define a Product object constructor function
function Product(name, fileExtension = 'jpg') {
  this.productName = `./img/${name}`;
  this.views = 0;
  this.clicks = 0;

  //Push the data to the productArray
  productArray.push(this);
};


//Loop through images and create a new product object for each one
for (let i = 0; i < images.length; i++) {
  new Product(images[i]);
};
};
/// ------ Functions ------ ///

//Function to generate random number
function getRandomIndex() {
  // got from w3resource.com
  //return Math.floor(Math.random()* productArray.length);
  min = 1;
  max = productArray.length;
  return Math.floor(Math.random() * (max - min) + min)
};

//Add event listeners to each img element
document.getElementById('pic1').addEventListener('click', handleClick);
document.getElementById('pic2').addEventListener('click', handleClick);
document.getElementById('pic3').addEventListener('click', handleClick);

//Show product array
console.table(productArray);


let shownImages = []


// Current images
let currentimage1 = '';
let currentimage2 = '';
let currentimage3 = '';

//Define function
function myFunction() {
  for (let i = 0; i < productArray.length; i++) {
    let random = getRandomIndex();
    let image1 = productArray[random].productName;
    let image2 = productArray[random].productName;
    let image3 = productArray[random].productName;


    //Choose another image if the image was show in the previous set
    while (currentimage1 === image1 || currentimage2 === image1 || currentimage3 === image1 || image1 === image2 || image1 === image3) {
      random = getRandomIndex();
      image1 = productArray[random].productName;
    };
    while (currentimage1 === image2 || currentimage2 === image2 || currentimage3 === image2 || image2 === image3 || image1 === image2) {
      random = getRandomIndex();
      image2 = productArray[random].productName;
    };
    while (currentimage1 === image3 || currentimage2 === image3 || currentimage3 === image3 || image2 === image3 || image2 === image3) {
      random = getRandomIndex();
      image3 = productArray[random].productName;
    };

    //Save the current images for future tracking purposes
    currentimage1 = image1;
    currentimage2 = image2;
    currentimage3 = image3;

    // Calll the view tracker each image    
    viewTracker(image1);
    viewTracker(image2);
    viewTracker(image3);



    // console.log(image1);


    //Call the htmlInsert function
    addSrc(image1, image2, image3);

    // console.log(`${image1} & ${image2}`);
    break
  };
};

//Function to insert/update html content
function addSrc(pic1, pic2, pic3) {

  //Update img elements
  document.getElementById('pic1').src = pic1;
  document.getElementById('pic2').src = pic2;
  document.getElementById('pic3').src = pic3;

  //Update the appropriate productArray index
  let index1 = productArray.indexOf(pic1);

  // console.log(pic1);

};

myFunction();

//
function handleClick(event) {

  if (rounds != counter) {
    //Get the image of the clicked event
    let clickedImage = event.target.src;
    clickedImage = clickedImage.split('/');
    clickedImage = './' + clickedImage[4] + '/' + clickedImage[5];

    //Get the index of the clicked image and reset the clickedImage value
    let index = productArray.indexOf(clickedImage);
    //Increment the counter
    counter++;
    if (counter <= rounds) {
      //Check the values
      for (let i = 0; i < images.length; i++) {
        let image = productArray[i].productName;
        let clicks = productArray[i].clicks;


        if (clickedImage === image) {

          //  /Update the appropriate productArray index
          productArray[i].clicks++;

        };


      };


      myFunction();

    }
  } else if (rounds === counter) {
    alert('The results are in! Click "View Results"');

  } else if (counter === 1) {
    alert('Please cast your vote first');
  }
};


//Show voting results
function results() {

  const list = document.getElementById('list');
  list.innerText= 'Results:';


  for (let i = 0; i < images.length; i++) {

    //Set a few variables for display
    let image = productArray[i].productName;
    image = image.split('/');
    image = image[2].split(".");
    image = image[0];
    let clicks = productArray[i].clicks;
    let views = productArray[i].views;

    //Add the new list item
    const li = document.createElement('li');
    list.appendChild(li);

    li.innerHTML = `${image} had ${clicks} vote(s) and was seen ${views} time(s).`



  };
  // Call chart function
  chartData();

  //Call the storage function to store data locally
  storeLocally();
};

//Increment image view(s)
function viewTracker(a) {


  //Get the index of the image
  let image = a;
  for (let index = 0; index < productArray.length; index++) {
    const product = productArray[index].productName;


    // Increment image view
    if (product === image) {
      productArray[index].views++;
    }


  };

};


function chartData() {

  //Get chart element for display
  const ctx = document.getElementById('chart').getContext('2d');

  //Declare variables for use in the chart

  let labels = [];
  let dataPoints = [];
  let dataPoints2 = [];

  for (let index = 0; index < productArray.length; index++) {

    //Define & format the image name
    let image = productArray[index].productName;
    image = image.split('/');
    image = image[2].split(".");
    image = image[0];

    //Define clicks and views data
    let clicks = productArray[index].clicks;
    let views = productArray[index].views;

    //Push results to label and dataPoint arrays
    labels.push(image);
    dataPoints.push(clicks);
    dataPoints2.push(views);
  };

  //Define the chart object
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: dataPoints,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],

      },{
        label: '# of Views',
        data: dataPoints2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

 console.log(ctx); //Detroy chart object if defined
  if (ctx == "undefined"){
    Chart.destroy();
  }
};


//Store data locally
  function storeLocally(){
    //Convert JSON object to JSON string for storage
    let stringifiedProducts = JSON.stringify(productArray);

    //Store product array data in local storage in key/value pair
    localStorage.setItem('productData', stringifiedProducts);

  };

  function retrieveData(){
  //Get items out of local storage
  let retrievedData = localStorage.getItem('productData');

  //Convert/Parse the local data to JSON for use in my code
  productArray = JSON.parse(retrievedData);

  console.log("Retrieved Data" + retrievedData);
  console.log("Product array:"+  productArray);


  

  };

