<script setup>
import { computed, ref } from 'vue';
import IconComponent from '@/components/icon.vue';
import { createUid } from '@/utilities/uid';

defineEmits(['update:modelValue']);
defineOptions({name: 'text-field-component'});
const props = defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
});

const uid = createUid();

const passwordVisible = ref(false);

const inputmode = computed(() => {
  switch(props.type) {
    default: return 'text';
  }
});
const inputtype = computed(() => {
  switch(props.type) {
    default: return props.type;
  }
});
</script>

<template>
  <div class="text-field-component">
    <input
      class="text-field-component__field"
      :id="`text-field-component__field--${uid}`"
      :inputmode="inputmode"
      :type="inputtype"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >

    <div class="text-field-component__field-actions">
      <icon-component
        class="text-field-component__field-actions__password"
        :type="passwordVisible ? 'eye-slash' : 'eye'"
        @click="passwordVisible = !passwordVisible;"
        v-if="inputtype == 'password'"
      ></icon-component>
    </div>

    <label class="text-field-component__label">
      <slot name="label"></slot>
    </label>

    <div class="text-field-component__label-actions">
      <slot name="label-actions"></slot>
    </div>

    <div class="text-field-component__error">
      <slot name="error"></slot>
    </div>
  </div>
</template>

<style>
.text-field-component {
  display: inline-grid;
  grid-template-columns: [error-start field-start field-actions-start label-start] 1fr [label-end label-actions-start] auto [error-end field-end field-actions-end label-actions-end];
  grid-template-rows: [label-start label-actions-start] auto [label-end label-actions-end field-start] 1fr [field-end error-start] auto [error-end];
}

.text-field-component__field {
  background-color: transparent;
  border: var(--px) solid rgb(var(--color-border));
  border-radius: 0.75rem;
  box-shadow: 0px 0px 0px 0px rgba(var(--color-primary), 0);
  grid-area: field;
  outline: 0px solid rgba(var(--color-primary), 0);
  outline-offset: 0.35rem;
  padding: 0.5rem;
  transition-property: border, box-shadow, outline, outline-offset;
}

.text-field-component__field:focus-visible {
  border-color: rgb(var(--color-primary));
  box-shadow: 0px 0px 1rem var(--px) rgba(var(--color-primary), 0.15);
  outline-color: rgb(var(--color-primary));
  outline-offset: calc(-1 * var(--px));
  outline-width: calc(2 * var(--px));
}

.text-field-component__label {
  font-size: 0.875rem;
  grid-area: label;
  place-self: center start;
}

.text-field-component__label:empty {
  display: none;
}

.text-field-component__label-actions {
  grid-area: label-actions;
  place-self: center end;
}

.text-field-component__error {
  font-size: 0.75rem;
  font-weight: 500;
  grid-area: error;
}

.text-field-component__error:empty {
  display: none;
}
</style>
