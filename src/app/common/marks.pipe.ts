import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marksletter'
})
export class MarksPipe implements PipeTransform {

  public transform(x: any): any {
    if(x)
    {
      switch (true) {
        case (x >= 97):
          return "A+";
          break;
        case (x < 97 && x >=93):
          return "A";
          break;
        case (x < 93 && x >=90):
          return "A-";
          break;
        case (x < 90 && x >=87):
          return "B+";
          break;
        case (x < 87 && x >=83):
          return "B";
          break;
        case (x < 83 && x >=80):
          return "B-";
          break;
        case (x < 80 && x >=77):
          return "C+";
          break;
        case (x < 77 && x >=73):
          return "C";
          break;
        case (x < 73 && x >=70):
          return "C-";
          break;
        case (x < 70 && x >=67):
          return "D+";
          break;
        case (x < 67 && x >=65):
          return "D";
          break;
        case (x < 65):
          return "F";
          break;
        default:
          return "F";
          break;
      }
    }
    return "";
  }

}
