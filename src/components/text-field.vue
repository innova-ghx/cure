<script setup>
import { computed, onActivated, onDeactivated, onUnmounted, ref, watch } from 'vue';
import IconComponent from '@/components/icon.vue';
import { createUid } from '@/utilities/uid';

defineEmits(['update:modelValue']);
defineOptions({name: 'text-field-component'});
const props = defineProps({
  disabled: Boolean,
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
});

const uid = createUid();
let frame = null;

const passwordVisible = ref(false);
const fieldActionsOffset = ref(0);
const fieldActionsRef = ref(null);
const fieldRef = ref(null);

const inputmode = computed(() => {
  switch(props.type) {
    default: return 'text';
  }
});
const inputtype = computed(() => {
  switch(props.type) {
    case 'password': return passwordVisible.value ? 'text' : 'password';
    default: return props.type;
  }
});

function loop() {
  if(fieldActionsRef.value) {
    fieldActionsOffset.value = fieldActionsRef.value.getBoundingClientRect().width;
  }

  frame = requestAnimationFrame(loop);
}

onActivated(() => loop());
onDeactivated(() => cancelAnimationFrame(frame));
onUnmounted(() => cancelAnimationFrame(frame));

loop();
</script>

<template>
  <div
    class="text-field-component"
    :class="{'text-field-component--disabled': disabled}"
    :style="{'--text-field-component--field-actions-offset': `${fieldActionsOffset}px`}"
  >
    <input
      class="text-field-component__field"
      :disabled="disabled"
      :id="`text-field-component__field--${uid}`"
      :inputmode="inputmode"
      ref="fieldRef"
      :type="inputtype"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >

    <div
      class="text-field-component__field-actions"
      ref="fieldActionsRef"
    >
      <button
        class="text-field-component__field-actions__password"
        :class="{'text-field-component__field-actions__password--active': passwordVisible}"
        type="button"
        @click="
          passwordVisible = !passwordVisible;
          fieldRef?.focus();
        "
        v-if="type == 'password'"
      >
        <icon-component
          class="text-field-component__field-actions__password__icon"
          :type="passwordVisible ? 'eye-slash' : 'eye'"
        ></icon-component>
      </button>
    </div>

    <label
      class="text-field-component__label"
      :for="`text-field-component__field--${uid}`"
    >
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
  grid-template-rows: [label-start label-actions-start] auto [label-end label-actions-end field-start field-actions-start] 1fr [field-end error-start field-actions-end] auto [error-end];
  transition-property: opacity;
}

.text-field-component--disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.text-field-component__field {
  background-color: transparent;
  border: var(--px) solid rgb(var(--color-border));
  border-radius: 0.5rem;
  box-shadow: 0px 0px 0px 0px rgba(var(--color-primary), 0);
  grid-area: field;
  outline: 0px solid rgba(var(--color-primary), 0);
  outline-offset: 0.35rem;
  padding: 0.5rem calc(0.75rem + var(--text-field-component--field-actions-offset)) 0.5rem 0.75rem;
  transition-property: border, box-shadow, outline, outline-offset;
}

.text-field-component__field:focus-visible {
  border-color: rgb(var(--color-primary));
  box-shadow: 0px 0px 1rem var(--px) rgba(var(--color-primary), 0.15);
  outline-color: rgb(var(--color-primary));
  outline-offset: calc(-1 * var(--px));
  outline-width: calc(2 * var(--px));
}

.text-field-component__field-actions {
  align-items: center;
  display: flex;
  gap: 0.35rem;
  grid-area: field-actions;
  margin-right: 0.75rem;
  padding-left: 0.35rem;
  place-self: center end;
  pointer-events: none;
}

.text-field-component__field-actions:empty {
  display: none;
}

.text-field-component__field-actions>* {
  pointer-events: initial;
}

.text-field-component__field-actions__password {
  background-color: rgba(var(--color-border), 0);
  border: none;
  border-radius: 100vmax;
  box-shadow: 0px 0px 0px 0px rgba(var(--color-primary), 0);
  cursor: pointer;
  outline: 0px solid rgba(var(--color-primary), 0);
  outline-offset: 0.35rem;
  padding: 0.25rem;
  transition-property: background-color, color, outline, outline-offset;
}

.text-field-component__field-actions__password--active {
  background-color: rgba(var(--color-primary), 0);
  color: rgb(var(--color-primary));
}

.text-field-component__field-actions__password:hover {
  background-color: rgba(var(--color-border), 0.15);
}

.text-field-component__field-actions__password--active:hover {
  background-color: rgba(var(--color-primary), 0.15);
}

.text-field-component__field-actions__password:focus-visible {
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
