var todos = {
  setId: function(id) {
    this.id = id;
  },
  getId: function() {
    return this.id;
  },   
  setTodo: function(todo) {
    this.todo = todo;
  },
  getTodo: function() {
    return this.todo;
  }, 
  setFinished: function(finished) {
    this.finished = finished;
  },
  getFinished: function() {
    return this.finished;
  },  
  createTable: function(tx) {
    tx.executeSql('DROP TABLE "todos"');    
    tx.executeSql('CREATE TABLE IF NOT EXISTS "todos" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "todo" TEXT, "finished" INTEGER DEFAULT 0)');    
  },
  createTableSuccess: function() {
    window.db.transaction(todos.selectUndoneTodo, todos.errorCB);
    window.db.transaction(todos.selectDoneTodo, todos.errorCB);
  },
  insertData: function(tx) {
    tx.executeSql('INSERT INTO "todos" (todo, finished) VALUES ("' + todos.getTodo() +'", "0")');
  },  
  insertDataSuccess: function(tx, results) {
    $("#undone").empty()
    window.db.transaction(todos.selectUndoneTodo, todos.errorCB);
  },  
  updateData: function(tx) {
    tx.executeSql("UPDATE todos SET finished = '1' WHERE id = '" + todos.getId() + "'", [], todos.updateDataSuccess);    
  },  
  updateDataSuccess: function() {
    obj = $("#todo-" + todos.getId())
    app.addDoneTodo(obj.attr("data-id"), obj.parents("li").find("span").html())
  },    
  selectUndoneTodo: function(tx) {
    tx.executeSql('SELECT * FROM "todos" WHERE finished = 0', [], todos.selectUndoneTodoSuccess, todos.errorCB);
  },
  selectUndoneTodoSuccess: function(tx, results) {
    len = results.rows.length;
    if(0 < len) {
      for (var i=0; i<len; i++){
        app.addTodo(results.rows.item(i).id, results.rows.item(i).todo);
      }
    }  
    $(".removetodo").on("click", app.finishTodo);  
  },  
  selectDoneTodo: function(tx) {
    tx.executeSql('SELECT * FROM "todos" WHERE finished = 1', [], todos.selectDoneTodoSuccess, todos.errorCB);
  },
  selectDoneTodoSuccess: function(tx, results) {
    len = results.rows.length;
    if(0 < len) {
      for (var i=0; i<len; i++){
        app.addDoneTodo(results.rows.item(i).id, results.rows.item(i).todo);
      }
    }    
  },   
  errorCB: function(err) {
    alert("Error processing SQL: " + err);
  }
}
