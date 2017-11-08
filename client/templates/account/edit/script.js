Template.accountEdit.onCreated(function() {
  Session.set('accountEditErrors', {});
  Session.set('currentMemberId', '');

});

Template.accountEdit.helpers({
  user: function(){
    var member=Members.findOne({idUser:Meteor.userId()});
    Session.set('currentMemberId', member._id);
    return member
  },
  errorMessage: function(field) {
    return Session.get('accountEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('accountEditErrors')[field] ? 'has-error' : '';
  },
  errorExists: function (field) {
    return !!Session.get('accountEditErrors')[field] ? true : false;
  }
});

Template.accountEdit.events({
  'keyup input': function(e) {
    errors = Session.get('accountEditErrors')
    errors[$(e.target).attr("name")] = "";
    return Session.set('accountEditErrors', errors);
  },
  'change input': function(e) {
    errors = Session.get('accountEditErrors')
    errors[$(e.target).attr("name")] = "";
    return Session.set('accountEditErrors', errors);
  },
  'submit form': function(e) {
    e.preventDefault();

    var user = {
      fullName: $(e.target).find('[name=fullName]').val(),
      email: $(e.target).find('[name=email]').val(),
      url: $(e.target).find('[name=url]').val(),
    };

    var errors = validateAccountEdit(user);

    if(_.size(errors)>0){
      return Session.set('accountEditErrors', errors);
    }

    Members.update(Session.get("currentMemberId"),{
      $set:{
        fullName:user.fullName,
        url:user.url
      }
    });
    swal({
      title: 'Datos Actualizados',
      text: 'Se han guardado los datos correctamente',
      type: 'success',
      confirmButtonText: 'Cerrar'
    },
    function() {
      Router.go('/account')
    });
  }
});

validateAccountEdit = function (user) {
  var errors = {};

  if(validate("fullName",user.fullName))
    errors.fullName = validate("fullName",user.fullName)

  if(validate("url",user.url))
    errors.url = validate("url",user.url)

  return errors;
}
