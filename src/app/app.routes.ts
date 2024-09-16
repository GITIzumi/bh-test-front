import { Routes } from '@angular/router';
import { ChartComponent } from './routes/chart/chart.component';
import { LoginComponent } from './routes/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ConnectedComponent } from './layouts/connected/connected.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {

        path: '',
        component: ConnectedComponent,

        children: [
            {
                path: 'chart', component: ChartComponent,
                canActivate: [AuthGuard],
            }

        ]

    },
];
