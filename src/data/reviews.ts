export type Review = {
  id: string;
  name: string;
  locationLabel: string;
  body: string;
  featured: boolean;
};

/** Testimonials from the public metromowcrew.com site (Satisfied Customers). */
export const reviews: Review[] = [
  {
    id: "matt-y",
    name: "Matt Y.",
    locationLabel: "Metro Mow Crew customer",
    body: "Metro Mow Crew transformed my overgrown yard into a beautiful, manicured lawn. I couldn't be happier with the results!",
    featured: true,
  },
  {
    id: "ben-s",
    name: "Ben S.",
    locationLabel: "Metro Mow Crew customer",
    body: "I highly recommend Metro Mow Crew for their attention to detail and exceptional service. My lawn looks amazing!",
    featured: true,
  },
  {
    id: "sarah-f",
    name: "Sarah F.",
    locationLabel: "Metro Mow Crew customer",
    body: "The team at Metro Mow Crew exceeded my expectations. They are professional, reliable, and truly care about their customers.",
    featured: true,
  },
];
