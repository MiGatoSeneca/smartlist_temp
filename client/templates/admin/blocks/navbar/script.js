Template.blockAdminNavbar.helpers({
  user:function(){
    return Members.findOne({idUser:Meteor.userId()});
  }
});
