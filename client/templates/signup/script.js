Template.signup.onCreated(function() {
  Session.set('signupErrors', {});
  Meteor.logout();
});

Template.signup.helpers({
  errorMessage: function(field) {
    return Session.get('signupErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('signupErrors')[field] ? 'has-error' : '';
  },
  errorExists: function (field) {
    return !!Session.get('signupErrors')[field] ? true : false;
  }
});

Template.signup.events({
  'keyup input': function(e) {
    errors = Session.get('signupErrors')
    errors[$(e.target).attr("name")] = "";
    return Session.set('signupErrors', errors);
  },
  'change input': function(e) {
    errors = Session.get('signupErrors')
    errors[$(e.target).attr("name")] = "";
    return Session.set('signupErrors', errors);
  },
  'submit form': function(e) {
    e.preventDefault();

    var user = {
      fullName: $(e.target).find('[name=fullName]').val(),
      email: $(e.target).find('[name=email]').val(),
      password: $(e.target).find('[name=password]').val(),
      url: $(e.target).find('[name=url]').val(),
      plan: $(e.target).find('[name=plan]').val(),
      terms: $(e.target).find('[name=terms]').is(':checked')
    };

    var errors = validateSignup(user);

    if(_.size(errors)>0){
      return Session.set('signupErrors', errors);
    }

    Accounts.createUser({
      username: user.email,
      email: user.email,
      password: user.password
    },function(err,res){
      if(err){
        errors.form = "El usuario ya está registrado";
        return Session.set('signupErrors', errors);
      }else{
        currentUser = Meteor.user();
        var avatar_bg = intToRGB(hashCode(user.fullName));
        Members.insert({
          idUser:currentUser._id,
          username:user.username,
          fullName:user.fullName,
          email: user.email,
          url:user.url,
          plan:user.plan,
          terms:user.terms,
          type:"member",
          avatar:"<div class='avatar-circle' style='background-color:#"+avatar_bg+"'><span class='initials'>"+user.fullName[0].toUpperCase()+user.fullName[1].toUpperCase()+"</span></div>"
        });
        Router.go('/dashboard');
      }
    });
  }
});

validateSignup = function (user) {
  var errors = {};

  if(validate("fullName",user.fullName))
    errors.fullName = validate("fullName",user.fullName)

  if(validate("email",user.email))
    errors.email = validate("email",user.email)

  if(validate("password",user.password))
    errors.password = validate("password",user.password)

  if(validate("url",user.url))
    errors.url = validate("url",user.url)

  if(validate("plan",user.plan))
    errors.plan = validate("plan",user.plan)

  if(validate("terms",user.terms))
    errors.terms = validate("terms",user.terms)

  return errors;
}
