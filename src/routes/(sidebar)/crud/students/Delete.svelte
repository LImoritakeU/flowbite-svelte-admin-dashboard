<script lang="ts">
	import { Button, CloseButton, Heading, Modal, Input } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	export let open: boolean = false; // modal control

	export let data: Record<string, string> = {};

	function init(form: HTMLFormElement) {
		for (const key in data) {
			// console.log(key, data[key]);
			const el = form.elements.namedItem(key);
			if (el) el.value = data[key];
		}
	};
</script>

<Modal 
	bind:open
	size="sm"
>
	<ExclamationCircleOutline class="mx-auto mb-4 mt-8 h-10 w-10 text-red-600" />

	<h3 class="mb-6 text-center text-lg text-gray-500 dark:text-gray-400">
		刪除後無法復原，確定要刪除嗎？
	</h3>

	<form method="POST" id="STUDENT_DELTE_FORM" action="?/deleteStudent" use:init>
		<Input name="id" type="hidden" />	
	</form>	

		<div class="flex items-center justify-center">
			<Button type="submit" form="STUDENT_DELTE_FORM"  color="red" class="mr-2">是的，我很確定</Button>
			<Button color="alternative" on:click={() => (open = false)}>取消</Button>
		</div>
</Modal>
