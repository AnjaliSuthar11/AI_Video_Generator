import * as Sentry from "@sentry/node";


Sentry.init({
  dsn: "https://ebcbcba126d6277cd9bfaba1ed7223ad@o4511477507620864.ingest.us.sentry.io/4511477511880704",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});