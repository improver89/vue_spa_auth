<template>
	<router-link tag="li"
	             class="waves-effect waves-light waves-block sidenav-close"
	             active-class="active"
	             :to="'/account'">
		<a>
			<i class="material-icons left">account_circle</i>Account
		</a>
	</router-link>
</template>
<script>
	export default {
		name: "account",
	};
</script>
