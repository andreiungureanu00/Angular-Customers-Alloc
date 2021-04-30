import { Component, OnInit, Input } from '@angular/core';
import {Project} from "../interfaces/project"
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../project.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  @Input() selectedProject?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProject();
  }

  goBack(): void {
    this.location.back();
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProjectInfo(id).subscribe((result: any) => {
      this.selectedProject = _.cloneDeep(
        result?.data?.getProjectInfo as Project
      );
    });
  }
}
