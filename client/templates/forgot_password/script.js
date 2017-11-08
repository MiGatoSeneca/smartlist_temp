Template.forgotPassword.onCreated(function() {
  Session.set('forgotErrors', {});
  Meteor.logout();
});

Template.forgotPassword.helpers({
  errorMessage: function(field) {
    return Session.get('forgotErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('forgotErrors')[field] ? 'has-error' : '';
  },
  errorExists: function (field) {
    return !!Session.get('forgotErrors')[field] ? true : false;
  }
});

Template.forgotPassword.events({
  'submit form': function(e) {
    e.preventDefault();

    var user = {
      email: $(e.target).find('[name=email]').val()
    };

    var errors = validateForgotPassword(user);

    if(_.size(errors)>0){
      return Session.set('forgotErrors', errors);
    }

    var options = {
      email : user.email
    }

    Accounts.forgotPassword(options, function(err,res){
      if(err){
        if(err.error === 403){
          errors.email = 'Este correo no se encuentra registrado';
        }else{
          errors.form = 'Ha ocurrido un error, vuelve a intentarlo';
        }
        return Session.set('forgotErrors', errors);
      }else{
        swal({
          title: 'Recuperación de contraseña',
          text: 'Revisa tu correo electrónico, te hemos enviado el link que tienes que utilizar para poder restablecer tu contraseña.',
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

validateForgotPassword = function (user) {
  var errors = {};

  if(validate("email",user.email))
    errors.email = validate("email",user.email)

  return errors;
}
