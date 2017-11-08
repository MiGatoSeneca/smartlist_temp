Template.welcome.helpers({
  isLoged: function(){
    return (Meteor.userId() !== null) ? true : false;
  }
})
