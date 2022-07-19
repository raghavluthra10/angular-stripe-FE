import { Component } from '@angular/core';
import axios from 'axios';
import { HttpHeaders } from '@angular/common/http';

declare let Stripe: (arg0: string) => any;

const connection: any = {
  API_URL: 'http://localhost:3000',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // headers: HttpHeaders
  title = 'angular-stripe';
  amount = 1000;
  stripe: any;
  paymentIntent: any;
  elements: any;

  async payWithStripe(e: any) {
    try {
      e.preventDefault();
      console.log('payWithStripe');

      const intent = await axios.get(connection.API_URL + `/secret`, {
        params: {
          amount: this.amount,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('intent', intent.data);

      // this.elements = this.stripe.elements();

      // var card = this.elements.create('card');
      // card.mount('#card-element');
    } catch (error) {
      console.error(error);
    }
  }
}
// this.stripe = Stripe(
//   'pk_test_51LFwGLCuDfhw0FciV1gfhE0UMFj1ahmxK93BMXhtbRmjYFLGnhyxKxomOgF7JbJFND9kAxQlSZ0Dsnflc6BbYQGI009BcZ9C0V'
// );

// const getIntent = await axios.get('/intent')

//   if(getIntent) {

//   }

// this.paymentIntent = await this.stripe.paymentIntents.create({
//   amount: this.amount,
//   currency: 'usd',
//   metadata: { integration_check: 'accept_a_payment' },
// });
