import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//create import form @ngular/router to then add it to the import object below
import {RouterModule} from'@angular/router';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { SingComponent } from './sing/sing.component';
import { DropdwnComponent } from './dropdwn/dropdwn.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    SingComponent,
    DropdwnComponent,
    PatientComponent,
    DoctorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //create route
    RouterModule.forRoot([
      {  
        //this will be route embeded with the port 4200/path
        // this path is found in the sing.component.ts
        path:'sing',
        component:SingComponent
      }
        ,
      {
        path:'my-component',
        component:MyComponentComponent

      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
