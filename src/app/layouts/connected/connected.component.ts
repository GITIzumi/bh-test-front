import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConnectedUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-connected',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './connected.component.html',
  styleUrl: './connected.component.scss'
})
export class ConnectedComponent {

  user: ConnectedUser | null;

  private auth = inject(AuthService);

  constructor() {
    this.user = this.auth.currentUserValue;
  }
}
