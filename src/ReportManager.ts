import { ReportAdapter } from "./ReportAdapter";
import { JsonReportAdapter } from "./JsonReportAdapter";
import { CsvReportAdapter } from "./CsvReportAdapter";
import { XmlReportAdapter } from "./XmlReportAdapter";
import { AnalyzerFacade } from "./AnalyzerFacade";
import * as fs from "fs";
import * as path from "path";

export class ReportManager {
  private adapter: ReportAdapter;

  constructor(format: string) {
    switch (format.toLowerCase()) {
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
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  generateReport(dirPath: string) {
    try {
      const facade = new AnalyzerFacade(this.adapter);
      const report = facade.generateReport(dirPath);

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const format = this.adapter.constructor.name
        .replace("ReportAdapter", "")
        .toLowerCase();
      const reportDir = path.join(__dirname, "reports");
      const filePath = path.join(reportDir, `report-${timestamp}.${format}`);

      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir);
      }

      fs.writeFileSync(filePath, report);
      console.log(`Report generated successfully: ${filePath}`);
    } catch (err: any) {
      console.error(`Error generating report: ${err.message}`);
    }
  }
}
