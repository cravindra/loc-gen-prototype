import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  swText: DS.attr('string', {default: ''}),
  neText: DS.attr('string', {default: ''}),
  swIsDirty: Ember.computed('swText', function () {
    return !Ember.isEmpty(this.get('swText'));
  }),
  swIsValid: Ember.computed('sw', function () {
    var sw = this.get('sw');
    return (sw) && ( (!isNaN(sw.lat)) && sw.lat < 90 && sw.lat > -90 ) && ( (!isNaN(sw.lon)) && sw.lon < 180 && sw.lon > -180);
  }),
  sw: Ember.computed('swText', function () {
    var text = this.get('swText');
    if (text) {
      var str = text.trim();
      var splits = str.split(',', 2);
      var latitude = parseFloat(splits[0]);
      var longitude = parseFloat(splits[1]);
      return {lat: latitude, lon: longitude};
    }

    return null;
  }),
  neIsDirty: Ember.computed('neText', function () {
    return !Ember.isEmpty(this.get('neText'));
  }),
  neIsValid: Ember.computed('ne', function () {
    var ne = this.get('ne');
    return (ne) && ( (!isNaN(ne.lat)) && ne.lat < 90 && ne.lat > -90 ) && ( (!isNaN(ne.lon)) && ne.lon < 180 && ne.lon > -180);
  }),
  ne: Ember.computed('neText', function () {
    var text = this.get('neText');
    if (text) {
      var str = text.trim();
      var splits = str.split(',', 2);
      var latitude = parseFloat(splits[0]);
      var longitude = parseFloat(splits[1]);
      return {lat: latitude, lon: longitude};
    }

    return null;
  }),
  isValidated: Ember.computed('neIsValid', 'swIsValid', function () {

    return this.get('swIsValid') && this.get('neIsValid');
  }),
  bounds: Ember.computed('isValidated', 'sw', 'ne', function () {

    if (this.get('isValidated')) {
      return {sw: this.get('sw'), ne: this.get('ne')};
    }
    return null;
  }),
  points: Ember.computed('isValidated', 'bounds', function () {

    if (this.get('isValidated')) {
      var bounds = this.get('bounds');

      var lat1 = bounds.sw.lat, lat2 = bounds.ne.lat, lon1 = bounds.sw.lon, lon2 = bounds.ne.lon;

      return this.getLocations(lat1, lon1, lat2, lon2, 10);
    }
    return [];
  }),
  getRandomArbitrary: function (min, max) {
    return Math.random() * (max - min) + min;
  }
  ,
  getLocations: function (lat1, lon1, lat2, lon2, number) {
    number = number ? number : 30;
    var res = [];
    for (var i = 0; i < number; i++) {
      var lat = this.getRandomArbitrary(lat1, lat2);
      var lon = this.getRandomArbitrary(lon1, lon2);
      res.push({lat: lat, lon: lon});
    }
    console.log(JSON.stringify(res));
    //return JSON.stringify(res);
    return res;
  }

})
  ;
