<script lang="ts">
	import { onMount } from "svelte";

	export let collection: string = "all";
	let totalPosts: number = -1;
	let sizeEndpoint: string;

	// Define all possible endpoints in the event a different collection is specified when the component is initialized
	if (collection == "all") sizeEndpoint = "/api/posts/size";
	else if (collection == "twitter") sizeEndpoint = "/api/posts/tweets/size";
	else if (collection == "reddit") sizeEndpoint = "/api/posts/reddit/size";

	// Get size on component mount
	onMount(async function () {
		const sizeResponse = await fetch(sizeEndpoint);

		if (!sizeResponse.ok) {
			return;
		}

		const sizeJSON = await sizeResponse.json();
		totalPosts = sizeJSON["size"];
	});
</script>

<main>
	{#if collection == "all"}
		<p class="px-2">Total Posts: {totalPosts}</p>
	{:else if collection == "twitter"}
		<p class="px-2">Total Tweets: {totalPosts}</p>
	{:else if collection == "reddit"}
		<p class="px-2">Total Reddit Posts: {totalPosts}</p>
	{/if}
</main>
