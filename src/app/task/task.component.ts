import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  imports: [RouterLink,NgIf,NgFor, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  projectId: number | null = null;
  tasks: any[] = [];
  showModal: boolean = false;
  
  taskData = {
    title: '',
    assignedTo: '',
    status: 'Pending',
    assignedUser: '',
    estimate: '',
    timeSpent: ''
  };
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.projectId = Number(params.get('id'));
      this.loadTasks();
    });
  }

  loadTasks() {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = allTasks.filter((task: any) => task.projectId === this.projectId);
  }

  addTask() {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    const newTask = {
      id: allTasks.length + 1,
      title: this.taskData.title,
      assignedTo: this.taskData.assignedTo,
      status: this.taskData.status,
      assignedUser: this.taskData.assignedUser,
      estimate: this.taskData.estimate,
      timeSpent: this.taskData.timeSpent,
      projectId: this.projectId // Assign the project ID to the task
    };
  
    allTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    this.loadTasks();
  }
  

  updateStatus(taskId: number, newStatus: string) {
    let allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    allTasks = allTasks.map((task: any) => {
      if (task.id === taskId) {
        task.status = newStatus;
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    this.loadTasks();
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      let allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      allTasks = allTasks.filter((task: any) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(allTasks));
      this.loadTasks();
    }
  }
}
