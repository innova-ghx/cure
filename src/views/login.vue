<script setup>
import { reactive, ref } from 'vue';
import ButtonComponent from '@/components/button.vue';
import LinkComponent from '@/components/link.vue';
import TextFieldComponent from '@/components/text-field.vue';
import useAuthStore from '@/stores/auth.js';

defineOptions({name: 'login-view'});

const authStore = useAuthStore();

const abortController = ref(null);
const form = reactive({
  username: '',
  password: '',
});
const formErrors = reactive({
  username: null,
  password: null,
})

async function login() {
  if(!abortController.value) {
    abortController.value = new AbortController();

    try {
      await authStore.login(form, abortController.value.signal);
    } catch(error) {
      console.log(error.message);
    } finally {
      abortController.value?.abort();
      abortController.value = null;
    }
  }
}
</script>

<template>
  <div class="login-view">
    <div class="login-view__card-snap"></div>

    <div class="login-view__card">
      <form
        class="login-view__card__form"
        @submit.prevent="login"
      >
        <div class="login-view__card__form__heading">Welcome to InnovaCure! 👋</div>
        
        <div class="login-view__card__form__subtext">Please sign-in to your account and start the adventure</div>
  
        <text-field-component
          class="login-view__card__form__username"
          :disabled="!!abortController"
          v-model="form.username"
        >
          <template #label>Username *</template>
          <template #error>{{ formErrors.username }}</template>
        </text-field-component>
        
        <text-field-component
          class="login-view__card__form__password"
          :disabled="!!abortController"
          type="password"
          v-model="form.password"
        >
          <template #label>Password *</template>
          <template #label-actions>
            <link-component
              size="small"
              :to="{name: 'password-reset'}"
            >Forgot password?</link-component>
          </template>
          <template #error>{{ formErrors.password }}</template>
        </text-field-component>
  
        <button-component
          class="login-view__card__form__submit"
          :disabled="!!abortController"
          :spinner="!!abortController"
          type="submit"
        >Login</button-component>
      </form>

      <div class="login-view__card__shade"></div>
    </div>

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
  grid-template-columns: [card-start illustration-start logo-start] 1fr [card-end illustration-end logo-end];
  grid-template-rows: [illustration-start logo-start] 100dvh [illustration-end card-start] 100dvh [logo-end card-end];
  height: 100dvh;
  overflow: hidden auto;
  scroll-snap-type: y mandatory;
}

.login-view__card-snap {
  background-color: rgb(var(--color-surface));
  grid-area: card;
  scroll-snap-align: end;
}

.login-view__card {
  bottom: 0px;
  display: grid;
  grid-area: card;
  grid-template-columns: [form-start shade-start] 1fr [form-end shade-end];
  grid-template-rows: [form-start shade-start] 1fr [form-end shade-end];
  overflow: hidden auto;
  position: sticky;
}

.login-view__card__form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-area: form;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 27.5rem;
  padding: 4.875rem 1rem 1.5rem 1rem;
}

.login-view__card__shade {
  background-image: linear-gradient(to bottom, rgb(var(--color-surface)) 70%, rgba(var(--color-surface), 0));
  grid-area: shade;
  height: 4.875rem;
  pointer-events: none;
  position: sticky;
  top: 0px;
}

.login-view__card__form__heading {
  font-size: 1.5rem;
  font-weight: 500;
}

.login-view__card__form__subtext {
  margin-bottom: 0.75rem;
}

.login-view__card__form__submit {
  margin-top: 0.75rem;
}

.login-view__logo {
  align-items: center;
  display: flex;
  grid-area: logo;
  padding-left: 1rem;
  padding-top: 1.5rem;
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
  padding: 4.875rem 1rem 1.5rem 1rem;
  scroll-snap-align: start;
}

.login-view__illustration__image {
  display: block;
  height: 100%;
  object-fit: contain;
  object-position: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 47.5rem;
  width: 100%;
}

@media screen and (min-width: 1200px) {
  .login-view {
    grid-template-columns: [illustration-start logo-start] 1fr [illustration-end logo-end card-start] auto [card-end];
    grid-template-rows: [card-start illustration-start logo-start] 1fr [card-end illustration-end logo-end];
    overflow: hidden;
  }

  .login-view__card__form {
    padding: 4rem 2.5rem;
  }

  .login-view__card__shade {
    display: none;
  }

  .login-view__logo {
    padding-left: 2.5rem;
    padding-top: 4rem;
  }

  .login-view__illustration {
    padding: 7.375rem 2.5rem 4rem 2.5rem;
  }
}
</style>
