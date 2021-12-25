window.addEventListener('DOMContentLoaded', function () {
    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabHeaderItems = document.querySelector('.tabheader__items');

    function hideTabContent (content) {
        content.forEach((el) => {
            el.classList.add('hide');
            el.classList.remove('show');
        });
    }

    function showTabContent (content, i=0) {
        content[i].classList.add('show');
        content[i].classList.remove('hide');
    }

    tabHeaderItems.addEventListener('click', function(e) {
        const tabs = document.querySelectorAll('.tabheader__item');
        if(e.target && e.target.classList.contains('tabheader__item')) {
            hideTabContent(tabsContent);
            tabs.forEach((item, i) => {
                if(e.target == item) {
                    showTabContent(tabsContent, i);
                    item.classList.add('tabheader__item_active');
                } else {
                    item.classList.remove('tabheader__item_active');
                }
            });
        }
    });

    hideTabContent(tabsContent);
    showTabContent(tabsContent);

    const slider = document.querySelector('.offer__slider'),
        prevButton = slider.querySelector('.offer__slider-prev'),
        nextButton = slider.querySelector('.offer__slider-next'),
        currentSlideNumber = slider.querySelector('#current'),
        totalSlides = slider.querySelector('#total'),
        slides = slider.querySelectorAll('.offer__slide');

    hideTabContent(slides);
    showTabContent(slides);

    if(slides.length < 10) {
        totalSlides.textContent = '0' + slides.length;
    } else {
        totalSlides.textContent = slides.length;
    }
    
    prevButton.addEventListener('click', function () {
        for (let i=0; i<slides.length; i++) {
            if(slides[i].classList.contains('show')) {
                hideTabContent(slides);
                if (i == 0) {
                    showTabContent(slides, slides.length-1);
                    currentSlideNumber.textContent = addZero(slides.length);
                    break;
                } else {
                    i--;
                    showTabContent(slides, i);
                    currentSlideNumber.textContent = addZero(i+1);
                    break;
                }
            }
        }
    });

    nextButton.addEventListener('click', function() {
        for (let i=0; i<slides.length; i++) {
            if(slides[i].classList.contains('show')) {
                hideTabContent(slides);
                if (i == slides.length-1) {
                    showTabContent(slides, 0);
                    currentSlideNumber.textContent = '01';
                    break;
                } else {
                    i++;
                    showTabContent(slides, i);
                    currentSlideNumber.textContent = addZero(i+1);
                    break;
                }
            }
        }
    });

    function addZero (i) {
        if(i<10) return '0'+i;
        else return i;
    }
});