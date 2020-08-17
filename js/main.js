function createMap(){  
    
    /*
    var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

	var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
		streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

	var map = L.map('map', {
		center: [39.73, -104.99],
		zoom: 10,
		layers: [grayscale]
	});

	var baseLayers = {
		"Grayscale": grayscale,
		"Streets": streets
	};

	

	L.control.layers(baseLayers).addTo(map);*/
    
    
    var grayCanvas = L.tileLayer.provider('Esri.WorldImagery'),
        streets = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    });
    var home = {
        lat: 38.338,
        lon: -77.16,
        zoom: 14.3,
        
    }; 
    
   // const map = L.map('map').setView([home.lat, home.lon], home.zoom, layers:[grayCanvas]);
    
    
    const map = L.map('map', {
		center: [home.lat, home.lon],
		zoom: home.zoom,
		layers: [streets]
	});
    const apiKey = "EAl48EIeTLzitOYWGoQNoQ";
    const getURL = 'https://ebrobinson.carto.com/api/v2/sql?format=GeoJSON&q=';
    const postURL = 'https://ebrobinson.carto.com/api/v2/sql?q='
    
    
    
   /*  var streets = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var grayCanvas = L.tileLayer.provider('Esri.WorldGrayCanvas');
    */
    //var Comments = null
    
    
    
    
    
    
    var POIlayers = addPOIs(map,getURL,apiKey);
    addParkBounds(map,getURL,apiKey);
    //var Comments = addComments(map,getURL,apiKey);
    
    //var cities = L.layerGroup(POIlayers);
   
    
    
    
    
    
    
    
    var baseMaps = {
    "Imagery": grayCanvas,
    "Streets": streets
    };
    
    
   // var overlayMaps = {
    //"Cities": cities
    //};
    L.control.layers(baseMaps).addTo(map);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //const apiKey = "EAl48EIeTLzitOYWGoQNoQ";
    //const getURL = 'https://ebrobinson.carto.com/api/v2/sql?format=GeoJSON&q=';
    //const postURL = 'https://ebrobinson.carto.com/api/v2/sql?q='
    
    //addParkBounds(map,getURL,apiKey);
    //var POIlayers = addPOIs(map,getURL,apiKey);
    //var Comments = addComments(map,getURL,apiKey);
    
    
        // Event Listeners
$('input[value=comms]').click(function(){
  map.eachLayer(function (layer) {
            if (layer != grayCanvas && layer != streets){
                map.removeLayer(layer);
            };
        });    
  var Comments = addComments(map,getURL,apiKey);
  addParkBounds(map,getURL,apiKey);
  
});

