var initialLocation;
var browserSupportFlag = new Boolean();
var map = null;

var MAP = {
    setup : function(){
        // Map toevoegen
        $('body').append('<div id="map-canvas"></div>');
        $('#map-canvas').css({ width : '100%' , height : '100%'});
    },
    init : function(){
        initialize();
    }
};

LocationAPI = {
    call : function(url, responder){
        return $.ajax({
            url : url,
            type : 'get',
            success : function(data){
                responder(data);
            }, error : function(){
                responder(arguments);
            }
        });
    }
};

function initialize() {

    // Map aanmaken

    var myOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    // Locaties ophalen

    LocationAPI.call('api/attractions/coordinates', function(response){
        $.each(JSON.parse(response), function(index,value){
            addMarkerByAddress(value.address, value.title);
        });
    });

    // Locaties plaatsen

    // huidige locatie ophalen

    getCurrentPosition();

}

function addMarkerByAddress(address, title){

    LatlngFromAddress(address, function(lat,long){
        addMarker(title, new google.maps.LatLng(lat,long));
    });
}

function addMarker(title, LatLong){
    var marker = new google.maps.Marker({
        position: LatLong,
        title: title
    });
    marker.setMap(map);
}

function LatlngFromAddress(address, responder){
    var geocoder = new google.maps.Geocoder();
    return geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            responder(latitude, longitude);
        }
    });
}

function getCurrentPosition(){
    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setCenter(initialLocation);
            addMarker("Jij bent hier",initialLocation);
        }, function() {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
        alert("Geolocation service failed.");
    } else {
        alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
    }
    map.setCenter(initialLocation);
}