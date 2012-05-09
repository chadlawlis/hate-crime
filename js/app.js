var m, interaction, mm = com.modestmaps;
var baseLayer = 'mapbox.world-black';
var activeLayer = 'chadlawlis.hate-10-testing';
var agencyLayer = 'chadlawlis.hate-dot-10-testing';
var isSet = false;
var layers = [
        baseLayer,
        activeLayer,
        agencyLayer
    ];

function buildMap(layers) {
    var url = 'http://api.tiles.mapbox.com/v3/' + layers + '.jsonp';
    wax.tilejson(url, function(tilejson) {
        var m = new MM.Map('map', new wax.mm.connector(tilejson));
        console.log(m.coordinate);
        wax.mm.interaction()
          .map(m)
          .tilejson(tilejson)
          .on(wax.tooltip().animate(false).parent($('#tooltip')[0]).events());

        if(!isSet) {
            m.setCenterZoom({ lat: 38, lon: -76 }, 4);
            isSet = true;
        } else {
            m.setCenterZoom({ lat: 38, lon: -76 }, 4);
        }
        wax.mm.zoomer(m, tilejson).appendTo($('#controls')[0]);
        wax.mm.legend(m, tilejson).appendTo(m.parent);
      }
    );
    
    // map.setZoomRange(3, 9);
}

$(function () {

    buildMap(layers);

    // Layer Selection
    $('#map-navigation').find('a').click(function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            var activeLayer = $(this).attr('data-layer');
            var activeYear = $(this).attr('data-year');
            var agencyLayer = 'chadlawlis.hate-dot-' + activeYear + '-testing';

            $('ul.layers li a').removeClass('active');
            $(this).addClass('active');

            if ($('a.toggle-agencies').hasClass('active')) {
                layers = [
                    baseLayer,
                    activeLayer,
                    agencyLayer
                ];
            } else {
                layers = [
                    baseLayer,
                    activeLayer
                ];
            }
            buildMap(layers);
            $('a.toggle-agencies').attr('data-layer', agencyLayer);
        }
    });

    $('a.toggle-agencies').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            layers = [
                baseLayer,
                activeLayer
            ]
            buildMap(layers);
            $(this).removeClass('active').text('Toggle On');
        } else {
            // Overlay data on top of an existing map per year
            var agencyLayer = $(this).attr('data-layer');
            layers = [
                baseLayer,
                activeLayer,
                agencyLayer
            ]
            buildMap(layers);
            $(this).addClass('active').text('Toggle Off');
        }
    });
});