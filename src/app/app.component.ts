import { Component, AfterViewInit } from '@angular/core';
import axios from 'axios';

declare let Stripe: (arg0: string) => any;

const connection: any = {
  API_URL: 'http://localhost:3000',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.startIntent();
  }
  // headers: HttpHeaders
  title = 'angular-stripe';
  amount = 1000;
  stripe: any;
  paymentIntent: any;
  elements: any;

  async startIntent() {
    try {
      this.stripe = Stripe(
        'pk_test_51LFwGLCuDfhw0FciV1gfhE0UMFj1ahmxK93BMXhtbRmjYFLGnhyxKxomOgF7JbJFND9kAxQlSZ0Dsnflc6BbYQGI009BcZ9C0V'
      );

      const intent = await axios.get(connection.API_URL + `/secret`, {
        params: {
          amount: this.amount,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('intent', intent.data);

      const client_secret = intent.data.client_secret;

      // console.log('Front end', client_secret);

      this.elements = this.stripe.elements(client_secret);

      const card = this.elements.create('card');
      card.mount('#card-element');
    } catch (error) {
      console.error(error);
    }
  }
}
