import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function CountdownTimer({ minutes }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60); // convert minutes to seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
      <Clock className="w-5 h-5 text-slate-950" />
      <span>{formatTime()}</span>
    </div>
  );
}

export default CountdownTimer;
