<template>
	<div>
		<div
			class="row"
			style="margin-bottom: 0;"
		>
			<div class="col s12 offset-m2 m8 offset-l2 l8 offset-xl2 xl8">
				<h5 class="center-align white-text">
					Account
				</h5>
			</div>
		</div>
		<div class="row">
			<div class="col s12 offset-m2 m8 offset-l2 l8 offset-xl2 xl8">
				<div class="card bg">
					<div class="card-content white-text">
						<span class="card-title">Login: {{userLogin}}</span>
					</div>
					<div
						class="card-action"
						style="background-color:transparent;"
					>
						<div style="padding: 10px 0;">
							<span>User type: </span>
							<span> {{userType}}</span>
						</div>
						<div class="button-block">
							<div>
								<div class="description">
									If you get a new password you will receive it via text message.
									Then you will be redirected to the authorization page.
								</div>
								<div>
									<button
										style="width: 100%;"
										class="bth indigo darken-1 waves-light waves-effect white-text"
										@click="resetValidate(login)"
									>Get a new password
									</button>
								</div>
							</div>
							<!--<div>-->
							<!--<p>Привязанные социальные сети:</p>-->
							<!--<div class="container-social">-->
							<!--<div>-->
							<!--<div-->
							<!--v-if="hasYuoAuth"-->
							<!--class="one-social"-->
							<!--&gt;-->
							<!--<img-->
							<!--src="../../../public/bg/social/you1.svg"-->
							<!--alt="Youtube"-->
							<!--&gt;-->
							<!--<p style="padding-left: 10px;">{{localLogin}}</p>-->
							<!--<i-->
							<!--class="material-icons"-->
							<!--style="transform: scale(0.6); margin-bottom: 20px;"-->
							<!--@click="deleteYou(login)"-->
							<!--&gt;-->
							<!--close-->
							<!--</i>-->
							<!--</div>-->
							<!--</div>-->
							<!--<div class="all-social">-->
							<!--<img-->
							<!--src="../../../public/bg/social/you1.svg"-->
							<!--alt="you"-->
							<!--v-if="!hasYuoAuth"-->
							<!--@click="authYuo(login)"-->
							<!--&gt;-->
							<!--<img-->
							<!--src="../../../public/bg/social/you1.svg"-->
							<!--alt="you"-->
							<!--v-if="hasYuoAuth"-->
							<!--&gt;-->
							<!--<img-->
							<!--src="../../../public/bg/social/vk.svg"-->
							<!--alt="vk"-->
							<!--&gt;-->
							<!--</div>-->
							<!--</div>-->
							<!--</div>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

	import generateNewPass            from "../../plugins/controllers/generateNewPass";
    import swal                       from "sweetalert2";
	import preload                    from "../../assets/preload";
	// import you                        from "../../plugins/controllers/youtube";
	// import { eventEmitter } from "../../main";

	export default {
		name:     "Account",
		data() {
			return {
				hasYuoAuth: false
			};
		},

		computed: {

			userType() {
				return localStorage.getItem("type");
			},
			userLogin(){
                return localStorage.getItem("login");
			}
		},
		mounted() {
			try {
				preload.show();
				setTimeout(() => {
					preload.hidden();
				}, 100);
			} catch (e) {
			}
		},
		methods:  {
			resetValidate(login) {
				swal({
					title:   `Вы уверены?`,
					text:    "Вы намерены сбросить свой пароль!",
					buttons: ["нет, я передумал", "да, сбросить"]
				}).then(res => {
					if (res) {
						console.log(login);
						// preload.show();
						generateNewPass(login)
							.then(res => {
								console.log(res);
						//		setRules(res);
								console.log(res);
								this.setAuth(true);
								this.setShowMenu(false);
								this.setMenu();
								setTimeout(() => {
									document
										.querySelector("#nav-mobile")
										.classList.add("nav-show");
								}, 400);
								this.setTokenSuccess(false);
								localStorage.setItem("token", "");
								localStorage.setItem("login", "");
								localStorage.setItem("menuItem", "[]");
								localStorage.setItem("role", "");
								this.$toast.success({
									title: "Новый пароль создан",
									message:
									       "На ваш номер придет сообщение с учетными данными"
								});
							})
							.catch(e => {
								console.log(e);
								this.setAuth(true);
								this.setShowMenu(false);
								this.setMenu();
								this.$toast.error({
									title:
										"Произошла ошибка, если пароль не пришел в SMS",
									message:
										"Авторизуйтесь с вашей старой учетной записи"
								});
							})
							.then(() => {
								// preload.hidden()
							})
					}
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	button {
		height: 42px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px;
		border: none;
		margin-bottom: 10px;
		
		span {
			padding-bottom: 5px;
		}
	}
	
	.all-social {
		img {
			margin-left: 10px;
			display: inline-block;
			cursor: pointer;
			transition: all 0.3s;
			
			&:hover {
				transform: scale(1.1);
			}
		}
		
		img[alt="vk"] {
			transform: scale(1.2);
			transition: all 0.3s;
			
			&:hover {
				transform: scale(1.3);
			}
		}
	}
	
	img {
		width: 40px;
		@media (max-width: 500px) {
			width: 30px;
		}
	}
	
	.description {
		margin: 10px 10px 10px 0;
	}
	
	.container-social {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.one-social {
		display: flex;
		cursor: default;
		justify-content: center;
		align-items: center;
		
		i {
			cursor: pointer;
		}
	}
	
	.button-block {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.bold {
		font-weight: 500;
	}
	
	.bg {
		background-color: rgba(56, 56, 56, 0.8);
	}
	
	.main {
		margin-top: 15px;
	}
	
	@media screen and (max-width: 600px) {
		.main {
			margin: 0;
		}
		h5 {
			font-size: 16px;
			margin-bottom: 0;
		}
	}
	
	input[type="text"]:not(.browser-default) {
		border-bottom: 1px solid #d0d0d0;
		box-shadow: 0 1px 0 #d0d0d0;
	}
	
	input[type="text"]:not(.browser-default):focus:not([readonly]) {
		border-bottom: 1px solid #f0e8f1;
		box-shadow: 0 1px 0 #dfd8df;
	}
	
	label.white-text {
		color: #d0d0d0 !important;
		
		&.active {
			color: #fff !important;
		}
	}
	
	.hidden {
		display: none;
	}
	
	input[type="text"] {
		&:not(.browser-default):focus:not([readonly]) + label {
			color: #fff;
		}
	}
	
	.bg {
		background-color: rgba(56, 56, 56, 0.8);
	}
	
	[type="checkbox"]:checked + span:not(.lever):before {
		border: 2px solid transparent;
		border-right-color: white;
		border-bottom-color: white;
	}
	
	[type="checkbox"] + span:not(.lever):before {
		border: 2px solid white;
	}
	
	table.highlight > tbody > tr > td {
		padding: 7px 10px;
		font-size: 14px;
	}
	
	table.highlight > tbody > tr:hover {
		background-color: rgba(36, 37, 40, 0.51);
	}
	
	tr {
		cursor: pointer;
	}
	
	tr th {
		cursor: default;
	}
	
	tr td:first-child {
		width: 20%;
		font-weight: 600;
		text-transform: uppercase;
	}
	
	tr td:last-child {
		text-align: center;
	}
</style>
