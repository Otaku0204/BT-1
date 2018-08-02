
import { Template } from 'meteor/templating';
 
import { Place } from '../api/tasks.js';
import './body.html';

import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Place.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Place.remove(this._id);
  },
});

Template.body.helpers({
  place() {
  // Show newest tasks at the top
  return Place.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .place'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Place.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});