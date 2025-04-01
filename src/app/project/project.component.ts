import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  imports: [NgFor, FormsModule,NgIf],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  projectName: string = '';
  description: string = '';
  createdBy: string = '';
  projectManager: string = '';
  startDate: string = '';
  endDate: string = '';
  teamMembers: string = '';
  dueDate: string = '';
  showModal: boolean = false; // Flag to show modal
  formSubmitted: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.projects = JSON.parse(localStorage.getItem('projects') || '[]');
  }

  // Add a new project
    addProject(form: NgForm) {
      this.formSubmitted = true;
      if (form.invalid) {
        return;
      }

    const newProject = {
      title: this.projectName,
      description: this.description,
      createdBy: this.createdBy,
      projectManager: this.projectManager,
      startDate: this.startDate,
      endDate: this.endDate,
      teamMembers: this.teamMembers,
      dueDate: this.dueDate,
      id: new Date().getTime()
    };

    this.projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(this.projects));
    this.clearForm();
    this.closeModal();
  }

  // Open the modal
  openModal() {
    this.showModal = true;
  }

  // Close the modal
  closeModal() {
    this.showModal = false;
  }

  // Clear form inputs
  clearForm() {
    this.projectName = '';
    this.description = '';
    this.createdBy = '';
    this.projectManager = '';
    this.startDate = '';
    this.endDate = '';
    this.teamMembers = '';
    this.dueDate = '';
  }

  // Delete a project
  deleteProject(id: number) {
    this.projects = this.projects.filter(project => project.id !== id);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

}
