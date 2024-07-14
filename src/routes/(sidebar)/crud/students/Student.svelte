<script lang="ts">
	import { Button, Input, Label, Modal, Textarea, Select } from 'flowbite-svelte';
	import { studentColumnsMapping } from './types';
	import {
		genderOptions,
		timeSlotOptions,
		designatedOptions,
		instructorOptions,
		licenseExamTypeOptions,
		transmissionTypeOptions,
		registerInstructorOptions
	} from './select-options';
	import { zipcodeOptions } from '$lib/common/zipcode';
	export let open: boolean = false; // modal control

	export let data: Record<string, string> = {};

	let selectedGender = '';
	let selectedTimeSlot = '';
	let selectedDesignated = false;
	let selectedInstructor = '';
	let selectedTransmissionType = '自排';
	let selectedLicenseExamType = '新考';
	let selectedRegisterInstructor = '';
	let selectedPostalCode = '402';

	const { columns: c } = studentColumnsMapping;

	function init(form: HTMLFormElement) {
		// if (data?.name) [data.first_name, data.last_name] = data.name.split(' ');
		for (const key in data) {
			// console.log(key, data[key]);
			const el = form.elements.namedItem(key);
			if (el) el.value = data[key];
		}
		console.log(data);
	};
</script>

<Modal
	bind:open
	title={Object.keys(data).length ? `修改學員 ${data.student_id + data.name}` : '新增學員'}
	size="lg"
	class="m-4"
>
	<!-- Modal body -->
	<div class="space-y-6 p-0">
		<form
			method="POST"
			id="STUDENT_FORM"
			action={Object.keys(data).length ? '?/updateStudent' : '?/addStudent'}
			use:init
		>
			<div class="grid grid-cols-6 gap-6">
				<Input name="id" type="hidden" />
				<Input name="student_id" type="hidden" />
				<Label class="col-span-6 space-y-2 sm:col-span-2">
					<span>{c.batch.label}</span>
					<Input name={c.batch.name} class="border outline-none" placeholder="999A" />
				</Label>
				<Label class="col-span-6 space-y-2 sm:col-span-1">
					<span>{c.no.label}</span>
					<Input name={c.no.name} class="border outline-none" placeholder="099" />
				</Label>
				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>{c.name.label}</span>
					<Input name={c.name.name} class="border outline-none" placeholder="e.g. Bonnie" />
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>{c.birth.label}</span>
					<Input name={c.birth.name} class="border outline-none" minlength="7" maxlength="7" />
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>{c.national_id.label}</span>
					<Input name={c.national_id.name} class="border outline-none" />
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>{c.mobile.label}</span>
					<Input
						name={c.mobile.name}
						class="border outline-none"
						placeholder="e.g. React Developer"
						required
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>{c.second_phone_number.label}</span>
					<Input
						name={c.second_phone_number.name}
						class="border outline-none"
						placeholder="0912345678 (爸爸)"
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-2">
					<span>{c.postal_code.label}</span>
					<!-- <Input name={c.postal_code.label} class="border outline-none" placeholder="402" /> -->
					<Select name={c.postal_code.name} items={zipcodeOptions} bind:value={selectedPostalCode} />
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-4">
					<span>{'戶籍' + c.address.label}</span>
					<Input name={c.address.name} class="border outline-none" placeholder="••••••••" />
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>{c.email.label}</span>
					<Input
						name={c.email.name}
						type="email"
						class="border outline-none"
						placeholder="example@gmail.com"
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>{c.gender.label}</span>
					<Select items={genderOptions} bind:value={selectedGender} placeholder="" />
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-3">
					<span>{c.time_slot.label}</span>
					<Select
						name={c.time_slot.name}
						items={timeSlotOptions}
						bind:value={selectedTimeSlot}
						placeholder=""
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-1">
					<span>{c.designated.label}</span>
					<Select
						name={c.designated.name}
						items={designatedOptions}
						bind:value={selectedDesignated}
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-2">
					<span>{c.instructor.label}</span>
					<Select
						name={c.instructor.name}
						items={instructorOptions}
						bind:value={selectedInstructor}
						placeholder=""
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-1">
					<span>{c.transmission_type.label}</span>
					<Select
						name={c.transmission_type.name}
						items={transmissionTypeOptions}
						bind:value={selectedTransmissionType}
						placeholder=""
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-1">
					<span>{c.license_exam_type.label}</span>
					<Select
						name={c.license_exam_type.name}
						items={licenseExamTypeOptions}
						bind:value={selectedLicenseExamType}
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-2">
					<span>{c.register_instructor.label}</span>
					<Select
						name={c.register_instructor.name}
						items={registerInstructorOptions}
						bind:value={selectedRegisterInstructor}
					/>
				</Label>

				<Label class="col-span-6 space-y-2 sm:col-span-2">
					<span>{c.learning_license_date.label}</span>
					<Input
						name={c.learning_license_date.name}
						class="border outline-none"
						placeholder=""
						minlength="7"
						maxlength="7"
					/>
				</Label>

				<Label class="col-span-6 space-y-2">
					<span>{c.notes.label}</span>
					<Textarea
						name={c.notes.name}
						rows="4"
						class="bg-gray-50 outline-none dark:bg-gray-700"
						placeholder=""
					></Textarea>
				</Label>
			</div>
		</form>
	</div>

	<!-- Modal footer -->
	<div slot="footer">
		<Button type="submit" form="STUDENT_FORM">{Object.keys(data).length ? '修改' : '新增'}</Button>
	</div>
</Modal>
