import "./style.css";

const TopSection = () => {
  const date = new Date();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const dayText = `${weekdays[date.getDay()]} ${date.getDate()}`;
  const timeText = `${date.getHours()}:${minutes}`;

  return (
    <div className="top">
      <div className="topin">
        <p className="top1">{dayText}</p>
        <p className="top2">{timeText}</p>
      </div>
    </div>
  );
};

export default TopSection;
