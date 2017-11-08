getMomentPeriod = function(period) {
  subtractDaysStart = 0;
  subtractDaysEnd = 0;
  switch (Session.get('period')) {
    case "yesterday":
      subtractDaysStart = 1;
      subtractDaysEnd = 1;
      break;
    case "last_7_days":
      subtractDaysStart = 7;
      subtractDaysEnd = 1;
      break;
    case "last_30_days":
      subtractDaysStart = 30;
      subtractDaysEnd = 1;
      break;
  }
  return {
    start : moment().subtract(subtractDaysStart, 'days').startOf('day').toDate(),
    end : moment().subtract(subtractDaysEnd, 'days').endOf('day').toDate()

  }
}
