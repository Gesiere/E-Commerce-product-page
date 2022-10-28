const mobileMenu = document.querySelector('.nav-menu')
const hamburgerBtn = document.querySelector('.hamburger-menu')
const closeButton = document.querySelector('.close-menu')
const overlay = document.querySelector('.overlay')
const nextBtn = document.querySelectorAll('.next-btn')
const prevBtn = document.querySelectorAll('.prev-btn')
const productImage = document.querySelector('.top-image a img')
const thumbnailImages = document.querySelectorAll('.thumbnail-images a img')
const lightboxThumbnail = document.querySelectorAll('.thumbnails a img')
const body = document.querySelector('body')
const lightboxModal = document.querySelector('.lightboxModal')
const closeLightboxModal = document.querySelector('.close-btn')
const lightBoxImg = document.querySelectorAll('.modal-content .modal-slides img')
const countValue = document.querySelector('.quantity-value')
const incQtybtn = document.querySelector('.increase-icon')
const descQtybtn = document.querySelector('.decrease-icon')
const qtyValue = document.querySelector('input')
const addToCartBtn = document.querySelector('.addToCart')
const cartImg = document.querySelector('.cart-img')

// EVENT LISTENERS
hamburgerBtn.addEventListener('click', () => showMenuFunc())

closeButton.addEventListener('click', () => hideMenuFunc())

overlay.addEventListener('click', () => hideMenuFunc())

prevBtn.forEach( btn => {
    btn.addEventListener('click',() => {
        prevSlide(slideIndex -= 1);
        
    })
})

nextBtn.forEach( btn => {
    btn.addEventListener('click',() => {nextSlide(slideIndex += 1)})
})
productImage.addEventListener('click', () => {
    lightboxModal.style.display = 'block'
    // currentSlide(1)
})

// lightboxModal.addEventListener('click',() => {
//     lightboxModal.style.display = 'none'
// } )

closeLightboxModal.addEventListener('click', () => {
    lightboxModal.style.display = 'none'
})

thumbnailImages.forEach( (element, index) => {
    element.addEventListener('click', () => {
        showClickedPhoto(element, productImage, thumbnailImages)
        lightBoxFunc(element, index)
    })
})

lightboxThumbnail.forEach( (element, index) => {
    element.addEventListener('click', () => {
        currentSlide(index + 1)
        trackSlider(thumbnailImages[index], productImage, thumbnailImages)
    })
})

incQtybtn.addEventListener('click', () => {
    qtyValue.value++
})
descQtybtn.addEventListener('click', () => {
    if(qtyValue.value < 1) {
        qtyValue.value = 1
    }
    qtyValue.value--
})


// Moble Menu Functionality
const showMenuFunc = () => {
    mobileMenu.classList.add('active')
    overlay.classList.add('active')
    mobileMenu.classList.add('slidein')
    mobileMenu.classList.remove('slideout')
    body.classList.add('noscroll')
}

const hideMenuFunc = () => {
    mobileMenu.classList.remove('slidein')
    mobileMenu.classList.remove('active')
    overlay.classList.remove('active')
    body.classList.remove('noscroll')
}

// slide Functionality

let slideIndex = 1

/* Increase the index by 1 - show the next slide: */
function nextSlide(n) {
    showSlidesFunc(n);
    let index = n - 1
    if(index > 3) {
        index = 0
    }
    trackSlider(thumbnailImages[index], productImage, thumbnailImages)

    
}
/* Decrease the index by 1 - show the previous slide: */
function prevSlide(n) {
    showSlidesFunc(n);
    console.log(n);
    let index = n - 1
    if(index < 0) {
        index = 3
    }
    trackSlider(thumbnailImages[index], productImage, thumbnailImages)

}
/* Set the current slide: */
function currentSlide(n) {
    showSlidesFunc(slideIndex = n);
}

/* Show modal */


const showSlidesFunc = (index) => {
    let slides = document.querySelectorAll('.mySlides')
    let lightBoxSlides = document.querySelectorAll('.modal-slides')
    if(index > slides.length){
        slideIndex = 1
    }


    if(index < 1) {
        slideIndex = slides.length
    }

    for(let slide of slides ){
        slide.style.display = 'none'
    }

    for(let lightBoxSlide of lightBoxSlides) {
        lightBoxSlide.style.display = 'none'
        let el = lightBoxSlide.querySelector('img')
    }
    for(let thumbnail of lightboxThumbnail){
        thumbnail.classList.remove('active-img')
    }

    slides[slideIndex - 1].style.display = 'block'
    lightBoxSlides[slideIndex - 1].style.display = 'block'
    lightboxThumbnail[slideIndex - 1].classList.add('active-img')
}


showSlidesFunc(1)


// Toggle or Switch Images for Desktop

const showClickedPhoto = (element, srcElement, thumbnail) =>  {
    srcElement.src = element.dataset.src
    getActiveElement(element,thumbnail)
    
}


const getActiveElement = (element, thumbnail) => {
    thumbnail.forEach(img => {
        if(img.classList.contains('active-img')){
            img.classList.remove('active-img')
        }
        element.classList.add('active-img')
    })
}

// Add to Cart Functionality 

const addToCartFunc = () => {
    let cartPrice = filledCart.querySelector('.cart-price')
    let totalPrice = filledCart.querySelector('.total-price')
    productPrice = 125
    let quantity = Number(qtyValue.value)
    const badgeCount = document.createElement("span")
    
    if(qtyValue.value > 0) {
        badgeCount.innerHTML = quantity
    }
    cartImg.appendChild(badgeCount)
    cartPrice.textContent = `$${productPrice} * ${quantity}`
    let priceTotal = productPrice *  quantity
    totalPrice.textContent = `$${priceTotal}`
    qtyValue.value = 0

}

const cart = document.querySelector('.cart')
const deleteIcon = document.getElementById('delete-icon')
let badge = cartImg.querySelector('span')
let filledCart = cart.querySelector('.filled')
let emptyCart = cart.querySelector('.empty-cart')

const addActiveStages = () => {
    if(cartImg.contains(cartImg.querySelector('span'))) {
        activeCartFunc()
    } else {
        emptyCartFunc()
    }
}

const activeCartFunc = () => {
    cart.classList.toggle('active-cart')
    filledCart.classList.toggle('active-cart')
}
const emptyCartFunc = () => {
    cart.classList.toggle('active-cart')
    emptyCart.classList.toggle('active-cart')
}

const deleteItem = () => {
    let el = document.querySelector('.cart-img')
    if(cartImg.contains(cartImg.querySelector('span'))){
        Array.from(cartImg.querySelectorAll("span")).map((e)=>{
            e.remove();
        });
    }
    emptyCartFunc()
    activeCartFunc()

}

deleteIcon.addEventListener('click', () => deleteItem())
addToCartBtn.addEventListener('click', ()=> addToCartFunc())
cartImg.addEventListener('click', () => {addActiveStages()})

// light box funct 

const lightBoxFunc = (el,index) => {
    currentSlide(index + 1)
    
}

const trackSlider = (element,srcEl,thumbnail) => {
    let srcImage = element.getAttribute('data-src')
    srcEl.setAttribute('src', srcImage)
    getActiveElement(element,thumbnail)
    
}



