import { Component, OnInit } from '@angular/core';
import { Project, ProjectBody } from '../interfaces/project';
import { ProjectService } from '../project.service';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { validate } from './helpers/inputValidations';

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
  toAddProject: ProjectBody;
  inputErrors = {
    project_name: {
      message: null,
      status: false,
    },
    description: {
      message: null,
      status: false,
    },
    planned_end_date: {
      message: null,
      status: false,
    },
    project_code: {
      message: null,
      status: false,
    },
    start_date: {
      message: null,
      status: false,
    },
  };

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal
  ) {}

  setEditableProject(project: Project, property, editValue) {
    this.toEditProject = project;
    this.editMode = editValue;
    this.editableProperty = property;
  }

  resetInputAlerts() {
    this.inputErrors.project_name.status = false;
    this.inputErrors.start_date.status = false;
    this.inputErrors.planned_end_date.status = false;
    this.inputErrors.description.status = false;
    this.inputErrors.project_code.status = false;
  }

  setCorrectDateFormat(project): void {
    let aux_start = "";
    let aux_end = "";
    aux_start += new Date(project.start_date).getFullYear() + '-';
    aux_start += new Date(project.start_date).getMonth() + 1 + '-';
    aux_start += new Date(project.start_date).getDate() + " EDT";

    aux_end += new Date(project.planned_end_date).getFullYear() + '-';
    aux_end += new Date(project.planned_end_date).getMonth() + 1 + '-';
    aux_end += new Date(project.planned_end_date).getDate() + " EDT";

    project.start_date = aux_start;
    project.planned_end_date = aux_end;
  }

  updateProperty(project: Project): void {
    this.setCorrectDateFormat(project);

    this.projectService.updateProject(project).subscribe((res) => {
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
      planned_end_date: $('#project_planned_end_date').val(),
      project_code: $('#project_code').val(),
      start_date: $('#project_start_date').val(),
    };
    this.toAddProject = toAddProject;
    return toAddProject;
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((result: any) => {
      this.projects = _.cloneDeep(result?.data?.getProjects as Project[]);
    });
  }

  validateProject(): any[] {
    this.resetInputAlerts();
    const toAddProject = this.getProjectData();
    const res = validate(toAddProject);
    console.log(res);
    res.map((error) => {
      if (error.error_code == '2') {
        this.inputErrors.project_name.status = true;
        this.inputErrors.project_name.message = error.message;
      }
      if (error.error_code == '3') {
        this.inputErrors.start_date.status = true;
        this.inputErrors.start_date.message = error.message;
      }
      if (error.error_code == '4') {
        this.inputErrors.planned_end_date.status = true;
        this.inputErrors.planned_end_date.message = error.message;
      }
      if (error.error_code == '5') {
        this.inputErrors.project_code.status = true;
        this.inputErrors.project_code.message = error.message;
      }
      if (error.error_code == '6') {
        this.inputErrors.start_date.status = true;
        this.inputErrors.start_date.message = error.message;
      }
      if (error.error_code == '7') {
        this.inputErrors.planned_end_date.status = true;
        this.inputErrors.planned_end_date.message = error.message;
      }
      if (error.error_code == '8') {
        this.inputErrors.description.status = true;
        this.inputErrors.description.message = error.message;
      }
    });

    return res;
  }

  addProject(): void {
    let toAddProject;
    if (this.validateProject().length === 0) {
      toAddProject = this.getProjectData();
      this.setCorrectDateFormat(toAddProject);
    }
    this.projectService.addProject(toAddProject).subscribe((res) => {
      const project: Project = {
        id: res.data.addProject.id,
        ...toAddProject,
      };
      console.log(project);
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
