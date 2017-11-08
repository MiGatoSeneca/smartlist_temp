Meteor.publish('members', function() {
  return Members.find({idUser : Meteor.userId()});
});
Meteor.publish('adminMembers', function() {
  return Members.find();
});
