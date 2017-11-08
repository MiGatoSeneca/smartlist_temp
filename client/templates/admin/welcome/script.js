Template.adminWelcome.helpers({
  isLoged: function(){
    return (Meteor.userId() !== null) ? true : false;
  }
})
