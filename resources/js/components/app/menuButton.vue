<template>
	<router-link tag="li"
	             class="waves-effect button-menu"
	             :class="className"
	             active-class="active"
	             :to="item.route">
		<a>
			<i class="material-icons left">{{item.icon}}</i>{{item.item}}
		</a>
	</router-link>
</template>
<script>
	export default {
		name: "menuButton",
		props: {
			item: Object,
			className: String
		}
	};
</script>
<style scoped lang="scss">
</style>
