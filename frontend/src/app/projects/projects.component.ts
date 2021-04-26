import { Component, OnInit } from '@angular/core';
import { Project } from '../interfaces/project';
import { ProjectService } from '../project.service';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  selectedProject?: Project;
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private apollo: Apollo) {}

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

  getProjects(): void {
    this.projectService.getData().subscribe((result: any) => {
      this.projects = result?.data?.getProjects as Project[];
    });
  }

  ngOnInit(): void {
    this.getProjects();
  }
}
