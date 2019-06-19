<template>
	<transition name="error">
		<div class="error message"
		     v-if="this.field.$dirty && !this.field.required">
			It's required field
		</div>
	</transition>
</template>
<script>
	export default {
		name: "errorInAuth",
		props: {
			field: Object
		}
	};
</script>
<style scoped lang="scss">
	.message {
		position: absolute;
		bottom: -10px;
		font-size: 12px;
	}
	.error {
		color: #d32f2f;
	}
	.error-enter-active {
		transition: all 0.3s ease;
	}
	.error-leave-active {
		transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.error-enter, .error-leave-to {
		transform: translateX(-50%);
		opacity: 0;
	}
</style>
