import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    var store=this.store;
    return this.store.createRecord('gen');
  },

  actions: {
   
    clear: function () {
      var model=this.modelFor(this.routeName);
      model.set('p1Text','');
      model.set('p2Text','');
    }
  }

});
