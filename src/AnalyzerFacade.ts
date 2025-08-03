import { DirectoryAnalyzer } from "./DirectoryAnalyzer";
import { ReportAdapter } from "./ReportAdapter";

export class AnalyzerFacade {
  private analyzer: DirectoryAnalyzer;
  private adapter: ReportAdapter;

  constructor(adapter: ReportAdapter) {
    this.analyzer = new DirectoryAnalyzer();
    this.adapter = adapter;
  }

  generateReport(dirPath: string): string {
    const report = this.analyzer.analyze(dirPath);
    return this.adapter.export(report);
  }
}
