import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ZoomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
