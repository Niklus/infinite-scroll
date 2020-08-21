
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0
let totalImages = 0;
let photosArray = [];


// Unsplash API
let count = 5;
const apiKey = 'vyXNF8xZOU6oUjlDIbad5iBd9_p2RP9jHOstEmx8N-o';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function imageLoaded() {
  imagesLoaded ++;
  if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 20;
  }
}

// Helper function to set attributes
function setAttributes (element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}


// Create Elements for links and photos and add to DOM
function displayPhotos() {
  
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    // Create an <a> link to unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })
    
    /*check when each is finished loading*/
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a> then
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash
async function getPhotos () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(error) {
    console.log(error);
  }
}

// Check to see if scrolling near bottom of page, load more images
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});


getPhotos();