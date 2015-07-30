import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['map-canvas'],
  setView: function () {
    try {
      var map = this.get('map'),
        center = [this.get('lat'), this.get('lng')],
        zoom = this.get('zoom');


      map.setView(center, zoom);
    } catch (e) {
      console.log('LM: setView(): ' + e);
    }


  }.observes('lat', 'lng', 'zoom'),
  fit: function () {
    try {
      var b = this.get('bounds');
      var map = this.get('map');
      var bounds = b ? L.latLngBounds([b.sw.lat, b.sw.lng], [b.ne.lat, b.ne.lng]) : null;
      //console.log("LM: fitting: " + JSON.stringify([b, bounds]));
      if (map && bounds && bounds.isValid()) {
        //map.fitBounds(bounds, {padding: [10, 10]});
        map.fitBounds(bounds);
      }
    } catch (e) {
      console.log('LM: fit(): ' + e);
    }


  }.observes('bounds'),
  markerManager: function () {
    try {
      var map = this.get('map'), markers = this.get('markers'), layers = this.get('markerLayer');
      if (!layers) {
        layers = L.layerGroup();
        this.set('markerLayer', layers);
      }
      layers.clearLayers();
      if (markers.length > 0) {
        for (var i = 0; i < markers.length; i++) {
          var marker=L.marker(markers[i]);
          layers.addLayer(marker);
        }
        layers.addTo(map)
      }
      return layers;
    } catch (e) {
      console.log('LM: markerLayer(): ' + e);
    }

  }.observes('markers'),
  didInsertElement: function () {
    var map = L.map(this.get('element'));
    this.set('map', map);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.setView();
    map.fitWorld();
    map.locate({setView: true, maxZoom: 15});

    map.on('click', function (mouseEvent) {
      this.send('click', mouseEvent);
    }, this);

    map.invalidateSize();
  },
  willRemoveElement: function () {
    var map = this.get('map');
    if (map) {
      map.remove();
    }
  },
  actions: {
    click: function (mouseEvent) {
      this.sendAction("click", mouseEvent);
    }
  }
});
