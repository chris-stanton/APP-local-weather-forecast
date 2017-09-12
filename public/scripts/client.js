
$(document).ready(function() {
  console.log("client.js running...");

    // setting default values on init
    var long = 0;
    var lat = 0;

    // hiding all elements and showing only loader
    $(".location-container").hide();
    $(".container").hide();
    $(".loader-container").show();
      // CSS changes
      $("body").css('background-image','url(../public/assets/images/backgrounds/fog.png)');
      $('.data-outlook').css('color', "white");

    // getting current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('Local position response: ', position);
      // geolocation response setting to variable
      lat = position.coords.latitude;
      long = position.coords.longitude;

      // API query key to get address details bassed from lat/long
      var google = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDp0HzZ2Mydb4qQsMKpMgkIQPxN3x5-gdE";
      $.ajax({
        type: "GET",
        url: google,
        dataType: "json",
        success: function(response) {
          console.log('Google API response: ', response);
            // setting current location to DOM
            $('.city').html(response.results[0].address_components[2].long_name);
            $('.county').html(response.results[0].address_components[3].long_name);
            $('.state').html(response.results[0].address_components[4].long_name + ' ,');
            $('.zipcode').html(response.results[0].address_components[6].long_name);
          } // end of success
      }); // end of ajax

      // API url query key for current weather details based off of lat and long
      var dark_sky = 'https://api.darksky.net/forecast/48429d15c51d64e8e6c03a84bec4e5b8/' + lat + ',' + long;
      $.ajax({
        type: "GET",
        url: dark_sky,
        dataType: "jsonp",
        success: function(response) {
          console.log('Dark Sky API response: ', response);
            // hiding loader and showing data
            $(".loader-container").hide();
            $(".location-container").show();
            $(".container").show();

            // placing data on DOM
            $('.location').html(response.timezone);
            $('.currenttime').html(new Date(response.currently.time*1000).toDateString());
            if (response.currently.temperature <= 32) {
              $('.temp').html('<img src="../public/assets/images/icons/temperature-white.ico" class="data-icon"/> ' +  '<span class="blue data-span">' + Math.round(response.currently.temperature) + ' °F </span>');
            } else if (response.currently.temperature >= response.daily.data[0].temperatureMax) {
              $('.temp').html('<img src="../public/assets/images/icons/temperature-white.ico" class="data-icon"/> ' +  '<span class="red data-span">' + Math.round(response.currently.temperature) + ' °F </span>');
            } else {
              $('.temp').html('<img src="../public/assets/images/icons/temperature-white.ico" class="data-icon"/> ' +  '<span class="orange data-span">' + Math.round(response.currently.temperature) + ' °F </span>');
            }
            $('.humidity').html('<img src="../public/assets/images/icons/humidity-white.ico" class="data-icon"/> ' + '<span class="purple data-span">' + ((Math.round(response.currently.humidity)) * 10) + '% </span>');
            $('.windspeed').html('<img src="../public/assets/images/icons/wind-white.ico" class="data-icon"/> ' + '<span class="data-span">' + (response.currently.windSpeed) + '</span><span> mph </span>');
            $('.current-summary').html('<div class="data-summary">' + response.currently.summary + '</div>');

            // setting weather icons and background images to current weather conditions
            if (response.currently.icon === "clear-day") {
              $('.icon').html('<img src="../public/assets/images/icons/clear-day.png">');//
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/clear-day.png)");
            } else if (response.currently.icon === "clear-night") {
              $('.icon').html('<img src="../public/assets/images/icons/clear-night.png">');
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/clear-night.png)");
            } else if (response.currently.icon === "rain") {
              $('.icon').html('<img src="../public/assets/images/icons/rain.png">');//
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/rain.png)");
            } else if (response.currently.icon === "snow") {
              $('.icon').html('<img src="../public/assets/images/icons/snow.png">');
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/snow.png)");
            } else if (response.currently.icon === "sleet") {
              $('.icon').html('<img src="../public/assets/images/icons/sleet.png">');
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/sleet.png)");
            } else if (response.currently.icon === "wind") {
              $('.icon').html('<img src="../public/assets/images/icons/wind.png">');
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/wind.png)");
            } else if (response.currently.icon === "fog") {
              $('.icon').html('<img src="../public/assets/images/icons/fog.png">');
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/fog.png)");
            } else if (response.currently.icon === "cloudy") {
              $('.icon').html('<img src="../public/assets/images/icons/cloudy.png">');
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/cloudy.png)");
            } else if (response.currently.icon === "partly-cloudy-day") {
              $('.icon').html('<img src="../public/assets/images/icons/partly-cloudy-day.png">');
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/partly-cloudy-day.png)");
            } else if (response.currently.icon === "partly-cloudy-night") {
              $('.icon').html('<img src="../public/assets/images/icons/partly-cloudy-night.png">');
              $('body').css('background-image', "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(../public/assets/images/backgrounds/partly-cloudy-night.png)");
            } else {
              console.log('Failed to load response.currently.icon');
            };

            // hourly chartJS
            var ctx_hourly = document.getElementById("hourlyChart").getContext('2d');
            var hourlyChart = new Chart(ctx_hourly, {
                type: 'line',
                data: {
                    labels: [
                      new Date(response.hourly.data[0].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[1].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[2].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[3].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[4].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[5].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[6].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[7].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[8].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[9].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[10].time*1000).getHours() + ":00",
                      new Date(response.hourly.data[11].time*1000).getHours() + ":00"
                    ],
                    datasets: [
                      {
                        label: 'Hourly High Temperature (°F)',
                        hidden: true,
                        data: [
                          response.hourly.data[0].temperature,
                          response.hourly.data[1].temperature,
                          response.hourly.data[2].temperature,
                          response.hourly.data[3].temperature,
                          response.hourly.data[4].temperature,
                          response.hourly.data[5].temperature,
                          response.hourly.data[6].temperature,
                          response.hourly.data[7].temperature,
                          response.hourly.data[8].temperature,
                          response.hourly.data[9].temperature,
                          response.hourly.data[10].temperature,
                          response.hourly.data[11].temperature
                        ],
                        backgroundColor: [
                            '#ff0000'
                        ],
                        borderColor: [
                            '#ff0000'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#ffffff',
                        pointBackgroundColor: '#ff0000',
                        borderWidth: 4,
                        fill: false
                      },
                      {
                        label: 'Hourly "Feels Like" Temperature (°F)',
                        hidden: false,
                        data: [
                          response.hourly.data[0].apparentTemperature,
                          response.hourly.data[1].apparentTemperature,
                          response.hourly.data[2].apparentTemperature,
                          response.hourly.data[3].apparentTemperature,
                          response.hourly.data[4].apparentTemperature,
                          response.hourly.data[5].apparentTemperature,
                          response.hourly.data[6].apparentTemperature,
                          response.hourly.data[7].apparentTemperature,
                          response.hourly.data[8].apparentTemperature,
                          response.hourly.data[9].apparentTemperature,
                          response.hourly.data[10].apparentTemperature,
                          response.hourly.data[11].apparentTemperature
                        ],
                        backgroundColor: [
                            '#ff7300'
                        ],
                        borderColor: [
                            '#ff7300'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#ffffff',
                        pointBackgroundColor: '#ff7300',
                        borderWidth: 4,
                        fill: false
                      },
                      {
                        label: 'Hourly Humidity (%)',
                        hidden: true,
                        data: [
                          response.hourly.data[0].humidity,
                          response.hourly.data[1].humidity,
                          response.hourly.data[2].humidity,
                          response.hourly.data[3].humidity,
                          response.hourly.data[4].humidity,
                          response.hourly.data[5].humidity,
                          response.hourly.data[6].humidity,
                          response.hourly.data[7].humidity,
                          response.hourly.data[8].humidity,
                          response.hourly.data[9].humidity,
                          response.hourly.data[10].humidity,
                          response.hourly.data[11].humidity
                        ],
                        backgroundColor: [
                            '#be15e8'
                        ],
                        borderColor: [
                            '#be15e8'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#ffffff',
                        pointBackgroundColor: '#be15e8',
                        borderWidth: 4,
                        fill: false
                      },
                      {
                        label: 'Hourly Chance of Percipitation (%)',
                        hidden: true,
                        data: [
                          response.hourly.data[0].precipProbability,
                          response.hourly.data[1].precipProbability,
                          response.hourly.data[2].precipProbability,
                          response.hourly.data[3].precipProbability,
                          response.hourly.data[4].precipProbability,
                          response.hourly.data[5].precipProbability,
                          response.hourly.data[6].precipProbability,
                          response.hourly.data[7].precipProbability,
                          response.hourly.data[8].precipProbability,
                          response.hourly.data[9].precipProbability,
                          response.hourly.data[10].precipProbability,
                          response.hourly.data[11].precipProbability
                        ],
                        backgroundColor: [
                            '#3204b5'
                        ],
                        borderColor: [
                            '#3204b5'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#ffffff',
                        pointBackgroundColor: '#3204b5',
                        borderWidth: 4,
                        fill: false
                      },
                    ]
                },
                options: {
                  layout: {
                    padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0
                    }
                  },
                  tooltips: {
                    titleFontColor: '#05ff00',
                    titleFontSize: 15,
                    titleFontStyle: 'italic',
                    titleMarginBottom: 10,
                    bodyFontSize: 18,
                    callbacks: {
                      label: function(tooltipItem, data) {
                        var label = 'Summary';
                        var hourly_data = response.hourly.data[tooltipItem.index].summary;
                        var label_temp = '°F';
                        var hourly_highTemp = response.hourly.data[tooltipItem.index].temperature;
                        return hourly_highTemp + label_temp + '   ' + label + ': ' + hourly_data;
                      }
                    }
                  },
                  legend: {
                    position: 'right',
                    labels: {
                      fontColor: '#ffffff',
                      padding: 30,
                      fontSize: 15,
                      boxWidth: 12
                    }
                  },
                  scales: {
                    yAxes: [{
                      gridLines: {
                        display: true,
                        color: "rgba(128, 128, 128, 0.3)"
                      },
                      ticks: {
                        beginAtZero:false,
                        fontSize: 15,
                        fontColor: '#ff7300',
                        padding: 12
                      }
                    }],
                    xAxes: [{
                      gridLines: {
                        display: true,
                        color: "rgba(128, 128, 128, 0.3)"
                      },
                      ticks: {
                        fontColor: '#ffffff',
                        fontSize: 15
                        // minRotation: 45
                      }
                    }]
                  } //end scales
                } //end options
            }); // end myChart


            // daily chartJS
            var ctx_daily = document.getElementById("dailyChart").getContext('2d');
            var dailyChart = new Chart(ctx_daily, {
                type: 'line',
                data: {
                    labels: [
                      new Date(response.daily.data[0].time*1000).toDateString(),
                      new Date(response.daily.data[1].time*1000).toDateString(),
                      new Date(response.daily.data[2].time*1000).toDateString(),
                      new Date(response.daily.data[3].time*1000).toDateString(),
                      new Date(response.daily.data[4].time*1000).toDateString(),
                      new Date(response.daily.data[5].time*1000).toDateString(),
                      new Date(response.daily.data[6].time*1000).toDateString()
                    ],
                    datasets: [
                      {
                        label: 'Daily High Temperature (°F)',
                        hidden: false,
                        data: [
                          response.daily.data[0].temperatureMax,
                          response.daily.data[1].temperatureMax,
                          response.daily.data[2].temperatureMax,
                          response.daily.data[3].temperatureMax,
                          response.daily.data[4].temperatureMax,
                          response.daily.data[5].temperatureMax,
                          response.daily.data[6].temperatureMax
                        ],
                        backgroundColor: [
                            '#ff0000'
                        ],
                        borderColor: [
                            '#ff0000'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#ffffff',
                        pointBackgroundColor: '#ff0000',
                        borderWidth: 4,
                        fill: false
                      },
                      {
                        label: 'Daily Low Temperature (°F)',
                        hidden: true,
                        data: [
                          response.daily.data[0].temperatureMin,
                          response.daily.data[1].temperatureMin,
                          response.daily.data[2].temperatureMin,
                          response.daily.data[3].temperatureMin,
                          response.daily.data[4].temperatureMin,
                          response.daily.data[5].temperatureMin,
                          response.daily.data[6].temperatureMin
                        ],
                        backgroundColor: [
                            '#3e80ff'
                        ],
                        borderColor: [
                            '#3e80ff'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#ffffff',
                        pointBackgroundColor: '#3e80ff',
                        borderWidth: 4,
                        fill: false
                      },
                      {
                        label: 'Daily Humidity (%)',
                        hidden: true,
                        data: [
                          response.daily.data[0].humidity,
                          response.daily.data[1].humidity,
                          response.daily.data[2].humidity,
                          response.daily.data[3].humidity,
                          response.daily.data[4].humidity,
                          response.daily.data[5].humidity,
                          response.daily.data[6].humidity
                        ],
                        backgroundColor: [
                            '#be15e8'
                        ],
                        borderColor: [
                            '#be15e8'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#ffffff',
                        pointBackgroundColor: '#be15e8',
                        borderWidth: 4,
                        fill: false
                      },
                      {
                        label: 'Daily Chance of Percipitation (%)',
                        hidden: true,
                        data: [
                          response.daily.data[0].precipProbability,
                          response.daily.data[1].precipProbability,
                          response.daily.data[2].precipProbability,
                          response.daily.data[3].precipProbability,
                          response.daily.data[4].precipProbability,
                          response.daily.data[5].precipProbability,
                          response.daily.data[6].precipProbability
                        ],
                        backgroundColor: [
                            '#3204b5'
                        ],
                        borderColor: [
                            '#3204b5'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#ffffff',
                        pointBackgroundColor: '#3204b5',
                        borderWidth: 4,
                        fill: false
                      },
                      {
                        label: 'Daily Wind Speed (mph)',
                        hidden: true,
                        data: [
                          response.daily.data[0].windSpeed,
                          response.daily.data[1].windSpeed,
                          response.daily.data[2].windSpeed,
                          response.daily.data[3].windSpeed,
                          response.daily.data[4].windSpeed,
                          response.daily.data[5].windSpeed,
                          response.daily.data[6].windSpeed
                        ],
                        backgroundColor: [
                            '#ffffff'
                        ],
                        borderColor: [
                            '#ffffff'
                        ],
                        pointHoverRadius: 10,
                        pointHoverBorderColor: '#000000',
                        pointBackgroundColor: '#ffffff',
                        borderWidth: 4,
                        fill: false
                      }
                    ]
                },
                options: {
                  layout: {
                    padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0
                    }
                  },
                  tooltips: {
                    titleFontColor: '#05ff00',
                    titleFontSize: 15,
                    titleFontStyle: 'italic',
                    titleMarginBottom: 10,
                    bodyFontSize: 18,
                    callbacks: {
                      label: function(tooltipItem, data) {
                        var summary_label = 'Summary';
                        var summary_data = response.daily.data[tooltipItem.index].summary;
                        var tempMax_label = "Temp High";
                        var tempMax_data = response.daily.data[tooltipItem.index].temperatureMax;
                        return tempMax_label + ': ' + tempMax_data + '°F' + '   ' + summary_label + ': ' + summary_data;
                      }
                    }
                  },
                  legend: {
                    position: 'top',
                    labels: {
                      fontColor: '#ffffff',
                      padding: 30,
                      fontSize: 15,
                      boxWidth: 12
                    }
                  },
                  scales: {
                    yAxes: [{
                      gridLines: {
                        display: true,
                        color: "rgba(128, 128, 128, 0.3)"
                      },
                      ticks: {
                        beginAtZero: false,
                        fontSize: 15,
                        fontColor: '#ff7300',
                        padding: 12
                      }
                    }],
                    xAxes: [{
                      gridLines: {
                        display: true,
                        color: "rgba(128, 128, 128, 0.3)"
                      },
                      ticks: {
                        fontColor: '#ffffff',
                        fontSize: 15
                        // minRotation: 5
                      }
                    }]
                  } //end scales
                } //end options
            }); // end myChart

            // outlook details[0]
            $('.outlook-0-date').html(new Date(response.daily.data[0].time*1000).toDateString());
            $('.outlook-0-summary').html('Summary: <br>' + response.daily.data[0].summary);
            $('.outlook-0-temphigh').html('High: ' + '<span class="red">' + response.daily.data[0].temperatureMax  + ' °F </span>');
            $('.outlook-0-templow').html('Low: ' + '<span class="blue">' + response.daily.data[0].temperatureMin  + ' °F </span>');
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
                console.log('Faled to load response.daily.data[0].icon');
              };

            // outlook details[1]
            $('.outlook-1-date').html(new Date(response.daily.data[1].time*1000).toDateString());
            $('.outlook-1-summary').html('Summary: <br>' + response.daily.data[1].summary);
            $('.outlook-1-temphigh').html('High: ' + '<span class="red">' + response.daily.data[1].temperatureMax  + ' °F </span>');
            $('.outlook-1-templow').html('Low: ' + '<span class="blue">' + response.daily.data[1].temperatureMin  + ' °F </span>');
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
                console.log('Faled to load response.daily.data[1].icon');
              };

            // outlook details[2]
            $('.outlook-2-date').html(new Date(response.daily.data[2].time*1000).toDateString());
            $('.outlook-2-summary').html('Summary: <br>' + response.daily.data[2].summary);
            $('.outlook-2-temphigh').html('High: ' + '<span class="red">' + response.daily.data[2].temperatureMax  + ' °F </span>');
            $('.outlook-2-templow').html('Low: ' + '<span class="blue">' + response.daily.data[2].temperatureMin  + ' °F </span>');
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
                console.log('Faled to load response.daily.data[2].icon');
              };

            // outlook details[3]
            $('.outlook-3-date').html(new Date(response.daily.data[3].time*1000).toDateString());
            $('.outlook-3-summary').html('Summary: <br>' + response.daily.data[3].summary);
            $('.outlook-3-temphigh').html('High: ' + '<span class="red">' + response.daily.data[3].temperatureMax  + ' °F </span>');
            $('.outlook-3-templow').html('Low: ' + '<span class="blue">' + response.daily.data[3].temperatureMin  + ' °F </span>');
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
                console.log('Faled to load response.daily.data[3].icon');
              };

            // outlook details[4]
            $('.outlook-4-date').html(new Date(response.daily.data[4].time*1000).toDateString());
            $('.outlook-4-summary').html('Summary: <br>' + response.daily.data[4].summary);
            $('.outlook-4-temphigh').html('High: ' + '<span class="red">' + response.daily.data[4].temperatureMax  + ' °F </span>');
            $('.outlook-4-templow').html('Low: ' + '<span class="blue">' + response.daily.data[4].temperatureMin  + ' °F </span>');
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
                console.log('Faled to load response.daily.data[4].icon');
              };

            // outlook details[5]
            $('.outlook-5-date').html(new Date(response.daily.data[5].time*1000).toDateString());
            $('.outlook-5-summary').html('Summary: <br>' + response.daily.data[5].summary);
            $('.outlook-5-temphigh').html('High: ' + '<span class="red">' + response.daily.data[5].temperatureMax  + ' °F </span>');
            $('.outlook-5-templow').html('Low: ' + '<span class="blue">' + response.daily.data[5].temperatureMin  + ' °F </span>');
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
                console.log('Faled to load response.daily.data[5].icon');
              };

            // outlook details[6]
            $('.outlook-6-date').html(new Date(response.daily.data[6].time*1000).toDateString());
            $('.outlook-6-summary').html('Summary: <br>' + response.daily.data[6].summary);
            $('.outlook-6-temphigh').html('High: ' + '<span class="red">' + response.daily.data[6].temperatureMax  + ' °F </span>');
            $('.outlook-6-templow').html('Low: ' + '<span class="blue">' + response.daily.data[6].temperatureMin  + ' °F </span>');
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
                console.log('Faled to load response.daily.data[6].icon');
              };
        } // end success
      }); // end ajax
    }); // end get current position
  } // end geolocation
}); // end document ready function







//
// {
//   label: 'Daily High Temperature (°F)',
//   hidden: true,
//   data: [
//     response.daily.data[0].temperatureMax,
//     response.daily.data[1].temperatureMax,
//     response.daily.data[2].temperatureMax,
//     response.daily.data[3].temperatureMax,
//     response.daily.data[4].temperatureMax,
//     response.daily.data[5].temperatureMax,
//     response.daily.data[6].temperatureMax,
//     response.daily.data[7].temperatureMax
//   ],
//   backgroundColor: [
//       '#ffffff'
//   ],
//   borderColor: [
//       '#3204b5'
//   ],
//   borderWidth: 4,
//   fill: false
// }
