import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  imports: [JsonPipe],
})
export class DynamicPageComponent { }
