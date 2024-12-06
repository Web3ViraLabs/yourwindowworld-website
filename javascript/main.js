/**
  * isMobile
  * responsiveMenu
  * headerFixedHome1
  * headerFixedHome2
  * parallax
  * tabs
  * flatOwl
  * topSearch
  * retinaLogos
  * retinaLogos2
  * goTop
  * removePreloader
  * parallax
  * change_img
  * flatSpacer
  * flatCounter
*/          

;(function($) {

   'use strict'

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return ( isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

	var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header .container-fixel').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    }

    var headerFixedHome1 = function() {
        if ( $('body').hasClass('header_sticky') ) {
            var nav = $('.header');

            if (nav.length ) {
                var offsetTop = nav.offset().top,
                headerHeight = nav.height(),
                injectSpace = $("<div>", {
                  height: headerHeight,
                });
                injectSpace.hide();
      
              if ($('body').hasClass("header-absolute")) {
                injectSpace.remove();
              } else {
                injectSpace.insertAfter(nav);
              }

                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop + headerHeight) {
                        $('.header').addClass('fixed-header');
                        injectSpace.show();
                    } else {
                        $('.header').removeClass('fixed-header');
                        injectSpace.hide();
                    }

                    if ( $(window).scrollTop() > 400 ) {
                        $('.header').addClass('upscrolled');
                    } else {
                        $('.header').removeClass('upscrolled');
                    }
                })
            }
        }     
    };
    
    var headerFixedHome2 = function() {
        if ( $('body').hasClass('header_sticky_style2') ) {
            var nav = $('.nav-wrap');

            if ( nav.size() != 0 ) {
                var offsetTop = $('.nav-wrap').offset().top,
                    headerHeight = $('.nav-wrap').height(),
                    injectSpace = $('<div />', { height: headerHeight }).insertAfter(nav);   
                    injectSpace.hide();    

                $(window).on('load scroll', function(){
                    if ( $(window).scrollTop() > offsetTop) {
                        $('.header-style2').addClass('fixed-header');
                        injectSpace.show();
                    } else {
                        $('.header-style2').removeClass('fixed-header');
                        injectSpace.hide();
                    }

                    if ( $(window).scrollTop() > 400 ) {
                        $('.header-style2').addClass('header-small');
                    } else {
                        $('.header-style2').removeClass('header-small');
                    }

                    if ( $(window).scrollTop() > 500 ) {
                        $('.header-style2').addClass('upscrolled');
                    } else {
                        $('.header-style2').removeClass('upscrolled');
                    }
                })
            }
        }     
    };

    var parallax = function() {
        if ( $().parallax && isMobile.any() === null ) {
            $('.parallax1').parallax("50%", 0.5);
            $('.parallax2').parallax("50%", 0.5);
            $('.parallax3').parallax("50%", 0.5);          
        }
    };

    var tabs = function() {
        $('.flat-tabs').each(function() {
            $(this).children('.content-tab').children().hide();
            $(this).children('.content-tab').children().first().show();
            $(this).find('.menu-tab').children('li').on('click', function(e) { 
                var liActive = $(this).index(),
                    contentActive = $(this).siblings().removeClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive);

                contentActive.addClass('active').fadeIn('slow');
                contentActive.siblings().removeClass('active');
                $(this).addClass('active').parents('.flat-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
                e.preventDefault();
            });
        });
    };

    var flatOwl = function() {
        if ( $().owlCarousel ) {
            $('.flat-carousel-box').each(function(){
                var $this = $(this),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                loops = $this.data("loop"),
                zero = $this.data("zero"),
                
                gap = Number($this.data("gap")),
               
                dots = $this.data("dots"),
                nav = $this.data("nav");

                $this.find('.owl-carousel').owlCarousel({
                    margin: gap,
                    loop:loops,
                    dots:dots,
                    nav: nav,
                    navigation : true,
                    pagination: true,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        700:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
                
                if(zero === 0) {
                    $(".banners-z .owl-dot").find('span').addClass("number_zero");
                }
                $this.find('.owl-dot').each(function(){
                    var number = $(this).index()+1;
                    if($(this).children('span').hasClass("number_zero")) {
                        if(number < 9){
                            number = '0' + number;
                        }
                        $(this).children('span').html(number);
                        $(this).append('<i class="line"></i>');
                    }
                    else{
                        $(this).children('span').html(number);
                    }

                    $(this).children('span').addClass("btn-dots btn-defect");

                });
            });
        }
    };
    
    var topSearch = function () {
      $(document).on('click', function(e) {   
            var clickID = e.target.id;   
            if ( ( clickID !== 's' ) ) {
                $('.top-search').removeClass('show');                
            } 
        });

        $('.show-search').on('click', function(event){
            event.stopPropagation();
        });

        $('.search-form').on('click', function(event){
            event.stopPropagation();
        });        

        $('.show-search').on('click', function (event) {
            if(!$('.top-search').hasClass( "show" )) {
                $('.top-search').addClass('show');  
                event.preventDefault();                
            }
                
            else
                $('.top-search').removeClass('show');
                event.preventDefault();

            if( !$('.show-search' ).hasClass( "active" ) )
                $( '.show-search' ).addClass( 'active' );
            else
                $( '.show-search' ).removeClass( 'active' );
        });   
    } 

    var retinaLogos = function() {
      var retina = window.devicePixelRatio > 1 ? true : false;

        if(retina) {
            $('.logo').find('img').attr( {src:'./logo/LogoDark@2x.png',width:'159',height:'70'} );   
        }
    };  

    var retinaLogos2 = function() {
        var retina = window.devicePixelRatio > 1 ? true : false;
  
          if(retina) {
              $('#footer').find('img').attr( {src:'./logo/Logolight@2x.png'} );   
          }
    };   

    var goTop = function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 800) {
                $('.go-top').addClass('show');
            } else {
                $('.go-top').removeClass('show');
            }
        });

        $('.go-top').on('click', function () {
            $("html, body").animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
            return false;
        });
    };

 
    var removePreloader = function() {      
        if ( $().animsition ) {
            $('.animsition').animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                loading: true,
                loadingParentElement: 'body',
                loadingClass: 'animsition-loading',
                timeout: false,
                timeoutCountdown: 5000,
                onLoadEvent: true,
                browser: [
                    '-webkit-animation-duration',
                    '-moz-animation-duration',
                    'animation-duration'
                    ],
                overlay: false,
                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'body',
                transition: function(url){ window.location.href = url; }
            });
        };
    };

    var flatSpacer = function() {
        $(window).on('load resize', function(){
            var mode = 'desktop';
            if(matchMedia('only screen and (max-width: 991px)').matches) 
                mode = 'mobile';
            if(matchMedia('only screen and (max-width: 767px)').matches)
                mode = 'smobile';
            $('.themesflat-spacer').each( function(){
                if( mode === 'desktop'){
                    $(this).attr('style','height:' + $(this).data('desktop') + 'px')
                }else if( mode === 'mobile') {
                    $(this).attr('style','height:' + $(this).data('mobile') + 'px')
                }else {
                    $(this).attr('style','height:' + $(this).data('smobile') + 'px')
                }
            });
        });
    };

    var ajaxContactForm = function () {
        if($("#commentform").length > 0) {
            $('#commentform').each(function () {
                $(this).validate({
                    submitHandler: function (form) {
                        var $form = $(form),
                            str = $form.serialize(),
                            loading = $('<div />', { 'class': 'loading' });
    
                        $.ajax({
                            type: "POST",
                            url: $form.attr('action'),
                            data: str,
                            beforeSend: function () {
                                $form.find('.form-submit').append(loading);
                            },
                            success: function (msg) {
                                var result, cls;
                                if (msg === 'Success') {
                                    result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                    cls = 'msg-success';
                                } else {
                                    result = 'Error sending email.';
                                    cls = 'msg-error';
                                }
    
                                $form.prepend(
                                    $('<div />', {
                                        'class': 'flat-alert ' + cls,
                                        'text': result
                                    }).append(
                                        $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                    )
                                );
    
                                $form.find(':input').not('.submit').val('');
                            },
                            complete: function (xhr, status, error_thrown) {
                                $form.find('.loading').remove();
                            }
                        });
                    }
                });
            }); // each contactform
        }
    };

    var ajaxSubscribe = function () {
        if($("#commentform").length > 0) {
            var ajaxSubscribe = {
                obj: {
                    subscribeEmail: $('#subscribe-email'),
                    subscribeButton: $('#subscribe-button'),
                    subscribeMsg: $('#subscribe-msg'),
                    subscribeContent: $("#subscribe-content"),
                    dataMailchimp: $('#subscribe-form').attr('data-mailchimp'),
                    success_message: '<div class="notification_ok">Thank you for joining our mailing list! Please check your email for a confirmation link.</div>',
                    failure_message: '<div class="notification_error">Error! <strong>There was a problem processing your submission.</strong></div>',
                    noticeError: '<div class="notification_error">{msg}</div>',
                    noticeInfo: '<div class="notification_error">{msg}</div>',
                    basicAction: 'mail/subscribe.php',
                    mailChimpAction: 'mail/subscribe-mailchimp.php'
                },
        
                eventLoad: function () {
                    var objUse = ajaxSubscribe.obj;
        
                    $(objUse.subscribeButton).on('click', function () {
                        if (window.ajaxCalling) return;
                        var isMailchimp = objUse.dataMailchimp === 'true';
        
                        if (isMailchimp) {
                            ajaxSubscribe.ajaxCall(objUse.mailChimpAction);
                        } else {
                            ajaxSubscribe.ajaxCall(objUse.basicAction);
                        }
                    });
                },
        
                ajaxCall: function (action) {
                    window.ajaxCalling = true;
                    var objUse = ajaxSubscribe.obj;
                    var messageDiv = objUse.subscribeMsg.html('').hide();
                    $.ajax({
                        url: action,
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            subscribeEmail: objUse.subscribeEmail.val()
                        },
                        success: function (responseData, textStatus, jqXHR) {
                            if (responseData.status) {
                                objUse.subscribeContent.fadeOut(500, function () {
                                    messageDiv.html(objUse.success_message).fadeIn(500);
                                });
                            } else {
                                switch (responseData.msg) {
                                    case "email-required":
                                        messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email is required.</strong>'));
                                        break;
                                    case "email-err":
                                        messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email invalid.</strong>'));
                                        break;
                                    case "duplicate":
                                        messageDiv.html(objUse.noticeError.replace('{msg}', 'Error! <strong>Email is duplicate.</strong>'));
                                        break;
                                    case "filewrite":
                                        messageDiv.html(objUse.noticeInfo.replace('{msg}', 'Error! <strong>Mail list file is open.</strong>'));
                                        break;
                                    case "undefined":
                                        messageDiv.html(objUse.noticeInfo.replace('{msg}', 'Error! <strong>undefined error.</strong>'));
                                        break;
                                    case "api-error":
                                        objUse.subscribeContent.fadeOut(500, function () {
                                            messageDiv.html(objUse.failure_message);
                                        });
                                }
                                messageDiv.fadeIn(500);
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert('Connection error');
                        },
                        complete: function (data) {
                            window.ajaxCalling = false;
                        }
                    });
                }
            };
        }
    }


    var alertBox = function () {
        $(document).on('click', '.close', function (e) {
            $(this).closest('.flat-alert').remove();
            e.preventDefault();
        })

    };

    var flatCounter = function() {
        if ($(document.body).hasClass('counter-scroll')) {
            var a = 0;
                $(window).scroll(function() {
                var oTop = $('.box').offset().top - window.innerHeight;
                    if (a === 0 && $(window).scrollTop() > oTop) {
                        if ( $().countTo ) {
                            $('.box').find('.number').each(function() {
                                var to = $(this).data('to'),
                                    speed = $(this).data('speed');
                              
                                $(this).countTo({
                                    to: to,
                                    speed: speed
                                });
                            });
                        }
                    a = 1;
                }
            });
        }
    };


   	// Dom Ready
	$(function() { 
        if ( matchMedia( 'only screen and (min-width: 991px)' ).matches ) {   
        headerFixedHome1();
        headerFixedHome2();
        }  
        removePreloader();
        new WOW().init();        
        responsiveMenu(); 
        tabs();    
        parallax(); 
        topSearch(); 
        retinaLogos();   
        retinaLogos2(); 
        goTop();
        flatSpacer();
        alertBox();
        flatCounter();
        ajaxContactForm();
        ajaxSubscribe();
        $(window).on('load resize', function(){
            flatOwl();
        });

   	});

})(jQuery);
