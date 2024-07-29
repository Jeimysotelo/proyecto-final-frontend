import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/public/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoComponent } from './components/video/video.component';
import { ButtonsComponent } from './components/video/buttons/buttons.component';
import { NewProductComponent } from './pages/private/new-product/new-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    VideoComponent,
    ButtonsComponent,
    NewProductComponent,
    ShowProductsComponent,
    ProductsComponent,
    UpdateProductsComponent,
    NewLocationComponent,
    ShowLocationComponent,
    NewEventComponent,
    ShowEventsComponent,
    EventsComponent,
    UpdateLocationComponent,
    UpdateEventsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
