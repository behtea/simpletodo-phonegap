/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {       
        $("#add-todo").on("click", app.saveTodo);
        $("#data-todo").on("keypress", app.submitTodo);
        window.db = window.openDatabase("Database", "1.0", "simpletodo", 200000);
        window.db.transaction(todos.createTable, todos.errorCB, todos.createTableSuccess);
    },
    submitTodo: function(event) {
        if ( event.which === 13 ) {
          app.saveTodo();
        }
    },
    saveTodo: function(){
        todos.setTodo($("#data-todo").val());
        window.db.transaction(todos.insertData, todos.errorCB, todos.insertDataSuccess);
        $("#data-todo").val("");  

        $("#undone").prepend("<li>" + $("#data-todo").val() +"</li>");
    },
    addTodo: function(id, todo){
        $("#undone").prepend("<li><span>" + todo +"</span>  <a href=\"#\" id=\"todo-" + id + "\" data-id=\"" + id + "\" class=\"removetodo\">[X]</a></li>");                      
    },
    finishTodo: function(){
        todos.setId($(this).attr("data-id"));
        window.db.transaction(todos.updateData, todos.errorCB);
    },
    addDoneTodo: function(id, todo){
        $("#done").prepend("<li>" + todo +"</li>");
        $("#todo-" + id).parents("li").remove()
    }
};
