import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Todo } from '../todo';
import { LogerService } from '../loger.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent implements OnInit {
  constructor(private logger: LogerService) {}
  todos: Todo[] = [];
  index!: number;
  result!: boolean;
  greeting!: string;
  day!:string;


  getGreeting() {
    let now = new Date();
    let hour = now.getHours();
    let period = '';
    switch (true) {
      case hour >= 0 && hour < 12:
        period = 'Morning 🌤️';
        break;
      case hour >= 12 && hour < 16:
        period = 'Afternoon ☀️';
        break;
      case hour >= 16 && hour < 19:
        period = 'Evening 🌇';
        break;
      case hour >= 19 && hour < 24:
        period = 'Evening 🌙';
        break;

      default:
        period = 'Morning';
    }
    return period;
  };

  getDay(){
    const date= new Date();
    return date.toLocaleDateString('en-IN',{weekday:"long"})

  }

  ngOnInit(): void {
    this.greeting = this.getGreeting();
    this.day= this.getDay();
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos !== null) {
      this.todos = JSON.parse(storedTodos);
    }
  }


  addTodo(titleInput: HTMLInputElement) {
    if (titleInput.value.trim()) {
      if (
        !this.todos.some(
          (item) =>
            item.data.trim().toLowerCase() ==
            titleInput.value.trim().toLowerCase()
        )
      ) {
        this.todos.push({
          id: Date.now(),
          data: titleInput.value.trim(),
          isDone: false,
        });
        titleInput.value = '';
        this.todos.sort((a: any, b: any) => a.isDone - b.isDone);
        localStorage.setItem("todos", JSON.stringify(this.todos))  ;
      } else {
        Swal.fire('The task already exists');
      }
    } else {
      Swal.fire('Enter something');
    }
  }

  onStatusChange(id: number, newStatus: boolean) {
    this.index = this.todos.findIndex((item) => item.id == id);
    this.todos[this.index].isDone = !this.todos[this.index].isDone;
    this.todos.sort((a: any, b: any) => a.isDone - b.isDone);
    localStorage.setItem("todos", JSON.stringify(this.todos))  }
  onDelete(id: number) {
    // this.index=this.todos.findIndex(item=>item.id==id);
    this.todos = this.todos.filter((item) => item.id != id);
    localStorage.setItem("todos", JSON.stringify(this.todos))  ;
  }

  editTask(id: number) {
    Swal.fire({
      title: 'edit task',
      input: 'text',
      inputValue: this.todos.find((item) => item.id === id)?.data || '',
      inputPlaceholder: 'Type something...',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.index = this.todos.findIndex((item) => item.id == id);
        this.todos[this.index].data = result.value;
        localStorage.setItem("todos", JSON.stringify(this.todos))  ;
      }
    });
  }
}
