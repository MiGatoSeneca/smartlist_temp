Template.blockNavbar.helpers({
  user:function(){
    return Members.findOne({idUser:Meteor.userId()});
  }
});
