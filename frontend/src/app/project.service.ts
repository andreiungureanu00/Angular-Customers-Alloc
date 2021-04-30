import { Injectable } from '@angular/core';
import { Project, ProjectBody } from './interfaces/project';
import { Projects } from './projects/helpers/projectsList';
import { Observable, of } from 'rxjs';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private apollo: Apollo) {}

  getProjects(): Observable<ApolloQueryResult<Project[]>> {
    return this.apollo.watchQuery<Project[]>({
      query: gql`
        {
          getProjects {
            id
            project_name
            start_date
            planned_end_date
            description
            project_code
          }
        }
      `,
    }).valueChanges;
  }

  getProjectInfo(id: number): Observable<ApolloQueryResult<Project>> {
    return this.apollo.watchQuery<Project>({
      query: gql`
        query($projectID: Int!) {
          getProjectInfo(id: $projectID) {
            id
            project_name
            start_date
            planned_end_date
            description
            project_code
          }
        }
      `,
      variables: {
        projectID: id,
      },
    }).valueChanges;
  }

  addProject(project: ProjectBody): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation(
          $project_name: String
          $start_date: DateTime
          $planned_end_date: DateTime
          $description: String
          $project_code: String
        ) {
          addProject(
            project_name: $project_name
            start_date: $start_date
            planned_end_date: $planned_end_date
            description: $description
            project_code: $project_code
          ) {
            id
          }
        }
      `,
      variables: {
        project_name: project.project_name,
        description: project.description,
        start_date: project.start_date,
        planned_end_date: project.planned_end_date,
        project_code: project.project_code,
      },
    });
  }

  updateProject(project: Project): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation(
          $id: Int!
          $project_name: String
          $start_date: DateTime
          $planned_end_date: DateTime
          $description: String
          $project_code: String
        ) {
          updateProject(
            id: $id,
            project_name: $project_name
            start_date: $start_date
            planned_end_date: $planned_end_date
            description: $description
            project_code: $project_code
          ) {
            id
            project_name
            start_date
            planned_end_date
            description
            project_code
          }
        }
      `,
      variables: {
        id: project.id,
        project_name: project.project_name,
        description: project.description,
        start_date: project.start_date,
        planned_end_date: project.planned_end_date,
        project_code: project.project_code,
      },
    });
  }

  deleteProject(project: Project): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation($projectID: Int!) {
          deleteProject(id: $projectID)
        }
      `,
      variables: { projectID: project.id },
    });
  }
}
