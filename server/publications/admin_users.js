Meteor.publish('adminUsers', function() {
  return Meteor.users.find();
});
