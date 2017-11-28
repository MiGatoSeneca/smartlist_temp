Meteor.publish('memberEventsResume', function() {
  return MemberEventsResume.find({"apiKey":Meteor.userId()});
});

Meteor.publish('adminMemberEventsResume', function() {
  return MemberEventsResume.find({});
});
