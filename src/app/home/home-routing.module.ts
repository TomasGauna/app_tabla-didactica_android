import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { SplashScreenComponent } from '../components/splash-screen/splash-screen.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
