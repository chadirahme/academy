export class Student {
  studentid: number;
  //rollnumber: string;
  studentname: string;
  grade: string;
  section: string;
  cw: number;
  hw: number;
  project: number;
  quiz1: number;
  quiz2: number;
  quiz3: number;
  avgquiz: number;
  test1: number;
  finalexam: number;
  finalmark: number;

  get Studentname(){
    return this.studentname.toUpperCase();
  }

  // get avgquiz() {
  //   return this.quiz1 + this.quiz2;
  // }

}
