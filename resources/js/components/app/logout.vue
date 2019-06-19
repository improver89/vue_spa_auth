<template>
	<li v-if="showMenu"
	    class="small"
	    style="cursor: pointer;"
	    @click="logout">
		<a>
			<i class="material-icons left">subdirectory_arrow_right</i>Log out
		</a>
	</li>
</template>
<script>
	export default {
		name: "logout",
		props: {
			logout: Function,
			showMenu: Boolean
		}
	};
</script>
<style scoped>
</style>
