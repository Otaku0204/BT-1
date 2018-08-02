import { Mongo } from 'meteor/mongo';
 
export const Map = new Mongo.Collection('map');

export const Phone = new Mongo.Collection('phone');

export const Dvhc = new Mongo.Collection('dvhc');

export const Chc = new Mongo.Collection('chc');

export const Place = new Mongo.Collection('place');

export const Using = new Mongo.Collection('using');