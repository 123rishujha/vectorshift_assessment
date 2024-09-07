import { useEffect, useState } from "react";

const useProgressHook = (totalDuration) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalDuration = 170;
    const totalSteps = totalDuration / intervalDuration;
    const step = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev - step <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, intervalDuration);

    return () => clearInterval(timer);
  }, [totalDuration]);

  return progress;
};

export default useProgressHook;
