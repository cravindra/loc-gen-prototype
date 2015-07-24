import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    var store=this.store;
    return this.store.createRecord('gen',{
      id:1,
      swText:'1,1',
      neText:'2,2'
    });
  },

  actions: {
    generate: function () {

    },
    clear: function () {
      var model=this.modelFor(this.routeName);
      model.set('swText','');
      model.set('neText','');
    }
  }

});
