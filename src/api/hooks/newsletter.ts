import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api";

export const useNewsletterSignup = () => {
  return useMutation({
    mutationKey: ["newsletter-signup"],
    mutationFn: async (data: { email: string, name: string, consentForDevelopmentUpdates: boolean }) => {
      const response = await apiClient.post("/newsletter/sign-up", data);
      return response.data;
    }
  });
};