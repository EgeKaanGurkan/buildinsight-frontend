import { useMutation } from "react-query";
import { apiClient } from "@/api";

interface CreatePaymentIntentParams {
  productId: string;
  currencySymbol?: string;
  customerId?: string;
}

interface PaymentIntentResponse {
  clientSecret: string;
}

export const useStripeCreatePaymentIntent = () => {
  return useMutation<
    PaymentIntentResponse,
    unknown,
    CreatePaymentIntentParams
  >(
    ["stripe-create-payment-intent"],
    async ({ productId, currencySymbol = "eur", customerId }) => {
      const response = await apiClient.post<PaymentIntentResponse>(
        "/stripe/payment-intent",
        {
          productId,
          currencySymbol,
          customerId,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        // Your code to handle the mutation when it's running
      },
      onError: () => {
        // Your code to handle errors
      },
    }
  );
};

interface CreateCheckoutSessionParams {
  productId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerId?: string;
}

interface CheckoutSessionResponse {
  url: string;
}

export const useStripeCreateCheckoutSession = () => {
  return useMutation<
    CheckoutSessionResponse,
    unknown,
    CreateCheckoutSessionParams
  >(
    ["stripe-create-checkout-session"],
    async ({ productId, priceId, successUrl, cancelUrl, customerId }) => {
      const response = await apiClient.post<CheckoutSessionResponse>(
        "/stripe/checkout",
        {
          productId,
          priceId,
          successUrl,
          cancelUrl,
          customerId,
        }
      );
      return response.data;
    },
    {
      onMutate: () => {
        // Your code to handle the mutation when it's running
      },
      onError: () => {
        // Your code to handle errors
      },
    }
  );
};