<script setup>
import { reactive } from 'vue';
import FormWizardComponent from '@/components/form-wizard.vue';
import IconComponent from '@/components/icon.vue';
import LinkComponent from '@/components/link.vue';
import PinFieldComponent from '@/components/pin-field.vue';
import TextFieldComponent from '@/components/text-field.vue';

defineOptions({name: 'password-reset-view'});

const form = reactive({
  username: '',
  otp: '',
  password: '',
  password_confirmation: '',
})
</script>

<template>
  <div class="password-reset-view">
    <form-wizard-component
      class="password-reset-view__wizard"
      :steps="3"
      @next="$event.advance()"
      @previous="$event.advance();"
    >
      <template #tab-action-1-heading>Initiate</template>
      <template #tab-action-1-subtext>Provide the username</template>

      <template #tab-action-2-heading>Verify</template>
      <template #tab-action-2-subtext>Pass in the OTP</template>

      <template #tab-action-3-heading>Finalize</template>
      <template #tab-action-3-subtext>Specify new password</template>

      <template #pre-form>
        <div class="password-reset-view__wizard__pre-form">
          <div class="password-reset-view__wizard__pre-form__logo">
          <img src="/logo.svg" alt="" class="password-reset-view__wizard__pre-form__logo__image">
          <div class="password-reset-view__wizard__pre-form__logo__text">InnovaCure</div>
        </div>
        
        <div class="password-reset-view__wizard__pre-form__heading">Reset Password 🔒</div>
        <div class="password-reset-view__wizard__pre-form__subtext">Your new password must be different from previously used passwords</div>
        </div>
      </template>

      <template #form-1>
        <div class="password-reset-view__wizard__form">
          <text-field-component
            class="password-reset-view__wizard__form__field"
            v-model="form.username"
          >
            <template #label>Username *</template>
          </text-field-component>
          </div>
      </template>

      <template #form-2>
        <div class="password-reset-view__wizard__form password-reset-view__wizard__form--centered">
          <pin-field-component
            class="password-reset-view__wizard__form__field"
            :length="6"
            v-model="form.otp"
          >
            <template #label>One-Time Password *</template>
          </pin-field-component>
        </div>
      </template>

      <template #form-3>
        <div class="password-reset-view__wizard__form">
          <text-field-component
            class="password-reset-view__wizard__form__field"
            type="password"
            v-model="form.password"
          >
            <template #label>New Password *</template>
          </text-field-component>

          <text-field-component
            class="password-reset-view__wizard__form__field"
            type="password"
            v-model="form.password_confirmation"
          >
            <template #label>Confirm Password *</template>
          </text-field-component>
        </div>
      </template>

      <template #post-form>
        <div class="password-reset-view__wizard__post-form">
          <link-component
            class="password-reset-view__wizard__post-form__back"
            :to="{name: 'login'}"
          >
            <icon-component
              class="password-reset-view__wizard__post-form__back__icon"
              type="chevron-left"
            ></icon-component>
            <span> Back to login</span>
          </link-component>
        </div>
      </template>
    </form-wizard-component>
  </div>
</template>

<style>
.password-reset-view {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 1.5rem 1rem;
}

.password-reset-view__wizard {
  max-width: 32.5rem;
  width: 100%;
}

.password-reset-view__wizard__pre-form__logo {
  display: flex;
  gap: 0.35rem;
  height: 1.875rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.password-reset-view__wizard__pre-form__logo__image {
  height: 100%;
  width: auto;
}

.password-reset-view__wizard__pre-form__logo__text {
  color: rgb(var(--color-primary));
  font-size: 1.25rem;
  font-weight: bold;
}

.password-reset-view__wizard__pre-form__heading {
  font-size: 1.5rem;
  font-weight: 500;
}

.password-reset-view__wizard__pre-form__subtext {
  color: rgb(var(--color-border));
}

.password-reset-view__wizard__form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.password-reset-view__wizard__form--centered {
  align-items: center;
}

.password-reset-view__wizard__post-form {
  text-align: center;
}
</style>
