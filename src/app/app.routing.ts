import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
    { path: '', component: WelcomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register',component: RegisterComponent},
    { path: 'home', component: HomeComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'error', component: ErrorComponent}
];

export const appRountingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);