$('input[value=all]').click(function(){
  map.eachLayer(function (layer) {
            if (layer != grayCanvas && layer != streets){
                map.removeLayer(layer);
            };
        });    
      
  var POIlayers = addPOIs(map,getURL,apiKey);
  addParkBounds(map,getURL,apiKey);    
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var clickMarker = L.marker(50,50);
    
    map.on('click', function(e){
        map.removeLayer(clickMarker);
        var latlng = map.mouseEventToLatLng(e.originalEvent);
        var newLatLng = new L.LatLng(latlng.lat, latlng.lng);
        clickMarker.setLatLng(newLatLng);
        clickMarker.addTo(map);
        $('#coords').html(latlng.lat + ', ' + latlng.lng)
    });
    
    
    
    L.easyButton('fa-home',function(btn,map){
        
        map.eachLayer(function (layer) {
            if (layer != grayCanvas && layer != streets){
                map.removeLayer(layer);
            };
        });
        
        
        
        addParkBounds(map,getURL,apiKey)
        POIlayers = addPOIs(map,getURL,apiKey);

        map.setView([home.lat, home.lon], home.zoom);
        $('#nearest-div').css({
            "display":"none"
        });
        $('#service-div').css({
            "display":"none"
        });
        $('#comment-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"none"
        });
        $('#map').css({
            "height": "93vh"
        });
        },'Zoom To Home').addTo(map);
    
    
     L.easyButton('fa-tags',function(btn,map){
        
        map.eachLayer(function (layer) {
            if (layer != grayCanvas && layer != streets){
                map.removeLayer(layer);
            };
        });
        
        
        
        addParkBounds(map,getURL,apiKey)
        var POIlayers = addPOIs(map,getURL,apiKey);

        map.setView([home.lat, home.lon], home.zoom);
        $('#nearest-div').css({
            "display":"none"
        });
        $('#service-div').css({
            "display":"none"
        });
        $('#comment-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"none"
        });
        $('#map').css({
            "height": "93vh"
        });
        },'Show Amenities').addTo(map);
    
    
    
    
    
    L.easyButton('fa-paw',function(btn,map){
        
        map.eachLayer(function (layer) {
            if (layer != grayCanvas && layer != streets){
                map.removeLayer(layer);
            };
        });
        
        
        
        addParkBounds(map,getURL,apiKey)
        var Comments = addComments(map,getURL,apiKey);

        map.setView([home.lat, home.lon], home.zoom);
        $('#nearest-div').css({
            "display":"none"
        });
        $('#service-div').css({
            "display":"none"
        });
        $('#comment-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"none"
        });
        $('#map').css({
            "height": "93vh"
        });
        },'Show Points of Interest').addTo(map);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $('#email').click(function(){
        var test = $('#email').val();
        if (test == '(optional)'){
            $('#email').val('');
        }
    });
    
    $('#close').click(function(){
        $('#alert-div').hide(800)
    });
    
    
   
    
    
    
    
      $('#add-button').click(function(){
        var type = $('#type').val()
        var comment = $('#comment').val()
        var contact = $('#email').val()
        var entity = $('#entity').val()
        var dirtyCoords = $('#coords').html();
          
        if (comment && dirtyCoords){
            map.removeLayer(clickMarker);
            var coordsArray = dirtyCoords.split(', ');
            var lat = coordsArray[0];
            var lon = coordsArray[1];
            var sql = "INSERT INTO ebrobinson.comment (the_geom, type, comment, contact, date, verified, name) values (ST_SetSRID(ST_point("+lon+", "+lat+"), 4326), '"+type+"', '"+comment+"', '"+contact+"', now(), false, '"+entity+"')";

            $.post(postURL+sql+'&api_key='+apiKey)
                .done(function(){
                    addComments(map,getURL,apiKey);
                })
            
            //setTrueFlag(entity,postURL,apiKey);
            
            $('#type').prop('selectedIndex',0)
            $('#entity').prop('selectedIndex',0)
            $('#comment').val('')
            $('#email').val('(optional)')
            $('#coords').html('');
            
        } else {
            alert('Please make sure you have selected a location and entered a comment.')
        };
    });
    
    var YAHIMarker = L.icon({
        iconUrl: 'img/star-15.svg',
        shadowUrl: 'img/star-white.svg',
        iconSize: [30, 30],
        shadowSize: [30, 30],
        shadowAnchor: [14,14]
    });
    
    var circleOptions = {
        radius: 30,
        stroke: true,
        color: 'yellow',
        weight: 2,
        fillOpacity: 0.2
        
    };
    
    $('#rest-button').click(function(){
        var dirtyCoords = $('#coords').html();
        if (dirtyCoords){
            map.removeLayer(clickMarker);
            var coordsArray = dirtyCoords.split(', ');
            var lat = coordsArray[0];
            var lon = coordsArray[1];
            var sql = "SELECT name, the_geom FROM ebrobinson.camp WHERE ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326)) = (SELECT MIN(ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326))) FROM ebrobinson.camp)";
            
            $.getJSON(getURL+sql+'&api_key='+apiKey, function(data){
                console.log(data)
                var name = data.features[0].properties.name;
                var geom = data.features[0].geometry.coordinates;
                var feature = data.features[0];
                var restMarker = L.circleMarker([geom[1],geom[0]],circleOptions).addTo(map);
                var otherMarker = L.marker([lat,lon], {icon: YAHIMarker}).addTo(map);
                var zoomGroup = new L.featureGroup([restMarker,otherMarker]);
                map.fitBounds(zoomGroup.getBounds(), {
                    padding: [100, 100]
                });
                $('#nearest-div').css({
                    "display":"none"
                });
                $('#map').css({
                    "height": "93vh"
                });
                $('#box').css({
                    "display":"none"
                });
                $('#alert-p').html('<b>'+name+'</b> has the nearest campsite.')
                $('#alert-div').show(800)
                
                $('#close').click(function(){
                    map.removeLayer(otherMarker);
                    map.removeLayer(restMarker);
                });
            });

        } else {
            alert('Please make sure you have selected a location.')
        };
    });
    
    $('#park-button').click(function(){
        var dirtyCoords = $('#coords').html();
        if (dirtyCoords){
            map.removeLayer(clickMarker);
            var coordsArray = dirtyCoords.split(', ');
            var lat = coordsArray[0];
            var lon = coordsArray[1];
            var sql = "SELECT name, the_geom FROM ebrobinson.parking WHERE ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326)) = (SELECT MIN(ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326))) FROM ebrobinson.parking)";
            
            $.getJSON(getURL+sql+'&api_key='+apiKey, function(data){
                console.log(data)
                var name = data.features[0].properties.name;
                var geom = data.features[0].geometry.coordinates;
                var lotMarker = L.circleMarker([geom[1],geom[0]],circleOptions).addTo(map);
                var otherMarker = L.marker([lat,lon], {icon: YAHIMarker}).addTo(map);
                var zoomGroup = new L.featureGroup([lotMarker,otherMarker]);
                map.fitBounds(zoomGroup.getBounds(), {
                    padding: [100, 100]
                });
                $('#nearest-div').css({
                    "display":"none"
                });
                $('#box').css({
                    "display":"none"
                });
                $('#map').css({
                    "height": "93vh"
                });
                $('#alert-p').html('The <b>'+name+'</b> is the nearest parking lot.')
                $('#alert-div').show(800)
                
                $('#close').click(function(){
                    map.removeLayer(otherMarker);
                    map.removeLayer(lotMarker);
                });
            });

        } else {
            alert('Please make sure you have selected a location.')
        };
    });
    
    $('#build-button').click(function(){
        var dirtyCoords = $('#coords').html();
        if (dirtyCoords){
            map.removeLayer(clickMarker);
            var coordsArray = dirtyCoords.split(', ');
            var lat = coordsArray[0];
            var lon = coordsArray[1];
            var sql = "SELECT name, the_geom FROM ebrobinson.landing WHERE ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326)) = (SELECT MIN(ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326))) FROM ebrobinson.landing)";
            
            $.getJSON(getURL+sql+'&api_key='+apiKey, function(data){
                console.log(data)
                var name = data.features[0].properties.name;
                var geom = data.features[0].geometry.coordinates;
                var buildMarker = L.circleMarker([geom[1],geom[0]],circleOptions).addTo(map);
                var otherMarker = L.marker([lat,lon], {icon: YAHIMarker}).addTo(map);
                var zoomGroup = new L.featureGroup([buildMarker,otherMarker]);
                map.fitBounds(zoomGroup.getBounds(), {
                    padding: [100, 100]
                });
                $('#nearest-div').css({
                    "display":"none"
                });
                $('#box').css({
                    "display":"none"
                });
                $('#map').css({
                    "height": "93vh"
                });
                $('#alert-p').html('<b>'+name+'</b> is the nearest landing.')
                $('#alert-div').show(800)
                
                $('#close').click(function(){
                    map.removeLayer(otherMarker);
                    map.removeLayer(buildMarker);
                });
            });

        } else {
            alert('Please make sure you have selected a location.')
        };
    });
    
    $('#rec-button').click(function(){
        var dirtyCoords = $('#coords').html();
        if (dirtyCoords){
            map.removeLayer(clickMarker);
            var coordsArray = dirtyCoords.split(', ');
            var lat = coordsArray[0];
            var lon = coordsArray[1];
            var sql = "SELECT name, the_geom FROM ebrobinson.lookout WHERE ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326)) = (SELECT MIN(ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326))) FROM ebrobinson.lookout)";
            
            $.getJSON(getURL+sql+'&api_key='+apiKey, function(data){
                console.log(data)
                var name = data.features[0].properties.name;
                var geom = data.features[0].geometry.coordinates;
                var recMarker = L.circleMarker([geom[1],geom[0]],circleOptions).addTo(map);
                var otherMarker = L.marker([lat,lon], {icon: YAHIMarker}).addTo(map);
                var zoomGroup = new L.featureGroup([recMarker,otherMarker]);
                map.fitBounds(zoomGroup.getBounds(), {
                    padding: [100, 100]
                });
                $('#nearest-div').css({
                    "display":"none"
                });
                $('#box').css({
                    "display":"none"
                });
                $('#map').css({
                    "height": "93vh"
                });
                $('#alert-p').html('The <b>'+name+'</b> is the nearest lookout.')
                $('#alert-div').show(800)
                
                $('#close').click(function(){
                    map.removeLayer(otherMarker);
                    map.removeLayer(recMarker);
                });
            });

        } else {
            alert('Please make sure you have selected a location.')
        };
    });
    
    
    $('#comm-button').click(function(){
        var dirtyCoords = $('#coords').html();
        if (dirtyCoords){
            map.removeLayer(clickMarker);
            var coordsArray = dirtyCoords.split(', ');
            var lat = coordsArray[0];
            var lon = coordsArray[1];
            var sql = "SELECT comment, the_geom FROM ebrobinson.comment WHERE ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326)) = (SELECT MIN(ST_DISTANCE(the_geom, ST_GeomFromText('POINT("+lon+" "+lat+")',4326))) FROM ebrobinson.comment)";
            
            $.getJSON(getURL+sql+'&api_key='+apiKey, function(data){
                console.log(data)
                var comment = data.features[0].properties.comment;
                var geom = data.features[0].geometry.coordinates;
                var recMarker = L.circleMarker([geom[1],geom[0]],circleOptions).addTo(map);
                var otherMarker = L.marker([lat,lon], {icon: YAHIMarker}).addTo(map);
                var zoomGroup = new L.featureGroup([recMarker,otherMarker]);
                map.fitBounds(zoomGroup.getBounds(), {
                    padding: [100, 100]
                });
                $('#nearest-div').css({
                    "display":"none"
                });
                $('#box').css({
                    "display":"none"
                });
                $('#map').css({
                    "height": "93vh"
                });
                $('#alert-p').html('The <b>'+comment+'</b> is the nearest animal sighting.')
                $('#alert-div').show(800)
                
                $('#close').click(function(){
                    map.removeLayer(otherMarker);
                    map.removeLayer(recMarker);
                });
            });

        } else {
            alert('Please make sure you have selected a location.')
        };
    });
    
    $('#pass-cancel').click(function(){
        $('#map').css({
            "height": "93vh"
        });
        $('#service-div').css({
            "display":"none"
        });
    });
    
    $('#pass-sub').click(function(){
        var password = $('#password').val();
        if (password == 'admin'){
            map.removeLayer(clickMarker);
            $('#password').val('');
            $('#map').css({
                "height": "93vh"
            });
            $('#service-div').css({
                "display":"none"
            });
            serviceMap(map,getURL,postURL,apiKey,POIlayers)
        }else{
            alert('Please enter the correct password.')
        };
    });
    
    L.easyButton('fa-pencil',function(btn, map){
        $('#map').css({
            "height": "78vh"
        });
        $('#service-div').css({
            "display":"none"
        });
        $('#nearest-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"inline"
        });
        $('#comment-div').css({
            "display":"inline"
        });
        },'Submit a comment',
        'comment-button',{
        position: 'bottomleft'
        }
    ).addTo(map);
    
    
    
    
    
    L.easyButton('fa-search',function(btn, map){
        $('#map').css({
            "height": "78vh"
        });
        $('#service-div').css({
            "display":"none"
        });
        $('#comment-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"inline"
        });
        $('#nearest-div').css({
            "display":"inline"
        });
        },'Search the park',
        'nearest-button',{
        position: 'bottomleft'
        }
    ).addTo(map);
    
    
    
    
    
    
    /*L.easyButton('fa-wrench',function(btn, map){
        map.removeLayer(clickMarker);
        $('#map').css({
            "height": "84vh"
        });
        $('#comment-div').css({
            "display":"none"
        });
        $('#nearest-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"none"
        });
        $('#service-div').css({
            "display":"inline"
        });
        },'Search comments - staff only',
        'wrench-button',{
        position: 'bottomright'
        }
    ).addTo(map);*/
    
    $('#cancel-comment-button').click(function(){
        
        
        //addParkBounds(map,getURL,apiKey)
        //POIlayers = addPOIs(map,getURL,apiKey);

        $('#nearest-div').css({
            "display":"none"
        });
        $('#service-div').css({
            "display":"none"
        });
        $('#comment-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"none"
        });
        $('#map').css({
            "height": "93vh"
        });
    });
    
    $('#cancel-comment-search').click(function(){
        
        
        //addParkBounds(map,getURL,apiKey)
        //POIlayers = addPOIs(map,getURL,apiKey);

        $('#nearest-div').css({
            "display":"none"
        });
        $('#service-div').css({
            "display":"none"
        });
        $('#comment-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"none"
        });
        $('#map').css({
            "height": "93vh"
        });
    });
    
    /*L.easyButton('fa-home',function(btn,map){
        
        map.eachLayer(function (layer) {
            if (layer != grayCanvas && layer != streets){
                map.removeLayer(layer);
            };
        });
        
        
        
        addParkBounds(map,getURL,apiKey)
        POIlayers = addPOIs(map,getURL,apiKey);

        map.setView([home.lat, home.lon], home.zoom);
        $('#nearest-div').css({
            "display":"none"
        });
        $('#service-div').css({
            "display":"none"
        });
        $('#comment-div').css({
            "display":"none"
        });
        $('#box').css({
            "display":"none"
        });
        $('#map').css({
            "height": "93vh"
        });
        },'Zoom To Home').addTo(map);*/
    
  
    
    var lc = L.control.locate({
    
    strings: {
        title: "Show me where I am, yo!"
    }
    }).addTo(map);
    
    L.easyButton('fa-question',function(btn,map){
        console.log('testing')
    },'About',
        'about-button',{
        position: 'bottomright'
        }
    ).addTo(map);
    
    
    
    

};








