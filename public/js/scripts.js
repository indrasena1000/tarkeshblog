
$(document).ready(function() {
	
	"use strict";
	
	PageLoad();
	FirstLoad();
	HeroSection();
	AjaxLoad();
	FullPage();
	MasonryPortfolio();
	NextProject();
	//VirtualScr();
	FooterAppear();
	Sliders();
	Lightbox();
	AppearIteam();
	BackToTop();
	ContactForm();
	CollagePlus();
	PageShare();
	ContactMap();	
});

function getWindowInnerWidth() { return $(window).innerWidth() }

$(window).on("load", function() {
});


/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {	
		
		$('body').removeClass('hidden');
		TweenMax.to($(".preloader-text"), 1, {force3D:true, opacity:1, y: 0, delay:0.2, ease:Power3.easeOut});
		TweenMax.set($("#hero-bg-wrapper"), {opacity:1, scale:1.05});
		TweenMax.set($("#showcase-holder"), {opacity:1});
		
		var width = 100,
			perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
			EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
			time = parseInt((EstimatedTime/500)%50)*70;		
		
		
		// Percentage Increment Animation
		var PercentageID = $("#precent"),
				start = 0,
				end = 100,
				durataion = time;
				animateValue(PercentageID, start, end, durataion);
				
		function animateValue(id, start, end, duration) {
		  
			var range = end - start,
			  current = start,
			  increment = end > start? 1 : -1,
			  stepTime = Math.abs(Math.floor(duration / range)),
			  obj = $(id);
			
			var timer = setInterval(function() {
				current += increment;
				$(obj).text(current);
			  //obj.innerHTML = current;
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}
		
		// Fading Out Loadbar on Finised
		setTimeout(function(){
			TweenMax.to($(".percentage, .preloader-text"), 0.7, {force3D:true, opacity:0, yPercent: -101, ease:Power3.easeInOut  });			
			TweenMax.to($(".preloader-wrap"), 0.7, {force3D:true, yPercent: -101, delay:0.2,ease:Power3.easeInOut  });			
				$('body').removeClass('light-content');
				$("body").removeClass("transition");						
				if( $('#hero').length > 0 ){
					$("#hero").addClass("animate");
				}
			TweenMax.to($("#hero-bg-wrapper"), 0.4, {force3D:true, scale:1, delay:0, ease:Power3.easeOut});
			setTimeout(function(){
				TweenMax.to($("#hero, .menu-info"), 0.4, {force3D:true, opacity:1, y: 0, delay:0.4, ease:Power3.easeOut});				
				TweenMax.to($("#main-content, .fp-tableCell"), 0.5, {force3D:true, opacity:1, y: 0, delay:0.4, ease:Power2.easeOut});
				TweenMax.to($("#main-content, .fp-tableCell"), 0.5, {force3D:true, opacity:1, y: 0, delay:0.4, ease:Power2.easeOut});
				TweenMax.set($("#footer-container"), {opacity:1});	
			} , 300 );	  
		}, time);

		
	
	}// End Page Load	


/*--------------------------------------------------
Function Firs tLoad
---------------------------------------------------*/	

	function FirstLoad() {
		
		$("html,body").animate({scrollTop: 0}, 1);
		
		$("main").css('background', function () {
			return $("#page-content").data('bgcolor')
		});
		
		$('.has-animation').removeClass('animate-in');		
		
		$('.item').each(function() {
			var image = $(this).find('.item-image').data('src');	
			$(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
			$(this).find('.item-shadow').prepend($('<img>',{src:image}))
		});		
		
		$('.section').each(function() {
			var image = $(this).find('.section-image').data('src');	
			$(this).find('.section-image').css({'background-image': 'url(' + image + ')'});			
			$(this).find('.section-image-mirror').css({'background-image': 'url(' + image + ')'});			
			$(this).find('.section-shadow').prepend($('<img>',{src:image}))
		});
		
		$('a.ajax-link').on('click', function() {
			$('header, #menu-overlay, footer').removeClass('light-content');
			setTimeout( function(){				
				TweenMax.to($("#hero, .menu-info, .next-project-info"), 0.4, {force3D:true, opacity:0, y: -100,ease:Power2.easeInOut  });
				TweenMax.to($("#main-content, .fp-tableCell"), 0.4, {force3D:true, opacity:0, y: -150, delay:0.1, ease:Power2.easeInOut  });
				TweenMax.to($("#showcase-holder"), 0.4, {force3D:true, opacity:0, delay:0.1, ease:Power1.easeInOut  });
				TweenMax.to($("#footer-container"), 0.4, {opacity:0, ease:Power0.easeNone});
				TweenMax.to($("#hero-bg-wrapper"), 0.2, {opacity:0, ease:Power1.easeInOut});
			} , 10 );
		});
		
		$('a.ajax-link-project').on('click', function() {
			TweenMax.to($("#footer-container"), 0.3, {opacity:0, ease:Power0.easeNone});
			$("body").addClass("transition");
			$('.menu-info, .next-project-info').css({opacity: '0',});
			if ($('.section').hasClass("light-content")) {				
				setTimeout(function(){
					$('body').addClass('light-content');								
				} , 200 );
			}
						
		});	
		
		//Page Action Overlay
		$('#open-filters, #sharetheme, .close-page-action').on('click', function() {
			$('.page-action-overlay').toggleClass('active');
			setTimeout( function(){			
				if ($('.page-action-overlay').hasClass("active")) {
					//Fade In Content
					TweenMax.to($(".page-action-text"), 0.4, {force3D:true, opacity:1, y: 0, delay:0.2, ease:Power3.easeOut});
					TweenMax.to($(".page-action-content"), 0.4, {force3D:true, opacity:1, y: 0, delay:0.25, ease:Power3.easeOut});
					//Fade In Navigation Lists
					var tl = new TimelineLite();
					tl.set($(".jssocials-share, #filters li"), {y: 60, opacity:0});
					$(".jssocials-share, #filters li").each(function(index, element) {
						tl.to(element, 0.3, {y:0, opacity:1, delay:0.3, ease:Power3.easeOut}, index * 0.05)
					});
				} else {
					//Fade Out Navigation Lists					
					var tl = new TimelineLite();
					$(".jssocials-share, #filters li").each(function(index, element) {
						tl.to(element, 0.2, {y:-100, delay:0.1, opacity:0, ease:Power1.easeIn }, index * 0.1)
					});
					//Fade Out Content
					TweenMax.to($(".page-action-text"), 0.4, {force3D:true, opacity:0, y: -100,ease:Power2.easeInOut  });
					TweenMax.to($(".page-action-content"), 0.4, {force3D:true, opacity:0, y: -100, delay:0.1, ease:Power2.easeInOut  });
					setTimeout( function(){
						TweenMax.set($(".page-action-text"), {y: 100});
						TweenMax.set($(".page-action-content"), {y: 200});
					} , 500 );			
				}							
			} , 20 );
		});		
		
		//Overlay Menu
		$('#burger-circle, #close-menu').on('click', function() {
			$('header').toggleClass('open');
			$('#hero-bg-wrapper').toggleClass('blur');
			$('#menu-burger').toggleClass('open');
			$('#menu-overlay').toggleClass('active');
			setTimeout( function(){			
				if ($('#menu-burger').hasClass("open")) {
					//Fade Out Content
					TweenMax.to($("#hero, .menu-info, .next-project-info"), 0.4, {force3D:true, opacity:0, y: -100,ease:Power2.easeInOut  });
					TweenMax.to($("#main-content, .fp-tableCell"), 0.4, {force3D:true, opacity:0, y: -150, delay:0.1, ease:Power2.easeInOut  });
					TweenMax.to($(".socials-text, .copyright"), 0.4, {force3D:true, opacity:0, y: -100, delay:0.2, ease:Power2.easeInOut  });
					setTimeout( function(){
						TweenMax.set($("#hero, .menu-info, .next-project-info"), {y: 100});
						TweenMax.set($("#main-content, .fp-tableCell, .socials-text, .copyright"), {y: 200});
					} , 500 );					
					//Fade In Navigation Lists
					var tl = new TimelineLite();
					tl.set($("nav ul li.mp"), {y: 60, opacity:0});
					$("nav ul li.mp").each(function(index, element) {
						tl.to(element, 0.3, {y:0, opacity:1, delay:0.3, ease:Power3.easeOut}, index * 0.1)
					});
						
				} else {
					//Fade Out Navigation Lists					
					var tl = new TimelineLite();
					$("nav ul li.mp").each(function(index, element) {
						tl.to(element, 0.25, {y:-80, opacity:0, ease:Power1.easeIn }, index * 0.05)
					});
					//Fade In Content
					TweenMax.to($("#hero, .menu-info, .next-project-info"), 0.4, {force3D:true, opacity:1, y: 0, delay:0.4, ease:Power3.easeOut});
					TweenMax.to($("#main-content, .fp-tableCell"), 0.4, {force3D:true, opacity:1, y: 0, delay:0.45, ease:Power3.easeOut});	
					TweenMax.to($(".socials-text, .copyright"), 0.4, {force3D:true, opacity:1, y: 0, delay:0.5, ease:Power3.easeOut});						
				}							
			} , 20 );
		});
		
		//Fade Out Navigation Lists	On Page Transition
		$('.main-menu .ajax-link').on('click', function() {							
			var tl = new TimelineLite();
			$("nav ul li.mp").each(function(index, element) {
				tl.to(element, 0.25, {y:-80, opacity:0, ease:Power1.easeIn }, index * 0.05)
			});
		});
		
		//Drop Down Navigaation
		$('nav li.has-sub > a').on('click', function(){
			$(this).removeAttr('href');
			var element = $(this).parent('li');
			if (element.hasClass('open')) {
				element.removeClass('open');
				element.find('li').removeClass('open');
				element.find('ul').slideUp();
			}
			else {
				element.addClass('open');
				element.children('ul').slideDown();
				element.siblings('li').children('ul').slideUp();
				element.siblings('li').removeClass('open');
				element.siblings('li').find('li').removeClass('open');
				element.siblings('li').find('ul').slideUp();
			}
		});	
		
		//Parallax Burger Menu
		$('#burger-wrapper').mouseleave(function(e){
			TweenMax.to(this, 0.3, {scale: 1});
			TweenMax.to('#burger-circle, #menu-burger', 0.3,{scale:1, x: 0, y: 0});			  
		});		
		$('#burger-wrapper').mouseenter(function(e){
			TweenMax.to(this, 0.3, {transformOrigin: '0 0', scale: 1});
			TweenMax.to('#burger-circle', 0.3,{scale: 1.3});
		});		
		$('#burger-wrapper').mousemove(function(e){   
			callParallax(e);
		});		
		function callParallax(e){
			parallaxIt(e, '#burger-circle', 60);
			parallaxIt(e, '#menu-burger', 40);
		}		
		function parallaxIt(e, target, movement){
			var $this = $('#burger-wrapper');
			var boundingRect = $this[0].getBoundingClientRect();
			var relX = e.pageX - boundingRect.left;
			var relY = e.pageY - boundingRect.top;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		
			TweenMax.to(target, 0.3, {
				x: (relX - boundingRect.width/2) / boundingRect.width * movement,
				y: (relY - boundingRect.height/2 - scrollTop) / boundingRect.width * movement,
				ease: Power2.easeOut
			});
		}
		
		
	}// End First Load
	
/*--------------------------------------------------
Function Hero Section
---------------------------------------------------*/
	
	function HeroSection() {
		
		if( $('#hero').length > 0 ){
			
			// Hero Caption Options			
			var HeroCaption = document.getElementById('hero-caption');				
			var windowScrolled;
			window.addEventListener('scroll', function windowScroll() {
				windowScrolled = window.pageYOffset || document.documentElement.scrollTop;
				if ($('#hero-styles').hasClass("scale-onscroll")) {
					HeroCaption.style.transform = 'scale('+(100 - windowScrolled/100)/100 +')';
				}
				if ($('#hero-styles').hasClass("parallax-onscroll")) {
					HeroCaption.style.transform = 'translate3d( 0,' + windowScrolled / -2.5 + 'px, 0)';
				}
				if ($('#hero-styles').hasClass("opacity-onscroll")) {
					HeroCaption.style.opacity =  (1 - (windowScrolled/15) / 20);
				}				
			});
			
			if( $('#project-nav	').length > 0 ){
				$('#main-page-content').addClass('padding-below');
				$(window).on("scroll", function() {
					if($(window).scrollTop() + $(window).height() > ($(document).height() - 40 ) ) {
						$('#main-page-content.padding-below').addClass('fade-out');
						$('#project-nav').addClass('fade-in');
					} else {
						$('#main-page-content.padding-below').removeClass('fade-out');
						$('#project-nav').removeClass('fade-in');
						
					}
				});
			}
		
			// Hero Image Parallax
			if( $('#hero-bg-wrapper').length > 0 ){
				$('#main-page-content').css({opacity: '0'}).addClass('padding-above');
				var timeout;
				$(window).resize(changePersective);				
				changePersective();				
				function changePersective(){
					TweenMax.set('#hero-bg-wrapper', {perspective: $('body').width()});
				}
				$('#hero').mousemove(function(e){
					if(timeout) clearTimeout(timeout);
					setTimeout(callParallaxHero.bind(null, e));			
				});				
				function callParallaxHero(e){
					parallaxItHero(e, '#hero-bg-image', - 0);
					moveItHero(e, '#hero-bg-image', - 80);
				}				
				function parallaxItHero(e, target, movement){
					var $this = $('#hero-bg-wrapper');
					var relX = e.pageX - $this.offset().left;
					var relY = e.pageY - $this.offset().top;					
					TweenMax.to(target, 1, {
						rotationY: (relX - $this.width()/2) / $this.width() * movement,
						rotationX: (relY - $this.height()/2) / $this.height() * movement,
					})
				}				
				function moveItHero(e, target, movement){
					var $this = $('#hero-bg-wrapper');
					var relX = e.pageX - $this.offset().left;
					var relY = e.pageY - $this.offset().top;					
					TweenMax.to(target, 1, {
						x: (relX - $this.width()/2) / $this.width() * movement,
						y: (relY - $this.height()/2) / $this.height() * movement,
					})
				}
			
				// Hero Image Color				
				if ($('#hero-bg-image').hasClass("light-content")) {
					$('#hero-caption').addClass('light-content').addClass('animate');
					setTimeout(function(){
						$('header, #menu-overlay, footer').addClass('light-content');
					} , 300 );
				}
				
				// Hero Image Color changing on scroll
				setTimeout(function(){
					$(window).scroll(function() {			
						var scroll = $(window).scrollTop();				
						if (scroll >= 250) {					
							$('#hero-bg-wrapper, .scroll-down-wrap').addClass('fade-out');
						} else { 
							$('#hero-bg-wrapper, .scroll-down-wrap').removeClass('fade-out');
						}
						if (scroll >= 300) {					
							$('#main-page-content').addClass('fade-in');
							$('#main-content').css("z-index",5);
						} else { 
							$('#main-page-content').removeClass('fade-in');
							$('#main-content').css("z-index",1);
						}					
						if ($('#hero-bg-image').hasClass("light-content")) {					
							if (scroll >= 250) {					
								$('header, footer, #menu-overlay').removeClass('light-content');
							} else { 
								$('header, footer, #menu-overlay').addClass('light-content');
							}
						}				
					});
				} , 600 );
			
			}
		
		}
		
		
		
		
		
	}//End Hero Section	


	
	

/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {		
		
		$('body').removeClass('hidden');
		
		setTimeout(function(){
			$('body').removeClass('light-content');
			$("body").removeClass("transition");								
		} , 500 );
		
		setTimeout( function(){				
			if( $('#hero').length > 0 ){
				$("#hero").addClass("animate");
			}
		} , 250 );
		
		TweenMax.to($("#hero, .menu-info"), 0.4, {force3D:true, opacity:1, y: 0, delay:0.4, ease:Power3.easeOut});
		TweenMax.to($("#main-content, .fp-tableCell, #showcase-holder"), 0.5, {force3D:true, opacity:1, y: 0, delay:0.5, ease:Power2.easeOut});
		TweenMax.to($("#hero-bg-wrapper"), 0.4, {opacity:1, ease:Power1.easeInOut});
		TweenMax.to($("#footer-container"), 0.4, {opacity:1, delay:0.6, ease:Power1.easeInOut});
	
	}// End Lazy Load	
	
	
	
/*--------------------------------------------------
Function Ajax Load
---------------------------------------------------*/	

	function AjaxLoad() {		
		
		jQuery(document).ready(function(){
		  var isAnimating = false,
			newLocation = '';
			firstLoad = false;
		  
		  //trigger smooth transition from the actual page to the new one 
		  $('main').on('click', '[data-type="page-transition"]', function(event){
			event.preventDefault();
			//detect which page has been selected
			var newPage = $(this).attr('href');
			//if the page is not already being animated - trigger animation
			if( !isAnimating ) changePage(newPage, true);
			firstLoad = true;
		  });
		
		  //detect the 'popstate' event - e.g. user clicking the back button
		  $(window).on('popstate', function() {
			if( firstLoad ) {
			  /*
			  Safari emits a popstate event on page load - check if firstLoad is true before animating
			  if it's false - the page has just been loaded 
			  */
			  var newPageArray = location.pathname.split('/'),
				//this is the url of the page to be loaded 
				newPage = newPageArray[newPageArray.length - 1];
		
			  if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
			}
			firstLoad = true;
			});
		
			function changePage(url, bool) {
			isAnimating = true;
			// trigger page animation
			$('body').addClass('page-is-changing');
			$('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				loadNewContent(url, bool);
			  	newLocation = url;
			  $('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			});
			//if browser doesn't support CSS transitions
			if( !transitionsSupported() ) {
			  loadNewContent(url, bool);
			  newLocation = url;
			}
			}
		
			function loadNewContent(url, bool) {
				url = ('' == url) ? 'index.html' : url;
			
			var section = $('<div class="cd-main-content "></div>');			
				
				
			section.load(url+' .cd-main-content > *', function(event){
				
				// load new content and replace <main> content with the new one
				FullPageDestroy();		
			    $('main').html(section);
				
				var clapat_title = event.match(/<title[^>]*>([^<]+)<\/title>/)[1];
				$('head title').html( clapat_title );
				
			  //if browser doesn't support CSS transitions - dont wait for the end of transitions
			  var delay = ( transitionsSupported() ) ? 30 : 0;
			  setTimeout(function(){
				$('body').removeClass('page-is-changing');
				$('.cd-cover-layer').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				  isAnimating = false;
				  $('.cd-cover-layer').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
				});				
				
				ga('set', 'page', '/' + url);
				ga('send', 'pageview');
				
				FirstLoad();
				HeroSection();				
				FullPage();
				LazyLoad();					
				MasonryPortfolio();
				NextProject();
				Sliders();				
				FooterAppear();				
				Lightbox();
				AppearIteam();
				BackToTop();
				ContactForm();
				CollagePlus();
				PageShare();
				ContactMap();		
				
				
				if( !transitionsSupported() ) isAnimating = false;
			  }, delay);			  
			  if(url!=window.location && bool){
				window.history.pushState({path: url},'',url);
			  }
				});
		  }
		
		  function transitionsSupported() {
			return $('html').hasClass('csstransitions');
		  }
		});
			
		
	}// End Ajax Load
	

/*--------------------------------------------------
Function FullPage Destroy
---------------------------------------------------*/
	
	function FullPageDestroy() {
			
		if( $('#showcase-slider').length > 0 ){	
			$('#showcase-slider').fullpage.destroy('all');
		}
	}
	
	
/*--------------------------------------------------
Function FullPage
---------------------------------------------------*/
	
	function FullPage() {
		
		if( $('#showcase-slider').length > 0 ){	
	
			$('#showcase-slider').fullpage({
				navigation: false,		
				
				onLeave: function(index, nextIndex, direction){					
					
					var leavingSection = $(this);
					
					if(index  && direction ==='down'){
						
						$(".section").removeClass('reverse');						
						$(".section").find('.sa-one, .sa-two, .sa-three, .sa-four').css({transform: 'translateY(15vh)',opacity: '0'});										
						$(this).find('.sa-one, .sa-two, .sa-three, .sa-four').css({transform: 'translateY(-10vh)',opacity: '0'});										
						$(this).next(".section").find('.sa-one, .sa-two, .sa-three, .sa-four').css({transform: 'translateY(0px)',opacity: '1'});
						
						
						$(".section").find('.section-image').css({transform: 'translateX(30px)'});										
						$(this).find('.section-image').css({transform: 'translateX(-30px)'});										
						$(this).next(".section").find('.section-image').css({transform: 'translateX(0px)'});
						
						$(".section").find('.section-image-mirror').css({transform: 'translateX(-30px)'});										
						$(this).find('.section-image-mirror').css({transform: 'translateX(30px)'});										
						$(this).next(".section").find('.section-image-mirror').css({transform: 'translateX(0px)'});
						
					} else if(index  && direction === 'up'){			
						
						$(".section").addClass('reverse');
						$(".section").find('.sa-one, .sa-two, .sa-three, .sa-four').css({transform: 'translateY(-10vh)',opacity: '0',});
						$(this).prev(".section").find('.sa-one, .sa-two, .sa-three, .sa-four').css({transform: 'translateY(0px)',opacity: '1'});												
						$(this).find('.sa-one, .sa-two, .sa-three, .sa-four').css({transform: 'translateY(15vh)',opacity: '0'});						
						
						$(".section").find('.section-image').css({transform: 'translateX(-30px)'});										
						$(this).find('.section-image').css({transform: 'translateX(30px)'});										
						$(this).prev(".section").find('.section-image').css({transform: 'translateX(0px)'});
						
						$(".section").find('.section-image-mirror').css({transform: 'translateX(30px)'});										
						$(this).find('.section-image-mirror').css({transform: 'translateX(-30px)'});										
						$(this).prev(".section").find('.section-image-mirror').css({transform: 'translateX(0px)'});
						
					}
					
					TweenMax.to($(".socials-text, .copyright"), 0.4, {force3D:true, opacity:0, delay:0, ease:Power1.easeOut});
					
				},
				
				afterLoad: function(anchorLink, index){
					
					if(getWindowInnerWidth() > 1024) {
						VanillaTilt.init(document.querySelector(".active .img-perspective"), {
							max: 3,
							perspective:1000,
							reverse:true, 
							speed: 400,
							easing:"linear",
						});
					}
					
					if ($(".section.active").hasClass("last-slide")) {					
						$('footer').addClass('visible');
						TweenMax.to($(".socials-text, .copyright"), 0.4, {force3D:true, opacity:1, delay:0.2, ease:Power1.easeOut});		
					} else { 
						$('footer').removeClass('visible');
						TweenMax.to($(".socials-text, .copyright"), 0.4, {force3D:true, opacity:0, delay:0, ease:Power1.easeOut});
					}
				},
							
       		});
			
			$('#prev-slide').on('click', function() {
				$.fn.fullpage.moveSectionUp();
			});
			
			$('#next-slide').on('click', function() {
				$.fn.fullpage.moveSectionDown();
			});
			
			
		}
			

	}//End FullPage		
	
	
	
	
/*--------------------------------------------------
Function Masonry Portfolio
---------------------------------------------------*/	
		
	function MasonryPortfolio() {	
	
		if( $('#portfolio-wrap').length > 0 ){
			
		
			var $container = $('#portfolio');
		
			$container.isotope({
				layoutMode: 'packery',
				itemSelector: '.item',
				gutter:0,
				transitionDuration: "0.5s"
			});
			
			$('#filters a').on('click', function() {
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				$('.item').addClass('item-margins');
				var selector = $(this).attr('data-filter');
				$container.isotope({ filter: selector });		
				return false;
			});
			
			$('#filters #all').on('click', function() {
				$('.item').removeClass('item-margins');
			});
			
			$(window).on( 'resize', function () {
			
				var winWidth = window.innerWidth;
				columnNumb = 1;			
				var attr_col = $('#portfolio').attr('data-col');
					
				 if (winWidth >= 1466) {
					
					
					$('#portfolio-wrap').css( {width : $('#portfolio-wrap').parent().width() - 500 + 'px'});		
					var portfolioWidth = $('#portfolio-wrap').width();
					
					if (typeof attr_col !== typeof undefined && attr_col !== false) {
						columnNumb = $('#portfolio').attr('data-col');
					} else columnNumb = 2;
					
					postHeight = window.innerHeight
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						
						if ( $('#portfolio').attr('data-col') === '3' ) {
							$('.item').css( { 
								width : postWidth - 100 + 'px',
								height : postWidth * 1.2   + 'px',
								margin : 50 + 'px', 
							});
						} 
						
					});
					
					
				} else if (winWidth > 1024) {
					
					$('#portfolio-wrap').css( {width : $('#portfolio-wrap').parent().width() - 240 + 'px'});		
					var portfolioWidth = $('#portfolio-wrap').width();
					
					columnNumb = 3;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 						
						
						$('.item').css( { 
							width : postWidth - 60 + 'px',
							height : postWidth * 1.2   + 'px',
							margin : 30 + 'px', 
						});
						
					});
					
					
				}else if (winWidth > 767) {
					
					$('#portfolio-wrap').css( {width : $('#portfolio-wrap').parent().width() - 200 + 'px'});			
					var portfolioWidth = $('#portfolio-wrap').width();
					
					columnNumb = 2;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						
						$('.item').css( { 
							width : postWidth - 80 + 'px',
							height : postWidth * 1.1   + 'px',
							margin : 40 + 'px', 
						});
						
					});
					
					
				}	else if (winWidth > 479) {
					
					$('#portfolio-wrap').css( {width : $('#portfolio-wrap').parent().width() - 20 + 'px'});		
					var portfolioWidth = $('#portfolio-wrap').width();
					
					columnNumb = 2;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 						
						
						$('.item').css( { 
							width : postWidth - 60 + 'px',
							height : postWidth * 1.1   + 'px',
							margin : 30 + 'px', 
						});
						
					});
					
					
				}
				
				else if (winWidth <= 479) {
					
					$('#portfolio-wrap').css( {width : $('#portfolio-wrap').parent().width() -60 + 'px'});	
					var portfolioWidth = $('#portfolio-wrap').width();
					
					columnNumb = 1;
					postWidth = Math.floor(portfolioWidth / columnNumb)			
					$container.find('.item').each(function () { 
						
						$('.item').css( { 
							width : postWidth  + 'px',
							height : postWidth * 1.4   + 'px',
							margin : 0 + 'px', 
						});
						
					});
					
					
				}		
				return columnNumb;
				
				
			}).resize();
			
			
			$("#all").trigger('click');
					
			
			var $animation_elements = $('.item');
			var $window = $(window);
			
			function check_if_in_view() {
				var window_height = $window.height();
				var window_top_position = $window.scrollTop();
				var window_bottom_position = (window_top_position + window_height);
			
				$.each($animation_elements, function() {
					var $element = $(this);
					var element_height = $element.outerHeight();
					var element_top_position = $element.offset().top;
					var element_bottom_position = (element_top_position + element_height) + 130;
					
					//check to see if this current container is within viewport
					if ((element_bottom_position >= window_top_position) &&	(element_top_position <= window_bottom_position)) {
						$element.addClass('in-view');
						
						$element.find('.item-content').css({
							transform: 'translateY(0px)',
							opacity: '1',
						});
						
					} else if (element_bottom_position >= window_top_position)  {
						$element.removeClass('in-view');
						
						$element.find('.item-content').css({
							transform: 'translateY(20vh)',
							opacity: '0',
						});
					} else if (element_top_position <= window_bottom_position)  {
						$element.removeClass('in-view');
						
						$element.find('.item-content').css({
							transform: 'translateY(-20vh)',
							opacity: '0',
						});
					}
				});
			}
			
			$window.on('scroll resize', check_if_in_view);
			
			if(getWindowInnerWidth() > 1024) {
				VanillaTilt.init(document.querySelectorAll(".item a"), {
					max: 7,
					perspective:1000,
					reverse:true, 
					speed: 400,
					easing:"linear",
				});
			}
							
		}	
	
	}//End MasonryPortfolio
	
	
