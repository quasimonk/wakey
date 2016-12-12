
$(document).ready(function(){
	console.log("registering stuff here");
	
	 // Setup form validation on the #register-form element
    $("#register-form").validate({
    
        // Specify the validation rules
        rules: {
            username: {
				required: true,
				minlength: 1,
				remote: {
					url: "register.php",
					type: "post",
					data: {
						email: function() {
							return $("[name='username']").val();
						}
					}
				}
			},
            email: {
                required: true,
                email: true
            },
            pwd: {
                required: true,
                minlength: 8
            },
            
        },
        
        // Specify the validation error messages
        messages: {
            username: {
				required: "Username is required",
				minlength: "Username must be atleast 1 characters",
				remote: "Username already exists"
			},
            pwd: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters"
            },
            email: {
				required: "Please enter a valid email address"
			}
			
        },
        
        submitHandler: function(form) {
            form.submit();
        }
    });
});