function addParkBounds(map,getURL,apiKey){
    
       
    var style = {
        weight: 4,
        opacity: 0.7,
        color: '#f20000',
        dashArray: '6',
        fillOpacity: 0
    };
    $.getJSON(getURL+'SELECT * FROM caledonoutline&api_key'+apiKey, function(data){
        var feature = data.features;
        var bounds = L.geoJSON(feature, {
            style: style
        });
        
        bounds.addTo(map);
        return bounds
    });
   
};//end addParkBounds


























function addNewComments(map,getURL,apiKey){
    
    /*var commentMarker = L.icon({
        iconUrl: 'img/cross-15.svg',
        shadowUrl: 'img/cross-white.svg',
        iconSize: [30, 30],
        shadowSize: [30, 30],
        shadowAnchor: [14,14]
    });*/
    
    $.getJSON(getURL+'SELECT * FROM ebrobinson.comment where cartodb_id = (select max(cartodb_id) from ebrobinson.comment)&api_key='+apiKey, function(data){
        var feature = data.features
        var comments = L.geoJSON(feature, {
            onEachFeature: hoverComments
        });
        comments.addTo(map);
    })
};//end addNewComments
              
function hoverComments(feature,layer){
    
    var comment = feature.properties['comment'];
    var type = feature.properties['type'];
    var popupContent = '<p><b>Type</b>:&nbsp;'+type+'<p><b>Comment</b>:&nbsp;'+comment+'</p>';
    
    layer.bindTooltip(popupContent, {
        offset: [0,-7],
        direction: 'top',
        className: 'popupComments'});
}; // end hoverComments














