
export interface Project {
  id: number;
  project_name: string;
  start_date: string;
  planned_end_date: string;
  description: string;
  project_code: string;
}

export interface ProjectBody {
  project_name: string;
  start_date: string;
  planned_end_date: string;
  description: string;
  project_code: string;
}
