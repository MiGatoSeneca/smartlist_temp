Template.adminUserDashboard.onCreated(function() {
  Session.set('period', "today");

});

Template.adminUserDashboard.helpers({
  hasMemberUsers : function(){
    return (MemberUsersResume.find().count() > 0)
  },
  countMemberUsers: function(){
    var dayPeriod = getMomentPeriod(Session.get('period'));
    var memberUsersResumes = MemberUsersResume.find({
      apiKey: this.member.idUser,
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).fetch();

    var totalCount = 0;
    memberUsersResumes.forEach(function(memberUsersResume) {
      totalCount += memberUsersResume.count;
    });
    if(totalCount == 0){
      totalCount = "--";
    }
    return totalCount;
  },
  countMemberEvents: function(event,abTest){
    var dayPeriod = getMomentPeriod(Session.get('period'));
    var MemberEventsResumes = MemberEventsResume.find({
      apiKey: this.member.idUser,
      event : event,
      abTest : abTest,
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).fetch();
    var totalCount = 0;
    MemberEventsResumes.forEach(function(MemberEventsResume) {
      totalCount += MemberEventsResume.count;
    });

    if(totalCount == 0){
      totalCount = "--";
    }

    return totalCount;

  },
  averageMemberEvents: function(event,abTest){
    var dayPeriod = getMomentPeriod(Session.get('period'));
    var MemberEventsResumes = MemberEventsResume.find({
      apiKey: this.member.idUser,
      event : event,
      abTest : abTest,
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).fetch();

    var totalCountEvents = 0;
    MemberEventsResumes.forEach(function(MemberEventsResume) {
      totalCountEvents += MemberEventsResume.count;
    });


    var memberUsersResumes = MemberUsersResume.find({
      apiKey: this.member.idUser,
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).fetch();

    var totalCountUsers = 0;
    memberUsersResumes.forEach(function(memberUsersResume) {
      totalCountUsers += memberUsersResume.count;
    });

    if(abTest == "y"){
      users = totalCountUsers * 0.9
    }else{
      users = totalCountUsers * 0.1
    }
    if(totalCountUsers == 0){
      averageMemberEvents = "--";
    }else{
      averageMemberEvents = parseFloat(totalCountEvents / users).toFixed(2);
    }

    return averageMemberEvents;

  },

  averageDifferenceMemberEvents: function(event){
    var dayPeriod = getMomentPeriod(Session.get('period'));

    var memberUsersResumes = MemberUsersResume.find({
      apiKey: this.member.idUser,
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).fetch();

    var totalCountUsers = 0;

    memberUsersResumes.forEach(function(memberUsersResume) {
      totalCountUsers += memberUsersResume.count;
    });



    var MemberEventsResumes = MemberEventsResume.find({
      apiKey: this.member.idUser,
      event : event,
      abTest : "y",
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).fetch();

    var totalCountEvents = 0;
    MemberEventsResumes.forEach(function(MemberEventsResume) {
      totalCountEvents += MemberEventsResume.count;
    });

    users = totalCountUsers * 0.9
    averageMemberEvents_yes = parseFloat(totalCountEvents / users).toFixed(2);


    var MemberEventsResumes = MemberEventsResume.find({
      apiKey: this.member.idUser,
      event : event,
      abTest : "n",
      createdAt : {
        $gte : dayPeriod.start,
        $lt : dayPeriod.end
      }
    }).fetch();

    var totalCountEvents = 0;
    MemberEventsResumes.forEach(function(MemberEventsResume) {
      totalCountEvents += MemberEventsResume.count;
    });

    users = totalCountUsers * 0.1
    averageMemberEvents_no = parseFloat(totalCountEvents / users).toFixed(2);

    if(totalCountUsers== 0 || averageMemberEvents_no == 0 || averageMemberEvents_yes == 0){
      responseHtml = "<span class='text-muted'>--</span>";
    }else{
      if(averageMemberEvents_yes > averageMemberEvents_no){
        averageDifferenceMemberEvents = (averageMemberEvents_yes / averageMemberEvents_no) * 100;
        averageDifferenceMemberEvents -= 100;
      }else{
        averageDifferenceMemberEvents = (averageMemberEvents_no / averageMemberEvents_yes) * 100;
        averageDifferenceMemberEvents -= 100;
        averageDifferenceMemberEvents *= -1;
      }
      averageDifferenceMemberEvents = parseFloat(averageDifferenceMemberEvents).toFixed(2);
      if(averageDifferenceMemberEvents > 0){
        responseHtml = "<span class='text-success'>+"+averageDifferenceMemberEvents+" %</span>";
      }else if(averageDifferenceMemberEvents < 0){
        responseHtml = "<span class='text-danger'>"+averageDifferenceMemberEvents+" %</span>";
      }else{
        responseHtml = "<span class='text-muted'>"+averageDifferenceMemberEvents+" %</span>";
      }
    }

    return responseHtml;

  },


  createChart: function () {
    var dayPeriod = getMomentPeriod(Session.get('period'));
    var countUsers = MemberUsers.find({createdAt : {$gte : dayPeriod.start,$lt : dayPeriod.end}}).count();

    Meteor.defer(function() {

      Highcharts.chart('chart', {
        chart: {
          type: 'column'
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

Template.adminUserDashboard.events({
  'click .change_period': function(e) {
    $(".change_period").removeClass("btn-primary");
    $(e.target).addClass("btn-primary");
    e.preventDefault();
    Session.set('period', $(e.target).attr('data-value'));
  }

});
