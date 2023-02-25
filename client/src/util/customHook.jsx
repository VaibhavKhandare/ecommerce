import { useState, useMemo, useEffect } from "react";

export const useHover = () => {
  const [hovered, setHovered] = useState(false);

  const eventHandlers = useMemo(
    () => ({
      onMouseOver() {
        setHovered(true);
      },
      onMouseOut() {
        setHovered(false);
      },
    }),
    []
  );

  return [hovered, eventHandlers];
};

export const useShift = (sensitivity, len) => {
  const [shift, setShift] = useState(0);
  useEffect(() => {
    var SLIDER_DIRECTION = 1;
    if (!sensitivity) return;
    const slideInterval = setInterval(() => {
      setShift((val) => {
        if (val === 0) SLIDER_DIRECTION = 1;
        else if (val === len - 1) SLIDER_DIRECTION = -1;
        return val + SLIDER_DIRECTION;
      });
    }, 1000);
    return () => clearInterval(slideInterval);
  }, [sensitivity]);
  return [shift];
};
