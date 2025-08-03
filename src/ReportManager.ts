import { ReportAdapter } from "./ReportAdapter";
import { JsonReportAdapter } from "./JsonReportAdapter";
import { CsvReportAdapter } from "./CsvReportAdapter";
import { XmlReportAdapter } from "./XmlReportAdapter";
import { AnalyzerFacade } from "./AnalyzerFacade";
import * as fs from "fs";
import * as path from "path";

export class ReportManager {
  private adapter: ReportAdapter;
  private format: string;

  constructor(format: string) {
    this.format = format.toLowerCase();

    switch (this.format) {
      case "json":
        this.adapter = new JsonReportAdapter();
        break;
      case "csv":
        this.adapter = new CsvReportAdapter();
        break;
      case "xml":
        this.adapter = new XmlReportAdapter();
        break;
      default:
        throw new Error(
          `Unsupported format: ${format}. Use json, csv, or xml.`
        );
    }
  }

  generateReport(dirPath: string): void {
    try {
      const facade = new AnalyzerFacade(this.adapter);
      const report = facade.generateReport(dirPath);

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const reportDir = path.join(__dirname, "reports");

      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir);
      }

      const filePath = path.join(
        reportDir,
        `report-${timestamp}.${this.format}`
      );
      fs.writeFileSync(filePath, report);

      console.log(`✅ Report generated successfully: ${filePath}`);
    } catch (err: any) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        `❌ Error generating report: ${err.message}`
      );
      // process.exit(1); // можна додати за бажанням
    }
  }
}
