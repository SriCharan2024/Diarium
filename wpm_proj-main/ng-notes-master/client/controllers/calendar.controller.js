app.controller('calendarController', function($scope) {
  var vm = this;

  // Current month and year
  vm.currentDate = new Date();
  vm.month = vm.currentDate.getMonth();
  vm.year = vm.currentDate.getFullYear();

  // Month names
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  // Example diary entries
  vm.entriesByDate = {
    '2025-01-15': [
      { title: 'Beach walk', content: 'Felt calm and grateful.' },
      { title: 'Dinner with friends', content: 'Great food and laughter!' }
    ],
    '2025-01-16': [
      { title: 'Study session', content: 'Completed AI revision.' }
    ],
    '2025-01-20': [
      { title: 'Morning Thoughts', content: 'Today was peaceful ☀️' }
    ]
  };

  // Update calendar display
  vm.updateCalendar = function() {
    vm.monthName = monthNames[vm.month];
    
    // Get first day of month and days in month
    var firstDay = new Date(vm.year, vm.month, 1);
    var lastDay = new Date(vm.year, vm.month + 1, 0);
    var daysInMonth = lastDay.getDate();
    var startingDayOfWeek = firstDay.getDay();

    // Generate empty cells for days before first day of month
    vm.emptyDays = [];
    for (var i = 0; i < startingDayOfWeek; i++) {
      vm.emptyDays.push(i);
    }

    // Generate days of current month
    vm.days = [];
    for (var j = 1; j <= daysInMonth; j++) {
      var monthStr = (vm.month + 1).toString();
      var dayStr = j.toString();
      if (monthStr.length === 1) monthStr = '0' + monthStr;
      if (dayStr.length === 1) dayStr = '0' + dayStr;
      var dateString = vm.year + '-' + monthStr + '-' + dayStr;
      vm.days.push({ 
        date: j, 
        dateString: dateString,
        isOtherMonth: false
      });
    }

    // Fill remaining cells to complete 7x6 grid (if needed)
    var totalCells = vm.emptyDays.length + vm.days.length;
    var remainingCells = 42 - totalCells; // 6 weeks * 7 days
    for (var k = 1; k <= remainingCells; k++) {
      vm.days.push({
        date: k,
        dateString: '',
        isOtherMonth: true
      });
    }
  };

  // Navigate to previous month
  vm.previousMonth = function() {
    vm.month--;
    if (vm.month < 0) {
      vm.month = 11;
      vm.year--;
    }
    vm.updateCalendar();
  };

  // Navigate to next month
  vm.nextMonth = function() {
    vm.month++;
    if (vm.month > 11) {
      vm.month = 0;
      vm.year++;
    }
    vm.updateCalendar();
  };

  // Handle date click
  vm.selectDate = function(dateString) {
    if (dateString) {
      vm.selectedDate = dateString;
    }
  };

  // Format date for display
  vm.getFormattedDate = function(dateString) {
    if (!dateString) return '';
    var date = new Date(dateString + 'T00:00:00');
    return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  };

  // Initialize calendar
  vm.updateCalendar();
});
