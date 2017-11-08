Template.login.onCreated(function() {
  Session.set('loginErrors', {});
  Meteor.logout();
});

Template.login.helpers({
  errorMessage: function(field) {
    return Session.get('loginErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('loginErrors')[field] ? 'has-error' : '';
  },
  errorExists: function (field) {
    return !!Session.get('loginErrors')[field] ? true : false;
  }
});

Template.login.events({
  'submit form': function(e) {
    e.preventDefault();

    var admin = {
      email: $(e.target).find('[name=email]').val(),
      password: $(e.target).find('[name=password]').val()
    };

    var errors = validateLogin(admin);

    if(_.size(errors)>0){
      return Session.set('loginErrors', errors);
    }

    Meteor.loginWithPassword(admin.email, admin.password,function(err){
      if(err){
        errors.form = 'Email o contraseña no válidos';
        return Session.set('loginErrors', errors);
      }else{
        Meteor.call('memberLogin',Meteor.userId(),function(err,res) {
          Router.go('/dashboard')
        });
      }
    });
  }
});

validateLogin = function (admin) {
  var errors = {};
  if (!admin.email)
    errors.email = 'Es necesario escribir un correo electrónico';
  if (!admin.password)
    errors.password =  'Es necesario escribir una contraseña';
  return errors;
}
