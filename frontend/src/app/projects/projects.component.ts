import { Component, OnInit } from '@angular/core';
import { Project, ProjectBody } from '../interfaces/project';
import { ProjectService } from '../project.service';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  project?: Project;
  projects: Project[] = [];
  editMode: boolean = false;
  editableProperty: string;
  toEditProject: Project;
  myStyle1 = {
    'background-color': '#ffffc1',
  };

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal
  ) {}

  isVisible(element): boolean {
    if ($(element).is(':visible') == true) {
      return true;
    }
    return false;
  }

  setEditableProject(project: Project, property, editValue) {
    this.toEditProject = project;
    this.editMode = editValue;
    this.editableProperty = property;
  }

  updateProperty(project: Project): void {
    this.projectService.updateProject(project).subscribe((res) => {
      console.log(res.data);
      console.log(project);
      this.editMode = false;
    });
  }

  onSelect(project: Project): void {
    this.project = project;
  }

  open(content) {
    this.modalService.open(content);
  }

  getProjectData(): ProjectBody {
    const toAddProject = {
      project_name: $('#project_name').val(),
      description: $('#project_description').val(),
      planned_end_date: new Date(
        $('#project_planned_end_date').val()
      ).toISOString(),
      project_code: $('#project_code').val(),
      start_date: new Date($('#project_start_date').val()).toISOString(),
    };
    return toAddProject;
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((result: any) => {
      this.projects = _.cloneDeep(result?.data?.getProjects as Project[]);
    });
  }

  addProject(): void {
    const toAddProject = this.getProjectData();
    this.projectService.addProject(toAddProject).subscribe((res) => {
      console.log(res.data.addProject.id);
      const project: Project = {
        id: res.data.addProject.id,
        ...toAddProject,
      };
      this.projects.push(project);
    });
  }

  deleteProject(project: Project): void {
    this.projectService.deleteProject(project).subscribe((res) => {
      console.log(res.data);
      this.projects.forEach((element, index) => {
        if (element.id === project.id) delete this.projects[index];
      });
    });
  }

  ngOnInit(): void {
    this.getProjects();
  }
}
