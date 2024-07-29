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


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path:'register-product', component: NewProductComponent},
  {path: 'show-products', component: ShowProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'update-products/:id', component: UpdateProductsComponent},
  {path: 'newLocation', component: NewLocationComponent},
  {path:'show-location', component:ShowLocationComponent},
  {path:'new-event', component:NewEventComponent},
  {path: 'show-events', component: ShowEventsComponent},
  {path: 'events', component: EventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
