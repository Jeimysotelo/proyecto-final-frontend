import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { NewProductComponent } from './pages/private/new-product/new-product.component';
import { ShowProductsComponent } from './pages/private/show-products/show-products.component';
import { ProductsComponent } from './pages/public/products/products.component';
import { UpdateProductsComponent } from './pages/private/update-products/update-products.component';
import { NewLocationComponent } from './pages/private/new-location/new-location.component';
import { ShowLocationComponent } from './pages/private/show-location/show-location.component';
import { NewEventComponent } from './pages/private/new-event/new-event.component';
import { ShowEventsComponent } from './pages/private/show-events/show-events.component';
import { EventsComponent } from './pages/public/events/events.component';
import { UpdateLocationComponent } from './pages/private/update-location/update-location.component';
import { UpdateEventsComponent } from './pages/private/update-events/update-events.component';
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path:'register-product', component: NewProductComponent, canActivate: [AdminGuard]},
  {path: 'show-products', component: ShowProductsComponent,  canActivate: [AdminGuard]},
  {path: 'products', component: ProductsComponent},
  {path: 'update-products/:id', component: UpdateProductsComponent, canActivate: [AdminGuard]},
  {path: 'newLocation', component: NewLocationComponent, canActivate: [AdminGuard]},
  {path:'show-location', component:ShowLocationComponent, canActivate: [AdminGuard]},
  {path:'new-event', component:NewEventComponent, canActivate: [AdminGuard]},
  {path: 'show-events', component: ShowEventsComponent, canActivate: [AdminGuard]},
  {path: 'events', component: EventsComponent},
  {path: 'update-location/:id', component: UpdateLocationComponent, canActivate: [AdminGuard]},
  {path: 'update-event/:id', component: UpdateEventsComponent, canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
