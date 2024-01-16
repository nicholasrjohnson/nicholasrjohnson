var resizeId;

$(document).ready(function($) {
    "use strict";
	
	$('.navbar-nav .nav-link').on('click', function(){
		$('.navbar-collapse').collapse('hide');
	});

    $("[data-background-image]").each(function() {
        $(this).css("background-image", "url("+ $(this).attr("data-background-image") +")" );
    });

    $(".background--image, .img-into-bg").each(function() {
        $(this).css("background-image", "url("+ $(this).find("img").attr("src") +")" );
    });

    $("[data-background-color]").each(function() {
        $(this).css("background-color", $(this).attr("data-background-color")  );
    });

    $("[data-parallax='scroll']").each(function() {
        var speed = $(this).attr("data-parallax-speed");
        var $this = $(this);
        var isVisible;
        var backgroundPosition;

        $this.isInViewport(function(status) {
            if (status === "entered") {
                isVisible = 1;
                var position;

                $(window).scroll(function () {
                    if( isVisible === 1 ){
                        position = $(window).scrollTop() - $this.offset().top;
                        backgroundPosition = (100 - (Math.abs((-$(window).height()) - position) / ($(window).height()+$this.height()))*100);
                        if( $this.find(".parallax-element").hasClass("background--image") ){
                            $this.find(".background--image.parallax-element").css("background-position-y", (position/speed) + "px");
                        }
                        else {
                            $this.find(".parallax-element").css("transform", "translateY(" +(position/speed)+ "px)");
                        }
                    }
                });
            }
            if (status === "leaved"){
                isVisible = 0;
            }
        });
    });

    $(".background--particles").particleground({
        density: 15000,
        lineWidth: 0.2,
        lineColor: "#515151",
        dotColor: "#313131",
        parallax: false,
        proximity: 200
    });


    Pace.on("done", function() {
        $("#hero h1 .hero__title").each(function(i) {
            var $this = $(this);
            setTimeout(function () {
                $this.addClass("in");
            }, i* 100);
        });
        setTimeout(function () {
            $(".loading-screen").css("display", "none");
        }, 4000);
    });

    $(".text-carousel").Morphext({
        animation: "bounceIn",
        separator: ",",
        speed: 5000
    });

    $(".reveal:not(.in)").each(function(i) {
        var $this = $(this);
        $this.isInViewport(function(status) {
            if (status === "entered") {
                setTimeout(function () {
                    $this.addClass("in");
                }, i* 50);
            }
        });
    });

    $(".popup-image").magnificPopup({
        type:'image',
        fixedContentPos: false,
        gallery: { enabled:true },
        removalDelay: 300,
        mainClass: 'mfp-fade',
        callbacks: {
            // This prevents pushing the entire page to the right after opening Magnific popup image
            open: function() {
                $(".page-wrapper, .navbar-nav").css("margin-right", getScrollBarWidth());
            },
            close: function() {
                $(".page-wrapper, .navbar-nav").css("margin-right", 0);
            }
        }
    });

    if ($(".video-popup").length > 0) {
        $(".video-popup").magnificPopup({
            type: "iframe",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    }
	
    heroHeight();

});

$(window).on("resize", function(){
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
});

$(window).on("scroll", function(){
    if ( $(window).scrollTop() > 0 ) {
        $(".navbar").addClass("bg-black")
    }
    else {
        $(".navbar").removeClass("bg-black")
    }
});

function doneResizing(){
    heroHeight();
}

function heroHeight(){
    $("#hero").height( $(window).height() );
}

$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .on("click", function(event) {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            &&
            location.hostname === this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex','-1');
                        $target.focus();
                    }
                });
            }
        }
    });

function getScrollBarWidth () {
    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
}
