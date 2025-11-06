app.controller('todoController', function($scope) {
  var vm = this;
  console.log("TodoController loaded");
  
  // Initialize todos from localStorage or use sample data
  vm.loadTodos = function() {
    var savedTodos = localStorage.getItem('diariumTodos');
    if (savedTodos) {
      try {
        vm.todos = JSON.parse(savedTodos).map(function(todo) {
          todo.createdDate = new Date(todo.createdDate);
          if (todo.dueDate) todo.dueDate = new Date(todo.dueDate);
          return todo;
        });
      } catch (e) {
        console.error('Error loading todos:', e);
        vm.todos = vm.getDefaultTodos();
      }
    } else {
      vm.todos = vm.getDefaultTodos();
      vm.saveTodos();
    }
  };
  
  // Get default todos
  vm.getDefaultTodos = function() {
    return [
      { 
        id: 1, 
        title: "Finish project documentation", 
        completed: false,
        priority: 'high',
        createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      },
      { 
        id: 2, 
        title: "Call mom for birthday wishes", 
        completed: false,
        priority: 'medium',
        createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
      },
      { 
        id: 3, 
        title: "Buy groceries", 
        completed: true,
        priority: 'low',
        createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        dueDate: null
      }
    ];
  };
  
  // Save todos to localStorage
  vm.saveTodos = function() {
    try {
      localStorage.setItem('diariumTodos', JSON.stringify(vm.todos));
    } catch (e) {
      console.error('Error saving todos:', e);
    }
  };
  
  // Modal state
  vm.showModal = false;
  vm.editingTodo = false;
  vm.currentTodo = {};
  vm.searchText = '';
  vm.filterStatus = 'all'; // all, active, completed
  
  // Search function
  vm.searchTodo = function(todo) {
    if (!vm.searchText) return true;
    var search = vm.searchText.toLowerCase();
    return todo.title && todo.title.toLowerCase().indexOf(search) !== -1;
  };
  
  // Filter todos
  vm.getFilteredTodos = function() {
    var filtered = vm.todos;
    
    // Apply status filter
    if (vm.filterStatus === 'active') {
      filtered = filtered.filter(function(todo) { return !todo.completed; });
    } else if (vm.filterStatus === 'completed') {
      filtered = filtered.filter(function(todo) { return todo.completed; });
    }
    
    // Apply search filter
    if (vm.searchText) {
      filtered = filtered.filter(vm.searchTodo);
    }
    
    return filtered;
  };
  
  // Get todos count
  vm.getTodosCount = function() {
    return {
      all: vm.todos.length,
      active: vm.todos.filter(function(t) { return !t.completed; }).length,
      completed: vm.todos.filter(function(t) { return t.completed; }).length
    };
  };
  
  // Open new todo modal
  vm.openNewTodoModal = function() {
    vm.editingTodo = false;
    vm.currentTodo = {
      title: '',
      priority: 'medium',
      dueDate: null
    };
    vm.showModal = true;
  };
  
  // Open edit todo modal
  vm.editTodo = function(todo) {
    vm.editingTodo = true;
    vm.currentTodo = {
      id: todo.id,
      title: todo.title,
      priority: todo.priority || 'medium',
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null
    };
    vm.showModal = true;
  };
  
  // Save todo
  vm.saveTodo = function() {
    if (!vm.currentTodo.title || vm.currentTodo.title.trim() === '') {
      return;
    }
    
    if (vm.editingTodo) {
      // Update existing todo
      var index = vm.todos.findIndex(function(t) { return t.id === vm.currentTodo.id; });
      if (index !== -1) {
        vm.todos[index].title = vm.currentTodo.title.trim();
        vm.todos[index].priority = vm.currentTodo.priority;
        vm.todos[index].dueDate = vm.currentTodo.dueDate;
      }
    } else {
      // Create new todo
      var newTodo = {
        id: Date.now(),
        title: vm.currentTodo.title.trim(),
        completed: false,
        priority: vm.currentTodo.priority || 'medium',
        createdDate: new Date(),
        dueDate: vm.currentTodo.dueDate
      };
      vm.todos.unshift(newTodo);
    }
    
    vm.saveTodos();
    vm.closeModal();
  };
  
  // Toggle todo completion
  vm.toggleTodo = function(todo) {
    todo.completed = !todo.completed;
    if (todo.completed) {
      todo.completedDate = new Date();
    } else {
      todo.completedDate = null;
    }
    vm.saveTodos();
  };
  
  // Delete todo
  vm.deleteTodo = function(todo) {
    if (confirm('Are you sure you want to delete this todo?')) {
      var index = vm.todos.findIndex(function(t) { return t.id === todo.id; });
      if (index !== -1) {
        vm.todos.splice(index, 1);
        vm.saveTodos();
      }
    }
  };
  
  // Delete all completed
  vm.deleteCompleted = function() {
    if (confirm('Delete all completed todos?')) {
      vm.todos = vm.todos.filter(function(t) { return !t.completed; });
      vm.saveTodos();
    }
  };
  
  // Close modal
  vm.closeModal = function() {
    vm.showModal = false;
    vm.currentTodo = {};
    vm.editingTodo = false;
  };
  
  // Get priority class
  vm.getPriorityClass = function(todo) {
    return 'priority-' + (todo.priority || 'medium');
  };
  
  // Format date
  vm.formatDate = function(date) {
    if (!date) return null;
    return new Date(date);
  };
  
  // Initialize
  vm.loadTodos();
});


