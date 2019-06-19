<template>
	<div class="card main">
		<nav>
			<div class="nav-wrapper indigo darken-3">
				<a href="#" class="brand-logo center">Login</a>
			</div>
		</nav>
		<div class="card-content">
			<form class="row" @submit.prevent="submit">
				<div class="input-field col s12">
					<input type="text"
					       id="autocomplete-login"
					       @keyup="inputText($event)"
					       v-model="login"
					       autocomplete="off"
					       class="autocomplete">
					<label for="autocomplete-login">
						login
					</label>
				</div>
				<button :class="{disabled: active}"
				        @click.prevent="next"
				        class="waves-effect waves-light btn right indigo darken-3">next
				</button>
			</form>
		</div>
	</div>
</template>
<script>
	export default {
		name:    "FormLogin",
		data() {
			return {
				active: true,
				login:  ""
			};
		},
		mounted() {
			document.querySelector('input').focus()
		},
		methods: {
			inputText(e) {
				if (e.target.value.length > 0) {
					this.active = false;
				} else if (e.target.value.length === 0) {
					this.active = true;
				}
			},
			next() {
				this.$emit("hasLogin", {
					login: this.login
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	@import "../../assets/scss/admin";
</style>
