Template.adminUsers.helpers({
  users: function(field) {
    var users = Meteor.users.find().fetch();
    return Meteor.users.find();
  }
});
Template.adminUsersTableItem.helpers({
  isNotAdmin: function(type){
    return (type !== "admin") ? true : false;
  },
  member: function() {
    var member = Members.findOne({idUser:this._id});
    if(member){
      member.login =  moment(member.loginAt).format("D/M/Y HH:mm")
    }else{
      member = {
        fullName : "--",
        email : "--",
        url : "--",
        plan : "--",
        type : "member",
        login : "--"
      }
    }
    return member;
  },
  created:function(){
    return moment(this.createdAt).format("D/M/Y HH:mm")
  }
});

Template.adminUsersTableItem.events({
  'click .delete': function(e) {
    e.preventDefault();
    var currentIdUser = this._id;
    swal({
      title: '¿Estás seguro?',
      text: "Estás a punto de eliminar un usuario, esta operación no podrá deshacerse",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#FF4136',
      confirmButtonText: 'Borrar'
    },
    function(){
      Meteor.call('memberDelete',currentIdUser,function(err,res) {
        if(err){
          swal({
            title: 'Ha ocurrido un error',
            text: "No se ha podido eliminar actualizar ERROR: "+err.reason,
            type: 'error',
            confirmButtonText: 'Cerrar'
          });
        }
      });
    });
  }
})
