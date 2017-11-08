Members = new Mongo.Collection('members');

Meteor.methods({
  memberLogin: function(idUser) {
    Members.update(
      {idUser:idUser},
      {$set:{
        loginAt:moment().toDate()}
      }
    );
    return {result:true}
  },
  memberDelete: function(idUser) {
    Meteor.users.remove(idUser);
    Members.remove({idUser:idUser});
    return {result:true}
  },
});
