Template.adminLogin.onCreated(function() {
  Session.set('adminLoginErrors', {});
  Meteor.logout();
});

Template.adminLogin.helpers({
  errorMessage: function(field) {
    return Session.get('adminLoginErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('adminLoginErrors')[field] ? 'has-error' : '';
  },
  errorExists: function (field) {
    return !!Session.get('adminLoginErrors')[field] ? true : false;
  }
});

Template.adminLogin.events({
  'submit form': function(e) {
    e.preventDefault();

    var admin = {
      email: $(e.target).find('[name=email]').val(),
      password: $(e.target).find('[name=password]').val()
    };

    var errors = validateAdminLogin(admin);

    if(_.size(errors)>0){
      return Session.set('adminLoginErrors', errors);
    }

    Meteor.loginWithPassword(admin.email, admin.password,function(err){
      if(err){
        errors.form = 'Email o contraseña no válidos';
        return Session.set('adminLoginErrors', errors);
      }else{
        Router.go('/admin/dashboard')
      }
    });
  }
});

validateAdminLogin = function (admin) {
  var errors = {};
  if (!admin.email)
    errors.email = 'Es necesario escribir un correo electrónico';
  if (!admin.password)
    errors.password =  'Es necesario escribir una contraseña';
  return errors;
}
