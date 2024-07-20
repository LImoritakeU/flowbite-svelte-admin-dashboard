import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabase-client';
import { transformMinguoDateToAd } from '$lib/common/date-transfer';
import validator from 'validator';

import { ReportDataFetcher, type ReportType } from '$lib/services/mvdis/report-data-fetcher';

export const load = (async () => {
	// const { error, data, status } = await supabase.from('students').select('*').limit(300);
	const report = 'print_report_start'; // 紙本開訓名冊
	// | 'print_report_end'   // 紙本結訓名冊
	// | 'print_report_test';  // 紙本考驗清冊

	const batch = '230B';

	const reportDataFetcher = new ReportDataFetcher(supabase, report, batch);
	const students = await reportDataFetcher.getData();
	const batchInfo = await reportDataFetcher.getBatchInformation();

	return {
		students,
		batchInfo
	};
}) satisfies PageServerLoad;

export const actions = {
	searchStudents: async ({ request }) => {
		const formData = await request.formData();
		const formObject = Object.fromEntries(formData.entries());
		if (validator.isEmpty(formObject.search as string)) {
			return { success: true };
		}

		const { data, error } = await supabase
			.from('students')
			.select('*')
			.or(
				`name.ilike.%${formObject.search}%, student_id.ilike.%${formObject.search}%, batch.ilike.%${formObject.search}%, mobile.ilike.%${formObject.search}%`
			);

		if (error) {
			console.error(error);
			return { success: false };
		}

		return { students: data, success: true };
	}
};
