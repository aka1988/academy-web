$(document).ready(function(e) {
    
	//$('body').append("<div class='text' style='width:400px; height:200px; direction:ltr !important; text-align:left !important; position:fixed; right:0; top:50%; opacity:1; margin-top:-100px; text-align:left; color:#fff; background-color:#000;z-index:10000000000000000000000 !important;'></div>");
	
	var text=$('.text');
	
	//$.alertMessage('Title','Context',0,'info || success || error');
	
	//site oprions
		//.mandatory inputs
	$('.tree-li input.mandatory').each(function(index, element) {
        
		var li=$(this).parents('.tree-li:first');
		
		setMandatoryParentOf(li);
		
    });
	
	function setMandatoryParentOf(li){
		
		var parentLi=li.parents('.tree-li:first');
		
		parentLi.children('.tree-label').children('input').addClass('mandatory');
		
		bigParentLi=parentLi.parents('.tree-li:first');
		
		if(bigParentLi.is('.tree-li'))
			
			setMandatoryParentOf(parentLi);
		
	}
	
	
	$('.tree-ul').each(function(index, element) {
        
		var treeLis=$(this).children('.tree-li');
		
		if(treeLis.length==1)
			
			$(this).addClass('one-child');
		
    });
	
	$('.tree-li').each(function(index, element) {
        
		var tclUl=$(this).children('.tree-ul');
		
		if(tclUl.length)
			
			$(this).addClass('parent');
		
    });
	
	$('.tree-li.parent').each(function(index, element) {
		
		if($(this).hasClass('first-open')){
			
			$(this).addClass('close');
			
			return;
			
		}else{

			$(this).removeClass('close');
		}
        
		$(this).children('.tree-ul').slideUp(0);
		
    });
	
	$('.tree-li.parent>.tree-expand').click(function(index, element) {
        
		var treeLi=$(this).parents('.tree-li.parent:first');
		
		if(treeLi.hasClass('open')){
			
			treeLi.removeClass('open').addClass('close');
			
			treeLi.children('.tree-ul').slideDown(200);
			
		}
		else{
			
			treeLi.removeClass('close').addClass('open');
			
			treeLi.children('.tree-ul').slideUp(200);
			
		}
		
    });
	
	$('.tree-ul>.tree-li:last-child').addClass('last-child');
	
	//site oprions

	
});