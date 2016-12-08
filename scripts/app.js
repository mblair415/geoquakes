// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
$(document).on("ready", function() {

var quakeData =  $.ajax( {
        method:"GET",
        url: weekly_quakes_endpoint,
        dataType: "json",
        data: $('body').serialize(),
        success: onSuccess,
      })

      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 1
      });

function onSuccess(quakes){
    quakes.features.forEach(function(quakes){
      var lngLat = {
        lng: quakes.geometry.coordinates[1],
        lat: quakes.geometry.coordinates[0]
      }
      var timeSince = time(quakes);
      var developerHtml = template({
      title: quakes.properties.title,
      time: timeSince
    });

    $('#info').append(developerHtml);
    marker = new google.maps.Marker({
      map: map,
      position: lngLat
    });
  });
}

  var source = $('#earthquake-template').html();
  var template = Handlebars.compile(source);

  function time(quakes) {

    return Math.round((Date.now() - quakes.properties.time) /
    (1000 * 60 * 60));
  }
});
