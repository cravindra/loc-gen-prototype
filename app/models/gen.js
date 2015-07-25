import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  p1Text: DS.attr('string', {default: ''}),
  p2Text: DS.attr('string', {default: ''}),
  p1: Ember.computed('p1Text', function () {
    var isValid = false, isDirty = false, loc = {};
    var text = this.get('p1Text');
    if (!Ember.isEmpty(this.get('p1Text'))) {
      isDirty = text.length > 2 ? true : false;
      try {
        var splits = text.trim().split(',', 2);
        loc.lat = parseFloat(splits[0]);
        loc.lon = parseFloat(splits[1]);
        isValid = ( (!isNaN(loc.lat)) && loc.lat < 90 && loc.lat > -90 ) && ( (!isNaN(loc.lon)) && loc.lon < 180 && loc.lon > -180);
      }
      catch (e) {
        console.log('GEN.JS> ' + e);
      }

    }
    return {
      isValid: isValid,
      isDirty: isDirty,
      loc: loc
    }
  }),
  p2: Ember.computed('p2Text', function () {
    var isValid = false, isDirty = false, loc = {};
    var text = this.get('p2Text');
    if (!Ember.isEmpty(text)) {
      isDirty = text.length > 2 ? true : false;
      try {
        var splits = text.trim().split(',', 2);
        loc.lat = parseFloat(splits[0]);
        loc.lon = parseFloat(splits[1]);
        isValid = ( (!isNaN(loc.lat)) && loc.lat < 90 && loc.lat > -90 ) && ( (!isNaN(loc.lon)) && loc.lon < 180 && loc.lon > -180);
      }
      catch (e) {
        console.log('GEN.JS> ' + e);
      }

    }
    return {
      isValid: isValid,
      isDirty: isDirty,
      loc: loc
    }
  }),

  isValidated: Ember.computed('p1', 'p2', function () {

    return this.get('p1').isValid && this.get('p2').isValid;
  }),
  bounds: Ember.computed('isValidated', 'p1', 'p2', function () {

    if (this.get('isValidated')) {
      var sw = {}, ne = {}, p1 = this.get('p1'), p2 = this.get('p2');

      sw.lat = (p1.loc.lat < p2.loc.lat) ? p1.loc.lat : p2.loc.lat;
      sw.lon = (p1.loc.lon < p2.loc.lon) ? p1.loc.lon : p2.loc.lon;
      ne.lat = (p1.loc.lat > p2.loc.lat) ? p1.loc.lat : p2.loc.lat;
      ne.lon = (p1.loc.lon > p2.loc.lon) ? p1.loc.lon : p2.loc.lon;

      return {sw: sw, ne: ne};
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
  },
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

});
