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

  didInsertElement: function () {
    var map = L.map(this.get('element'));
    this.set('map', map);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.setView();

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
