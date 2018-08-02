
import { Template } from 'meteor/templating';
 
import { Phone } from '../api/tasks.js';
import './body.html';

import './task.html';
 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Phone.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Phone.remove(this._id);
  },
});

Template.body.helpers({
  phone() {
  // Show newest tasks at the top
  return Phone.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .phone'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Phone.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});