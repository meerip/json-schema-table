var _ = require('lodash');

exports.findProperty = findProperty;

function findProperty(name, properties) {
  var property = properties[name];
  if (property === void 0) {
    property = _.reduce(properties, function(result, prop, propName) {
        if (result === void 0 && name === propName) {
          return prop;
        }
      }, void 0) ||
      _.reduce(properties, function(result, prop) {
        if (result === void 0 && prop.field &&
          name === prop.field) {
          return prop;
        }
      }, void 0);
    if (property === void 0) {
      throw new Error('Property "' + name + '" not found');
    }
  }
  return property;
}

exports.isInUniqueProperty = isInUniqueProperty;

function isInUniqueProperty(column, schema) {
  for (var i = 0; schema.unique && i < schema.unique.length; i++) {
    if (isInArray(column, schema.unique[i], schema)) {
      return true;
    }
  }
  return false;
}

exports.isInArray = isInArray;

function isInArray(name, array, schema) {
  var found = false;
  var property = findProperty(name, schema.properties);
  _.forEach(array, function(element) {
    if (name === element || name === property.field) {
      found = true;
      return false;
    }
  });
  return found;
}