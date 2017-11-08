Template.adminDashboard.helpers({
  usersCount: function(field) {
    return Members.find({type:"member"}).count();
  }
});
