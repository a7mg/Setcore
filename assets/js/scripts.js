/*********************************************
 * WINDOW EVENTS
/*********************************************/
$(window)
    .on('load', function () {
        pageLoaded();
        animate();
    })
    .on('scroll', function () {
        animate();
        if ($(window).scrollTop() > $(window).height() / 2) {
            $(".backtop").addClass('show');
        } else {
            $(".backtop").removeClass('show');
        }
    })
setTimeout(() => {
    pageLoaded();
}, 1000);
/*********************************************/
/*********************************************/
$(document)
    .ready(onDocumentReady)
    .on('click', '.backtop', function () {
        $('html, body').animate({
            scrollTop: 0
        });
    })
    .on('click', '.hero-menu a', function (e) {
        // var me = $(this);
        // if (me.attr('href') != '#') {
        //     e.preventDefault();
        //     $('html, body').animate({
        //         scrollTop: $(me.attr('href')).offset().top
        //     }, 'slow');
        // }
    })
    .on('click', '.nav-btn', function () {
        openMenu('header + menu');
    })
    .on('click', 'menu .close, menu .overlay', function () {
        $('menu .aos-init').removeClass('aos-animate');
        setTimeout(() => {
            $('body').removeClass('menu-opened');
            $('menu').removeClass('active');
        }, 350);
    })
    .on('click', '.lang-btn', function () {
        let lang = $('html').attr('lang');
        if (lang == 'en') {
            // $('html').attr('dir', 'rtl').attr('lang', 'ar');
            localStorage.setItem('language', 'ar');
        } else {
            // $('html').attr('dir', 'ltr').attr('lang', 'en');
            localStorage.setItem('language', 'en');
        }
        location.reload();
    })
    .on('click', '.listed.tabs li', function () {
        var me = $(this);
        me.siblings().removeClass('active');
        me.addClass('active');
        var tabs = me.parents('section').find('.content-tabs > div');
        tabs.find('.aos-init').removeClass('aos-animate');
        tabs.hide().eq(me.index()).show();
        setTimeout(() => {
            tabs.eq(me.index()).find('.aos-init').addClass('aos-animate');
            let scrollTop = me.parent().offset().top - $('header').innerHeight() - 30;
            if ($(window).width() > 767) {
                scrollTop = me.parents().closest('section').offset().top + 50;
            }
            $('html, body').animate({ scrollTop })
        }, 10);
    })
    .on('change', '.control.file input', function () {
        var me = $(this);
        var file = me[0].files[0];
        if (file) {
            me.parent().next('div').text(file.name)
        }
    })
    .on('click', '.tabs-btns li', function () {
        var me = $(this);
        me.siblings().removeClass('active');
        me.addClass('active');
        let parent = me.parents('.contact-tabs');
        parent.find('.content > div').removeClass('active');
        parent.find('.content > div').eq(me.index()).addClass('active');
        $('.map-container > div').removeClass('active');
        $('.map-container > div').eq(me.index()).addClass('active');
    })

$('.history')
    .on('click', '.timeline li', function () {
        let me = $(this);
        if (me.hasClass('active')) return
        me.addClass('active').siblings().removeClass('active');
        $('.tabs > div')
            .removeClass('active fade show')
            .eq(me.index()).addClass('active fade');
        $('.images > div').removeClass('active animate')
        $('.images > div[data-index=' + me.index() + ']').addClass('active');
        setTimeout(() => {
            $('.tabs > div').eq(me.index()).addClass('show');
            // $('.images > div.active').addClass('animate');
            $('.images > div').addClass('animate');
        }, 10);
    })
    .on('click', '.images .img-container:not(.active)', function () {
        let me = $(this);
        let index = me.data('index');
        $('.tabs > div')
            .removeClass('active fade show')
            .eq(index).addClass('active fade');
        $('.timeline li').removeClass('active').eq(index).addClass('active');
        $('.images > div').removeClass('active animate')
        me.addClass('active');
        setTimeout(() => {
            $('.tabs > div').eq(index).addClass('show');
            $('.images > div').addClass('animate');
            // $('.images > div.active').addClass('animate');
        }, 10);
    })

$('.numbers-list-toggle')
    .on('mouseenter', '.numbers-line li span', function () {
        let me = $(this);
        $('.numbers-line li').removeClass('active');
        me.parent().addClass('active');
        $('.content-tabs > div > *').removeClass('aos-animate');
        $('.content-tabs > div')
            .hide()
            .eq(me.parent().index()).show();
        setTimeout(() => {
            $('.content-tabs > div').eq(me.parent().index()).find('> *').addClass('aos-animate');
        }, 10);
    })
$('.accordion')
    .on('click', '.head', function () {
        let me = $(this);
        me.parents('.item').siblings().removeClass('active');
        me.parents('.item').siblings().find('.content').slideUp();

        me.parents('.item').toggleClass('active');
        me.siblings('.content').slideToggle();
    })
