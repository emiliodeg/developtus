export const dateFormatter = (date: string | Date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(date));
