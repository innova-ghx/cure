<script setup>
import TextFieldComponent from '@/components/text-field.vue';

defineOptions({name: 'login-view'});
</script>

<template>
  <div class="login-view">
    <div class="login-view__illustration"></div>

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

      <!-- button-component -->
    </form>

    <div class="login-view__logo">
      <img src="/logo.svg" alt="" class="login-view__logo__image">

      <div class="login-view__logo__text">InnovaCure</div>
    </div>
  </div>
</template>

<style>
</style>
