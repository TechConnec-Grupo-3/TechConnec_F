import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-event-create-comment',
  standalone: true,
  imports:  [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './event-create-comment.component.html',
  styleUrl: './event-create-comment.component.css'
})
export class EventCreateCommentComponent {

}
