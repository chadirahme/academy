import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {Student} from "../../core/student";
import {MatTableDataSource} from "@angular/material";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {SetupData} from "../../common/setupdata";

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
  providers: [AuthService]
})
export class StudentlistComponent implements OnInit {

  public grades: any[];
  public classes: any[];
  apiParam: any;
  student: Student[];
  //item: Student;
  data : Student[];
  columns = [
    // {columnDef: 'sid', header: 'sid', cell: (element: Marks) => `${element.sid}`},

    {columnDef: 'studentname', header: 'Name', cell: (element: Student) => `${element.studentname}`},
    {columnDef: 'grade', header: 'grade', cell: (element: Student) => `${element.grade}`},
    {columnDef: 'section', header: 'section', cell: (element: Student) => `${element.section}`},
    {columnDef: 'sno', header: 'No.', cell: (element: Student) => `${element.sno}`},
    ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.grades = SetupData.grades;
    this.classes=SetupData.classes;
    this.loadData();
  }

  loadData(): void {
    try
    {
       this.apiParam = {
        grade: 'Grade8',
        section: 'A',
      };

      console.log("grade>> "+ this.apiParam.grade);
      this.authService.getStudentGradeAndSection(this.apiParam.grade , this.apiParam.section).subscribe(data => {
        //this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        this.student=data;
        this.dataSource = new MatTableDataSource(data);
       // this.loadStudentData();
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  //smart table
  settings = {
    columns: {
      studentid: {
        title: 'ID'
      },
      studentname: {
        title: 'Full Name'
      },
      grade: {
        title: 'Grade',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Grade8', title: 'Grdae8' },
              { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
              { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
            ],
          },
        },
      },
      section: {
        title: 'Class',
        // filter: {
        //   type: 'checkbox',
        //   config: {
        //     true: 'Yes',
        //     false: 'No',
        //     resetText: 'clear',
        //   },
        // },
      }
    }
  };

  onExport(item: Student) {
    try {

      console.log(item);


      const filename="marks.pdf";
      console.log(filename);
      //return ;
      this.authService.getReport(item).subscribe(data => {
        console.log('done');

        var blob = new Blob([data], {type: "application/pdf"});
        //var contentType = data.headers("content-type");
       // console.log(contentType);
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL);

        // var file = new Blob([data], {type: 'application/pdf'});
        // var fileURL = URL.createObjectURL(file);
        // window.open(fileURL,'_blank');

        if(true)
          return;
        let blob1 = new Blob([data], {type: "application/octet-stream"});
        let fileName: string = filename;
        let dataType = data.type;
        console.log(dataType);

        let binaryData = [];
        binaryData.push(data);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (fileName)
          downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
    }
    catch (e) {
      console.log(e);
    }
  }

}
