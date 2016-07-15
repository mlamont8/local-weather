
$(document).ready(function(){
    
  // find the users location
    whereAreU();
    
    // when toggle button is used
     $('#toggle').click(function(){
        //pull value
        var txt = $('.temp').html();
                //strip non alphanumeric values
        var deg = txt.replace(/[^A-Z]/g, '');
        
        // strip non numeric values
        txt = txt.replace(/\D/g,'');

       tempToggle(txt, deg);
  
    });
});

// Uses api to find users location
function whereAreU(){
       $.ajax({
      url: "http://ip-api.com/json",
      dataType: 'json',
      success: function(data){
          var ipInfo = {'lat': data.lat, 'lon': data.lon};
          
//Gives city/state to DOM
$('.loc').html(data.city + ", "+ data.region);
// Calls next function to pull weather info          
 weath(ipInfo);
       },
     });
 } 

//Uses openweathermap api to pull weather info using longitude and latitude held in ipInfo variable

function weath(ipInfo){

    $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + ipInfo.lat + "&lon=" + ipInfo.lon + "&APPID=7ee19f0b66ef0860bc64994d445c9f81&units=imperial",
    type: 'POST',
    dataType: 'jsonp',
    success: function(data) {
        // Icon
      var icon_image = "http://openweathermap.org/img/w/" + data.weather[0].icon + '.png';
      $('.weat').append("<img src='" + icon_image + "'>" + data.weather[0].main);
        // Weather Type
      var weat = data.weather[0].main;
     // Send to function to select correct background
      weatherBackground(weat);
        //Temperature
        var tem = (data.main.temp).toString();

        $('.temp').append((Math.round(tem)), " \u00B0 F");
        
      var wspeed = Math.round(data.wind.speed);
      var wdir = data.wind.deg;
      var letter = 'WindSpeed:  ' + wspeed + 'mph ';
      $('.letter').append(letter + wind(wdir));
      

    }
    });
    }

// function to toggle between F and C
function tempToggle(temp, degrees){
        var newTemp;
        var fTemp = temp;
        var cTemp = (temp - 32) / 1.8;
        var showTemp = temp;
  
       
            if (degrees == "F"){
  
                newTemp = (temp - 32) / 1.8;
                $('.temp').empty();
                $('.temp').append((Math.round(newTemp)), " \u00B0 C");
            }else{

                newTemp = (temp * 1.8) + 32;
               $('.temp').empty();
                $('.temp').append((Math.round(newTemp)), " \u00B0 F"); 
            }
        } 

  // pulls background images
  function weatherBackground(weat) {

      switch (weat.toUpperCase()) {
        case 'CLEAR':
          $('body').css('background-image', 'url(http://dishofsoul.com/extfiles/5pSZvhW.jpg)');
          break;
        case 'CLOUDS':
          $('body').css('background-image', 'url(http://dishofsoul.com/extfiles/cloudy.jpg)');
          break;
        case 'RAIN':
          $('body').css('background-image', 'url(http://dishofsoul.com/extfiles/zYqi2oN.jpg)');
          break;

        case 'SNOW':
          $('body').css('background-image', 'url(http://dishofsoul.com/extfiles/HCPIQ02.jpg)');
          break;
              
        case 'MIST':
          $('body').css('background-image', 'url(http://dishofsoul.com/extfiles/mist.jpg)');
          break;
              
        default:
          $('body').css('background-image', 'url(http://dishofsoul.com/extfiles/5pSZvhW.jpg)');

      }
    }

  function wind(wdir) {
      //create a new number method called 'between' to handle ranges
        Number.prototype.between = function(first, last) {
    return (first < last ? this >= first && this <= last : this >= last && this <= first);
  };


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
