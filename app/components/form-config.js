import Ember from 'ember';

export default
  Ember.Component.extend({
    actions: {
      clear: function () {
        this.sendAction('clear');
      }
    }
  });
