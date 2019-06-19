<template>
	<div class="card main">
		<nav>
			<div class="nav-wrapper indigo darken-3">
				<a href="#" class="brand-logo center">Enter the code from SMS</a>
			</div>
		</nav>
		<div class="card-content">
			<form class="row" @submit.prevent="submit">
				<div class="input-field col s12">
					<input type="text"
					       id="autocomplete-login"
					       v-model="code"
					       autocomplete="off"
					       class="autocomplete">
					<label for="autocomplete-login">
						Code
					</label>
				</div>
				<button class="waves-effect waves-light btn right indigo darken-3">отправить</button>
			</form>
		</div>
	</div>
</template>
<script>
	import { mapMutations } from "vuex";
	import confirmPhone     from "../../plugins/controllers/confirmPhone";
    import toastMessages from "../../assets/toastMessages";
	export default {
		name:    "verificateCode",
		data() {
			return {
				code: ""
			};
		},
		methods: {
			...mapMutations(["setMenu", "setAuth", "setShowMenu", "setShowVerificateCode"]),
			submit() {
				if (this.code !== "") {
					confirmPhone(this.code)
						.then(res => {
							if (res.data && res.data.status === 'success') {
								this.setShowVerificateCode(false);
								this.setAuth(true);
								this.$toast.success(toastMessages.contactsIsValidated());
							} else if (res.data && res.data.status === 'fail') {
								this.setShowVerificateCode(false);
								this.setAuth(true);
								this.$toast.error(toastMessages.contactsIsNotValidated());
							} else if (res.data && res.data.status === 'error' && res.data.message === 'Unauthorized') {
                                this.setAuth(true);
                                this.$toast.error(toastMessages.authorizationError());
                            }

						})
						.catch(e => {
								console.log(e);
								this.setShowVerificateCode(false);
								this.setAuth(true);
								this.$toast.error({
									title:   "Произошла ошибка",
									message: `Время подтверждения истекло`
								});
							}
						);
				} else {
					return null
				}
			}
		}
	};
</script>
<style scoped lang="scss">
	.brand-logo {
		font-size: 22px;
	}
	form {
		margin: 0;
	}
	.main {
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translateX(-50%);
		width: 98%;
		overflow: hidden;
	}
	@media screen and (min-width: 550px) {
		.main {
			width: 400px;
		}
	}
	@media screen and (min-width: 1200px) {
		.main {
			width: 600px;
		}
	}
</style>
