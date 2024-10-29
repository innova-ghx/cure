<script setup>
import ButtonComponent from '@/components/button.vue';
import TextFieldComponent from '@/components/text-field.vue';

defineOptions({name: 'login-view'});
</script>

<template>
  <div class="login-view">
    <div class="login-view__form-shadow"></div>

    <form
      class="login-view__form"
      @submit.prevent
    >
      <div class="login-view__form__heading">Welcome to InnovaCure! 👋</div>
      
      <div class="login-view__form__subtext">Please sign-in to your account and start the adventure</div>

      <text-field-component class="login-view__form__username">
        <template #label>Username *</template>
      </text-field-component>
      
      <text-field-component
        class="login-view__form__password"
        type="password"
      >
        <template #label>Password *</template>
      </text-field-component>

      <button-component class="login-view__form__submit">Login</button-component>
    </form>

    <div class="login-view__illustration">
      <img
        class="login-view__illustration__image"
        alt="Login Illustration"
        src="/login-illustration.svg"
      >
    </div>

    <div class="login-view__logo">
      <img src="/logo.svg" alt="" class="login-view__logo__image">

      <div class="login-view__logo__text">InnovaCure</div>
    </div>
  </div>
</template>

<style>
.login-view {
  display: grid;
  grid-template-columns: [form-start illustration-start logo-start] 1fr [form-end illustration-end logo-end];
  grid-template-rows: [illustration-start logo-start] 100dvh [illustration-end form-start] 100dvh [logo-end form-end];
  height: 100dvh;
  overflow: hidden auto;
  scroll-snap-type: y mandatory;
}

.login-view__form-shadow {
  grid-area: form;
  scroll-snap-align: start;
}

.login-view__form {
  background-color: rgb(var(--color-surface));
  bottom: 0px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-area: form;
  justify-content: center;
  padding: 4.875rem 1rem 1.5rem 1rem;
  position: sticky;
}

.login-view__form__heading {
  font-size: 1.5rem;
  font-weight: 500;
}

.login-view__form__subtext {
  margin-bottom: 0.75rem;
}

.login-view__form__submit {
  margin-top: 0.75rem;
}

.login-view__logo {
  align-items: center;
  display: flex;
  grid-area: logo;
  padding-top: 1.5rem;
  padding-left: 1rem;
  place-self: start;
  position: sticky;
  top: 0px;
}

.login-view__logo__image {
  height: 1.875rem;
}

.login-view__logo__text {
  color: rgb(var(--color-primary));
  font-size: 1.25rem;
  font-weight: bold;
}

.login-view__illustration {
  background-color: rgb(var(--color-background));
  grid-area: illustration;
  padding: 1.5rem 1rem;
  scroll-snap-align: start;
}

.login-view__illustration__image {
  height: 100%;
  object-fit: contain;
  object-position: center;
  width: 100%;
}
</style>
