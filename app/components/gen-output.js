import Ember from 'ember';
/* global download */
export default Ember.Component.extend({

  isData:Ember.computed('data', function() {
    var data=this.get('data');
    return data&&(data.length>0)?true:false;
  }),
  json: Ember.computed('data','isData', function() {
    return this.get('isData')?JSON.stringify(this.get('data'),null,'\t'):"No data";
  }),
  csv:Ember.computed('data','isData', function() {
    if(this.get('isData')){
      var data=this.get('data');
      var str="";
      for(var i=0;i<data.length;i++){
        str+=data[0].lat+","+data[1].lon+"\n";
      }
      return str;
    }
    return "No data";
  }),
  actions:{
    downloadJSON: function(){
      //window.open('data:application/json,' + encodeURIComponent(this.get('json')));
      download(this.get('json'),"locations.json", "application/json");
    },
    downloadCSV: function(){
      window.open('data:text/csv,' + encodeURIComponent(this.get('csv')));
    }
  }

});
