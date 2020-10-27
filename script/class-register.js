$(document).ready(function(e) {
	
	var text=$('.text');
	
	$('.submit-register-form').click(function(e) {
        
		$('.register-form').submit();
		
    });
	
	$('.reset-register-form').click(function(e) {
        
		$('.reset-form').click();
		
		$('.register-form .error-container').html('');
		
    });
	
	var userCommentError={
		
		nameEmpty:'لطفا نام خود را وارد کنید',
		lastNameError:'لطفا نام خانوادگی خود را به صورت صحیح وارد کنید',		
		lastNameEmpty:'لطفا نام خانوادگی خود را وارد کنید',
		nameError:'لطفا نام خود را به صورت صحیح وارد کنید',
		emailEmpty:'لطفا ایمیل خود را وارد کنید',
		emailError:'لطفا ایمیل خود را به صورت صحیح وارد کنید',
		sexEmpty:'لطفا جنسیت خود را تعیین کنید',
		mobileEmpty:'لطفا شماره تلفن همراه خود را وارد کنید',
		mobileError:'لطفا شماره تلفن همراه خود را به صورت صحیح وارد کنید'
		
	}
	
	var emailPattern=/([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var mobilePattern=/([0-9]{11})$/;
	var namePattern=/([A-Za-zا-ی])/;
	
	$('.register-form').submit(function(e) {
		
		var nameInput=$(this).find('input.name');
		var lastNameInput=$(this).find('input.last-name');
		var emailInput=$(this).find('input.email');
		var mobileInput=$(this).find('input.mobile');
		
		var nameCell=$(this).find('.td.name');
		var lastNameCell=$(this).find('.td.last-name');
		var emailCell=$(this).find('.td.email');
		var mobileCell=$(this).find('.td.mobile');
		
		var errorClass='.error-container';
		
		var errorElement=$(this).find(errorClass);
		
		var name=nameInput.val();
		var lastName=lastNameInput.val();
		var email=emailInput.val();
		var mobile=mobileInput.val();
		
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
		if(!namePattern.test(lastName)){
			
			lastNameCell.find(errorClass).html(userCommentError.lastNameError);
			allowSubmit=false;
			
		}
		if(!lastName){
			
			lastNameCell.find(errorClass).html(userCommentError.lastNameEmpty);
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
		
		if(!allowSubmit)
			
			return false;
		
    });
	
});

