Template.adminUser.helpers({
  users: function(field) {
    return Members.find({type:{$ne:"admin"}});
  }
});
