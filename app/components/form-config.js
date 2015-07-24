import Ember from 'ember';

export default
  Ember.Component.extend({
    actions: {
      generate: function () {
        this.sendAction('generate');
      },
      clear: function () {
        this.sendAction('clear');
      }
    }/*,
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
    bounds: Ember.computed('neIsValid', 'swIsValid','sw','ne', function () {

      if(this.get('swIsValid') && this.get('neIsValid')){
        return {sw: this.get('sw'), nw: this.get('ne')};
      }
      return null;
    })*/

  });
