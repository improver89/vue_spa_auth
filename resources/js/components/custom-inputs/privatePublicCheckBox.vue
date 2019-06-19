<template>
    <label>
        <input type="checkbox" v-model="status"/>
        <span></span>
    </label>
</template>

<script>
    export default {
        props: {
            inputStatus: String,
        },
        name: "privatePublicCheckBox",
        data() {
            return {
                privateStatus:"private",
                publicStatus:"public",
                status: false
            }
        },
        watch: {
            'status'(newVal) {
                if (newVal === true) {
                    this.$emit('cameraStatus', this.privateStatus);
                } else {
                    this.$emit('cameraStatus', this.publicStatus);
                }
            },
            'inputStatus'(newVal) {
                this.status = newVal === this.privateStatus;
            }
        }
    }
</script>

<style scoped lang="scss">
    textarea, input {
        color: #fff;
        transition: all 0.3s;
    }

    [type="checkbox"]:checked + span:not(.lever):before {
        border: 2px solid transparent;
        border-right-color: white;
        border-bottom-color: white;
    }

    [type="checkbox"] + span:not(.lever):before {
        border: 2px solid white;
    }
</style>
