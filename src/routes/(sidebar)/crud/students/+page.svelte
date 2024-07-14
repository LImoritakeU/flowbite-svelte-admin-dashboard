<script lang="ts">
	import {
		Avatar,
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Checkbox,
		Heading,
		Indicator
	} from 'flowbite-svelte';
	import { Input, Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte';
	import { TableHeadCell, Toolbar, ToolbarButton, ToolbarGroup } from 'flowbite-svelte';
	import { CogSolid, DotsVerticalOutline, DownloadSolid } from 'flowbite-svelte-icons';
	import {
		EditOutline,
		ExclamationCircleSolid,
		PlusOutline,
		TrashBinSolid
	} from 'flowbite-svelte-icons';

	import Student from './Student.svelte'
	import Delete from './Delete.svelte';
	import MetaTag from '../../../utils/MetaTag.svelte';

	export let data;
	// console.log(data.students);

	const headers = Object.keys(data.students[0]);

	let openUser: boolean = false; // modal control
	let openDelete: boolean = false; // modal control

	let current_student: any = {};
	const path: string = '/crud/students';
	const description: string = 'CRUD students examaple - Flowbite Svelte Admin Dashboard';
	const title: string = 'Flowbite Svelte Admin Dashboard - CRUD Students';
	const subtitle: string = 'CRUD Students';

	const pageName = '學員資料';
</script>

<MetaTag {path} {description} {title} {subtitle} />

<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<div class="p-4">
		<Breadcrumb class="mb-5">
			<BreadcrumbItem home>Home</BreadcrumbItem>
			<BreadcrumbItem href="/crud/students">{pageName}</BreadcrumbItem>
			<BreadcrumbItem>List</BreadcrumbItem>
		</Breadcrumb>
		<Heading tag="h1" class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
			{pageName}
		</Heading>

		<Toolbar embedded class="w-full py-4 text-gray-500  dark:text-gray-400">
			<Input placeholder="Search for users" class="me-4 w-80 border xl:w-96" />
			<div class="border-l border-gray-100 pl-2 dark:border-gray-700">
				<ToolbarButton
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
				</ToolbarButton>
				<ToolbarButton
					color="dark"
					class="m-0 rounded p-1 hover:bg-gray-100 focus:ring-0 dark:hover:bg-gray-700"
				>
					<DotsVerticalOutline size="lg" />
				</ToolbarButton>
			</div>

			<div slot="end" class="flex items-center space-x-2">
				<Button
					size="sm"
					class="gap-2 whitespace-nowrap px-3"
					on:click={() => ((current_student = {}), (openUser = true))}
				>
					<PlusOutline size="sm" />新增學員
				</Button>
				<Button size="sm" color="alternative" class="gap-2 px-3">
					<DownloadSolid size="md" class="-ml-1" />匯出
				</Button>
			</div>
		</Toolbar>
	</div>
	<Table>
		<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
			<TableHeadCell class="w-4 p-4"><Checkbox /></TableHeadCell>
			{#each ['學號', '姓名', '備註', '手機', 'EMAIL', '', '動作'] as title}
				<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each data.students as student}
				<TableBodyRow class="text-base">
					<TableBodyCell class="w-4 p-4"><Checkbox /></TableBodyCell>
					<TableBodyCell class="p-4">{student.student_id}</TableBodyCell>
					<TableBodyCell class="mr-12 flex items-center space-x-6 whitespace-nowrap p-4">
						<!-- <Avatar src={imagesPath(student.avatar, 'users')} /> -->
						<div class="text-sm font-normal text-gray-500 dark:text-gray-400">
							<div class="text-base font-semibold text-gray-900 dark:text-white">{student.name}</div>
							<div class="text-sm font-normal text-gray-500 dark:text-gray-400">{student.national_id}</div>
						</div>
					</TableBodyCell>
					<TableBodyCell
						class="max-w-sm overflow-hidden truncate p-4 text-base font-normal text-gray-500 dark:text-gray-400 xl:max-w-xs"
					>
						{student.notes}
					</TableBodyCell>
					<TableBodyCell class="p-4">{student.mobile}</TableBodyCell>
					<TableBodyCell class="p-4">{student.email}</TableBodyCell>
					<!-- <TableBodyCell class="p-4">{student.postal_code}</TableBodyCell>
					<TableBodyCell class="p-4">{student.address}</TableBodyCell> -->
					<!-- <TableBodyCell class="p-4 font-normal">
						<div class="flex items-center gap-2">
							<Indicator color={student.status === 'Active' ? 'green' : 'red'} />
							{student.status}
						</div>
					</TableBodyCell> -->
					<TableBodyCell class="space-x-2 p-4">
						<Button
							size="sm"
							class="gap-2 px-3"
							on:click={() => ((current_student = student), (openUser = true))}
						>
							<EditOutline size="sm" /> 修改
						</Button>
						<Button
							color="red"
							size="sm"
							class="gap-2 px-3"
							on:click={() => ((current_student = student), (openDelete = true))}
						>
							<TrashBinSolid size="sm" /> 刪除
						</Button>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</main>

<!-- Modals -->

<Student bind:open={openUser} data={current_student} />
<Delete bind:open={openDelete} data={current_student}/>
