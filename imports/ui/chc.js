
import { Template } from 'meteor/templating';
 
import { Chc } from '../api/tasks.js';
import './body.html';

import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Chc.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Chc.remove(this._id);
  },
});

Template.body.helpers({
  chc() {
  // Show newest tasks at the top
  return Chc.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .chc'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Chc.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});