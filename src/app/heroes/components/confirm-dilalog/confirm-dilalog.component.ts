import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero-interface';

@Component({
  selector: 'app-confirm-dilalog',
  templateUrl: './confirm-dilalog.component.html',

})
export class ConfirmDilalogComponent {
  constructor(
    public dialogRef
    : MatDialogRef< ConfirmDilalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
    ,
  ) {}
onNoClick():void{
  this.dialogRef.close(false);
}

onConfirm():void{
  this.dialogRef.close(true);
}


}
