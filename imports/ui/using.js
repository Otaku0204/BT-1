
import { Template } from 'meteor/templating';
 
import { Using } from '../api/tasks.js';
import './body.html';

import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Using.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Using.remove(this._id);
  },
});

Template.body.helpers({
  using() {
  // Show newest tasks at the top
  return Using.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .using'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Using.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});