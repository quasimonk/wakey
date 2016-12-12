$(document).ready(function(){
	
	$('#filter').on('click',function () {
	
	var name = $("#username").val();
	alert(name);
	var ajaxRequest = $.ajax(
		{
			url: "name.php",
			type: "post",
			data: ""
		}
	);
	
	
	ajaxRequest.done(function (response, textStatus, jqXHR){
          // show successfully for submit message
          alert("gdfg");
     });

     /* On failure of request this function will be called  */
     ajaxRequest.fail(function (){

       // show error
       alert("kjkjk");
     });
});

});


