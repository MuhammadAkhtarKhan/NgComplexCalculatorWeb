import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


export class ProgressSpinnerOverviewExample {}


@Component({
  selector: 'app-custom-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './custom-loader.component.html',
  styleUrl: './custom-loader.component.scss'
})
export class CustomLoaderComponent {
 @Input() loading: boolean = false;

}
