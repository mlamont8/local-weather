var temperature, jurl;
$(document).ready(function(){
    
   coord();
    console.log(temperature, jurl);
    $('#toggle').click(function(){
        var txt = $('.temp').html();
    console.log(txt);
    });
   
   
});
// get longitude and latitude
function coord(){
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
   
var long = position.coords.longitude;
var lat = position.coords.latitude;

        // when that is found, send to get city and state info
        geo(lat, long);
        //get weather data
        jurl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=7ee19f0b66ef0860bc64994d445c9f81&units=imperial";
    
      
      getWeather(jurl);
    });
  } else {
    // Browser doesn't support Geolocation
    alert("Browser does not support Geolocation");
  }
}
      // use reverse geocoding to get city and state names.
function geo(lat, long){
      var reverseURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long;
    $.ajax({
        url: reverseURL,
        type: 'POST',
        dataType: 'json',
        success: function (data){
            var city = data.results[0].address_components[2].long_name;
            var state = data.results[0].address_components[5].short_name;
            var citstate = city + ", " + state;
    $('.loc').html(citstate);
        }
    });

}
   
// pulls all the current weather data from openweathermap.org

function getWeather(url) {
  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'jsonp',
    success: function(data) {
      var icon_image = "http://openweathermap.org/img/w/" + data.weather[0].icon + '.png';
      $('.weat').append("<img src='" + icon_image + "'>" + data.weather[0].main);
      var weat = data.weather[0].main;
      weatherBackground(weat);
       temperature = data.main.temp;
       //tempToggle(temperature); 
        var tem = temperature.toString();
        console.log(tem);
        $('.temp').append((Math.round(tem)), " \u00B0 F");
        //$('.windSpeed').append(data.wind.speed);
      var wspeed = Math.round(data.wind.speed);
        $('.windSpeed').append((Math.round(wspeed)));
      $('.windDir').append(data.wind.deg);
      var wdir = data.wind.deg;

      var letter = wspeed + 'mph ' + wind(wdir);
      $('.letter').append(letter);
      

    }
  });
   
    function tempToggle(temp){
        var fTemp = temp;
        var cTemp = (temp - 32) / 1.8;
        var showTemp = temp;
    //    $('.temp').append(showTemp, "F   <button type='button' class='btn btn-default' id='toggle'>F/C Toggle</button>");
        console.log(showTemp, fTemp);
       
            if (showTemp === fTemp){
               console.log('true');
                $('.temp').empty();
                $('.temp').append(cTemp, "C");
            }else{
                console.log('false');
               $('.temp').empty();
                $('.temp').append(fTemp, "F"); 
            }
        }
        
    
  // pulls background images
  function weatherBackground(weat) {

      switch (weat.toUpperCase()) {
        case 'CLEAR':
          $('body').css('background-image', 'url(http://i.imgur.com/5pSZvhW.jpg)');
          break;
        case 'CLOUDS':
          $('body').css('background-image', 'url(http://i.imgur.com/ht7HI2F.jpg)');
          break;
        case 'RAIN':
          $('body').css('background-image', 'url(http://i.imgur.com/zYqi2oN.jpg)');
          break;

        case 'SNOW':
          $('body').css('background-image', 'url(http://i.imgur.com/HCPIQ02.jpg)');
          break;
        default:
          $('body').css('background-image', 'none');

      }
    }
    // Changes wind direction from degrees to S, W, E or N

  Number.prototype.between = function(first, last) {
    return (first < last ? this >= first && this <= last : this >= last && this <= first);
  };

  function wind(wdir) {

    if (wdir.between(348.75, 360)) {
      return "N";
    } else if (wdir.between(0.0, 11.25)) {
      return "N";
    } else if (wdir.between(11.26, 78.75)) {
      return "NE";
    } else if (wdir.between(78.76, 101.25)) {
      return "E";
    } else if (wdir.between(101.26, 168.75)) {
      return "SE";
    } else if (wdir.between(168.76, 191.25)) {
      return "S";
    } else if (wdir.between(191.26, 258.75)) {
      return "E";
    } else if (wdir.between(258.76, 281.25)) {
      return "SE";
    } else if (wdir.between(281.26, 348.74)) {
      return "S";
    }
  }

}
//});