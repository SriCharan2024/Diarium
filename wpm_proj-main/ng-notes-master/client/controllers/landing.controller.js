app.controller('landingController', function($scope, $state) {
  // Navigate to login when Start Writing is clicked (already done via ui-sref)
  console.log("LandingController loaded");

  // Optional: Initialize your interactive calendar
  setTimeout(function() {
    if (typeof initCalendar === 'function') {
      initCalendar();
    }
  }, 100);
});
