
import { Template } from 'meteor/templating';
 
import { Map } from '../api/tasks.js';
import './body.html';

import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Map.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Map.remove(this._id);
  },
});

Template.body.helpers({
  map() {
  // Show newest tasks at the top
  return Map.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .map'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Map.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});