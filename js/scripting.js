
function toTitleCase(str){
	return str.replace(/\w\S*/g,
		function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function apiCallback(data){
	console.log(data);
}

function apiCallbackf(data){
	console.log(data);
}

function apiCallback2(data){
	console.log(data);
	citystr = (data.city+","+data.country.code);
	loadWeather(citystr,data.city+","+data.country.name);
}

function apiCallback3(data){
	console.log(data);

}

function loadWeather(cityid, displaystr){
	console.log(displaystr);
	var timez;
	var apilink = "http://api.openweathermap.org/data/2.5/weather?q="+cityid+"&units=imperial&APPID=491381c437659f5df01527b006120863";
	$.ajax({
		url: apilink,
		jsonpCallback: 'apiCallback',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(json) {
			console.log("from success:"+json);

			//$("#current_temp").html(Math.round(json.main.temp)+"&#176;F");
			var wicon = "css/wicons/"+json.weather[0].icon+".png";
			$("#current_temp").html("<img style='vertical-align:middle' src='"+wicon+"' height=10% width=10%/>"+Math.round(json.main.temp)+"&#176;F");
			$("#current_summary").html(toTitleCase(json.weather[0].description));
			//write current time and location
			$.ajax( {
				url: "http://api.worldweatheronline.com/free/v2/tz.ashx?key=eb1bb5d8094581d2bed3c66e24f49&q="+cityid +"&format=json",
				//jsonpCallback: 'apiCallback2',
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(timez) {
					console.log(timez.data);
					var timearr= timez.data.time_zone[0].localtime.split(" ");
					$("#location").html(timearr[1]+" in "+displaystr);
					afterLocalTime(timearr[1]);
				},
				error: function (e){
					console.log(e);
				}
			});
			/*
			var now;
			var currentTime = new Date();
			var hours = currentTime.getHours()
			var minutes = currentTime.getMinutes()
			if (minutes < 10){
				minutes = "0" + minutes
			}
			now = (hours>12?hours-12:hours) + ":" + minutes + " ";
			if(hours > 11){
				now += "PM";
			} else {
				now+= "AM";
			}
			console.log(now);
			$("#location").html(now+" in "+json.name);
			*/
			var wcode = json.weather[0].icon;
			console.log(wcode);
			var weatherobj = {
				"01d" : {file:"Clear",time:"d",type:"png",fontcolor:""},
				"01n" : {file:"Clear",time:"n",type:"png"},
				"02d" : {file:"Cloudy",time:"d",type:"gif"},
				"02n" : {file:"Cloudy",time:"n",type:"gif"},
				"03d" : {file:"Cloudy",time:"d",type:"gif"},
				"03n" : {file:"Cloudy",time:"n",type:"gif"},
				"04d" : {file:"Cloudy",time:"d",type:"gif"},
				"04n" : {file:"Cloudy",time:"n",type:"gif"},
				"09d" : {file:"Rainy",time:"d",type:"gif"},
				"09n" : {file:"Rainy",time:"n",type:"gif"},
				"10d" : {file:"Rainy",time:"d",type:"gif"},
				"10n" : {file:"Rainy",time:"n",type:"gif"},
				"13d" : {file:"Snowy",time:"d",type:"gif"},
				"13n" : {file:"Snowy",time:"n",type:"gif"},
				"11d" : {file:"Stormy",time:"d",type:"gif"},
				"11n" : {file:"Stormy",time:"n",type:"gif"},
			};
			var co = weatherobj[wcode];
			console.log(co);
			var cfile = co.time+""+Math.ceil(Math.random() * 3)+"."+co.type;
			var imgurl = "css/backgrounds/"+co.file+"/"+cfile;
			console.log(imgurl);
			$('.content').css({'background-image': 'url('+imgurl+')', 'position': 'absolute', 'height': '100vh', 'width': '100vw'});
		},
		error: function (e) {
			console.log(e.message);
		}
	});

	function afterLocalTime(tm)
	{
			var apilink = "http://api.openweathermap.org/data/2.5/forecast?q="+cityid+"&units=imperial&APPID=491381c437659f5df01527b006120863";
			$.ajax({
				url: apilink,
				jsonpCallback: 'apiCallbackf',
				contentType: "application/json",
				dataType: 'jsonp',
				success: function(json) {
					console.log("from success:"+json);
					for (var ii=0;ii<5;ii++)
					{
						console.log(Date.now());
						console.log(json.list[ii].dt);
						var b = new Date(Date.now());
						console.log(b.getHours());

						var a = new Date(json.list[ii].dt * 1000);
						var date = a.getDate();
		  			var hour = a.getHours();
		  			var min = a.getMinutes();
						if (hour < 10)
							hour = "0"+hour;
						console.log(hour+":00");
						console.log(tm);
						var loc_hr = tm.split(":")[0];
						var wicon = "css/wicons/"+json.list[ii].weather[0].icon+".png";
						console.log(hour+" "+b.getHours()+" "+loc_hr);
						var localhour = (parseInt(hour)-b.getHours()+parseInt(loc_hr))%24;
						if (localhour < 10)
							localhour = "0"+localhour;

						console.log(localhour);
						$("#forecast"+(ii+1)).html(localhour+":00 &#160;&#160;&#160;&#160;&#160;&#160;&#160;<img style='vertical-align:middle' src='"+wicon+"' height=10% width=10%/>"+Math.round(json.list[ii].main.temp)+"&#176;F  "+toTitleCase(json.list[ii].weather[0].description));
						//$("#current_summary").html(toTitleCase(json.weather[0].description));
					}
		      console.log("list:"+json.list[0].weather[0].main);
				}
				//write current time and location
			});
		}


}

function getCurrentLocale(citystr,displaystr)
{
	console.log("getCurrentLocale city is", citystr);
	$.ajax( {
		url: "http://geoip.nekudo.com/api/",
		jsonpCallback: 'apiCallback2',
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(data) {
			console.log("success in getCurrentLocale ",data);
			citystr = (data.city+","+data.country.code);
			displaystr = data.city+","+data.country.name;
		},
		error: function (e){
			console.log(e);
		}
	});
}

function findCountryByCity(cityStr, displaystr)
{
	console.log("findCountryByCity city is", cityStr);
	var gurl = "https://maps.googleapis.com/maps/api/geocode/json?address="+cityStr+"&key=AIzaSyBbo7YEOKXV7XFQF3Q85yqYmMB9oKbfdn8";
	console.log(gurl);
	$.ajax( {
		url: gurl,
		type: 'GET',
		success: function(data) {
			console.log("success in findCountryByCity ",data);
			var regionArr = (data.results[0].address_components);
			var ii=regionArr.length-1;
			while(ii> -1)
			{
					console.log(ii+"----"+regionArr[ii].types[0]);
					if ("country" == regionArr[ii].types[0])
					{
							var country = regionArr[ii].short_name;
							var countrylong = regionArr[ii].long_name;
					}
					if ("locality" == regionArr[ii].types[0])
					{
							var city = regionArr[ii].long_name;
					}
					ii--;
			}
			cityStr = city+","+country;
			displaystr = city+","+countrylong;
			console.log(cityStr);
			console.log(displaystr);
			loadWeather(cityStr, displaystr);
		},
		error: function (e){
			console.log("error in findCountryByCity");
			console.log(e);
		}
	});

}

function loadCity(city)
{
	console.log(city);

	if (city == "Current Location"){
		var citystr= "New York,US";
		getCurrentLocale(citystr,displaystr);//citystr passed as ref
		console.log(citystr);
		loadWeather(citystr,displaystr);
	}
	else{
		loadWeather(city+",US", city+",United States");
	}
}

$(document).ready(function(){
	getCurrentLocale(); //to get current city
	$("a.city").bind("click", function(){
		loadCity($(this).html());
	});


	$('#search-1').on('change',function (event) {
		var city = $(this).val();
		var displaystr=  "";
		findCountryByCity(city,displaystr);//ref var
		//loadWeather(city,displaystr);
	});
});
