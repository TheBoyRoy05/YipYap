interface MessageProps {
  first: boolean;
  username: string;
  profilePic: string;
  message: string;
  dateTime: string;
}

const Message = (props: MessageProps) => {
  const { first, username, profilePic, message, dateTime } = props;
  const { date, time } = formatDateTime(dateTime);
  console.log(formatDateTime("2024-09-01T15:02:30.821Z"));

  return (
    <div className="flex items-center hover:bg-gray-700 group">
      {first ? (
        <div className="avatar">
          <div className="w-10 m-2 rounded-full">
            <img src={profilePic} alt="user avatar" />
          </div>
        </div>
      ) : (
        <span className="w-14 text-sm text-center invisible group-hover:visible">
          {time}
        </span>
      )}
      <div className="flex flex-col">
        {first ? (
          <div className="flex text-sm mt-1">
            <p className="text-white mr-2">{username}</p>
            <span>{`${date} ${time}`}</span>
          </div>
        ) : (
          <></>
        )}
        <p className="text-gray-300">{message}</p>
      </div>
    </div>
  );
};

const formatDateTime = (dateTime: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
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

export default Message;
