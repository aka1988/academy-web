$(document).ready(function(e) {
	
	var text=$('.text');
	
	$('.submit-comment-form').click(function(e) {
        
		$('.comment-form').submit();
		
    });
	
	$('.reset-comment-form').click(function(e) {
        
		$('.reset-form').click();
		
		$('.comment-form .error-container').html('');
		
    });
	
	var userCommentError={
		
		nameEmpty:'لطفا نام خود را وارد کنید',
		nameError:'لطفا نام خود را به صورت صحیح وارد کنید',
		emailEmpty:'لطفا ایمیل خود را وارد کنید',
		emailError:'لطفا ایمیل خود را به صورت صحیح وارد کنید',
		commentEmpty:'لطفا نظر خود را وارد کنید'
		
	}
	
	var emailPattern=/([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var namePattern=/([A-Za-zا-ی])/;
	
	$('.comment-form').submit(function(e) {
		
		var nameInput=$(this).find('input.name');
		var emailInput=$(this).find('input.email');
		var commentInput=$(this).find('textarea.comment');
		
		var nameCell=$(this).find('.td.name');
		var emailCell=$(this).find('.td.email');
		var commentCell=$(this).find('.td.comment');
		
		var errorClass='.error-container';
		
		var errorElement=$(this).find(errorClass);
		
		var name=nameInput.val();
		var email=emailInput.val();
		var comment=commentInput.val();
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
		if(!comment){
			
			commentCell.find(errorClass).html(userCommentError.commentEmpty);
			allowSubmit=false;
			
		}
		
		if(!allowSubmit)
			
			return false;
		
    });
	
});

