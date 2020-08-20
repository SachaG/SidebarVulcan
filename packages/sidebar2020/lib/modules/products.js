import { addProduct } from "meteor/vulcan:payments";
import { getPostSponsorshipPrice } from "./posts/helpers";
import { getJobSponsorshipPrice } from "./jobs/helpers";

addProduct("sponsorship", (post) => ({
  name: "Sidebar Sponsorship",
  // convert price to cents
  amount: getPostSponsorshipPrice(post.discountAmount) * 100,
  currency: "USD",
  description: `For “${post.title}”`,
}));

addProduct("jobPosting", (job) => ({
  name: "Job Posting",
  // convert price to cents
  amount: getJobSponsorshipPrice(job.discountAmount) * 100,
  currency: "USD",
  description: `${job.company}: ${job.title}`,
}));
