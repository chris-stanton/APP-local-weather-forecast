
$(document).ready(function() {
  console.log("client.js running...");

    // setting default values on init
    var long = 0;
    var lat = 0;

    // hiding all elements and showing loader
    $(".container").hide();
    $(".data-outlook").hide();
    $(".loader-container").show();
    $("body").css('background-image','url(../public/assets/images/backgrounds/loader.png)');

    // checking for geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // geolocation response
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log('lat:', lat, 'long:', long);

      // API url query key to get lat long details from google
      var google =  "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDp0HzZ2Mydb4qQsMKpMgkIQPxN3x5-gdE";
      // https request to google for location details
      $.ajax({
        type: "GET",
        url: google,
        dataType: "json",
        success: function(response) {
            console.log('Google API response: ', response);
              $('.city').html(response.results[0].address_components[2].long_name);
              $('.county').html(response.results[0].address_components[3].long_name);
              $('.state').html(response.results[0].address_components[4].long_name + ' ,');
              $('.zipcode').html(response.results[0].address_components[6].long_name);
          } // end of success
      }); // end of ajax

      // API url query key for current weather details based off of lat and long
      var url = 'https://api.darksky.net/forecast/48429d15c51d64e8e6c03a84bec4e5b8/' + lat + ',' + long;
      // https request to Dark Sky for location weather details
      $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(response) {
            console.log('Dark Sky API response: ', response);

            // hiding loader and showing date
            $(".loader-container").hide();
            $(".container").show();
            $(".data-outlook").show();
            // placing data on DOM
            $('.location').html(response.timezone);
            $('.currenttime').html(new Date(response.currently.time*1000).toDateString());
            $('.current-summary').html(response.currently.summary);
            $('.humidity').html('Humidity: ' + ((Math.round(response.currently.humidity)) * 10) + '%');
            $('.windspeed').html('WindSpeed: ' + (response.currently.windSpeed) + ' mph');
            $('.temp').html('Temperature: ' + Math.round(response.currently.temperature) + ' °F');

            // setting weather icons and background images to current weather conditions
            if (response.currently.icon === "clear-day") {
              $('.icon').html('<img src="../public/assets/images/icons/clear-day.png">');//
              $('body').css('background-image', "url(http://crevisio.com/images/posts/96/yjf9TgZEw/Crevisio-96-yjf9TgZEw.jpg)");
            } else if (response.currently.icon === "clear-night") {
              $('.icon').html('<img src="../public/assets/images/icons/clear-night.png">');
              $('body').css('background-image', "url(http://clear-night.com/img/clear-night-placeholder.jpg)");
              $('body').css('color', "white");
            } else if (response.currently.icon === "rain") {
              $('.icon').html('<img src="../public/assets/images/icons/rain.png">');//
              $('body').css('background-image', "url(https://static.pexels.com/photos/8486/water-rain-raindrops-drops.jpg)");
              $('body').css('color', "white");
            } else if (response.currently.icon === "snow") {
              $('.icon').html('<img src="../public/assets/images/icons/snow.png">');
              $('body').css('background-image', "url(https://vignette4.wikia.nocookie.net/phobia/images/a/aa/Snow.jpg/revision/latest?cb=20161109045734)");
            } else if (response.currently.icon === "sleet") {
              $('.icon').html('<img src="../public/assets/images/icons/sleet.png">');
              $('body').css('background-image', "url(http://www.abccolumbia.com/wp-content/uploads/2016/01/Image4.jpg)");
            } else if (response.currently.icon === "wind") {
              $('.icon').html('<img src="../public/assets/images/icons/wind.png">');
              $('body').css('background-image', "url(https://media.mnn.com/assets/images/2016/05/01-windydog-carloscherer.jpg.838x0_q80.jpg)");
            } else if (response.currently.icon === "fog") {
              $('.icon').html('<img src="../public/assets/images/icons/fog.png">');
              $('body').css('background-image', "url(https://www.howitworksdaily.com/wp-content/uploads/2014/08/fog-06.jpg)");
            } else if (response.currently.icon === "cloudy") {
              $('.icon').html('<img src="../public/assets/images/icons/cloudy.png">');
              $('body').css('background-image', "url(http://www.quotemaster.org/images/d9/d982a47690bc30527138826a3b13206e.jpg)");
            } else if (response.currently.icon === "partly-cloudy-day") {
              $('.icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png">');
              $('body').css('background-image', "url(https://ak9.picdn.net/shutterstock/videos/9503747/thumb/1.jpg)");
            } else if (response.currently.icon === "partly-cloudy-night") {
              $('.icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png">');
              $('body').css('background-image', "url(http://cdn.weatheravenue.com/img/background/background-night.jpg)");
              $('body').css('color', "white");
            } else {
              console.log('response.currently.icon fail');
            };

            // setting default font color to white on init
            $('.data-outlook').css('color', "white");

            // outlook details[0]
            $('.outlook-0-date').html(new Date(response.daily.data[0].time*1000).toDateString());
            $('.outlook-0-summary').html('Summary: ' + response.daily.data[0].summary);
            $('.outlook-0-temphigh').html('High: ' + response.daily.data[0].temperatureMax  + ' °F');
            $('.outlook-0-templow').html('Low: ' + response.daily.data[0].temperatureMin  + ' °F');
            $('.outlook-0-windspeed').html('Wind Speed: ' + response.daily.data[0].windSpeed  + ' mph');
            $('.outlook-0-sunrise').html('Sun Rise: ' + new Date(response.daily.data[0].sunriseTime*1000).toTimeString());
            $('.outlook-0-sunset').html('Sun Set: ' + new Date(response.daily.data[0].sunsetTime*1000).toTimeString());
              if (response.daily.data[0].icon === "clear-day") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/clear-day.png" class="outlook-icon">');
              } else if (response.daily.data[0].icon === "clear-night") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/clear-night.png" class="outlook-icon">');
              } else if (response.daily.data[0].icon === "rain") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/rain.png" class="outlook-icon">');//
              } else if (response.daily.data[0].icon === "snow") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/snow.png" class="outlook-icon">');
              } else if (response.daily.data[0].icon === "sleet") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/sleet.png" class="outlook-icon">');
              } else if (response.daily.data[0].icon === "wind") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/wind.png" class="outlook-icon">');
              } else if (response.daily.data[0].icon === "fog") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/fog.png" class="outlook-icon">');
              } else if (response.daily.data[0].icon === "cloudy") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/cloudy.png" class="outlook-icon">');
              } else if (response.daily.data[0].icon === "partly-cloudy-day") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png" class="outlook-icon">');
              } else if (response.daily.data[0].icon === "partly-cloudy-night") {
                $('.outlook-0-icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png" class="outlook-icon">');
              } else {
                console.log('response.daily.data[0].icon failed');
              };

            // outlook details[1]
            $('.outlook-1-date').html(new Date(response.daily.data[1].time*1000).toDateString());
            $('.outlook-1-summary').html('Summary: ' + response.daily.data[1].summary);
            $('.outlook-1-temphigh').html('High: ' + response.daily.data[1].temperatureMax  + ' °F');
            $('.outlook-1-templow').html('Low: ' + response.daily.data[1].temperatureMin  + ' °F');
            $('.outlook-1-windspeed').html('Wind Speed: ' + response.daily.data[1].windSpeed  + ' mph');
            $('.outlook-1-sunrise').html('Sun Rise: ' + new Date(response.daily.data[1].sunriseTime*1000).toTimeString());
            $('.outlook-1-sunset').html('Sun Set: ' + new Date(response.daily.data[1].sunsetTime*1000).toTimeString());
              if (response.daily.data[1].icon === "clear-day") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/clear-day.png" class="outlook-icon">');
              } else if (response.daily.data[1].icon === "clear-night") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/clear-night.png" class="outlook-icon">');
              } else if (response.daily.data[1].icon === "rain") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/rain.png" class="outlook-icon">');//
              } else if (response.daily.data[1].icon === "snow") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/snow.png" class="outlook-icon">');
              } else if (response.daily.data[1].icon === "sleet") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/sleet.png" class="outlook-icon">');
              } else if (response.daily.data[1].icon === "wind") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/wind.png" class="outlook-icon">');
              } else if (response.daily.data[1].icon === "fog") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/fog.png" class="outlook-icon">');
              } else if (response.daily.data[1].icon === "cloudy") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/cloudy.png" class="outlook-icon">');
              } else if (response.daily.data[1].icon === "partly-cloudy-day") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png" class="outlook-icon">');
              } else if (response.daily.data[1].icon === "partly-cloudy-night") {
                $('.outlook-1-icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png" class="outlook-icon">');
              } else {
                console.log('response.daily.data[1].icon failed');
              };

            // outlook details[2]
            $('.outlook-2-date').html(new Date(response.daily.data[2].time*1000).toDateString());
            $('.outlook-2-summary').html('Summary: ' + response.daily.data[2].summary);
            $('.outlook-2-temphigh').html('High: ' + response.daily.data[2].temperatureMax  + ' °F');
            $('.outlook-2-templow').html('Low: ' + response.daily.data[2].temperatureMin  + ' °F');
            $('.outlook-2-windspeed').html('Wind Speed: ' + response.daily.data[2].windSpeed  + ' mph');
            $('.outlook-2-sunrise').html('Sun Rise: ' + new Date(response.daily.data[2].sunriseTime*1000).toTimeString());
            $('.outlook-2-sunset').html('Sun Set: ' + new Date(response.daily.data[2].sunsetTime*1000).toTimeString());
              if (response.daily.data[2].icon === "clear-day") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/clear-day.png" class="outlook-icon">');
              } else if (response.daily.data[2].icon === "clear-night") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/clear-night.png" class="outlook-icon">');
              } else if (response.daily.data[2].icon === "rain") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/rain.png" class="outlook-icon">');//
              } else if (response.daily.data[2].icon === "snow") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/snow.png" class="outlook-icon">');
              } else if (response.daily.data[2].icon === "sleet") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/sleet.png" class="outlook-icon">');
              } else if (response.daily.data[2].icon === "wind") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/wind.png" class="outlook-icon">');
              } else if (response.daily.data[2].icon === "fog") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/fog.png" class="outlook-icon">');
              } else if (response.daily.data[2].icon === "cloudy") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/cloudy.png" class="outlook-icon">');
              } else if (response.daily.data[2].icon === "partly-cloudy-day") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png" class="outlook-icon">');
              } else if (response.daily.data[2].icon === "partly-cloudy-night") {
                $('.outlook-2-icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png" class="outlook-icon">');
              } else {
                console.log('response.daily.data[2].icon failed');
              };

            // outlook details[3]
            $('.outlook-3-date').html(new Date(response.daily.data[3].time*1000).toDateString());
            $('.outlook-3-summary').html('Summary: ' + response.daily.data[3].summary);
            $('.outlook-3-temphigh').html('High: ' + response.daily.data[3].temperatureMax  + ' °F');
            $('.outlook-3-templow').html('Low: ' + response.daily.data[3].temperatureMin  + ' °F');
            $('.outlook-3-windspeed').html('Wind Speed: ' + response.daily.data[3].windSpeed  + ' mph');
            $('.outlook-3-sunrise').html('Sun Rise: ' + new Date(response.daily.data[3].sunriseTime*1000).toTimeString());
            $('.outlook-3-sunset').html('Sun Set: ' + new Date(response.daily.data[3].sunsetTime*1000).toTimeString());
              if (response.daily.data[3].icon === "clear-day") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/clear-day.png" class="outlook-icon">');
              } else if (response.daily.data[3].icon === "clear-night") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/clear-night.png" class="outlook-icon">');
              } else if (response.daily.data[3].icon === "rain") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/rain.png" class="outlook-icon">');//
              } else if (response.daily.data[3].icon === "snow") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/snow.png" class="outlook-icon">');
              } else if (response.daily.data[3].icon === "sleet") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/sleet.png" class="outlook-icon">');
              } else if (response.daily.data[3].icon === "wind") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/wind.png" class="outlook-icon">');
              } else if (response.daily.data[3].icon === "fog") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/fog.png" class="outlook-icon">');
              } else if (response.daily.data[3].icon === "cloudy") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/cloudy.png" class="outlook-icon">');
              } else if (response.daily.data[3].icon === "partly-cloudy-day") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png" class="outlook-icon">');
              } else if (response.daily.data[3].icon === "partly-cloudy-night") {
                $('.outlook-3-icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png" class="outlook-icon">');
              } else {
                console.log('response.daily.data[3].icon failed');
              };

            // outlook details[4]
            $('.outlook-4-date').html(new Date(response.daily.data[4].time*1000).toDateString());
            $('.outlook-4-summary').html('Summary: ' + response.daily.data[4].summary);
            $('.outlook-4-temphigh').html('High: ' + response.daily.data[4].temperatureMax  + ' °F');
            $('.outlook-4-templow').html('Low: ' + response.daily.data[4].temperatureMin  + ' °F');
            $('.outlook-4-windspeed').html('Wind Speed: ' + response.daily.data[4].windSpeed  + ' mph');
            $('.outlook-4-sunrise').html('Sun Rise: ' + new Date(response.daily.data[4].sunriseTime*1000).toTimeString());
            $('.outlook-4-sunset').html('Sun Set: ' + new Date(response.daily.data[4].sunsetTime*1000).toTimeString());
              if (response.daily.data[4].icon === "clear-day") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/clear-day.png" class="outlook-icon">');
              } else if (response.daily.data[4].icon === "clear-night") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/clear-night.png" class="outlook-icon">');
              } else if (response.daily.data[4].icon === "rain") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/rain.png" class="outlook-icon">');//
              } else if (response.daily.data[4].icon === "snow") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/snow.png" class="outlook-icon">');
              } else if (response.daily.data[4].icon === "sleet") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/sleet.png" class="outlook-icon">');
              } else if (response.daily.data[4].icon === "wind") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/wind.png" class="outlook-icon">');
              } else if (response.daily.data[4].icon === "fog") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/fog.png" class="outlook-icon">');
              } else if (response.daily.data[4].icon === "cloudy") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/cloudy.png" class="outlook-icon">');
              } else if (response.daily.data[4].icon === "partly-cloudy-day") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png" class="outlook-icon">');
              } else if (response.daily.data[4].icon === "partly-cloudy-night") {
                $('.outlook-4-icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png" class="outlook-icon">');
              } else {
                console.log('response.daily.data[4].icon failed');
              };

            // outlook details[5]
            $('.outlook-5-date').html(new Date(response.daily.data[5].time*1000).toDateString());
            $('.outlook-5-summary').html('Summary: ' + response.daily.data[5].summary);
            $('.outlook-5-temphigh').html('High: ' + response.daily.data[5].temperatureMax  + ' °F');
            $('.outlook-5-templow').html('Low: ' + response.daily.data[5].temperatureMin  + ' °F');
            $('.outlook-5-windspeed').html('Wind Speed: ' + response.daily.data[5].windSpeed  + ' mph');
            $('.outlook-5-sunrise').html('Sun Rise: ' + new Date(response.daily.data[5].sunriseTime*1000).toTimeString());
            $('.outlook-5-sunset').html('Sun Set: ' + new Date(response.daily.data[5].sunsetTime*1000).toTimeString());
              if (response.daily.data[5].icon === "clear-day") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/clear-day.png" class="outlook-icon">');
              } else if (response.daily.data[5].icon === "clear-night") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/clear-night.png" class="outlook-icon">');
              } else if (response.daily.data[5].icon === "rain") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/rain.png" class="outlook-icon">');//
              } else if (response.daily.data[5].icon === "snow") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/snow.png" class="outlook-icon">');
              } else if (response.daily.data[5].icon === "sleet") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/sleet.png" class="outlook-icon">');
              } else if (response.daily.data[5].icon === "wind") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/wind.png" class="outlook-icon">');
              } else if (response.daily.data[5].icon === "fog") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/fog.png" class="outlook-icon">');
              } else if (response.daily.data[5].icon === "cloudy") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/cloudy.png" class="outlook-icon">');
              } else if (response.daily.data[5].icon === "partly-cloudy-day") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png" class="outlook-icon">');
              } else if (response.daily.data[5].icon === "partly-cloudy-night") {
                $('.outlook-5-icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png" class="outlook-icon">');
              } else {
                console.log('response.daily.data[5].icon failed');
              };

            // outlook details[6]
            $('.outlook-6-date').html(new Date(response.daily.data[6].time*1000).toDateString());
            $('.outlook-6-summary').html('Summary: ' + response.daily.data[6].summary);
            $('.outlook-6-temphigh').html('High: ' + response.daily.data[6].temperatureMax  + ' °F');
            $('.outlook-6-templow').html('Low: ' + response.daily.data[6].temperatureMin  + ' °F');
            $('.outlook-6-windspeed').html('Wind Speed: ' + response.daily.data[6].windSpeed  + ' mph');
            $('.outlook-6-sunrise').html('Sun Rise: ' + new Date(response.daily.data[6].sunriseTime*1000).toTimeString());
            $('.outlook-6-sunset').html('Sun Set: ' + new Date(response.daily.data[6].sunsetTime*1000).toTimeString());
              if (response.daily.data[6].icon === "clear-day") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/clear-day.png" class="outlook-icon">');
              } else if (response.daily.data[6].icon === "clear-night") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/clear-night.png" class="outlook-icon">');
              } else if (response.daily.data[6].icon === "rain") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/rain.png" class="outlook-icon">');//
              } else if (response.daily.data[6].icon === "snow") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/snow.png" class="outlook-icon">');
              } else if (response.daily.data[6].icon === "sleet") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/sleet.png" class="outlook-icon">');
              } else if (response.daily.data[6].icon === "wind") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/wind.png" class="outlook-icon">');
              } else if (response.daily.data[6].icon === "fog") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/fog.png" class="outlook-icon">');
              } else if (response.daily.data[6].icon === "cloudy") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/cloudy.png" class="outlook-icon">');
              } else if (response.daily.data[6].icon === "partly-cloudy-day") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png" class="outlook-icon">');
              } else if (response.daily.data[6].icon === "partly-cloudy-night") {
                $('.outlook-6-icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png" class="outlook-icon">');
              } else {
                console.log('response.daily.data[4].icon failed');
              };


        } // end success
      }); // end ajax
    }); // end get current position
  } // end geolocation
}); // end document ready function
