import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsletterRoutingModule } from './newsletter-routing.module';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NewsletterComponent],
  imports: [
    CommonModule,
    SharedModule,
    NewsletterRoutingModule,
  ]
})
export class NewsletterModule { }
