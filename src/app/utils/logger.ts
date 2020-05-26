import { green } from "https://deno.land/std@0.51.0/fmt/colors.ts";
import {
    createLogger,
    LogLevel,
    consoleSink,
    fileSink,
    jsonFormat,
    textFormat,
  } from "https://deno.land/x/deno_structured_logging@0.4.1/mod.ts";

// logger function

export function logger() {
    return createLogger({
    minimumLevel: LogLevel.INFO,
    outputFormat: textFormat, // You can customise the default output format
  })
    .addSink(consoleSink({
      colorOptions: { info: green }, // You can customise the log level colors
    }))
    .addSink(fileSink("./log/all-logs.log"), jsonFormat);
}
