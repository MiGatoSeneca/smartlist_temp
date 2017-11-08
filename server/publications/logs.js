Meteor.publish('log', function() {
  return Log.find();
});
