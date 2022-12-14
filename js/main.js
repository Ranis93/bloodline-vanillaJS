window.addEventListener('DOMContentLoaded', () => { 
// Drag-n-Drop SLIDER 
    function dragDropSlider(windowParent, window, slideItemsTrack, slideItem, arrowsParent){
        let slider = document.querySelector(windowParent),
        sliderList = slider.querySelector(window),
        sliderTrack = slider.querySelector(slideItemsTrack),
        slides = slider.querySelectorAll(slideItem),
        arrows = document.querySelector(arrowsParent),
        prev = arrows.children[0],
        next = arrows.children[2],
        slideWidth = slides[0].offsetWidth,
        slideIndex = 0,
        posInit = 0,
        posX1 = 0,
        posX2 = 0,
        posY1 = 0,
        posY2 = 0,
        posFinal = 0,
        isSwipe = false,
        isScroll = false,
        allowSwipe = true,
        transition = true,
        nextTrf = 0,
        prevTrf = 0,
        lastTrf = --slides.length * slideWidth,
        posThreshold = slides[0].offsetWidth * 0.35,
        trfRegExp = /([-0-9.]+(?=px))/,
        getEvent = function() {
            return (event.type.search('touch') !== -1) ? event.touches[0] : event;
        },
        slide = function() {
            if (transition) {
            sliderTrack.style.transition = 'transform .5s';
            }
            sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
    
            prev.classList.toggle('disabled', slideIndex === 0);
            next.classList.toggle('disabled', slideIndex === --slides.length);
        },
        swipeStart = function() {
            let evt = getEvent();
    
            if (allowSwipe) {
    
            transition = true;
    
            nextTrf = (slideIndex + 1) * -slideWidth;
            prevTrf = (slideIndex - 1) * -slideWidth;
    
            posInit = posX1 = evt.clientX;
            posY1 = evt.clientY;
    
            sliderTrack.style.transition = '';
    
            document.addEventListener('touchmove', swipeAction);
            document.addEventListener('mousemove', swipeAction);
            document.addEventListener('touchend', swipeEnd);
            document.addEventListener('mouseup', swipeEnd);
    
            sliderList.classList.remove('grab');
            sliderList.classList.add('grabbing');
            }
        },
        swipeAction = function() {
    
            let evt = getEvent(),
            style = sliderTrack.style.transform,
            transform = +style.match(trfRegExp)[0];
    
            posX2 = posX1 - evt.clientX;
            posX1 = evt.clientX;
    
            posY2 = posY1 - evt.clientY;
            posY1 = evt.clientY;
    
            // ?????????????????????? ???????????????? ?????????? ?????? ????????????
            if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2);
            if (posY > 7 || posX2 === 0) {
                isScroll = true;
                allowSwipe = false;
            } else if (posY < 7) {
                isSwipe = true;
            }
            }
    
            if (isSwipe) {
            // ???????????? ?????????? ?????????? ???? ???????????? ????????????
            if (slideIndex === 0) {
                if (posInit < posX1) {
                setTransform(transform, 0);
                return;
                } else {
                allowSwipe = true;
                }
            }
    
            // ???????????? ?????????? ???????????? ???? ?????????????????? ????????????
            if (slideIndex === --slides.length) {
                if (posInit > posX1) {
                setTransform(transform, lastTrf);
                return;
                } else {
                allowSwipe = true;
                }
            }
    
            // ???????????? ?????????????????????????? ???????????? ???????????? ????????????
            if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                reachEdge();
                return;
            }
    
            // ?????????????? ??????????
            sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
            }
    
        },
        swipeEnd = function() {
            posFinal = posInit - posX1;
    
            isScroll = false;
            isSwipe = false;
    
            document.removeEventListener('touchmove', swipeAction);
            document.removeEventListener('mousemove', swipeAction);
            document.removeEventListener('touchend', swipeEnd);
            document.removeEventListener('mouseup', swipeEnd);
    
            sliderList.classList.add('grab');
            sliderList.classList.remove('grabbing');
    
            if (allowSwipe) {
            if (Math.abs(posFinal) > posThreshold) {
                if (posInit < posX1) {
                slideIndex--;
                } else if (posInit > posX1) {
                slideIndex++;
                }
            }
    
            if (posInit !== posX1) {
                allowSwipe = false;
                slide();
            } else {
                allowSwipe = true;
            }
    
            } else {
            allowSwipe = true;
            }
    
        },
        setTransform = function(transform, comapreTransform) {
            if (transform >= comapreTransform) {
            if (transform > comapreTransform) {
                sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
            }
            }
            allowSwipe = false;
        },
        reachEdge = function() {
            transition = false;
            swipeEnd();
            allowSwipe = true;
        };
    
        sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
        sliderList.classList.add('grab');
    
        sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
        slider.addEventListener('touchstart', swipeStart);
        slider.addEventListener('mousedown', swipeStart);
    
        arrows.addEventListener('click', function() {
        let target = event.target;
    
        if (target.classList.contains('next')) {
            slideIndex++;
        } else if (target.classList.contains('prev')) {
            slideIndex--;
        } else {
            return;
        }
    
        slide();
        });
    }  
  try {
    dragDropSlider('.slider', '.slider-list', '.slider-track', '.slide', '.examples__slider');
  } catch (error) {}  
  try {
    dragDropSlider('.reviews__slider', '.reviews__slider-list', '.reviews__slider-track', '.reviews__slide', '.reviews__arrows');
  } catch (error) {} 
  try {
    dragDropSlider('.services__slider', '.services__list', '.services__track', '.services__slide', '.services__arrows');
  } catch (error) {}

  try {
    dragDropSlider('.useful__slider', '.useful__list', '.useful__cards', '.useful__card', '.useful__arrows');
  } catch (error) {}
  // Swipping stop when burger-menu opened, and
  // burger-menu openeing
  try {
    (function() {
        const burger = document.querySelector('.header__burger');
        const nav = document.querySelector('.header__burger-menu');
        const closeBtn = document.querySelector('.header__nav-close');
        const body = document.querySelector('body');
        
        burger.addEventListener('click', () => {
            nav.classList.add('header__nav_active');
            //body.classList.add('overflow__stop');
        })
        
        closeBtn.addEventListener('click', () => {
            nav.classList.remove('header__nav_active');
            //body.classList.remove('overflow__stop');
        })
        }());
  } catch (error) {}
    
    // Menu elements Show
    function ShowMenu(parentSelector, listSelector, activeClassSelector, showHideSelector) {
        const menuElems = document.querySelectorAll(parentSelector),
        list = document.querySelectorAll(listSelector);

        menuElems.forEach((menuElem, num)=>{
            menuElem.addEventListener('mouseover', ()=> {                
                menuElems[num].classList.add(activeClassSelector);
                list.forEach(item=>{
                    item.classList.remove(showHideSelector);
                });                
                if(menuElems[num].classList.contains("list")){
                    list[num].classList.add(showHideSelector); 
                }
            })
            menuElem.addEventListener('mouseleave', ()=> {
                menuElems.forEach(item=>{
                    item.classList.remove(activeClassSelector);
                });
            })
        })        
        list.forEach(item=>{
            item.addEventListener('mouseleave', ()=> {
                item.classList.remove(showHideSelector);
            })            
        }); 
    }
    ShowMenu('.header__item', '.header__nav-list', 'active', 'show')
    ShowMenu('.header__burger-link', '.burger-link__ul', 'link_active', 'link_show')
    

        







  });

 