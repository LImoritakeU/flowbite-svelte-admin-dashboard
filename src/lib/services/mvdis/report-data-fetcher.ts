import type { SupabaseClient } from '@supabase/supabase-js';

export type ReportType =
	// TODO: 整合所有報表獲取資料
	// | 'get_m3_yearly_plan'  // m3 年度計畫
	// | 'get_m3_start'  // m3 開訓
	// | 'get_m3_end'   // m3 結訓
	// | 'get_m3_written_test' // m3 筆試
	// | 'get_m3_road_test'   // m3 路考
	| 'print_report_start' // 紙本開訓名冊
	| 'print_report_end' // 紙本結訓名冊
	| 'print_report_test'; // 紙本考驗清冊

export class ReportDataFetcher {
	constructor(
		public db: SupabaseClient,
		public report: ReportType,
		public batch: string
	) {}

	validate() {
		if (!this.batch) {
			throw new Error('batch is required');
		}
	}
	async getBatchInformation() {
		const { data } = await this.db
			.from('batches')
			.select('batch, start_date, end_date')
			.eq('batch', this.batch)
			.single();

		if (data) {
			return data;
		}
	}

	async getData() {
		const { data } = await this.db
			.rpc(this.report, {
				batch: this.batch
			})
			.select('*');

		if (data) {
			return data;
		}
	}
}
