Template.dashboard.onCreated(function() {
  Session.set('period', "today");
});

Template.dashboard.helpers({
  hasMemberUsers : function(){
    return (MemberUsers.find().count() > 0)
  },
  countMemberUsers: function(){
    var dayPeriod = getMomentPeriod(Session.get('period'));
    return MemberUsers.find({
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).count();
  },
  countMemberEvents: function(event){
    var dayPeriod = getMomentPeriod(Session.get('period'));
    return MemberEvents.find({
      event : event,
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).count();
  },
  createChart: function () {
    var dayPeriod = getMomentPeriod(Session.get('period'));
    var countUsers = MemberUsers.find({createdAt : {$gte : dayPeriod.start,$lt : dayPeriod.end}}).count();

    Meteor.defer(function() {

      Highcharts.chart('chart', {
        chart: {
          type: 'spline'
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        },
        series: [{
          name: 'Installation',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        },{
          name: 'Installation2',
          data: [4394, 5253, 5177, 6958, 9731, 11931, 17133, 14175]
        }]
      });
    });
  },
  createPolar: function () {
    var dayPeriod = getMomentPeriod(Session.get('period'));
    var countUsers = MemberUsers.find({createdAt : {$gte : dayPeriod.start,$lt : dayPeriod.end}}).count();

    Meteor.defer(function() {

      Highcharts.chart('polar', {
          chart: {
              polar: true
          },
          pane: {
              startAngle: 0,
              endAngle: 360
          },
          xAxis: {
              tickInterval: 45,
              min: 0,
              max: 360,
              labels: {
                  formatter: function () {
                    categories = ['Marca', 'Color', 'Talla', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
                    tmp = this.value / 45;
                    return categories[tmp];
                  }
              }
          },
          yAxis: {
              min: 0
          },
          plotOptions: {
              series: {
                  pointStart: 0,
                  pointInterval: 45
              },
              column: {
                  pointPadding: 0,
                  groupPadding: 0
              }
          },

          series: [{
              type: 'area',
              name: 'Area',
              data: [1, 8, 2, 7, 3, 6, 4, 5]
          }]
      });

    });
  }

});

Template.dashboard.events({
  'click .change_period': function(e) {
    e.preventDefault();
    Session.set('period', $(e.target).attr('data-value'));
  }

});
