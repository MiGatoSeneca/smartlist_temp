Highcharts = require('highcharts');;
require('highcharts/highcharts-more')(Highcharts);


Highcharts.theme = {
    credits: {
        enabled: false
    },
    legend: {
      enabled: false
    },
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
             '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {

    },
    title: {
      style: {
        display: 'none'
      }
    },
    yAxis: {
      title :{
        style: {
          display: 'none'
        }
      }
    },
    xAxis: {
      title :{
        style: {
          display: 'none'
        }
      }
    },
    subtitle: {
      style: {
        display: 'none',
      }
    }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
