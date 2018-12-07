import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-layout',
  template: `
    <app-teacherheader></app-teacherheader>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class TeacherLayoutComponent {}
