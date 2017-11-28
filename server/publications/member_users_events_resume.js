Meteor.publish('memberUsersEventsResume', function() {
  return MemberUsersEventsResume.find({"apiKey":Meteor.userId()});
});

Meteor.publish('adminUsersMemberEventsResume', function() {
  return MemberUsersEventsResume.find({});
});
