var weatherObj = {};

$(document).ready(function() {
  var long = 0;
  var lat = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      var url = 'https://api.darksky.net/forecast/48429d15c51d64e8e6c03a84bec4e5b8/' + lat + ',' + long;

      $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(response) {
          console.log('ajax response: ', response);
          $('.location').html(response.timezone);
          $('.current-summary').html(response.currently.summary);
          $('.humidity').html('Humidity: ' + ((Math.round(response.currently.humidity)) * 10) + '%');
          $('.windspeed').html('WindSpeed: ' + (response.currently.windSpeed) + ' mph');
          $('.temp').html('Temperature: ' + Math.round(response.currently.temperature) + ' °F');


          if (response.currently.icon === "clear-day") {
            $('.icon').html('<img src="https://png.icons8.com/clouds/Dusk_Wired/64">');//
            $('body').css('background-image', "url(http://crevisio.com/images/posts/96/yjf9TgZEw/Crevisio-96-yjf9TgZEw.jpg)");
          } else if (response.currently.icon === "clear-night") {
            $('.icon').html('<img src="https://image.flaticon.com/icons/svg/17/17279.svg">');
            $('body').css('background-image', "url(http://clear-night.com/img/clear-night-placeholder.jpg)");
            $('body').css('color', "white");
          } else if (response.currently.icon === "rain") {
            $('.icon').html('<img src="https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/cloud_rain.png">');//
            $('body').css('background-image', "url(https://static.pexels.com/photos/8486/water-rain-raindrops-drops.jpg)");
            $('body').css('color', "white");
          } else if (response.currently.icon === "snow") {
            $('.icon').html('<img src="https://cdn2.iconfinder.com/data/icons/lil-weather/161/snowflake-512.png">');
            $('body').css('background-image', "url(https://vignette4.wikia.nocookie.net/phobia/images/a/aa/Snow.jpg/revision/latest?cb=20161109045734)");
          } else if (response.currently.icon === "sleet") {
            $('.icon').html('<img src="http://icons.iconarchive.com/icons/icons8/android/256/Weather-Sleet-icon.png">');
            $('body').css('background-image', "url(http://www.abccolumbia.com/wp-content/uploads/2016/01/Image4.jpg)");
          } else if (response.currently.icon === "wind") {
            $('.icon').html('<img src="https://cdn1.iconfinder.com/data/icons/weather-18/512/wind_storm-512.png">');
            $('body').css('background-image', "url(https://media.mnn.com/assets/images/2016/05/01-windydog-carloscherer.jpg.838x0_q80.jpg)");
          } else if (response.currently.icon === "fog") {
            $('.icon').html('<img src="https://cdn4.iconfinder.com/data/icons/heavy-weather/100/Weather_Icons_09_fog-512.png">');
            $('body').css('background-image', "url(https://www.howitworksdaily.com/wp-content/uploads/2014/08/fog-06.jpg)");
          } else if (response.currently.icon === "cloudy") {
            $('.icon').html('<img src="http://www.endlessicons.com/wp-content/uploads/2012/12/cloudy-icon-614x460.png">');
            $('body').css('background-image', "url(http://www.quotemaster.org/images/d9/d982a47690bc30527138826a3b13206e.jpg)");
          } else if (response.currently.icon === "partly-cloudy-day") {
            $('.icon').html('<img src="http://www.endlessicons.com/wp-content/uploads/2012/12/mostly-cloudy-icon-614x460.png">');
            $('body').css('background-image', "url(https://ak9.picdn.net/shutterstock/videos/9503747/thumb/1.jpg)");
          } else if (response.currently.icon === "partly-cloudy-night") {
            $('.icon').html('<img src="http://icons.veryicon.com/ico/System/Icons8%20Metro%20Style/Weather%20Partly%20cloudy%20night.ico">');
            $('body').css('background-image', "url(http://cdn.weatheravenue.com/img/background/background-night.jpg)");
            $('body').css('color', "white");
          }
        } // end success
      }); // end ajax
    }); // end get current position
  } // end geolocation
}); // end document ready function
