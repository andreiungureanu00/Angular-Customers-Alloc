import { isDate } from 'moment';
import { ProjectBody } from '../../interfaces/project';

export function validate(project: ProjectBody) {
  const errors = [];
  if (!project) {
    errors.push({ error_code: 1, message: 'Project must not be null' });
  }
  if (!project.project_name) {
    errors.push({ error_code: 2, message: 'Project Name must not be empty' });
  }
  if (!project.start_date) {
    errors.push({ error_code: 3, message: 'Start Date must not be empty' });
  }
  if (!project.planned_end_date) {
    errors.push({ error_code: 4, message: 'End Date must not be empty' });
  }
  if (!project.project_code) {
    errors.push({ error_code: 5, message: 'Project Code must not be empty' });
  }
  if (!isDate(new Date(project.start_date))) {
    errors.push({ error_code: 6, message: 'Incorrect Date' });
  }
  if (!isDate(new Date(project.planned_end_date))) {
    errors.push({ error_code: 7, message: 'Incorrect Date' });
  }
  if (project.description.length < 4) {
    errors.push({
      error_code: 8,
      message: 'Project Description must be greater than 4',
    });
  }
  return errors;
}
