export class SetupData
{
  public static get HOME_URL(): string[] { return ["sample/url/"]; };
  public static get academicyears(): string[] { return ["2018-2019","2017-2018","2016-2017","2015-2016","2014-2015"]; };

  public static get grades(): string[] {return ["KG1", "KG2", "Grade1", "Grade2", "Grade3", "Grade4", "Grade5", "Grade6", "Grade7",
  "Grade8", "Grade9", "Grade10", "Grade11", "Grade12"];}

  public static get classes(): string[] { return ["A","B","C","D","E","F"];}

  public static get subjects(): string[] { return ["English","Maths","Science","Social","IT","Regular Arabic","Religion Islamic",
  "Qatar History" , "Art","Physics","Biology","Chemistry","PE" , "Other"];}

  public static get semesters(): string[] {return ["Semester 1" , "Semester 2"];}

  public static getGradeLetter(x)
  {
    switch (true) {
      case (x>= 97):
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
}


const data1: Element[] = [
  {position: 1, name: 'Abdallah Mansour Mahmoud Alrahamneh', weight: 1.0079, symbol: 'H' },
  {position: 2, name: 'Abdalrhman Taha Mohamed Mohamed Taha Hussein', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Abdelrahman Mohd Abdelrahman Eleish', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Ayan Ahmad', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Buchra Naser Jamal Eddin', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Ehsan Ayman Rabata', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Elijah Zane Lira', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Emad Ismail Mohamed Ismail Eid', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Essa Mohammad Hamdan', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Fatima Abdulaziz Mulla Zainal Al-Mulla', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Ibrahim Riad Mostafa Mohamed Maree', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Jad Ishaq Yousef Abu Alia', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Judie Amr Abdelsattar Fadl', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Karim Moh\'d Kamal Ghanaim', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Mazin Ahmed El-Kishif Mohamed', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Milad Mohammad Shahaby', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Misha Samantha Panganiban Paco', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Mostafa Husam Al-Haj Kadour', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Muhammed Zidan', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Najemeddin Yahya Al-Kurdi', weight: 40.078, symbol: 'Ca'},
];


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  //cw: number;
  //hw: number;
}
