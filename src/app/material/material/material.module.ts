  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatInputModule } from '@angular/material/input';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatCardModule } from '@angular/material/card';
  import { MatChipsModule } from '@angular/material/chips';
  import { MatSnackBarModule } from '@angular/material/snack-bar';
  import { MatDialogModule } from '@angular/material/dialog';

  @NgModule({
    declarations: [],

    imports: [
      CommonModule,

      MatButtonModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatChipsModule,
      MatSnackBarModule,
      MatDialogModule
    ],

    exports: [
      MatButtonModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatChipsModule,
      MatSnackBarModule,
      MatDialogModule
    ]
  })
  export class MaterialModule {}