/*--------------------------------------------------
Function Virtual Scroll
---------------------------------------------------*/

	function NextProject() {		
		
		if( $('#project-nav').length > 0 ){
			if(getWindowInnerWidth() > 1024) {
				VanillaTilt.init(document.querySelectorAll("#project-nav .img-perspective"), {
					max: 7,
					perspective:1000,
					reverse:true, 
					speed: 400,
					easing:"linear",
				});
			}
		}
			
		
	}// End First Load	
	
	
	
/*--------------------------------------------------
Function Virtual Scroll
---------------------------------------------------*/

	function VirtualScr() {		
		
		new SmoothScroll();

		function SmoothScroll(el) {
			var t = this, h = document.documentElement;
			el = el || window;
			t.rAF = false;
			t.target = 0;
			t.scroll = 0;
			t.animate = function() {
			t.scroll += (t.target - t.scroll) * 0.1;
			if (Math.abs(t.scroll.toFixed(5) - t.target) <= 0.47131) {
			cancelAnimationFrame(t.rAF);
			t.rAF = false;}
			if (el == window) scrollTo(0, t.scroll);
			else el.scrollTop = t.scroll;
			if (t.rAF) t.rAF = requestAnimationFrame(t.animate);};
			el.onmousewheel = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var scrollEnd = (el == window) ? h.scrollHeight - h.clientHeight : el.scrollHeight - el.clientHeight;
			t.target += (e.wheelDelta > 0) ? -100 : 100;
			if (t.target < 0) t.target = 0;
			if (t.target > scrollEnd) t.target = scrollEnd;
			if (!t.rAF) t.rAF = requestAnimationFrame(t.animate);};
			el.onscroll = function() {
			if (t.rAF) return;
			t.target = (el == window) ? pageYOffset || h.scrollTop : el.scrollTop;
			t.scroll = t.target;};
		}
			
		
	}// End First Load
 

