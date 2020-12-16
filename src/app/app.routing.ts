import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
    { path: '', component: WelcomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
    { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
    { path: 'error', pathMatch: 'full', redirectTo: 'login'}
];

export const appRountingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);