import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpModalComponent } from './help-modal/help-modal.component';


@NgModule({
  declarations: [
    HelpModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HelpModalComponent
  ],
})
export class ComponentsModule { }
