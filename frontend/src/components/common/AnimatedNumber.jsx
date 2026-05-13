// AnimatedNumber:
// reusable count-up component for stat cards, rewards, and presentation polish.
import { useEffect, useMemo, useRef, useState } from "react";

const easeOutCubic = (value) => 1 - (1 - value) ** 3;

const AnimatedNumber = ({
  className = "",
  decimals,
  duration = 900,
  prefix = "",
  suffix = "",
  value = 0,
}) => {
  const numericValue = Number(value) || 0;
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);
  const hasAnimatedRef = useRef(false);

  const resolvedDecimals = useMemo(() => {
    if (typeof decimals === "number") {
      return decimals;
    }

    return Number.isInteger(numericValue) ? 0 : 1;
  }, [decimals, numericValue]);

  useEffect(() => {
    // Respect the app's reduced-motion mode by skipping the animation entirely.
    const reduceMotion =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("reduce-motion");

    if (reduceMotion) {
      setDisplayValue(numericValue);
      previousValueRef.current = numericValue;
      hasAnimatedRef.current = true;
      return undefined;
    }

    // First render counts up from 0; later updates animate from the previous value.
    const fromValue = hasAnimatedRef.current ? previousValueRef.current : 0;
    const toValue = numericValue;

    if (fromValue === toValue) {
      setDisplayValue(toValue);
      previousValueRef.current = toValue;
      hasAnimatedRef.current = true;
      return undefined;
    }

    let frameId = null;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const nextValue = fromValue + (toValue - fromValue) * eased;

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      previousValueRef.current = toValue;
      hasAnimatedRef.current = true;
      setDisplayValue(toValue);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [duration, numericValue]);

  const formattedValue = useMemo(
    () =>
      displayValue.toLocaleString(undefined, {
        maximumFractionDigits: resolvedDecimals,
        minimumFractionDigits: resolvedDecimals,
      }),
    [displayValue, resolvedDecimals]
  );

  return <span className={className}>{`${prefix}${formattedValue}${suffix}`}</span>;
};

export default AnimatedNumber;
