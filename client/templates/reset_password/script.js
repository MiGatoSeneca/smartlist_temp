Template.resetPassword.onCreated(function() {
  Session.set('resetPasswordErrors', {});
  Meteor.logout();
});

Template.resetPassword.helpers({
  errorMessage: function(field) {
    return Session.get('resetPasswordErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('resetPasswordErrors')[field] ? 'has-error' : '';
  },
  errorExists: function (field) {
    return !!Session.get('resetPasswordErrors')[field] ? true : false;
  }
});

Template.resetPassword.events({
  'submit form': function(e) {
    e.preventDefault();

    var user = {
      password: $(e.target).find('[name=password]').val()
    };

    var errors = validateResetPassword(user);

    if(_.size(errors)>0){
      return Session.set('resetPasswordErrors', errors);
    }


    Accounts.resetPassword(this.token, user.password, function(err,res){
      console.log(err);
      if(err){
        if(err.error === 403){
          errors.form = 'El código de recuperación ha expirado, solicítalo de nuevo';
        }else{
          errors.form = 'Ha ocurrido un error, vuelve a intentarlo';
        }
        return Session.set('resetPasswordErrors', errors);
      }else{
        swal({
          title: 'Contraseña actualizada',
          text: 'Se ha actualizado tu contraseña de accedo, accede a tu cuenta y utilízala para loguearte en el sistema.',
          type: 'success',
          confirmButtonText: 'Cerrar'
        },
        function() {
          Router.go('/login/')
        });
      }
    });

  }
});

validateResetPassword = function (user) {
  var errors = {};

  if(validate("password",user.password))
    errors.password = validate("password",user.password)

  return errors;
}