/*********************************************
 * FUNCTIONS
/*********************************************/
function pageLoaded() {
    if ($('#loading').length) {
        $('#loading').fadeOut(function () {
            initAos();
            $('body').addClass('loaded');
        })
    } else {
        initAos();
        $('body').addClass('loaded');
    }
}
function onDocumentReady() {
    if (location.href.includes('127.0.0.1')) {
        $("menu").load("partial/menu.html");
        $("header").load("partial/header.html");
        $("footer").load("partial/footer.html");
    }
    initSliders();
}
function initAos() {
    AOS.init({
        easing: "ease-in-out-sine",
        offset: ($(window).height() * 0.3),
        once: true,
        delay: 200,
        // duration: 1e3,
        duration: 700
    });
}
function openMenu(menu) {
    $(menu).find('.aos-init').removeClass('aos-animate');
    $('body').addClass('menu-opened');
    $(menu).addClass('active');
    setTimeout(() => {
        $(menu).find('.aos-init').addClass('aos-animate');
    }, 100);
}
function animate() {
    $('.hero-wrapper .hero-content').css('opacity', $(window).height() / (($(window).scrollTop() || 1) * 2) / 10);
    if ($('.accomplishments').length) {
        if (($(window).scrollTop() + $(window).height() / 2) >= $('.accomplishments').offset().top) {
            if (!countersDone) doCounters()
        }
    }

    headerTheme();
}
function headerTheme() {
    // Show & Hide - Header Home page
    if ($('.home-hero').length) {
        if ($(window).scrollTop() >= $(window).height()) {
            $('header').addClass('show');
        } else {
            $('header').removeClass('show');
        }
    } else {
        $('header').addClass('show');
    }
    // Theme Header
    let scroll = $(window).scrollTop() + $('header').height();
    $('section').each((i, element) => {
        if (
            $(element).isInViewport()
            && scroll >= $(element).offset().top
            && (scroll <= $(element).offset().top + $(element).innerHeight())
        ) {
            if ($(element).hasClass('bg-offwhite')) {
                $('header').css('background-color', '#E0E0E0').removeClass('light');
            }
            if ($(element).hasClass('bg-gray')) {
                $('header').css('background-color', '#c7c7c7').removeClass('light');
            }
            if ($(element).hasClass('bg-brown')) {
                $('header').css('background-color', '#333').addClass('light');
            }
            if ($(element).hasClass('dark-bg')) {
                $('header').css('background-color', 'transparent').addClass('light');
            }
        }
    })
}

var countersDone = false;
function doCounters() {
    const counters = Array.from(document.querySelectorAll(".counter"));
    const counterValues = [];
    const speed = 500;

    const updateCount = (counter, target, count, index) => {
        const inc = target / speed;
        counterValues[index] = count + inc;
        if (count < target) {
            counter.innerText = '+' + Math.floor(counterValues[index]);
        } else {
            counter.innerText = '+' + target;
        }
    };

    counters.forEach((counter, index) => {
        counterValues.push(0)
        const interval = setInterval(() => {
            const target = +counter.getAttribute("data-target");
            const count = counterValues[index];
            if (target !== count) {
                updateCount(counter, target, count, index)
            } else {
                clearInterval(interval);
            }
        }, 1)
    });
    countersDone = true;
}
$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};


function initSliders() {
    if ($('.news .slider').length) {
        newsSlider();
    }
    if ($('.careers-slider').length) {
        careersSlider();
    }

    if ($('.clients-slider').length) {
        $('.clients-slider').flickity({
            accessibility: true,
            wrapAround: true,
            setGallerySize: true,
            ImagesLoaded: true,
            resize: true,
            prevNextButtons: false,
            pageDots: false,
            pauseAutoPlayOnHover: true,
            percentPosition: true,
            selectedAttraction: 0.001,
            autoPlay: 2000,
        });
    }
    if ($('.certif-slider').length) {
        sliderAfterLoad('.certif-slider');
    }
}
function newsSlider() {
    $('.news .slider').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        pageDots: false,
    });
}
function careersSlider() {
    $('.careers-slider').flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        pageDots: false,
    });
}

function sliderAfterLoad(parent) {
    let images = $(parent).find('img');
    let total = $(images).length;
    let loaded = 0;
    $(images).each(i => {
        $(this).on('load', function () {
            loaded++;
            if (loaded == total) {
                smoothSlider(parent);
            }
        })
    })
}
function smoothSlider(element) {
    $(element).flickity({
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        // accessibility: true,
        // wrapAround: true,
        // setGallerySize: true,
        // ImagesLoaded: true,
        // resize: true,
        // prevNextButtons: false,
        // pageDots: false,
        // pauseAutoPlayOnHover: true,
        // percentPosition: true,
        // selectedAttraction: 0.001,
        // autoPlay: 3000,
    });
}