<template>
	<div class="card main">
		<nav>
			<div class="nav-wrapper indigo darken-3">
				<a href="#" class="brand-logo center">Settings</a>
			</div>
		</nav>
		<div class="card-content">
			<form class="row" @submit.prevent="submit">
				<div class="row">
						<div class="col s12">
							<label>Type of User</label>
							<select v-model.lazy="role" style="color: black; display: block;  width: 40%; ">
								<option>root</option>
								<option>admin</option>
								<option>user</option>
							</select>
					</div>
					<div class="col s12">
						<label>
							<input type="checkbox" v-model="enabled"/>
							<span>Enabled</span>
						</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<textarea id="textarea1"
						          class="materialize-textarea" v-model="note"></textarea>
						<label for="textarea1">User's description</label>
					</div>
				</div>
				<button @click.prevent="next"
				        class="waves-effect waves-light btn right indigo darken-3">Create User
				</button>
			</form>
		</div>
	</div>
</template>
<script>
	export default {
		name:    "FormSettings",
		data() {
			return {
				role:   "user",
				enabled:   true,
				note:      ""
			};
		},
		mounted() {
			document.querySelector('textarea').focus()
		},
		methods: {
			next() {
				this.$emit("createAdmin", {
                    role:   this.role,
					enabled:   this.enabled,
					note:      this.note
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	@import "../../assets/scss/admin";
</style>
