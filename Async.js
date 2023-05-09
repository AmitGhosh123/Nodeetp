function task1(callback) {
    console.log('Task 1 started');
    setTimeout(function() {
      console.log('Task 1 completed');
      callback();
    }, 2000);
  }
  
  function task2() {
    console.log('Task 2 started');
    console.log('Task 2 completed');
  }
  
  task1(function() {
    task2();
  });
  