import { Injectable } from '@angular/core';
import { Project } from './interfaces/project';
import { Projects } from './projects/helpers/projectsList';
import { Observable, of } from 'rxjs';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private apollo: Apollo) {}

  getData(): Observable<ApolloQueryResult<Project[]>> {
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

  getProjects(): Observable<Project[]> {
    return of(Projects);
  }
}