/*--------------------------------------------------
Function FooterAppear
---------------------------------------------------*/	
	
	function FooterAppear() {
		
		if( $('#page-content').length > 0 ){
			$(window).scroll(function() {    
				var scroll = $(window).scrollTop();
			
				if (scroll >= 300) {					
					$("#page-action-holder-left, #page-action-holder-right").addClass('is-active');					
				} else {								
					$("#page-action-holder-left, #page-action-holder-right").removeClass('is-active');
				}
			});
		}
		
		var lastScroll = 0;
	
		$(window).scroll(function(){
			var scroll = $(window).scrollTop();
			if (scroll > lastScroll) {
				$("#page-action-holder-left, #page-action-holder-right").addClass("is-visible");
			} else if (scroll < lastScroll) {
				$("#page-action-holder-left, #page-action-holder-right").removeClass("is-visible");
			}
			lastScroll = scroll;
		});
  
  }//End FooterAppear
  
  

  
  
/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/
	
	function Sliders() {
		
		$('.slider').owlCarousel({
			loop:true,
			margin:500,
			center: true,
			autoHeight:false,
			nav:true,
			navSpeed: 300,
			items:1,			
		});
		
		if( $('.slider').length > 0 ){		
			setTimeout(function(){				
				$('.owl-prev').append('<span>Prev</span>');
				$('.owl-next').append('<span>Next</span>');
					var tooltips  = document.querySelectorAll('.owl-controls span');			
					window.onmousemove = function (e) {
						var x = (e.clientX + 30) + 'px',
							y = (e.clientY - 30) + 'px';
						for (var i = 0; i < tooltips.length; i++) {
							tooltips[i].style.top = y;
							tooltips[i].style.left = x;
						}
					};				
			} , 50 );		
		}
		
		$('.carousel').owlCarousel({
			loop:true,
			margin:20,
			autoHeight:false,
			navSpeed: 600,
			responsive:{
				0:{
					items:1
				},
				479:{
					items:2
				},
				1024:{
					items:3
				},
				1466:{
					items:3
				}
			}
		});
		
		if( $('.text-carousel').length > 0 ){		
			$(".text-carousel").owlCarousel({	
				loop:true,
				dots:false,
				items:1,
				autoplay:true,
				smartSpeed: 750,
				autoHeight:true,
				autoplayHoverPause:true,
				nav:true,
				navText: ["<div class='prev-testimonial'></div><i class='fa fa-chevron-left' aria-hidden='true'></i>","<div class='next-testimonial'></div><i class='fa fa-chevron-right' aria-hidden='true'></i>"],
			});
			
			$('.owl-prev').mouseleave(function(e){
				TweenMax.to(this, 0.3, {scale: 1});
				TweenMax.to('.prev-testimonial, .owl-prev .fa', 0.3,{scale:1, x: 0, y: 0});			
			});
			
			$('.owl-prev').mouseenter(function(e){
				TweenMax.to(this, 0.3, {transformOrigin: '0 0', scale: 1});
				TweenMax.to('.prev-testimonial', 0.3,{scale: 1.3});
			});
			
			$('.owl-prev').mousemove(function(e){   
				callParallaxOwlPrev(e);
			});
			
			function callParallaxOwlPrev(e){
				parallaxItOwlPrev(e, '.prev-testimonial', 30);
				parallaxItOwlPrev(e, '.owl-prev .fa', 20);
			}			
			
			function parallaxItOwlPrev(e, target, movement){
				var $this = $('.owl-prev');
				var boundingRect = $this[0].getBoundingClientRect();
				var relX = e.pageX - boundingRect.left;
				var relY = e.pageY - boundingRect.top;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				TweenMax.to(target, 0.3, {
					x: (relX - boundingRect.width/2) / boundingRect.width * movement,
					y: (relY - boundingRect.height/2 - scrollTop) / boundingRect.width * movement,
					ease: Power2.easeOut
				});
			}
			
			$('.owl-next').mouseleave(function(e){
				TweenMax.to(this, 0.3, {scale: 1});
				TweenMax.to('.next-testimonial, .owl-next .fa', 0.3,{scale:1, x: 0, y: 0});			
			});
			
			$('.owl-next').mouseenter(function(e){
				TweenMax.to(this, 0.3, {transformOrigin: '0 0', scale: 1});
				TweenMax.to('.next-testimonial', 0.3,{scale: 1.3});
			});
			
			$('.owl-next').mousemove(function(e){   
				callParallaxOwlNext(e);
			});
			
			function callParallaxOwlNext(e){
				parallaxItOwlNext(e, '.next-testimonial', 30);
				parallaxItOwlNext(e, '.owl-next .fa', 20);
			}
			
			function parallaxItOwlNext(e, target, movement){
				var $this = $('.owl-next');
				var boundingRect = $this[0].getBoundingClientRect();
				var relX = e.pageX - boundingRect.left;
				var relY = e.pageY - boundingRect.top;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				TweenMax.to(target, 0.3, {
					x: (relX - boundingRect.width/2) / boundingRect.width * movement,
					y: (relY - boundingRect.height/2 - scrollTop) / boundingRect.width * movement,
					ease: Power2.easeOut
				});
			}
					  
		}
		
	
	}//End Sliders
	
	
	