function hoverName(feature,layer){
    var popupContent = feature.properties['name'];
    
    layer.bindTooltip(popupContent, {
        offset: [0,-7],
        direction: 'top',
        className: 'popupName'});
}; // end hoverName

// Function to add all coffee shops
function addPOIs(map,getURL,apiKey){
    
    var POIlayers = [];
    
    
    
    
    
    
    
    
    
    
    
    
    
    var campMarker = L.icon({
        iconUrl: 'img/tent.svg',
        //shadowUrl: 'img/home-white.svg',
        iconSize: [30, 30],
        shadowSize: [30, 30],
        shadowAnchor: [14,14]
    });
    
    var parkingMarker = L.icon({
        iconUrl: 'img/car.svg',
        //shadowUrl: 'img/parking-white.svg',
        iconSize: [30, 30],
        shadowSize: [20, 20],
        shadowAnchor: [9,9]
    });
    
    var landingMarker = L.icon({
        iconUrl: 'img/kayak.svg',
        //shadowUrl: 'img/zoo-white.svg',
        iconSize: [30, 30],
        shadowSize: [40, 40],
        shadowAnchor: [19,19]
    });
    
    var lookoutMarker = L.icon({
        iconUrl: 'img/binoculars.svg',
        //shadowUrl: 'img/baseball-white.svg',
        iconSize: [30, 30],
        shadowSize: [32, 32],
        shadowAnchor: [15,15]
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Get CARTO selection as GeoJSON and Add to Map
    $.getJSON(getURL+'SELECT * FROM parking&api_key='+apiKey, function(data) {
        var features = data.features
        Parking = L.geoJson(features, {
            
            pointToLayer: function(feature,latlng){
                return L.marker(latlng, {icon: parkingMarker});
            },
            onEachFeature: hoverName
        });
                           
    
        POIlayers.push(Parking);
        
        Parking.addTo(map);
        
    
    })
    
    // Get CARTO selection as GeoJSON and Add to Map
    $.getJSON(getURL+'SELECT * FROM lookout&api_key='+apiKey, function(data) {
        var features = data.features
        Lookout = L.geoJson(features, {
            pointToLayer: function(feature,latlng){
                return L.marker(latlng, {icon: lookoutMarker});
            },
            onEachFeature: hoverName
        });
                           
    
        POIlayers.push(Lookout);
        
        Lookout.addTo(map);
    })
    
        // Get CARTO selection as GeoJSON and Add to Map
    $.getJSON(getURL+'SELECT * FROM camp&api_key='+apiKey, function(data) {
        var features = data.features
        Camp = L.geoJson(features, {
            pointToLayer: function(feature,latlng){
                return L.marker(latlng, {icon: campMarker});
            },
            onEachFeature: hoverName
        });
                           
    
        POIlayers.push(Camp);
        
        Camp.addTo(map);
    })
    
        // Get CARTO selection as GeoJSON and Add to Map
    $.getJSON(getURL+'SELECT * FROM landing&api_key='+apiKey, function(data) {
        var features = data.features
        Landing = L.geoJson(features, {
            pointToLayer: function(feature,latlng){
                return L.marker(latlng, {icon: landingMarker});
            },
            onEachFeature: hoverName
        });
                           
    
        POIlayers.push(Landing);
        
        Landing.addTo(map);
    })
};


function addComments(map,getURL,apiKey){
    
    
    
    var comments = [];
    
    
    
    
    var animalMarker = L.icon({
        iconUrl: 'img/track.svg',
        //shadowUrl: 'img/home-white.svg',
        iconSize: [30, 30],
        shadowSize: [30, 30],
        shadowAnchor: [14,14]
    });
    
    var obsMarker = L.icon({
        iconUrl: 'img/delete.svg',
        //shadowUrl: 'img/parking-white.svg',
        iconSize: [30, 30],
        shadowSize: [20, 20],
        shadowAnchor: [9,9]
    });
    
    var litterMarker = L.icon({
        iconUrl: 'img/trash.svg',
        //shadowUrl: 'img/zoo-white.svg',
        iconSize: [30, 30],
        shadowSize: [40, 40],
        shadowAnchor: [19,19]
    });
    
    var hazardMarker = L.icon({
        iconUrl: 'img/caution.svg',
        //shadowUrl: 'img/baseball-white.svg',
        iconSize: [30, 30],
        shadowSize: [32, 32],
        shadowAnchor: [15,15]
    });
    
    
    
    
    
    // Get CARTO selection as GeoJSON and Add to Map
    $.getJSON(getURL+'SELECT * FROM comment&api_key='+apiKey, function(data) {
        var features = data.features
        
        var Comments = L.geoJSON(features, {
            pointToLayer: function(feature,latlng){
                var type = feature.properties['type'];
                if (type == 'Animal Sighting'){
                    return L.marker(latlng, {icon: animalMarker});
                } else if (type == 'Obstruction'){
                    return L.marker(latlng, {icon: obsMarker});
                } else if (type == 'Litter'){
                    return L.marker(latlng, {icon: litterMarker});    
                    
                } else {
                return L.marker(latlng, {icon: hazardMarker});
                }
            },
            onEachFeature: hoverComments
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      /*  
        Comments = L.geoJson(features, {
            
             pointToLayer: function(feature,latlng){
                var type = feature.properties['type'];
                if (type == 'Animal Sighting'){
                    return L.marker(latlng, {icon: animalMarker});
                } else if (type == 'Obstruction'){
                    return L.marker(latlng, {icon: obsMarker});
                } else if (type == 'Litter'){
                    return L.marker(latlng, {icon: litterMarker});  
                } else (type == 'Hazard'){
                    return L.marker(latlng, {icon: hazardMarker});    
                }
            
            },
            
            onEachFeature: hoverComments
        }});*/
                           
    
        comments.push(Comments);
        
        Comments.addTo(map);
        
    
    })};



function createAbout(){
    $('#about-button').click(function() {
        $('#overlay').fadeIn(300);  
    });
    $('#close-about').click(function() {
        $('#overlay').fadeOut(300);
    });
};















$(document).ready(createMap);
$(document).ready(createAbout);


