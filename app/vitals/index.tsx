import React, { useEffect, useRef, useState } from "react";
import {
  onLCP,
  onINP,
  onCLS,
  type CLSMetric,
  type INPMetric,
  type LCPMetric,
} from "web-vitals";
import Dialog from "~/dialog";
import "./index.css";

const metricURLMap = {
  CLS: "https://web.dev/articles/cls",
  INP: "https://web.dev/articles/inp",
  LCP: "https://web.dev/articles/lcp",
};
const Vitals: React.FC = () => {
  const queue = useRef<Set<CLSMetric | INPMetric | LCPMetric>>(
    new Set<CLSMetric | INPMetric | LCPMetric>(),
  );
  const [time, setTime] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<(CLSMetric | INPMetric | LCPMetric)[]>(
    [],
  );

  const addToQueue = (metric: CLSMetric | INPMetric | LCPMetric) => {
    if (![...queue.current].some((m) => m.name === metric.name)) {
      queue.current.add(metric);
    }
  };

  const flushQueue = () => {
    if (queue.current.size > 0) {
      setMetrics([...queue.current]);
    }
  };

  useEffect(() => {
    const perfData: PerformanceTiming = window.performance.timing;
    setTime(perfData.loadEventEnd - perfData.navigationStart);

    onCLS(addToQueue, {
      reportAllChanges: true,
    });
    onINP(
      (metric) => {
        if (![...queue.current].some((m) => m.name === metric.name)) {
          queue.current.add(metric);
          flushQueue();
        }
      },
      {
        reportAllChanges: true,
      },
    );
    onLCP(addToQueue, {
      reportAllChanges: true,
    });
  }, []);

  return (
    <div className="vitals">
      <div className="webpage-info text-sm flex gap-8">
        <div className="a11y-info">100% accessible webpage</div>
        <div>{" | "}</div>
        <div>Page loaded in {time}ms</div>
      </div>
      <div className="see-more">
        <button className="text-xs underline" onClick={() => setOpen(true)}>
          See more
        </button>
      </div>
      <Dialog open={open} title="Vitals" onClose={() => setOpen(false)}>
        <div className="body metrics flex gap-8">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="border p-8 rounded-lg text-left capitalize"
              tabIndex={0}
              aria-label={`Metric: ${metric.name}; Rating: ${metric.rating}`}
            >
              <div>
                <span className="secondary-text">Metric: </span>
                <a
                  className="underline"
                  href={metricURLMap[metric.name]}
                  target="_blank"
                  aria-label={`Learn about ${metric.name}`}
                  rel="noreferrer"
                >
                  {metric.name}
                </a>
              </div>
              <div>
                <span className="secondary-text">Rating: </span>
                <span className="text-green-600">{metric.rating}</span>
              </div>
            </div>
          ))}
        </div>
        <div
          className="credit text-xs flex items-center justify-start mt-4"
          tabIndex={0}
          aria-label="Measured using web-vitals"
        >
          Measured using&nbsp;
          <a
            className="underline portfolio-link"
            href="https://github.com/GoogleChrome/web-vitals"
            target="_blank"
            aria-label="Learn about web-vitals"
            rel="noreferrer"
          >
            web-vitals
          </a>
        </div>
        <div className="footer flex items-center justify-end w-[100%] mt-8">
          <button
            className="plr-16 ptb-4 border rounded-2xl"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default Vitals;
