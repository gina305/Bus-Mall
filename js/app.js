let productArray = [];

// Number of voting rounds
let rounds = 25; 

//Click counter
counter = 0;

//Hold the images in an array
let images =['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];



//Define a Product object constructor function
function Product(name, fileExtension = 'jpg'){
  this.productName = `./img/${name}`;
  this.views = 0;
  this.clicks = 0;

  //Push the data to the productArray
   productArray.push(this);
};

//Create a loop for creating new poduct images
for (let i = 0; i < images.length; i++) {
  new Product(images[i]);
};

/// ------ Functions ------ ///

//Function to generate random number
function getRandomIndex(){
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

// let currentimage1 ='';
// let currentimage2 ='';
// let currentimage3 ='';

let shownImages = []

//Define function
function myFunction(){
    for (let i = 0; i < productArray.length; i++) {
      let random = getRandomIndex();
      let image1 = productArray[random].productName;
      let image2 = productArray[random].productName;
      let image3 = productArray[random].productName;
      // let currentimage1 =image1;
      // let currentimage2 =image2;
      // let currentimage3 =image3; 


      shownImages = [image1,image2,image3];

      //Loop to choose another photo if either image1, image2 or image3 are the same
          // for (let i = 0; i < shownImages.length; i++) {
                while (image1 === image2 || image1 === image3){
                  random = getRandomIndex();
                  image1 = productArray[random].productName;
                  };
                  while (image2 === image3 || image1 === image2 ){
                    random = getRandomIndex();
                    image2 = productArray[random].productName;
                  };
                  while (image2 === image3 || image3 === image1 ){
                    random = getRandomIndex();
                    image3 = productArray[random].productName;
                  };

                  viewTracker(image1);
                  viewTracker(image2);
                  viewTracker(image3);

                    

          // console.log(image1);
     

      //Call the htmlInsert function
        addSrc(image1,image2,image3);

      // console.log(`${image1} & ${image2}`);
    break
    };
};

//Function to insert/update html content
function addSrc(pic1,pic2,pic3){

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
function handleClick(event){

  if(rounds != counter){
      //Get the image of the clicked event
      let clickedImage = event.target.src;
      clickedImage = clickedImage.split('/');
      clickedImage = './'+ clickedImage[4] + '/' + clickedImage[5];
      
      //Get the index of the clicked image and reset the clickedImage value
      let index =  productArray.indexOf(clickedImage);
      //Increment the counter
      counter++;
    if(counter <= rounds){
      //Check the values
        for (let i = 0; i < images.length; i++) {
          let image = productArray[i].productName;
          let clicks = productArray[i].clicks;
  
        
          if(clickedImage === image){ 

          //  /Update the appropriate productArray index
             productArray[i].clicks++;
            
          };


        };
      
        
        myFunction();

      }
    }else if (rounds === counter){
      alert('The results are in! Click "View Results"');

      }else if (counter===1){
        alert('Please cast your vote first');
      }
      };
     

    //Show voting results
    function results(){

      const list = document.getElementById('list');
      

      for (let i = 0; i < images.length; i++) {

        //Set a few variables for display
        
        let image = productArray[i].productName;
        image = image.split('/');
        image = image[2];
        let clicks = productArray[i].clicks;
        let views = productArray[i].views;

        //Add the new list item
        const li = document.createElement('li');
        list.appendChild(li);
        
        li.innerHTML = `${image} had ${clicks} vote(s) and was seen ${views} time(s).`
      
      };
      console.table(productArray);
  
    };

    //Increment image view(s)
    function viewTracker(a){


      //Get the index of the image
      let image = a;
      for (let index = 0; index < productArray.length; index++) {
        const product = productArray[index].productName;

       // Increment image view
        if (product === image){
           productArray[index].views++;
        }
        
      };
      
      };

     

    