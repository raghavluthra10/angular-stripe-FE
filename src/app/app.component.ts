import { Component, AfterViewInit, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

declare let Stripe: (arg0: string) => any;

const connection: any = {
  API_URL: 'http://localhost:3000',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  async ngOnInit() {
    this.paymentIntent = await axios.get(connection.API_URL + `/secret`, {
      params: {
        amount: this.amount,
      },
      headers: { 'Content-Type': 'application/json' },
    });
    this.startIntent();
  }

  title = 'angular-stripe';
  amount = 1000;
  stripe: any;
  paymentIntent: any;
  elements: any;
  client_secret: any;
  card: any;

  paymentSuccessful: boolean = false;

  async startIntent() {
    try {
      this.stripe = Stripe(
        'pk_test_51LFwGLCuDfhw0FciV1gfhE0UMFj1ahmxK93BMXhtbRmjYFLGnhyxKxomOgF7JbJFND9kAxQlSZ0Dsnflc6BbYQGI009BcZ9C0V'
      );

      this.client_secret = this.paymentIntent.data;
      console.log('client secret', this.client_secret);

      this.elements = this.stripe.elements(this.client_secret);

      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    } catch (error) {
      console.error(error);
    }
  }

  ngAfterViewInit() {}

  async payWithStripe(e: any) {
    try {
      e.preventDefault();
      this.stripe
        .confirmCardPayment(this.client_secret.client_secret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: 'Jenny Rosen',
            },
          },
        })
        .then((result: any) => {
          if (result.error) {
            console.log(result.error.message);
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              console.log('success of payment');

              this.paymentSuccessful = true;
            }
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
}
