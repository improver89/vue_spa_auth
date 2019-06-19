<template>
	<div class="card main">
		<nav>
			<div class="nav-wrapper indigo darken-3">
				<a href="#" class="brand-logo center">Password confirmation</a>
			</div>
		</nav>
		<div class="card-content">
			<form class="row" @submit.prevent="submit">
				<div class="input-field col s12">
					<input type="password"
					       id="autocomplete-confirm-pass"
					       @keyup="inputText($event)"
					       v-model="confirmPass"
					       autocomplete="off"
					       class="autocomplete">
					<label for="autocomplete-confirm-pass">
						Confirm your password, please
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
		name:    "FormConfirmPass",
		data() {
			return {
				active:      true,
				confirmPass: ""
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
				this.$emit("hasConfirmPass", {
					confirmPass: this.confirmPass
				});
			}
		}

	};
</script>
<style scoped lang="scss">
	@import "../../assets/scss/admin";
</style>
