Router.configure({
  loadingTemplate: 'blockLoading',
  notFoundTemplate: 'error404'
});


Router.onBeforeAction(function() {
  //$this.bodyParser.urlencoded({ extended: true }));
  if(Meteor.isClient){
    currentUser = Meteor.userId();
    if(!currentUser){
      this.redirect('/login');
    }else{
      this.next();
    }
  }else{
    this.next();
  }
},{except: [
  'welcome',
  'login',
  'signup',
  'forgotPassword',
  'resetPassword',
  'terms',
  'adminWelcome',
  'adminLogin',
  'adminSignup',
  'documentation'
]});

Router.route('/', {
  name: 'welcome',
  layoutTemplate: 'layoutFloatForm'
});

Router.route('/docs', {
  name: 'documentation',
  layoutTemplate: 'layoutDocumentation'
});


Router.route('/login', {
  name: 'login',
  layoutTemplate: 'layoutFloatForm'
});

Router.route('/signup', {
  name: 'signup',
  layoutTemplate: 'layoutFloatForm'
});

Router.route('/forgot-password', {
  name: 'forgotPassword',
  layoutTemplate: 'layoutFloatForm'
});

Router.route('/reset-password/:token', {
  name: 'resetPassword',
  layoutTemplate: 'layoutFloatForm',
  data: function() {
    return {
      token: this.params.token
    }
  }
});

Router.route('/terms', {
  name: 'terms',
  layoutTemplate: 'layoutFloat'
});

Router.route('/dashboard', {
  name: 'dashboard',
  layoutTemplate: 'layoutApp',
  waitOn: function() {
    return [
      Meteor.subscribe('members'),
      Meteor.subscribe('memberEventsResume'),
      Meteor.subscribe('memberUsersResume')
    ]
  }
});

Router.route('/settings', {
  name: 'settings',
  layoutTemplate: 'layoutApp',
  waitOn: function() {
    return [
      Meteor.subscribe('members')
    ]
  }
});


Router.route('/install', {
  name: 'install',
  layoutTemplate: 'layoutApp',
  waitOn: function() {
    return [
      Meteor.subscribe('members')
    ]
  }
});

Router.route('/account', {
  name: 'account',
  layoutTemplate: 'layoutApp',
  waitOn: function() {
    return [
      Meteor.subscribe('members')
    ]
  }

});

Router.route('/account/edit', {
  name: 'accountEdit',
  layoutTemplate: 'layoutApp',
  waitOn: function() {
    return [
      Meteor.subscribe('members')
    ]
  }
});
