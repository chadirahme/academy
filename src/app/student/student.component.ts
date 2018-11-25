import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [AuthService]
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['academicyear','grade', 'section', 'subject','filetype','filename','filepath'];
  dataSource = new MatTableDataSource();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    try
    {
      console.log("grade>> "+ localStorage.getItem('grade'));
      this.authService.getGradeAssignment(localStorage.getItem('grade')).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        // for (const car of data) {
        //   console.log(car);
        // }
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  onExport(filename: string) {
    try {
      console.log(filename);
      //return ;
      this.authService.getFiles(filename).subscribe(data => {
        console.log('done');
        let blob = new Blob([data], {type: "application/octet-stream"});
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
