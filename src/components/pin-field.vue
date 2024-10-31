<script setup>
import { createUid } from '@/utilities/uid';
import { computed, ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);
defineOptions({name: 'pin-field-component'});
const props = defineProps({
  disabled: Boolean,
  length: {
    default: 4,
    type: Number,
  },
  modelValue: String,
});

const uid = createUid();
let frame = null;

const focused = ref(false);
const fieldsRef = ref([]);

const count = computed(() => props.modelValue?.length ?? 0);
const current = computed(() => Math.max(1, Math.min(count.value + 1, props.length)));

function append(event, field) {
  const sample = event.target.value.replace(/[^\d]/g, '').slice(0, props.length - (field - 1));

  event.target.value = sample[0] ?? '';

  emit('update:modelValue', (props.modelValue ?? '') + sample);
  adjust();
}

function adjust() {
  if(fieldsRef.value.some(field => document.activeElement == field))
    fieldsRef.value[current.value - 1]?.focus();
}

function onblur() {
  frame = requestAnimationFrame(() => {
    if(!fieldsRef.value.some(field => document.activeElement == field))
      focused.value = false;
  });
}

function onfocus() {
  adjust();
  cancelAnimationFrame(frame);
  focused.value = true;
}

function remove(field) {
  if(field == current.value) emit('update:modelValue', props.modelValue?.slice(0, -1) ?? '');
}

watch(
  () => props.modelValue,
  () => adjust(),
);
</script>

<template>
  <div class="pin-field-component">
    <div class="pin-field-component__fields">
      <input
        class="pin-field-component__fields__field"
        :class="{'pin-field-component__fields__field--active': focused && field <= count}"
        :id="field == 1 ? `pin-field-component__field--${uid}` : undefined"
        inputmode="numeric"
        :key="field"
        :readonly="field != current"
        ref="fieldsRef"
        :value="modelValue?.[field - 1] ?? ''"
        @blur="onblur"
        @focus="onfocus"
        @input="append($event, field);"
        @keydown.backspace="remove(field);"
        v-for="field of length"
      >
    </div>

    <label
      class="pin-field-component__label"
      :for="`pin-field-component__field--${uid}`"
    >
      <slot name="label"></slot>
    </label>

    <div class="pin-field-component__label-actions">
      <slot name="label-actions"></slot>
    </div>

    <div class="pin-field-component__error">
      <slot name="error"></slot>
    </div>
  </div>
</template>

<style>
.pin-field-component {
  display: inline-grid;
  grid-template-columns: [error-start fields-start label-start] 1fr [label-end label-actions-start] auto [error-end fields-end label-actions-end];
  grid-template-rows: [label-start label-actions-start] auto [label-end label-actions-end fields-start] 1fr [fields-end error-start] auto [error-end];
  transition-property: opacity;
}

.pin-field-component--disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.pin-field-component__fields {
  display: flex;
  gap: 0.25rem;
  grid-area: fields;
}

.pin-field-component__fields__field {
  background-color: transparent;
  border: var(--px) solid rgb(var(--color-border));
  border-radius: 0.5rem;
  box-shadow: 0px 0px 0px 0px rgba(var(--color-primary), 0);
  outline: 0px solid rgba(var(--color-primary), 0);
  outline-offset: 0.35rem;
  padding: 0.5rem;
  text-align: center;
  transition-property: border, box-shadow, outline, outline-offset;
  width: calc(var(--px) * 2 + 2.5rem);
}

.pin-field-component__fields__field--active {
  border-color: rgb(var(--color-primary));
}

.pin-field-component__fields__field:focus-visible {
  border-color: rgb(var(--color-primary));
  box-shadow: 0px 0px 1rem var(--px) rgba(var(--color-primary), 0.15);
  outline-color: rgb(var(--color-primary));
  outline-offset: calc(-1 * var(--px));
  outline-width: calc(2 * var(--px));
}
</style>