/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/
	
	function Lightbox() {
		
		$('.image-link').magnificPopup({
		  	type: 'image',
			mainClass: 'mfp-with-zoom',	
			gallery: {
			  enabled:true
			},		
			zoom: {
				enabled: true, 			
				duration: 300, 
				easing: 'ease-in-out', 
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}			
		});
			
	}//End Lightbox	 
	
	

	
/*--------------------------------------------------
Function AppearIteam
---------------------------------------------------*/	
		
	function AppearIteam() {		
		
		setTimeout(function(){
			$('.has-animation').each(function() {	
				$(this).appear(function() {				
					$(this).delay($(this).attr('data-delay')).queue(function(next){
						$(this).addClass('animate-in');
						next();
					});				 		
				});		
			});
		} , 250 );		
	
	}//End AppearIteam					 	
  
  
  
/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/
	
	function BackToTop() {
		
		$('#scrolltotop').on('click', function() {
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
		
		$('.scroll-down-wrap').on('click', function() {
			$('html, body').animate({ scrollTop: $('#main-content').offset().top +1 },700);
			return false;
		});
	
	}//End BackToTop
	
	
	
/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/	
		
	function ContactForm() {	
	
		if( jQuery('#contact-formular').length > 0 ){
			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
					$('#message').hide();
					$('#submit').attr('disabled','disabled');		
					$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						comments: $('#comments').val()
					},
					function(data){
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown('slow');
						$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit').removeAttr('disabled');
						if(data.match('success') != null) $('#contactform').slideUp('slow');		
					}
				);		
				});		
				return false;		
			});		
		}

	}//End ContactForm		
	
	
	
