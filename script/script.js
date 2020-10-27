$(document).ready(function(e) {
	
	//$('body').append("<div class='text' style='width:400px; height:200px; direction:ltr; position:fixed; left:0; top:50%; margin-top:-100px; text-align:left; color:#fff; background-color:#000;'></div>");
	
	//$.alertMessage('Title','Context',0,'info || success || error');
	
	var text=$('.text');
	var emailPattern=/([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
	
	//.main-footer
	$('.footer-blog').dragItemSlider({
		
		appendNextPrevSwitch:false,
		switchDuration:1000,
		switchDelay:700000,
		onDragSwitchDuration:400,
		autoplay:false,
		loopType:'reverse',
		dragEndFactor:0.1
		
	});
	//.main-footer
	
	
	//.main-navigation
	$(window).scroll(function(e) {
        
		var winScroll=$(this).scrollTop();
		
		var navTop=$('.main-navigation').offset().top;
		
		if(winScroll>=navTop)
			
			$('.main-navigation').addClass('fix');
		
		else
			
			$('.main-navigation').removeClass('fix');
		
    });
	
	$('.main-navigation .nav>.link:first-child').addClass('first-child');
	$('.main-navigation .nav>.link:last-child').addClass('last-child');
	
	$('.main-navigation .nav>.link').hover(function(){
		
		$(this).parent('.nav').addClass('hover');
		$(this).addClass('hover');
		
	},function(){
		
		$(this).parent('.nav').removeClass('hover');
		$(this).removeClass('hover');
		
	});
	
	$('.main-navigation .nav>.link').each(function(index, element) {
        
		var subMenu=$(this).find('.sub-menu');
		
		if(subMenu.is('.sub-menu'))
			
			$(this).addClass('parent');
		
    });
	
	$('.main-navigation .nav>.link .sub-menu').slideUp(0);
	
	$('.main-navigation .nav>.link').hover(function(){
        
		$(this).find('.sub-menu').slideDown(100);
		
		
    },function(){
		
		
		$(this).find('.sub-menu').stop().slideUp(100);
		
		
	});
	
	//.main-navigation
	
	
	//.go-to-top
	var scrollToTopDur=400;
	
	$('.go-to-top').click(function(e) {
        
		$('body, html').stop().animate({
			
			scrollTop:0
			
		},scrollToTopDur);
		
    });
	//.go-to-top
	
	
	//.tool-tip
	var toolTipHtml={
			tagName:'div',
			innerHtml:[
					{
						tagName:'div',
						attributes:{
							class:'container'
						},
						innerHtml:[
							{
								tagName:'div',
								attributes:{
									class:'text-container'
								},
								innerHtml:[
									{
										
										tagName:'div',
										attributes:{
											class:'arrow'
										}
									}
								]
							}
						]
					}	
				]
			};
	
	var headerTTHtml=toolTipHtml;
	
	headerTTHtml['attributes']={
		
		class:'tool-tip-html arrow-top header'
		
	}
	
	$('.main-header .top-section .header-links .icon-link, .tt-tool-tip-white').toolTip({
		
		textBlockSelector:".text-container",
		inAnimationDuration:100,
		outAnimationDuration:200,
		animationMargin:{
			
			'margin-top':20,
			
		},
		toolTipHtml:headerTTHtml,
		relativePosition:{
		
			right:'middle',
			top:'bottom'
			
		},
		offsetPosition:{
			
			'left':0,
			'top':5
			
		}
		
	});
	
	var publicTTHtml=toolTipHtml;
	
	publicTTHtml['attributes']={
		
		class:'tool-tip-html arrow-bottom'
		
	}
	
	$('.tt-tool-tip').toolTip({
		
		textBlockSelector:".text-container",
		inAnimationDuration:100,
		outAnimationDuration:100,
		inAnimationDelay:500,
		animationMargin:{
			
			'margin-top':-20,
			
		},
		toolTipHtml:publicTTHtml,
		relativePosition:{
		
			left:'middle',
			bottom:'top'
			
		},
		offsetPosition:{
			
			'left':0,
			'top':0
			
		}
		
	});
	//.tool-tip
	
	//.img-container
	$('.img-container').each(function(index, element) {
	
	var transition=200;
	
	$(this).hover(function(e) {
		
		var element=$(this);
		
		if(!$(this).find('.shell .roller').hasClass('in-animation'))
			
			$(this).find('.shell .roller').animate({
				
				bottom:'100%'
				
			},0,'linear');
			
        else
			
			return;
		
		$(this).find('.shell .roller').addClass('in-animation');
		
		$(this).find('.shell .roller').animate({
			
			bottom:0
			
		},transition,'linear',function(){
			
			element.find('.shell .roller').removeClass('in-animation');
			
		});
		
    },function(){
		
		$(this).find('.shell .roller').animate({
			
			bottom:'-100%'
			
		},transition,'linear');
		
	});
	
	});
	//.img-container
	
	
	//.bread-crumb
	$('.bread-crumb .bread:first-child').addClass('first-child');
	$('.bread-crumb .bread:last-child').addClass('last-child');
	//.bread-crumb
	
	
	//.text-input-keeper
	$('.text-input-keeper .input').focus(function(e) {
        
		$(this).parents('.text-input-keeper').addClass('focus');
		
    });
	
	$('.text-input-keeper .input').blur(function(e) {
        
		$(this).parents('.text-input-keeper').removeClass('focus');
		
    });
	//.text-input-keeper
	
	//.user-comment
	$('.user-comment:first-child').addClass('first-child');
	$('.user-comment:last-child').addClass('last-child');
	//.user-comment
	
	$('.us-activity-projects .item .front .shell .background .line:even').each(function(index, element) {
        
		$(this).addClass('even');
		
    });
	
	//.fantesy-select
	var fantesySelectLMargin=2;
	var fantesySelectRMargin=2;
	var fantesySelectTMargin=2;
	
	if($('.fantesy-select').length)
		
		$('body').prepend("<div class='fantesy-select-body-shell' style='display:none;'></div>");
	
	$('.fantesy-select').each(function(index, element) {
		
		var fantesySelectElement=$(this);
		
		var optionCount=$(this).find('.option').length;
        
		$(this).find('.label').css('z-index',optionCount+100);
		
		setZIndexAddClass(fantesySelectElement);
		
		function setZIndexAddClass(fantesySelect){
			
			$(fantesySelect).find('.option').each(function(index, element) {
				
				$(this).css('z-index',optionCount-index);
				
				if(index%2==0)
					
					$(this).addClass('even');
					
				else
					
					$(this).addClass('odd');
					
				
			});
			
			
			
		}//setZIndexAddClass()
		
		setPositionToDefault(fantesySelectElement);
		
		function setPositionToDefault(fantesySelect){
			
			var oddOptionCounter=0;
			var evenOptionCounter=0;
			
			$(fantesySelect).find('.option').each(function(index, element) {
				
				if(index%2==0){
					
					$(this).css({
						
						'top':(evenOptionCounter+1)*fantesySelectTMargin,
						'left':(evenOptionCounter+1)*fantesySelectLMargin,
						'right':(evenOptionCounter+1)*fantesySelectRMargin
						
					});
					
					evenOptionCounter++;
					
				}
				else{
					
					$(this).css({
						
						'top':(oddOptionCounter+1)*fantesySelectTMargin*-1,
						'left':(oddOptionCounter+1)*fantesySelectLMargin,
						'right':(oddOptionCounter+1)*fantesySelectRMargin
						
					});
					
					oddOptionCounter++;
					
				}
				
			});
			
		}//setPositionToDefault()
		
		$(this).find('.label').click(function(e) {
            
			toggleFantesySelect(fantesySelectElement);
			
        });
		
		$(this).find('.label').mousedown(function(e) {
            
			$(this).addClass('mouse-down');
			
        });
		
		$(this).find('.label').mouseup(function(e) {
            
			$(this).removeClass('mouse-down');
			
        });
		
		$('.fantesy-select-body-shell').click(function(e) {
            
			if($(fantesySelectElement).hasClass('active')){
				
				toggleFantesySelect(fantesySelectElement);
				
			}
			
        });
		
		function toggleFantesySelect(fantesySelect){
			
			if($(fantesySelect).hasClass('active')){
				
				setPositionToDefault(fantesySelect);
				
				$(fantesySelect).removeClass('active').addClass('deactive');
				
				$('.fantesy-select-body-shell').fadeOut(200);
				
			}
			
			else{
				
				setPositionToActive(fantesySelect);
				
				$(fantesySelect).removeClass('deactive').addClass('active');
				
				$('.fantesy-select-body-shell').fadeIn(200);
				
			}
			
		}//toggleFantesySelect()
		
		function setPositionToActive(fantesySelect){
			
			var optionHeight=$(fantesySelect).find('.option').outerHeight(false);
			
			$(fantesySelect).find('.option').each(function(index, element) {
				
				$(this).css({
					
					'top':(index+1)*optionHeight,
					'left':0,
					'right':0
					
				});
				
			});
			
		}//setPositionToActive()
		
		$(this).find('a').click(function(e) {
            
			if(!$(this).parents('.fantesy-select').hasClass('active'))
				
				return false;
			
        });
		
    });
	//.fantesy-select
	
	
	
	//.info-tool-tip
	$('.info-tool-tip>.info-block').fadeOut(0);
	
	$('.info-tool-tip').hover(function(){
		
		$(this).children('.info-block').fadeIn(200);
		
	},function(){
		
		$(this).children('.info-block').stop().fadeOut(200);
		
	});
	//.info-tool-tip
	
	
	//.summary-text-block
	$('.summary-text-block').each(function(index, element) {
        
		if(!$(this).hasClass('first-open')){
			
			$(this).children('.full-context').slideUp(0);
			
			$(this).removeClass('open');
			
		}
		
    });
	
	$('.summary-text-block>.label').click(function(e) {
        
		var parent=$(this).parents('.summary-text-block');
		
		if(parent.hasClass('open')){
			
			parent.removeClass('open');
			$(this).next('.full-context').slideUp(200);
			
		}
		else{
			
			parent.addClass('open');
			$(this).next('.full-context').slideDown(200);
			
		}
		
    });
	//.summary-text-block
	
	
	
	//.aside-block
	$('.aside-block .main-label').click(function(e) {
        
		var parent=$(this).parents('.aside-block');
		
		parent.toggleClass('hide');
		
    });
	//.aside-block
	
	
	//newsletter submiting
	
	$('.newletter-submit').click(function(e) {
        
		$('.newsletter-register-block.form').submit();
		
    });
	
	$('.newsletter-register-block.form').submit(function(){
		
		var newsLetterMail=$(this).find('.newsletter-input').val();
		
		if(newsLetterMail==''){
			
			$.alertMessage('خطا : ثبت نام در خبرنامه','لطفا ایمیل خود را وارد نمایید',0,'error');
			
			return false;
			
		}
		else if(!emailPattern.test(newsLetterMail)){
		
			$.alertMessage('خطا : ثبت نام در خبرنامه','لطفا ایمیل خود را به صورت صحیح وارد نمایید',0,'error');
			
			return false;
			
		}
		
	});
	
	//newsletter submiting
	

	//..................................................................................... Khakpour

	// menu-tablet-mobile
	if($('#dl-menu').length){
	$('#dl-menu').dlmenu({
		animationClasses : { 
			in : 'dl-animate-in-1', 
			out : 'dl-animate-out-1' 
		}
	});
	}
	// menu-tablet-mobile
	
	
	//setting-height-slider
	var firstWidth=475;
	var firstHeight=275;

	$(window).resize(function(){
		heightResize();
	}).resize();

	function heightResize(){
		settingHeight();
		setTimeout(function(){
			settingHeight();
		},100);
	}

	function settingHeight(){
		var newWidth=$('.index-block .index-slider').width();
		var newHeight=newWidth*firstHeight/firstWidth;
		$('.index-block .index-slider').height(newHeight);
	}
	//setting-height-slider


	//setting-line-height
	$(window).resize(function(){
		lineheightResize();
	});
	$(window).load(function(){
		lineheightResize();
	});

	function lineheightResize(){
		resizedHeight=$('.main-footer .map .shell>.content').height();
		$('.main-footer .map .shell>.content').css('line-height',resizedHeight+"px");
	}
	//setting-line-height


	// karbalaee-style
	$('.main-footer .container .content .s-row .sr-col .src-form .src-input-holder .src-input,.main-footer .container .content .s-row .sr-col .src-form .src-text-holder .src-textarea').focus(function(){
		$(this).addClass('focused');
	});
	$('.main-footer .container .content .s-row .sr-col .src-form .src-input-holder .src-input,.main-footer .container .content .s-row .sr-col .src-form .src-text-holder .src-textarea').blur(function(){
		$(this).removeClass('focused');
	});

	$('.parent-submitter').click(function(){
		$(this).parents('.src-form').submit();
	});

	//patterns
	var namePatt=/^([a-zA-Zآ-ی]|\s)*$/;
	//patterns

	$('.src-form').submit(function(e) {

		var haveError=false;
		
		var name=$('.src-input.name').val();
		var fname=$('.src-input.fname').val();
		var msg=$('.src-textarea').val();
		

		if(name==""){
			haveError=true;
			$('.src-input.name').addClass('danger');
		}
		else if(!namePatt.test(name)){
			haveError=true;
			$('.src-input.name').addClass('danger');
		}
		else{
			$('.src-input.name').removeClass('danger');
		}

		if(fname==""){
			haveError=true;
			$('.src-input.fname').addClass('danger');
		}
		else if(!namePatt.test(fname)){
			haveError=true;
			$('.src-input.fname').addClass('danger');
		}
		else{
			$('.src-input.fname').removeClass('danger');
		}


		if(msg==""){
			haveError=true;
			$('.src-textarea').addClass('danger');
		}
		else{
			$('.src-textarea').removeClass('danger');
		}
		
		if(haveError)
			return false;

	});

	var link_width=$('.main-navigation .nav>.link>.context').width();

	$('body').find('.b-app').remove();
	$('body').append("<style class='b-app'>.sub-menu-box:before{right:"+link_width/2+"px;}</style>");


	if($('.sc-form').length){
		$('.sc-form .search-holder .sc-input').focus(function(){
			$(this).parents('.sc-form').addClass('focused');
		});
		$('.sc-form .search-holder .sc-input').blur(function(){
			$(this).parents('.sc-form').removeClass('focused');
		});
		}

	
	// extra

	if($('.sr-form').length){
		$('.sr-form .sr-s-holder .sr-input').focus(function(){
			$(this).parents('.sr-form').addClass('focused');
		});
		$('.sr-form .sr-s-holder .sr-input').blur(function(){
			$(this).parents('.sr-form').removeClass('focused');
		});
		}

	// extra

	// karbalaee-style
});


