import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "welcome";

  subtitle = 'Jajaj got it'

  multipleV = {
    name: "Jose Rod",
    age:25,
    id:1245667
  }
  
  arrayObj = [
    {
      name: "Jose Rod",
      age:25,
      id:1245667
    },
    {
      name: "Juan Rid",
      age:27,
      id:5667132
    },
    {
      name: "Rodrigo Led",
      age:21,
      id:15422667
    },
  ]
  
}
