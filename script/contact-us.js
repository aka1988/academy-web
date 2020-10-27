$(document).ready(function(e) {
	
	var text=$('.text');
	
	$('.submit-contact-form').click(function(e) {
        
		$('.contact-form').submit();
		
    });
	
	$('.reset-contact-form').click(function(e) {
        
		$('.reset-form').click();
		
		$('.contact-form .error-container').html('');
		
    });
	
	var userCommentError={
		
		nameEmpty:'لطفا نام خود را وارد کنید',
		nameError:'لطفا نام خود را به صورت صحیح وارد کنید',
		emailEmpty:'لطفا ایمیل خود را وارد کنید',
		emailError:'لطفا ایمیل خود را به صورت صحیح وارد کنید',
		commentEmpty:'لطفا نظر خود را وارد کنید',
		mobileEmpty:'لطفا شماره تلفن همراه خود را وارد کنید',
		mobileError:'لطفا شماره تلفن همراه خود را به صورت صحیح وارد کنید',
		postEmpty:'لطفا متن پیغام خود را وارد کنید',
		postError:'حداقل حروف ورودی 10 حرف می باشد'
		
	}
	
	var emailPattern=/([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var mobilePattern=/([0-9]{11})$/;
	var namePattern=/([A-Za-zا-ی])/;
	
	$('.contact-form').submit(function(e) {
		
		var nameInput=$(this).find('input.name');
		var emailInput=$(this).find('input.email');
		var mobileInput=$(this).find('input.mobile');
		var postInput=$(this).find('textarea.post');
		
		var nameCell=$(this).find('.td.name');
		var emailCell=$(this).find('.td.email');
		var mobileCell=$(this).find('.td.mobile');
		var postCell=$(this).find('.td.post');
		
		var errorClass='.error-container';
		
		var errorElement=$(this).find(errorClass);
		
		var name=nameInput.val();
		var email=emailInput.val();
		var mobile=mobileInput.val();
		var post=postInput.val();
		
		var allowSubmit=true;
		
		errorElement.html('');
		
		if(!namePattern.test(name)){
			
			nameCell.find(errorClass).html(userCommentError.nameError);
			allowSubmit=false;
			
		}
		if(!name){
			
			nameCell.find(errorClass).html(userCommentError.nameEmpty);
			allowSubmit=false;
			
		}
		if(!emailPattern.test(email)){
			
			emailCell.find(errorClass).html(userCommentError.emailError);
			allowSubmit=false;
			
		}
		if(!email){
			
			emailCell.find(errorClass).html(userCommentError.emailEmpty);
			allowSubmit=false;
			
		}
		if(!mobilePattern.test(mobile) || mobile.length>11){
			
			mobileCell.find(errorClass).html(userCommentError.mobileError);
			allowSubmit=false;
			
		}
		if(!mobile){
			
			mobileCell.find(errorClass).html(userCommentError.mobileEmpty);
			allowSubmit=false;
			
		}
		if(post.length<10){
			
			postCell.find(errorClass).html(userCommentError.postError);
			allowSubmit=false;
			
		}
		if(!post){
			
			postCell.find(errorClass).html(userCommentError.postEmpty);
			allowSubmit=false;
			
		}
		
		if(!allowSubmit)
			
			return false;
		
    });
	
});

