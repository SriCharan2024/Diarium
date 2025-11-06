app.controller('aboutController', function($scope) {
  var vm = this;
  console.log("AboutController loaded");
  
  // Basic page information
  vm.appName = 'Diarium';
  vm.tagline = 'Your Personal Digital Diary 💜';
  
  // About sections
  vm.features = [
    {
      icon: 'fa-pencil',
      title: 'Express Freely',
      description: 'Write Your Thoughts, Feelings, And Reflections Without Limits. Diarium Gives You A Safe, Calm Space To Express Yourself.'
    },
    {
      icon: 'fa-calendar',
      title: 'Organize By Date',
      description: 'Automatically Organizes Entries By Date So You Can Look Back And Relive Your Best Moments Easily.'
    },
    {
      icon: 'fa-lock',
      title: 'Private & Secure',
      description: 'Your Notes Stay Yours. All Entries Are Stored Securely With Options To Back Them Up Or Keep Them Offline.'
    },
    {
      icon: 'fa-paint-brush',
      title: 'Pastel-Themed Design',
      description: 'Enjoy A Soothing Interface With Gentle Pastel Tones To Make Journaling Relaxing And Beautiful.'
    }
  ];

  // Credits
  vm.developer = {
    name: 'Team 1',
    message: 'Built With ❤️ Using The MEAN Stack (MongoDB, Express, AngularJS, Node.js).'
  };
});