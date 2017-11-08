Meteor.publish('memberEvents', function() {
  return MemberEvents.find({"apiKey":Meteor.userId()});
});
