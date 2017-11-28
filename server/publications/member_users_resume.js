Meteor.publish('memberUsersResume', function() {
  return MemberUsersResume.find({"apiKey":Meteor.userId()});
});

Meteor.publish('adminMemberUsersResume', function() {
  return MemberUsersResume.find({});
});
