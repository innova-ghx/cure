<script setup>
import { ref, watch } from 'vue';
import ButtonComponent from '@/components/button.vue';
import FormWizardTabActionComponent from './form-wizard-tab-action.vue';
import IconComponent from '@/components/icon.vue';

defineEmits([
  'next',
  'previous',
  'done',
]);
defineOptions({name: 'form-wizard-component'});
const props = defineProps({
  steps: {
    default: 1,
    type: Number,
  },
});

const current = ref(1);
const limit = ref(1);

const tabActionsRef = ref([]);

function next() {
  if(current.value < props.steps) limit.value = Math.max(++current.value, limit.value);
}

function previous() {
  if(current.value > 1) current.value--;
}

watch(current, value => tabActionsRef.value[value - 1]?.$el.scrollIntoView({behavior: 'smooth'}));
</script>

<template>
  <div class="form-wizard-component">
    <form
      class="form-wizard-component__form"
      @submit.prevent="
        if(current == steps) $emit('done');
        else {
          $emit('next', (() => {
            let executed = false;

            return {
              advance: () => {
                if(!executed) {
                  next();
                  executed = true;
                }
              },
            };
          })());
        }
      "
    >
      <div class="form-wizard-component__form__pre-form">
        <slot name="pre-form"></slot>
      </div>

      <keep-alive>
        <slot
          :key="current"
          :name="`form-${current}`"
        ></slot>
      </keep-alive>

      <div class="form-wizard-component__form__actions">
        <button-component
          class="form-wizard-component__form__actions__previous"
          :disabled="current == 1"
          theme="text"
          variant="tonal"
          @click="$emit('previous', (() => {
            let executed = false;

            return {
              advance: () => {
                if(!executed) {
                  previous();
                  executed = true;
                }
              },
            };
          })());"
        >
          <icon-component
            class="form-wizard-component__form__actions__previous__icon"
            type="arrow-left"
          ></icon-component>
          <span> Previous</span>
        </button-component>

        <button-component
          class="form-wizard-component__form__actions__next"
          type="submit"
        >
          <span>{{ current == steps ? 'Complete ' : 'Next ' }}</span>
          <icon-component
            class="form-wizard-component__form__actions__next__icon"
            :type="current == steps ? 'tick-circle' : 'arrow-right'"
          ></icon-component>
        </button-component>
      </div>

      <div class="form-wizard-component__form__post-form">
        <slot name="post-form"></slot>
      </div>
    </form>

    <div class="form-wizard-component__tabs">
      <form-wizard-tab-action-component
        :active="step == current"
        class="form-wizard-component__tabs__tab"
        :complete="step < current"
        :key="step"
        :last="step == steps"
        ref="tabActionsRef"
        @click="if(step <= limit) current = step;"
        v-for="step of steps"
      >
        <template #indicator>{{ step }}</template>
        <template #heading>
          <slot :name="`tab-action-${step}-heading`"></slot>
        </template>
        <template #subtext>
          <slot :name="`tab-action-${step}-subtext`"></slot>
        </template>
      </form-wizard-tab-action-component>
    </div>
  </div>
</template>

<style>
.form-wizard-component {
  display: grid;
  grid-template-columns: [form-start tabs-start] 1fr [form-end tabs-end];
  grid-template-rows: [tabs-start] auto [tabs-end form-start] 1fr [form-end];
}

.form-wizard-component__form {
  background-color: rgb(var(--color-surface));
  border-radius: 0.75rem;
  grid-area: form;
  padding: 2.5rem 1.5rem;
}

.form-wizard-component__form__actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
}

.form-wizard-component__form__pre-form {
  margin-bottom: 1.5rem;
}

.form-wizard-component__form__pre-form:empty {
  display: none;
}

.form-wizard-component__form__post-form {
  margin-top: 1.5rem;
}

.form-wizard-component__form__post-form:empty {
  display: none;
}

.form-wizard-component__tabs {
  display: flex;
  grid-area: tabs;
  overflow: auto hidden;
  padding-bottom: 1.5rem;
}
</style>
