import { baseJobPrice } from "../data.js";

export const getJobSponsorshipPrice = (discountAmount = 0) =>
  (baseJobPrice * (100 - discountAmount)) / 100;
