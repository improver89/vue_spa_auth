<template>
    <div class="card main">
        <nav>
            <div class="nav-wrapper indigo darken-3">
                <a href="#" class="brand-logo center">Validate your phone number</a>
            </div>
        </nav>
        <div class="card-content">
            <form class="row" @submit.prevent="submit">
                <div class="input-field col s12">
                    <input type="text"
                           id="autocomplete-login"
                           @input="setNumber($event.target.value)"
                           :style="($v.number.$dirty
					                    && (!$v.number.required
					                    || !$v.number.numeric))
							                    ? 'border-bottom: 1px solid #d32f2f;'
							                    : null"
                           autocomplete="off"
                           class="autocomplete">
                    <label for="autocomplete-login"
                           :style="($v.number.$dirty
					                    && (!$v.number.required
					                    || !$v.number.numeric))
							                    ? 'color: #d32f2f;'
							                    : null">
                        Номер телефона без восьмерки
                    </label>
                    <error-in-auth :field="$v.number"/>
                    <error-number-phone :field="$v.number"/>
                </div>
                <button class="waves-effect waves-light btn right indigo darken-3"
                        :class="{disabled: $v.$invalid}">отправить
                </button>
            </form>
        </div>
    </div>
</template>
<script>
    import verificatePhone from "../../plugins/controllers/verificatePhone";
    import {required, numeric, maxLength, minLength} from "vuelidate/lib/validators";
    import {mapMutations} from "vuex";
    import ErrorInAuth from "./errorInAuth";
    import setRules from "../../assets/setRules";
    import ErrorNumberPhone from "./errorNumberPhone";
    import toastMessages from "../../assets/toastMessages";

    export default {
        name: "verificateForm",
        components: {ErrorNumberPhone, ErrorInAuth},
        data() {
            return {
                number: ""
            };
        },
        validations: {
            number: {
                required,
                numeric,
                maxLength: maxLength(12),
                minLength: minLength(10)
            }
        },
        methods: {
            ...mapMutations([
                "setMenu",
                "setAuth",
                "setShowMenu",
                "setShowVerificateForm",
                "setShowVerificateCode"
            ]),
            setNumber(value) {
                this.number = value;
                this.$v.number.$touch();
            },
            submit() {

                if (!this.$v.$invalid) {
                    let arrNum = Array.from(this.number);
                    if (arrNum[0] === "8" || arrNum[0] === "7") {
                        arrNum.splice(0, 1);
                    } else if (arrNum[0] === "+" && arrNum[1] === "7") {
                        arrNum.splice(0, 2);
                    }
                    verificatePhone("7" + arrNum.join(""))
                        .then(res => {
                            console.log(res);
                            if (res.data && res.data.status === 'success') {
                                this.setShowVerificateForm(false);
                                this.setShowVerificateCode(true);
                                this.$toast.success(toastMessages.validationCode(this.number));
                            } else if (res.data && res.data.status === 'error') {
                                this.setShowVerificateCode(false);
                                this.setAuth(true);
                                this.$toast.error(toastMessages.contactsDuplicated());
                            } else if (res.data && res.data.status === 'fail') {
                                this.setShowVerificateCode(false);
                                this.setAuth(true);
                                this.$toast.error(toastMessages.error(res.data.message));
                            }
                        })
                        .catch(e => {
                                if (e.message.toLowerCase() === "network error") {
                                    this.$toast.error(toastMessages.connectionError());
                                }
                            }
                        );

                } else {
                    console.log(this.$v);
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
