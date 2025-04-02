import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [NgFor, FormsModule,NgIf,NgClass, RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];
  loggedInUser: any;
  showModal: boolean = false;

  projectData = {
    title: '',
    description: '',
    programManager: '',
    projectManager: '',
    startDate: '',
    dueDate: '',
    endDate: '',
    teamMembers: ''
  };
  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');

    if (!this.loggedInUser.email) {
      alert('Please log in first!');
      this.router.navigate(['/login']);
      return;
    }

    this.loadProjects()
  }
  loadProjects() {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    this.projects = allProjects.filter((project: any) => project.createdBy === this.loggedInUser.username);
  }
  // Add a new project
  addProject() {
    if (!this.projectData.title || !this.projectData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');

    const newProject = {
      id: allProjects.length + 1,
      title: this.projectData.title,
      description: this.projectData.description,
      status: 'Pending',
      createdBy: this.loggedInUser.username,
      programManager: this.projectData.programManager,
      projectManager: this.projectData.projectManager,
      startDate: this.projectData.startDate,
      dueDate: this.projectData.dueDate,
      endDate: this.projectData.endDate,
      teamMembers: this.projectData.teamMembers.split(',').map((m) => m.trim())
    
    };

    allProjects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(allProjects));

    alert('Project added successfully!');
    this.projectData = { title: '', description: '', programManager: '', projectManager: '', startDate: '', dueDate: '', endDate: '', teamMembers: '' };
    this.showModal = false;
    this.loadProjects(); // Refresh project list
  }

  deleteProject(projectId: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      let allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      allProjects = allProjects.filter((project: any) => project.id !== projectId);
      localStorage.setItem('projects', JSON.stringify(allProjects));
      this.loadProjects();
    }
  }
  openTask(projectId: number) {
    this.router.navigate(['/task', projectId]); // Navigate to task details
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'high':
        return 'status-high'; // CSS class for High priority
      case 'medium':
        return 'status-medium'; // CSS class for Medium priority
      case 'low':
        return 'status-low'; // CSS class for Low priority
      default:
        return 'status-pending'; // Default class for Pending or unknown status
    }
  }
  
}
