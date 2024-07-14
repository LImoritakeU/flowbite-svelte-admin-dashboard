import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabase-client';
import { transformMinguoDateToAd } from '$lib/common/date-transfer';
import validator from 'validator';

export const load = (async () => {
	const { error, data, status } = await supabase.from('students').select('*').limit(10);

	return {
		students: data ?? []
	};
}) satisfies PageServerLoad;

export const actions = {
	deleteStudent: async ({ request }) => {
        const formData = await request.formData();
        const formObject = Object.fromEntries(formData.entries());
        const id = formObject.id as string;
        console.log(id);
        const {  error } = await supabase.from('students').delete().match({ id });

        if (error) {
			console.error(error);
			return { success: false };
		}

		return { success: true };
    },
	addStudent: async ({ request }) => {
		const formData = await request.formData();
		const formObject = Object.fromEntries(formData.entries());

		const data = convertStudentFormObject(formObject);
		delete data.id;
		console.log(data);
		const { data: student, error } = await supabase.from('students').insert([data]);
		if (error) {
			console.error(error);
			return { success: false };
		}

		return { success: true };
	},
	updateStudent: async ({ request }) => {
		const formData = await request.formData();
		const formObject = Object.fromEntries(formData.entries());
		const data = convertStudentFormObject(formObject);
		console.log(data);

		const { data: student, error } = await supabase
			.from('students')
			.update(data)
			.match({ id: data.id as string });

		if (error) {
			console.error(error);
			return { success: false };
		}
		return { success: true };
	},
	searchStudent: async (event) => {}
};

const convertStudentFormObject = (formObject: Record<string, FormDataEntryValue>) => {
	return {
		...formObject,
		id: validator.isEmpty(formObject.id as string) ? undefined : (formObject.id as string),
		student_id:
			formObject.no && formObject.batch
				? `${formObject.batch}-${(formObject.no as string).padStart(3, '0')}`
				: undefined,
		no: Number(formObject.no),
		designated: formObject.designated === 'true',
		birth: validator.isEmpty(formObject.birth as string)
			? undefined
			: transformMinguoDateToAd(formObject.birth as string),
		learning_license_date: validator.isEmpty(formObject.learning_license_date as string)
			? undefined
			: transformMinguoDateToAd(formObject.learning_license_date as string),
		postal_code: Number(formObject.postal_code)
	};
};
