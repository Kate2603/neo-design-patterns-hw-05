import { ReportAdapter } from "./ReportAdapter";
import { DirectoryReport } from "./DirectoryReport";

export class CsvReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    let result = "Metric,Value\n";
    result += `Total Files,${report.files}\n`;
    result += `Total Directories,${report.directories}\n`;
    result += `Total Size (bytes),${report.totalSize}\n\n`;
    result += "Extension,Count\n";

    for (const [ext, count] of Object.entries(report.extensions)) {
      result += `${ext},${count}\n`;
    }

    return result;
  }
}
