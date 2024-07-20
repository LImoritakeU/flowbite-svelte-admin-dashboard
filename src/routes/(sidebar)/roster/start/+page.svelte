<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { reportGenerator } from '$lib/services/mvdis/report-generator';
	import {
		Avatar,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Dropdown,
		Heading,
		Indicator,
		Search,
		Input,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Toolbar,
		ToolbarButton,
		ToolbarGroup,
		DropdownItem
	} from 'flowbite-svelte';

	import {
		ChevronDownOutline,
		CogSolid,
		DotsVerticalOutline,
		DownloadSolid,
		EditOutline,
		ExclamationCircleSolid,
		PlusOutline,
		TrashBinSolid,
		SearchOutline
	} from 'flowbite-svelte-icons';

	import MetaTag from '../../../utils/MetaTag.svelte';
	import type { ActionData, PageData } from './$types.js';
	import { studentColumnsMapping } from './types';

	const { columns: c } = studentColumnsMapping;

	export let data: PageData;
	export let form: ActionData;

	const { students, batchInfo } = data;

	let openUser: boolean = false; // modal control
	let openDelete: boolean = false; // modal control

	let currentStudent: any = {};
	let checkedStudents: any = [];

	const path: string = '/crud/students';
	const description: string = 'CRUD students examaple - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - CRUD Students';
	const subtitle: string = 'CRUD Students';
	const pageName = '開訓名冊';

	let searchInput = '';
	let selected = [];

	function generateDocxLink(blob: Blob, fileName: string) {
		const url = window.URL.createObjectURL(blob);

		const a = document.createElement('a');

		a.setAttribute('hidden', '');
		a.setAttribute('href', url);
		a.setAttribute('download', fileName);

		a.click();
	}

	function exportReport() {
		reportGenerator.generateStartReport(students, batchInfo).then((blob) => {
			generateDocxLink(blob, 'output.docx');
		});
	}

	onMount(() => {
		exportReport();
	});
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/roster/start">{pageName}</BreadcrumbItem>
			<BreadcrumbItem>列表</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			{pageName}
		</Heading>

		<Toolbar embedded class="w-full py-4 text-gray-500  dark:text-gray-400">
			<form method="POST" class="flex" action="?/searchStudents" use:enhance>
				<Search size="md" class="rounded-none py-2.5" placeholder="期別" bind:value={searchInput} />
				<Input type="hidden" name="search" value={searchInput} />
				<Button class="rounded-s-none !p-2.5" type="submit">
					<SearchOutline class="h-6 w-6" />
				</Button>
			</form>
			<!-- <Input placeholder="搜尋學員" class="me-4 w-80 border xl:w-96" />
			<Button>搜尋選項<ChevronDownOutline class="ms-2 h-6 w-6 text-white dark:text-white" /></Button
			> -->

			<div class="border-l border-gray-100 pl-2 dark:border-gray-700">
				<!-- <ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<CogSolid size="lg" />
				</ToolbarButton>
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<TrashBinSolid size="lg" />
				</ToolbarButton>
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<ExclamationCircleSolid size="lg" />
				</ToolbarButton> -->
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<DotsVerticalOutline size="lg" class="dots-menu" />
					<Dropdown triggeredBy=".dots-menu">
						<DropdownItem>刪除紀錄</DropdownItem>
					</Dropdown>
				</ToolbarButton>
			</div>

			<div slot="end" class="flex items-center space-x-2">
				<Button size="sm" class="gap-2 px-3">
					<DownloadSolid size="md" class="-ml-1" />匯出
				</Button>
			</div>
		</Toolbar>
	</div>
	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<!-- <TableHeadCell class="w-4 p-4"><Checkbox   /></TableHeadCell> -->
			{#each ['編號', '姓名', '性別', '出生日期', '身分證字號', '住址', '手/自排', '電話', '發照資格', '發照日'] as title}
				<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
			{/each}
		</TableHead>
		{#if students && students.length > 0}
			<TableBody>
				{#each students as student, index}
					<TableBodyRow class="text-base">
						<TableBodyCell class="p-4">{student.no}</TableBodyCell>
						<TableBodyCell>{student.name}</TableBodyCell>
						<TableBodyCell>{student.gender}</TableBodyCell>
						<TableBodyCell>{student.birth}</TableBodyCell>
						<TableBodyCell>{student.national_id}</TableBodyCell>
						<TableBodyCell>{student.address}</TableBodyCell>
						<TableBodyCell>{student.transmission_type}</TableBodyCell>
						<TableBodyCell>{student.mobile}</TableBodyCell>
						<TableBodyCell>{student.license_exam_type}</TableBodyCell>
						<TableBodyCell>{student.learning_license_date}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		{/if}
	</Table>
</main>
