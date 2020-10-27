$(document).ready(function(e) {
    
	//$('body').append("<div class='text' style='width:400px; height:200px; direction:ltr !important; text-align:left !important; position:fixed; right:0; top:50%; opacity:1; margin-top:-100px; text-align:left; color:#fff; background-color:#000;z-index:10000000000000000000000 !important;'></div>");
	
	var text=$('.text');
	
	//$.alertMessage('Title','Context',0,'info || success || error');
	
	//site oprions
		//.mandatory inputs
	$('.order-li input.mandatory').each(function(index, element) {
        
		var li=$(this).parents('.order-li:first');
		
		setMandatoryParentOf(li);
		
    });
	
	function setMandatoryParentOf(li){
		
		var parentLi=li.parents('.order-li:first');
		
		parentLi.children('.order-label').children('input').addClass('mandatory');
		
		bigParentLi=parentLi.parents('.order-li:first');
		
		if(bigParentLi.is('.order-li'))
			
			setMandatoryParentOf(parentLi);
		
	}
	
	$('.order-li input.mandatory').each(function(index, element) {
        
		setMandatoriesProperties($(this));
		
    });
	
	function setMandatoriesProperties(input){
		
		input.attr('disabled',true);
		input.attr('checked',true);
		
		var li=input.parents('.order-li:first');
		
		li.addClass('mandatory-li first-open');
		
	}
		//.mandatory inputs
	
	$('.order-ul').each(function(index, element) {
        
		var orderLis=$(this).children('.order-li');
		
		if(orderLis.length==1)
			
			$(this).addClass('one-child');
		
    });
	
	$('.order-li').each(function(index, element) {
        
		var orderUl=$(this).children('.order-ul');
		
		if(orderUl.length)
			
			$(this).addClass('parent');
		
    });
	
	$('.order-li.parent').each(function(index, element) {
		
		if($(this).hasClass('first-open')){
			
			$(this).addClass('close');
			
			return;
			
		}
		
		$(this).addClass('open');
        
		$(this).children('.order-ul').slideUp(0);
		
    });
	
	$('.order-li.parent>.order-expand').click(function(index, element) {
        
		var orderLi=$(this).parents('.order-li.parent:first');
		
		if(orderLi.hasClass('open')){
			
			orderLi.removeClass('open').addClass('close');
			
			orderLi.children('.order-ul').slideDown(200);
			
		}
		else{
			
			orderLi.removeClass('close').addClass('open');
			
			orderLi.children('.order-ul').slideUp(200);
			
		}
		
    });
	
	$('.order-ul>.order-li:last-child').addClass('last-child');
	
	$('.order-ul>.order-li').click(function(e) {
        
		setUnchecked();
		setCanNotChecked();
		
    });
	
	setUnchecked();
	setCanNotChecked();
	
	function setUnchecked(){
		
		$('.order-ul>.order-li>.order-label input').each(function(index, element) {
            
			if($(this).hasClass('mandatory'))
				
				return;
			
			var orderLi=$(this).parents('.order-li:first');
			
			if(this.checked)
				
				orderLi.removeClass('uncheck');
			
			else
			
				orderLi.addClass('uncheck');
				
        });
		
	}
	
	function setCanNotChecked(){
		
		$('.order-ul>.order-li').each(function(index, element) {
            
			var uncheckParent=$(this).parents('.order-li.uncheck');
			var inputChild=$(this).children('.order-label').children('input');
			
			if(inputChild.hasClass('mandatory'))
				
				return;
			
			if(uncheckParent.length){
				
				$(this).addClass('can-not-check');
				inputChild.attr('disabled',true);
				
			}
			else{
				
				$(this).removeClass('can-not-check');
				inputChild.attr('disabled',false);
				
			}
			
        });
		
	}
	//site oprions
	
	//disable checkboxes & radios
	$('.custom-check').click(function(e) {
        
		customThemeChange();
		
    });
	
	customThemeChange();
	
	function customThemeChange(){
		
		$('.custom-check').each(function(index, element) {
            
			var rowCell=$(this).parents('.row-cell:first');
			var colElem=$(this).parents('.coll-1-2:first').next('.coll-1-2');
			var inputElem=colElem.find('.custom-check-input');
			
			if(this.checked){
				
				rowCell.removeClass('disabled');
				inputElem.removeAttr('disabled').removeClass('disabled');
				
			}
			else{
				
				rowCell.addClass('disabled');
				inputElem.attr('disabled','disabled').addClass('disabled');
				
			}
				
        });
		
		
	}
	
	$('.check-all').click(function(e) {
        
		customSettingsChange();
		
    });
	
	customSettingsChange();
	
	function customSettingsChange(){
		
		$('.check-all').each(function(index, element) {
            
			var rowCell=$(this).parents('.head.board:first').next('.total-price-block').children('.row-cell');
			var inputElem=$(this).parents('.head.board:first').next('.total-price-block').find('.coll-1-2 .custom-check-input');
			
			if(this.checked){
				
				rowCell.removeClass('disabled');
				inputElem.removeAttr('disabled').removeClass('disabled');
				
			}
			else{
				
				rowCell.addClass('disabled');
				inputElem.attr('disabled','disabled').addClass('disabled');
				
			}
				
        });
		
		
	}
	//disable checkboxes & radios
	
	//handle other plugins
	$('.price-range').slider({
		
		range:true,
		animate:'fast',
		slide:function(event,ui){
			
			$('.price-range-container .range-labels .min .value').html(priceToString(ui.values[0]));
			$('.price-range-container .range-labels .max .value').html(priceToString(ui.values[1]));
			
		},
		stop:function(event, ui){
			
		}
		
	});
	
	$('textarea.ck-textarea').ckeditor();
	//handle other plugins
	
	//price calculator
	$('.order-ul>.order-li>.order-label input').change(function(e) {
        
		resetFakeChecked();
		getAllPrices();
		
    });
	
	getAllPrices();
	
	function getAllPrices(){
        
		getStaticPrice();
		getDynamicPrice();
		getTotalSitePrice();
		getDomainPrice();
		getServerPrice();
		setFinalPrices();
		
	}
	
	function getStaticPrice(){
		
		var staticInfo=getSiteSectionInfo('static');
		
		$('.final-static-price').html(priceToString(staticInfo['price']));
		$('.final-static-price-input').attr('value',staticInfo['price']);
		//$('.order-main-block.results.static .final-static-counter').html(staticInfo['count']);
		
	}
	
	function getDynamicPrice(){
		
		var dynamicInfo=getSiteSectionInfo('dynamic');
		
		$('.final-dynamic-price').html(priceToString(dynamicInfo['price']));
		$('.final-dynamic-price-input').val(dynamicInfo['price']);
		//$('.order-main-block.results.dynamic .final-dynamic-counter').html(dynamicInfo['count']);
		
	}
	
	function getTotalSitePrice(){
		
		var staticPrice=parseInt($('.final-static-price-input').val());
		var dynamicPrice=parseInt($('.final-dynamic-price-input').val());
		
		$('.final-site-total-price').html(priceToString(staticPrice+dynamicPrice));
		$('.final-site-total-price-input').val(staticPrice+dynamicPrice);
		
	}
	
	function getSiteSectionInfo(section){
		
		var finalPrice=0;
		var counter=0;
		
		$('.order-main-block.'+section+' .order-ul>.order-li>.order-label input').each(function(index, element) {
            
			if( this.checked && !this.disabled || (this.disabled && $(this).hasClass('mandatory') ) ){
				
				var value=$(this).val();
				
				value=(!isNaN(value) && value)?(parseInt(value)):0;
				
				finalPrice+=value;
				
				counter++;
				
			}
			
        });
		
		var value=Array();
		
		value['price']=finalPrice;
		value['count']=counter;
		
		return value;
		
	}
	
	$('.domain-select').change(function(e) {
        
		getAllPrices();
		
    });
	
	$('.domain-block label').click(function(e) {
        
		getAllPrices();
		
    });
	
	function getDomainPrice(){
		
		var finalDomainPrice=0;
		
		if(!$('.domain-select').is(':disabled'))
			
			finalDomainPrice=$('.domain-select').val();
		
		
		if($('.domain-movement').is(':checked'))
			
			finalDomainPrice=$('.domain-movement').val();
		
		
		finalDomainPrice=(!isNaN(finalDomainPrice) && finalDomainPrice)?(finalDomainPrice):0;
		
		$('.final-domain-price-input').val(finalDomainPrice);
		
	}
	
	$('.server-block label').click(function(e) {
        
		getAllPrices();
		
    });
	
	function getServerPrice(){
		
		finalServerPrice=0;
		
		finalServerPrice=$('.server-block input.server-package-input:checked').val();
		
		finalServerPrice=(!isNaN(finalServerPrice) && finalServerPrice)?(finalServerPrice):0;
		
		$('.final-server-price-input').val(finalServerPrice);
		
	}
	
	function setFinalPrices(){
		
		var sitePrice=parseInt($('.final-site-total-price-input').val());
		var domainPrice=parseInt($('.final-domain-price-input').val());
		var serverPrice=parseInt($('.final-server-price-input').val());
		
		$('.webdesign-total-price').html(priceToString(sitePrice));
		$('.domain-total-price').html(priceToString(domainPrice));
		$('.server-total-price').html(priceToString(serverPrice));
		
		$('.order-total-price').html(priceToString(sitePrice+domainPrice+serverPrice));
		
	}
	
		//function
	function priceToString(inPrice){
		
		var price=inPrice.toString();
		var length=price.length;
		var keyCount=length-1;
		var currenyKey=0;
		var priceString='';
		var splitCounter=3;
		
		while(currenyKey<=keyCount){
			
			var offsetKey=(length-currenyKey)%splitCounter;
			
			if(offsetKey==0)
				
				offsetKey=splitCounter;
			
			for(i=0;i<offsetKey;i++)
				
				priceString+=price[i+currenyKey];
				
			currenyKey+=offsetKey;
			
			if(currenyKey<=keyCount)
			
				priceString+=',';
			
		}
		
		return priceString;
		
	}
	
	function resetFakeChecked(){
		
		$('.order-li .order-option:checked').each(function(index, element) {
            
			var isFake=false;
			
			var parents=$(this).parents('.order-li');
			
			$(this).parents('.order-li').each(function(index, element) {
                
				if(!isFake){
					
					var childInput=$(this).children('.order-label').children('.order-option');
					
					if(!childInput.is(':checked'))
						
						isFake=true;
					
				}
				
            });
			
			if(isFake)
				
				$(this).attr('checked',false);
			
        });
		
	}
		//function
	//price calculator
	
	//whois domain check
	var ajaxDomainCheckAlerts={
		
		empty:'نام دامنه مورد نظر را وارد کنید',
		available:'دامنه مورد نظر موجود می باشد',
		taken:'دامنه مورد نظر پیش از این ثبت شده است',
		wrongDomain:'نام دامنه صحیح نمی باشد',
		error:'خطایی رخ داده است، دوباره سعی کنید'
		
	}
	
	var domainPatt=/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
	
	$('.ajax-domain-btn').removeClass('loading').addClass('search');
	
	$('.domain-name-input').keyup(function(e) {
        
		if(e.keyCode==13)
		
			$('.ajax-domain-btn').trigger('click');
		
    });
	
	$('.domain-cat-input').change(function(e) {
		
		$('.ajax-domain-btn').trigger('click');
		
	});
	
	$('.ajax-domain-btn').click(function(e) {
        
		var domainName=$('.domain-name-input').val();
		
		if(domainName==''){
		
			$('.ajax-domain-check-alert').removeClass('success').html(ajaxDomainCheckAlerts.empty);
			
			return false;
			
		}
		
		$('.ajax-domain-check-alert').html('');
		
		domainName=domainName.split('.');
		var length=domainName.length;
		domainName=domainName[length-1];
		$('.domain-name-input').val(domainName);
		
		var domainCat=$('.domain-cat-input option:selected').attr('data-domain-cat');
		
		var domain=domainName+domainCat;
		
		var domainValidate=domainPatt.test(domain);
		
		if(!domainValidate){
			
			$('.ajax-domain-check-alert').removeClass('success').html(ajaxDomainCheckAlerts.wrongDomain);
			
			return false;
			
		}
		
		$('.ajax-domain-btn').addClass('loading').removeClass('search');
		
		$.ajax({
			
			type:'POST',
			url:'domainChecker.php',
			data:{
				
				domain:domain
				
			},
			cache:false,
			success:function(response)
			{
				
				$('.text').html('YES');
				
				if(response=='available'){
					
					$('.ajax-domain-check-alert').addClass('success').html(ajaxDomainCheckAlerts.available);
					
				}
				else if(response=='taken'){
					
					$('.ajax-domain-check-alert').removeClass('success').html(ajaxDomainCheckAlerts.taken);
					
				}
				else if(response=='error'){
					
					$('.ajax-domain-check-alert').removeClass('success').html(ajaxDomainCheckAlerts.error);
					
				}
				
			},
			error:function(){
				
				$('.ajax-domain-check-alert').removeClass('success').html(ajaxDomainCheckAlerts.error);
				
			},
			complete:function(){
				
				$('.ajax-domain-btn').removeClass('loading').addClass('search');
				
			}
		   
		});
		
    });
	//whois domain check
	
	//final validate
	function serializeAllData(){
		
		setSectionOptionOrderJSON('static');
		setSectionOptionOrderJSON('dynamic');
		
		setOfferPriceRanges();
		
		setSiteCategory();
		
		setThemeType();
		setThemeLink();
		
		setDomainInfoForSubmit();
		setServerPackageCode();
		
	}
	
	function setServerPackageCode(){
		
		var value=$('.server-package-input:checked').attr('data-packagecode');
		
		$('.server-package-code-hidden').val(value);
		
	}
	
	function setDomainInfoForSubmit(){
		
		var cBoxNew=$('input.domain-check-box-new');
		var cBoxMove=$('input.domain-check-box-move');
		var cBoxOld=$('input.domain-check-box-old');
		
		var finalStatus;
		var domainName;
		
		if(cBoxNew.is(':checked')){
			
			finalStatus='new';
			
			domainName=$('.domain-name-input').val();
			var domainCat=$('.domain-cat-input').children('option:selected').attr('data-domain-cat');
			
			domainName+=domainCat;
			
		}
		
		else if(cBoxMove.is(':checked')){
			
			finalStatus='move';
			
			domainName=$('.domain-movement-input').val();
			
		}
		
		else if(cBoxOld.is(':checked')){
			
			finalStatus='old';
			
			domainName=$('.domain-old-input').val();
			
		}
		
		$('.domain-status-hidden').val(finalStatus);
		$('.domain-name-hidden').val(domainName);
		
	}
	
	function setThemeLink(){
		
		var checkBox=$('.site-themeplate-link-checkbox');
		var input=$('.site-themeplate-link-input');
		var value=input.val();
		
		if(checkBox.is(':checked'))
			
			$('.theme-link-hidden').val(value);
			
	}
	
	function setThemeType(){
		
		var checkBox=$('.site-themeplate-type-checkbox');
		var input=$('.site-themeplate-type-input');
		var value=input.val();
		
		if(checkBox.is(':checked'))
			
			$('.theme-type-hidden').val(value);
		
	}
	
	function setSiteCategory(){
		
		var value=$('input.project-category').val();
		
		$('.project-category-hidden').val(value);
			
	}
	
	function setOfferPriceRanges(){
		
		var minPrice=$('.price-range').slider('values',0);
		var maxPrice=$('.price-range').slider('values',1);
		
		$('.offer-price-min-hidden').val(minPrice);
		$('.offer-price-max-hidden').val(maxPrice);
		
	}
	
	
	function setSectionOptionOrderJSON(section){
		
		var finalValue;
		
		if($('.order-option.main-'+section).is(':checked')){
			
			var staticFullOB=new Object();
			
			var staticOptionOB=getChildrenObject($('.'+section+'-section-label'));
			
			staticFullOB[section]=staticOptionOB;
			
			staticFullOB=JSON.stringify(staticFullOB);
			
			finalValue=staticFullOB;
			
		}
		else
			
			finalValue='';
		
		
		$('input.'+section+'-order-json-hidden').val(finalValue);
		
	}
	
	function getChildrenObject(orderLi){
		
		var childOB=new Object();
		
		var childs=orderLi.children('.order-ul').children('.order-li');
		
		childs.each(function(index, element) {
            
			var input=$(this).children('.order-label').children('.order-option');
			var optioncode=input.attr('data-optioncode');
			
			if(input.is(':checked')){
				
				childOB['opt'+optioncode]=getChildrenObject($(this));
				
			}
			
        });
		
		return childOB;
		
	}
	
	var namePattern=/^[a-zا-ی ,.'-]+$/i;
	var emailPattern=/([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
	var orderingAlerts={
		
		categoryInsert:'دسته بندی خود را وارد نمایید',
		categoryError:'دسته بندی خود را به صورت صحیح وارد نمایید',
		categoryExist:'دسته بندی شما در لیست پیش فرض دسته بندی ها موجود می باشد، لطفا از بخش بالا سمت چپ همین صفحه دسته بندی خود را انتخاب کنید، به دلیل اینکه هر دسته بندی یک سری تنظیمات پیش فرض و اجباری دارد',
		themeLinkInsert:'لطفا آدرس تم مورد نظر خود را وارد نمایید',
		themeLinkError:'لطفا آدرس تم مورد نظر خود به صورت صحیح را وارد نمایید',
		
	}
	
	var firstDataSended=false;
	
	$('.ordering-full-form').submit(function(e) {
        
		var result=validateAllInputs();
		
		if(!result)
		
			return false;
		
		if(firstDataSended){
			
			serializeAllData();
			
			return true;
			
		}
		
		showLoading('در حال ارسال اطلاعات...',500);
		scrollWinTo(0,3000);
		$('body').addClass('no-scroll-bar');
		
		setTimeout(function(){
			
			$('.aside-block, .main-block').animate({opacity:0},1000,function(){
				
				setTimeout(function(){
					
					$('.order-li').each(function(index, element) {
                        
						if($(this).hasClass('open')){
							
							$(this).children('.order-expand').trigger('click');
							
						}
						
                    });
					
					$('.aside-block, .main-block').animate({opacity:1},1000);
					
					setTimeout(function(){
						
						hideLoading(1000);
						
						setTimeout(function(){
							
							$.alertMessage('ارسال موفق',"ارسال اطلاعات اولیه با موفقیت انجام شد<br><span class='red'>توجه :</span>لطفا اطلاعات ورودی خود را بار دیگر با دقت مشاهده کرده و در صورت تمایل تصحیح نمایید<br>پس از چک کردن اطلاعات خود بر روی کلید <span class='red'>'ثبت سفارش و دریافت فاکتور'</span> در پایین همین صفحه کلیک نمایید",0,'success');
							
							$('.submit-ordering-form').addClass('green');
							$('.submit-ordering-form .label').html('ثبت سفارش و دریافت فاکتور');
							firstDataSended=true;
							
							$('body').removeClass('no-scroll-bar');
							
						},300);
						
					},2000);
					
				},500);
				
			});
			
		},7000);
		
		return false;
		
    });
	
	$('.submit-ordering-form').click(function(e) {
        
		$('.ordering-full-form').submit();
		
    });
	
	function validateAllInputs(){
		
		var emailResult=validateEmail();
		var pMobileResult=validatePhoneMobile();
		var lNameResult=validateLastName();
	  	var fNameResult=validateFirstName();
		var domainResult=validateDomainForSubmit();
		var tLResult=validateThemeLink();
		var catResult=validateCategory();
		
		if(catResult && tLResult && domainResult && fNameResult && lNameResult && pMobileResult && emailResult)
			
			return true;
		
		else
			
			return false;
		
	}
	
	function validateCategory(){
		
		var projectCategory=$('input.project-category').val();
		
		if(projectCategory==''){
			
			var errorContext="لطفا <span class='red'>دسته بندی سایت</span> خود را مشخص کنید<br>توجه داشته باشد که قبل از پر کردن این بخش حتما لیست دسته بندی های پیش فرض موجود در بالا سمت چپ همین صفحه را مشاهده کرده و در صورت موجود بودن دسته بندی مورد نظر آن را انتخاب نمایید، زیرا برای هر دسته بندی یک سری تنظیمات پیش فرض و ضروری در نظر گرفته شده است";
			
			$.alertMessage('خطا',errorContext,0,'error');
			
			$('.project-category-alert').html(orderingAlerts.categoryInsert);
			$('.project-category-row').addClass('error');
			
			scrollWinToObject($('input.project-category'),750);
			
			return false;
			
		}
		
		else if(!namePattern.test(projectCategory)){
			
			var errorContext="لطفا نام دسته بندی سایت خود را به صورت صحیح وارد نمایید";
			
			$.alertMessage('خطا',errorContext,0,'error');
			
			$('.project-category-alert').html(orderingAlerts.categoryError);
			$('.project-category-row').addClass('error');
			
			scrollWinToObject($('input.project-category'),750);
			
			return false;
			
		}
		
		else{
			
			$('.project-category-alert').html('');
			$('.project-category-row').removeClass('error');
			
			return true;
			
		}
		
	}
	
	function validateThemeLink(){
		
		var input=$('input.theme-link');
		
		if(!input.is(':disabled')){
			
			var value=input.val();
			
			if(value==''){
				
				var errorContext="لطفا آدرس تم مورد نظر خود را وارد نمایید، در صورت عدم تمایل آن را غیر فعال کنید";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.theme-link-alert').html(orderingAlerts.themeLinkInsert);
				$('.theme-link-row').addClass('error');
				
				scrollWinToObject(input,750);
				
				return false;
				
			}
			/*else if(!domainPatt.test(value)){
				
				var errorContext="لطفا آدرس تم مورد نظر خود به صورت صحیح را وارد نمایید، در صورت عدم تمایل آن را غیر فعال کنید";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.theme-link-alert').html(orderingAlerts.themeLinkError);
				$('.theme-link-row').addClass('error');
				
				scrollWinToObject(input,750);
				
				return false;
				
			}*/
			else{
				
				$('.theme-link-alert').html('');
				$('.theme-link-row').removeClass('error');
				
				return true;
				
			}
			
		}
		
		else{
			
			$('.theme-link-alert').html('');
			$('.theme-link-row').removeClass('error');
			
			return true;
			
		}
		
	}
	
	$('.custom-theme-check-box').change(function(e) {
        
		if(!$(this).is(':disabled')){
			
			$('.theme-link-alert').html('');
			$('.theme-link-row').removeClass('error');
			
		}
		
    });
	
	function validateDomainForSubmit(){
		
		var cBoxNew=$('input.domain-check-box-new');
		var cBoxMove=$('input.domain-check-box-move');
		var cBoxOld=$('input.domain-check-box-old');
		
		if(cBoxNew.is(':checked')){
			
			var domainValidInput=$('input.new-domain-status');
			var domainValidInputValue=domainValidInput.val();
			
			if(domainValidInputValue=='empty'){
				
				var errorContext="لطفا نام دامنه خود را وارد کنید<br>بهتر است که دامنه خود را مستقیما از وب سایت <a href='http://academy-host.com/' target='_blank'>آکادمی هاست</a>  به صورت آنی خریداری و ثبت نمایید.";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.ajax-domain-check-alert').html(ajaxDomainCheckAlerts.empty);
				$('.domain-final-row').addClass('error');
				
				scrollWinToObject(cBoxNew,750);
				
				return false;
				
			}
			else if(domainValidInputValue=='taken'){
				
				var errorContext="نام دامنه مورد نظر شما قبلا ثبت شده است، لطفا نام دیگری را جستجو کنید";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.ajax-domain-check-alert').html(ajaxDomainCheckAlerts.taken);
				$('.domain-final-row').addClass('error');
				
				scrollWinToObject(cBoxNew,750);
				
				return false;
				
			}
			else if(domainValidInputValue=='error'){
				
				var errorContext="در ارتباط با سرور جهت جستجوی دامنه خطایی رخ داده است، لطفا دوباره سعی کنید";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.ajax-domain-check-alert').html(ajaxDomainCheckAlerts.error);
				$('.domain-final-row').addClass('error');
				
				scrollWinToObject(cBoxNew,750);
				
				return false;
				
			}
			else if(domainValidInputValue=='wrong'){
				
				var errorContext="نام دامنه مورد نظر صحیح نمی باشد";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.ajax-domain-check-alert').html(ajaxDomainCheckAlerts.wrongDomain);
				$('.domain-final-row').addClass('error');
				
				scrollWinToObject(cBoxNew,750);
				
				return false;
				
			}
			else if(domainValidInputValue=='ok'){
				
				$('.ajax-domain-check-alert').html('');
				$('.domain-final-row').removeClass('error');
				
				return true;
				
			}
			
		}
		else if(cBoxMove.is(':checked')){
			
			var value=$('.domain-movement-input').val();
			
			if(value==''){
			
				var errorContext="لطفا نام دامنه خود را جهت انتقال به سرور آکادمی هاست وارد نمایید";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.domain-movement-alert').html(ajaxDomainCheckAlerts.empty);
				$('.domain-movement-row').addClass('error');
				
				scrollWinToObject(cBoxMove,750);
				
				return false;
			
			}
			else if(!domainPatt.test(value)){
			
				var errorContext="نام دامنه وارد شده جهت انتقال به سرور <a href='http://academy-host.com' target='_blank'>آکادمی هاست</a> صحیح نمی باشد";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.domain-movement-alert').html(ajaxDomainCheckAlerts.wrongDomain);
				$('.domain-movement-row').addClass('error');
				
				scrollWinToObject(cBoxMove,750);
				
				return false;
				
			}
			else{
				
				$('.domain-movement-alert').html('');
				$('.domain-movement-row').removeClass('error');
				
				return true;
				
			}
			
		}
		else if(cBoxOld.is(':checked')){
			
			var value=$('.domain-old-input').val();
			
			if(value==''){
			
				var errorContext="لطفا نام دامنه ای که پیش از این از <a href='http://academy-host.com' target='_blank'>آکادمی هاست</a> خریداری نموده اید را وارد کنید";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.domain-old-alert').html(ajaxDomainCheckAlerts.empty);
				$('.domain-old-row').addClass('error');
				
				scrollWinToObject(cBoxMove,750);
				
				return false;
			
			}
			else if(!domainPatt.test(value)){
			
				var errorContext="نام دامنه مورد نظر شما صحیح نمی باشد";
				
				$.alertMessage('خطا',errorContext,0,'error');
				
				$('.domain-old-alert').html(ajaxDomainCheckAlerts.wrongDomain);
				$('.domain-old-row').addClass('error');
				
				scrollWinToObject(cBoxMove,750);
				
				return false;
				
			}
			else{
				
				$('.domain-old-alert').html('');
				$('.domain-old-row').removeClass('error');
				
				return true;
				
			}
			
		}
		
	}
	
	$('.domain-check-box').change(function(e) {
		
		$('.domain-check-box').each(function(index, element) {
            
			var parentRow=$(this).parents('.row-cell:first');
			parentRow.removeClass('error');
			parentRow.find('.alert-container').html('');
			
        });
		
    });
	
	
	
	var mobilePattern=/([0-9]{11})$/;
	
	var userError={
		
		nameEmpty:'لطفا نام خود را وارد کنید',
		nameError:'لطفا نام خود را به صورت صحیح وارد کنید',
		lastNameError:'لطفا نام خانوادگی خود را به صورت صحیح وارد کنید',		
		lastNameEmpty:'لطفا نام خانوادگی خود را وارد کنید',
		emailEmpty:'لطفا ایمیل خود را وارد کنید',
		emailError:'لطفا ایمیل خود را به صورت صحیح وارد کنید',
		mobileEmpty:'لطفا شماره تلفن همراه خود را وارد کنید',
		mobileError:'لطفا شماره تلفن همراه خود را به صورت صحیح وارد کنید'
		
	}
	
	function validateFirstName(){
		
		var input=$('.first-name-input');
		var value=input.val();
		var row=$('.name-row');
		var alertContainer=$('.name-alert');
		
		if(value==''){
			
			scrollWinToObject(row,750);
			row.addClass('error');
			alertContainer.html(userError.nameEmpty);
			
			var errorContext=userError.nameEmpty;
			$.alertMessage('خطا',errorContext,0,'error');
			
			return false;
			
		}
		else if(!namePattern.test(value)){
			
			scrollWinToObject(row,750);
			row.addClass('error');
			alertContainer.html(userError.nameError);
			
			var errorContext=userError.nameError;
			$.alertMessage('خطا',errorContext,0,'error');
			
			return false;
			
		}
		else{
			
			row.removeClass('error');
			alertContainer.html('');
			
			return true;
			
		}
		
	}
	
	function validateLastName(){
		
		var input=$('.last-name-input');
		var value=input.val();
		var row=$('.last-name-row');
		var alertContainer=$('.last-name-alert');
		
		if(value==''){
			
			scrollWinToObject(row,750);
			row.addClass('error');
			alertContainer.html(userError.lastNameEmpty);
			
			var errorContext=userError.lastNameEmpty;
			$.alertMessage('خطا',errorContext,0,'error');
			
			return false;
			
		}
		else if(!namePattern.test(value)){
			
			scrollWinToObject(row,750);
			row.addClass('error');
			alertContainer.html(userError.lastNameError);
			
			var errorContext=userError.lastNameError;
			$.alertMessage('خطا',errorContext,0,'error');
			
			return false;
			
		}
		else{
			
			row.removeClass('error');
			alertContainer.html('');
			
			return true;
			
		}
		
	}
	
	function validatePhoneMobile(){
		
		var input=$('.phone-mobile-input');
		var value=input.val();
		var row=$('.phone-mobile-row');
		var alertContainer=$('.mobile-phone-alert');
		
		if(value==''){
			
			scrollWinToObject(row,750);
			row.addClass('error');
			alertContainer.html(userError.mobileEmpty);
			
			var errorContext=userError.mobileEmpty+"<br>برای مثال : <span class='en-input'>09121234567</span>";
			$.alertMessage('خطا',errorContext,0,'error');
			
			return false;
			
		}
		else if(!mobilePattern.test(value) || value.length>11){
			
			scrollWinToObject(row,750);
			row.addClass('error');
			alertContainer.html(userError.mobileError);
			
			var errorContext=userError.mobileError+"<br>برای مثال : <span class='en-input'>09121234567</span>";
			$.alertMessage('خطا',errorContext,0,'error');
			
			return false;
			
		}
		else{
			
			row.removeClass('error');
			alertContainer.html('');
			
			return true;
			
		}
		
	}
	
	
	function validateEmail(){
		
		var input=$('.email-input');
		var value=input.val();
		var row=$('.email-row');
		var alertContainer=$('.email-alert');
		
		if(value==''){
			
			scrollWinToObject(row,750);
			row.addClass('error');
			alertContainer.html(userError.emailEmpty);
			
			var errorContext=userError.emailEmpty+"<br>برای مثال : <span class='en-input'>example@yahoo.com</span>";
			$.alertMessage('خطا',errorContext,0,'error');
			
			return false;
			
		}
		else if(!emailPattern.test(value)){
			
			scrollWinToObject(row,750);
			row.addClass('error');
			alertContainer.html(userError.emailError);
			
			var errorContext=userError.emailError+"<br>برای مثال : <span class='en-input'>example@yahoo.com</span>";
			$.alertMessage('خطا',errorContext,0,'error');
			
			return false;
			
		}
		else{
			
			row.removeClass('error');
			alertContainer.html('');
			
			return true;
			
		}
		
	}
	//final validate
	
	//functions
	function scrollWinTo(y,dur){
		
		$('body,html').stop().animate({
			
			scrollTop:y
			
		},dur);
		
	}
	
	function scrollWinToObject(selector,dur){
		
		var top=$(selector).offset().top;
		var winHeight=$(window).height();
		
		scrollWinTo(top-winHeight/2,dur);
		
	}
	
		//loading
	var loadingIsInView=false;
	appendLoadingShell();
	hideLoading(0);
	
	function showLoading(label,duration){
		
		$('.loading-shell .loading-label').html(label);
		
		$('.loading-shell').stop().fadeIn(duration);
		
		loadingIsInView=true;
		
	}
	function hideLoading(duration){
		
		$('.loading-shell').stop().fadeOut(duration);
		
		loadingIsInView=false;
		
	}
	
	function appendLoadingShell(){
		
		var loadingShell=$('.loading-shell');
		
		if(loadingShell.length)
			
			return;
		
		var loadingHTML="<div class='loading-shell'>";
		loadingHTML+="<div class='container'>";
		loadingHTML+="<div class='row-container'>";
		loadingHTML+="<div class='loading-animation'>";
		loadingHTML+="<div class='outer'></div>";
		loadingHTML+="<div class='inner'></div>";
		loadingHTML+="</div>";
		loadingHTML+="<p class='loading-label'></p>";
		loadingHTML+="</div>";
		loadingHTML+="</div>";
		loadingHTML+="</div>";
		
		$('body').prepend(loadingHTML);
		
	}
		//loading
	
	//functions
	
});

