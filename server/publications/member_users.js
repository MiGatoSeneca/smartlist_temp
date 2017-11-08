Meteor.publish('memberUsers', function() {
  return MemberUsers.find({"apiKey":Meteor.userId()});
});
