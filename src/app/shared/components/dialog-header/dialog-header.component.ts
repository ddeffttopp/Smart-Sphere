import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent {
  @Input() component = "";
  @Input() text = "";

  constructor(public dialogRef: MatDialogRef<DialogHeaderComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
