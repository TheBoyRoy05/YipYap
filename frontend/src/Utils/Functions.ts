/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConversationType, UserType } from "./Types";

export const hashIDToColor = (ID: string) => {
  let hash = 0;
  
  for (let i = 0; i < ID.length; i++) {
    hash = (hash << 5) - hash + ID.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  
  return `hsla(${Math.abs(hash % 360)}deg, 60%, 60%)`;
};

export const getConversationName = (conversation: ConversationType, authUser: UserType) => {
  return (
    conversation.name ||
    conversation.participants
      .filter((p) => p._id != authUser._id)
      .map((p) => p.fullName)
      .join(", ")
  );
};

// Helper function to handle both direct values and callbacks (Thanks ChatGPT)
export const createSetter =
  <StoreType>(set: any) =>
  <T extends keyof StoreType>(key: T) =>
  (value: StoreType[T] | ((prev: StoreType[T]) => StoreType[T])) =>
    set((state: StoreType) => ({
      [key]:
        typeof value === "function"
          ? (value as (prev: StoreType[T]) => StoreType[T])(state[key])
          : value,
    }));

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
    sentDate === todayDate ? "Today at" : sentDate === yesterdayDate ? "Yesterday at" : sentDate;

  return { date, time: sentTime };
};
