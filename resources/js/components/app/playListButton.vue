<template>
	<router-link tag="li"
	             class="waves-effect waves-light waves-block sidenav-close"
	             active-class="active"
	             v-if="showMenu"
	             :to="localStorage">
		<a>
			<i class="material-icons left">play_circle_outline</i>Плейлист
		</a>
	</router-link>
</template>
<script>
	import { mapState } from "vuex";

	export default {
		name:     "playListButton",
		props:    {
			showMenu: Boolean
		},
		computed: {
			...mapState(["login"]),
			localStorage() {
				return `/playlist/${this.login}`;
			}
		}
	};
</script>
<style scoped>
</style>