/*--------------------------------------------------
Function Collage Plus
---------------------------------------------------*/	
	
	function CollagePlus() {
		
		if( $('.collage').length > 0 ){
			
			$.fn.removeSpace = function(){ 
			  $(this).contents().filter(function() {
				return this.nodeType === 3; 
			  }).remove();
			};
			
			$('.collage').removeSpace();
		
			$('#main').waitForImages({
				finished: function() {
					
					$('.collage').collagePlus(
						{	
							'targetHeight'    : 510,
							'fadeSpeed'       : "fast",
							'effect'          : 'default',
							'direction'       : 'vertical',
							'allowPartialLastRow'       : true,
						}
					);	
					
				},
			waitForAll: true
			});	
		
		}
		
	}//End Collage Plus	
	
	
/*--------------------------------------------------
Function Page Share
---------------------------------------------------*/	
	
	function PageShare() {
		
		
		$("#share").jsSocials({
            showLabel: false,
    		showCount: false,
    		shares: ["facebook", "twitter", "googleplus", "pinterest"]
        });
		
	}//End PageShare


/*--------------------------------------------------
Function Contact Map
---------------------------------------------------*/	
		
	function ContactMap() {	
	
	if( jQuery('#map_canvas').length > 0 ){					
		var latlng = new google.maps.LatLng(43.270441,6.640888);
		var settings = {
			zoom: 14,
			center: new google.maps.LatLng(43.270441,6.640888),
			mapTypeControl: false,
			scrollwheel: false,
			draggable: true,
			panControl:false,
			scaleControl: false,
			zoomControl: false,
			streetViewControl:false,
			navigationControl: false};			
			var newstyle = [
			{
				"featureType": "all",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"saturation": 36
					},
					{
						"color": "#000000"
					},
					{
						"lightness": 40
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#000000"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					},
					{
						"weight": 1.2
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 20
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 21
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 29
					},
					{
						"weight": 0.2
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 18
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 16
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 19
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#000000"
					},
					{
						"lightness": 17
					}
				]
			}
		];
		var mapOptions = {
			styles: newstyle,
			mapTypeControlOptions: {
				 mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'holver']
			}
		};
		var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	
		var mapType = new google.maps.StyledMapType(newstyle, { name:"Grayscale" });    
			map.mapTypes.set('holver', mapType);
			map.setMapTypeId('holver');
					
		
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});	
		var contentString = '<div id="content-map-marker" style="text-align:center; padding-top:10px; padding-left:10px">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h4 id="firstHeading" class="firstHeading" style="color:#000; font-weight:600; margin-bottom:0px;">Hello Friend!</h4>'+
			'<div id="bodyContent">'+
			'<p color:#999; font-size:14px; margin-bottom:10px">Here we are. Come to drink a coffee!</p>'+
			'</div>'+
			'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});	
		var companyImage = new google.maps.MarkerImage('images/marker.png',
			new google.maps.Size(58,63),<!-- Width and height of the marker -->
			new google.maps.Point(0,0),
			new google.maps.Point(35,20)<!-- Position of the marker -->
		);
		var companyPos = new google.maps.LatLng(43.270441,6.640888);	
		var companyMarker = new google.maps.Marker({
			position: companyPos,
			map: map,
			icon: companyImage,               
			title:"Our Office",
			zIndex: 3});	
		google.maps.event.addListener(companyMarker, 'click', function() {
			infowindow.open(map,companyMarker);
		});	
	}
	
	return false
	
	}//End ContactMap	 	
	
	
