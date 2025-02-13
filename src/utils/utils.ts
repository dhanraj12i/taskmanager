const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return "Today";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export { formatDate };
