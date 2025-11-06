app.controller('entriesController', function($scope) {
  var vm = this;
  console.log("EntriesController loaded");
  
  // Initialize entries from localStorage or use sample data
  vm.loadEntries = function() {
    var savedEntries = localStorage.getItem('diariumEntries');
    if (savedEntries) {
      try {
        vm.entries = JSON.parse(savedEntries).map(function(entry) {
          entry.date = new Date(entry.date);
          return entry;
        });
      } catch (e) {
        console.error('Error loading entries:', e);
        vm.entries = vm.getDefaultEntries();
      }
    } else {
      vm.entries = vm.getDefaultEntries();
      vm.saveEntries();
    }
  };
  
  // Get default entries
  vm.getDefaultEntries = function() {
    return [
      { 
        id: 1, 
        title: "Morning Thoughts", 
        content: "Today was peaceful ☀️ The gentle breeze reminds me to take things slow and appreciate the little moments.", 
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) 
      },
      { 
        id: 2, 
        title: "Dream Log", 
        content: "I dreamt about a lavender garden 🌸 It was so serene and beautiful. The purple flowers swayed gently in the wind.", 
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) 
      },
      { 
        id: 3, 
        title: "Ideas", 
        content: "Start a mood-based diary filter 💡 It would be interesting to categorize entries by emotions - happy, reflective, creative moments.", 
        date: new Date() 
      }
    ];
  };
  
  // Save entries to localStorage
  vm.saveEntries = function() {
    try {
      localStorage.setItem('diariumEntries', JSON.stringify(vm.entries));
    } catch (e) {
      console.error('Error saving entries:', e);
    }
  };
  
  // Modal state
  vm.showModal = false;
  vm.showViewModal = false;
  vm.editingEntry = false;
  vm.currentEntry = {};
  vm.viewingEntry = {};
  vm.searchText = '';
  
  // Search function
  vm.searchEntry = function(entry) {
    if (!vm.searchText) return true;
    var search = vm.searchText.toLowerCase();
    return (entry.title && entry.title.toLowerCase().indexOf(search) !== -1) ||
           (entry.content && entry.content.toLowerCase().indexOf(search) !== -1);
  };
  
  // Open new entry modal
  vm.openNewEntryModal = function() {
    vm.editingEntry = false;
    vm.currentEntry = {
      title: '',
      content: ''
    };
    vm.showModal = true;
  };
  
  // Open edit entry modal
  vm.editEntry = function(entry) {
    vm.editingEntry = true;
    vm.currentEntry = {
      id: entry.id,
      title: entry.title,
      content: entry.content
    };
    vm.showModal = true;
    vm.closeViewModal();
  };
  
  // Save entry
  vm.saveEntry = function() {
    if (!vm.currentEntry.title && !vm.currentEntry.content) {
      return;
    }
    
    if (vm.editingEntry) {
      // Update existing entry
      var index = vm.entries.findIndex(function(e) { return e.id === vm.currentEntry.id; });
      if (index !== -1) {
        vm.entries[index].title = vm.currentEntry.title;
        vm.entries[index].content = vm.currentEntry.content;
      }
    } else {
      // Create new entry
      var newEntry = {
        id: Date.now(), // Simple ID generation
        title: vm.currentEntry.title || 'Untitled Entry',
        content: vm.currentEntry.content,
        date: new Date()
      };
      vm.entries.unshift(newEntry); // Add to beginning
    }
    
    vm.saveEntries();
    vm.closeModal();
  };
  
  // View entry
  vm.viewEntry = function(entry) {
    vm.viewingEntry = angular.copy(entry);
    vm.showViewModal = true;
  };
  
  // Delete entry
  vm.deleteEntry = function(entry) {
    if (confirm('Are you sure you want to delete this entry?')) {
      var index = vm.entries.findIndex(function(e) { return e.id === entry.id; });
      if (index !== -1) {
        vm.entries.splice(index, 1);
        vm.saveEntries();
      }
    }
  };
  
  // Close modals
  vm.closeModal = function() {
    vm.showModal = false;
    vm.currentEntry = {};
    vm.editingEntry = false;
  };
  
  vm.closeViewModal = function() {
    vm.showViewModal = false;
    vm.viewingEntry = {};
  };
  
  // Initialize
  vm.loadEntries();
});
