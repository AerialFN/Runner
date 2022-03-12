import { cat, pwd } from "https://deno.land/x/script/mod.ts";
import { relative } from "https://deno.land/std@0.129.0/path/mod.ts";

type Diagnostic = {
  file: string;
  severity: "error" | "warning" | "information";
  message: string;
  rule?: string;
  range: {
    start: { line: number; character: number };
    end: { line: number; character: number };
  };
};

type Analysis = {
  version: string;
  time: string;
  generalDiagnostics: Diagnostic[];
  summary: {
    filesAnalyzed: number;
    errorCount: number;
    warningCount: number;
    informationCount: number;
    timeInSec: number;
  };
};

const rawData = await cat("/tmp/pyright.json");
const analysis = JSON.parse(rawData) as Analysis;

analysis.generalDiagnostics.forEach((diagnostic) => {
  const severity = diagnostic.severity === "error" ? "error" : "warning";
  const params = [
    `line=${diagnostic.range.start.line}`,
    `col=${diagnostic.range.start.character}`,
    `file=${relative(pwd(), diagnostic.file)}`,
  ];

  console.log(`::${severity} ${params.join(",")}::${diagnostic.message}`);
});
