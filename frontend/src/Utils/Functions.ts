export const randInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const formatDateTime = (dateTime: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const sent = new Date(dateTime);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const format = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      ...options,
      timeZone: userTimeZone,
    }).format(date);

  const formattedSent = format(sent);
  const formattedToday = format(today);
  const formattedYesterday = format(yesterday);

  const [sentDate, sentTime] = formattedSent.split(", ");
  const todayDate = formattedToday.split(", ")[0];
  const yesterdayDate = formattedYesterday.split(", ")[0];

  const date =
    sentDate === todayDate
      ? "Today at"
      : sentDate === yesterdayDate
      ? "Yesterday at"
      : sentDate;

  return { date, time: sentTime };
};
