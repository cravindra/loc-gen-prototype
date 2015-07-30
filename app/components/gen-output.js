import Ember from 'ember';
/* global download */
export default Ember.Component.extend({

  isData: Ember.computed('data.points', function () {
    var data = this.get('data.points');
    return data && (data.length > 0) ? true : false;
  }),
  json: Ember.computed('data.points', 'isData', function () {
    return this.get('isData') ? JSON.stringify(this.get('data.points'), null, '\t') : "No data";
  }),
  csv: Ember.computed('data.points', 'isData', function () {
    if (this.get('isData')) {
      var data = this.get('data.points');
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += data[i].lat + "," + data[i].lng + "\n";
      }
      return str;
    }
    return "No data";
  }),
  meta: Ember.computed('data.p1Text', 'data.p2Text', function () {
    var obj = this.get('data'),
      hash = obj.getProperties('p1', 'p2', 'isValidated', 'bounds', 'points','mapOptions');

    return JSON.stringify(hash, null, '\t');
  }),
  actions: {
    downloadJSON: function () {
      window.open('data:application/json,' + encodeURIComponent(this.get('json')));
      //download(this.get('json'), "locations.json", "application/json");
    },
    downloadCSV: function () {
      window.open('data:text/csv,' + encodeURIComponent(this.get('csv')));
    }
  }

});
