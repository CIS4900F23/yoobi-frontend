<script lang="ts">
	import ShowPlot from "../../../Components/show_plot.svelte";
	import { onMount } from "svelte";
	import { sharedDB } from "../store";
	import type { Plot } from "../../../types";

	let cur_plot: Plot;

	sharedDB.subscribe((data) => {
		cur_plot = data;
	});

	onMount(async () => {
		try {
			const response = await fetch("/api/plot/sentiment/all");

			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`);
			}

			const responseJSON = await response.json();

			//update our current plot
			let plot_obj = {
				data: responseJSON["data"],
				layout: responseJSON["layout"],
			};

			sharedDB.set(plot_obj);
		} catch (error) {
			return;
		}
	});
</script>

<main>
	<h1 class="px-2 py-4 text-4xl text-slate-500">
		All Universal Basic Income Posts
	</h1>

	<div class="space-y-2">
		<!-- Display Plot upon update -->
		{#key cur_plot}
			<ShowPlot plot={cur_plot} />
		{/key}
	</div>
</main>
