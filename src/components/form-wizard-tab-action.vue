<script setup>
import IconComponent from '@/components/icon.vue';

defineOptions({name: 'form-wizard-tab-action-component'});
defineProps({
  active: Boolean,
  complete: Boolean,
  last: Boolean,
});
</script>

<template>
  <button class="form-wizard-tab-action-component">
    <div
      class="form-wizard-tab-action-component__indicator"
      :class="{
        'form-wizard-tab-action-component__indicator--active': active,
        'form-wizard-tab-action-component__indicator--complete': complete,
      }"
    >
      <slot name="indicator">1</slot>
    </div>

    <div
      class="form-wizard-tab-action-component__heading"
      :class="{'form-wizard-tab-action-component__heading--complete': complete}"
    >
      <slot name="heading">Heading</slot>
    </div>

    <div class="form-wizard-tab-action-component__subtext">
      <slot name="subtext">Subtext</slot>
    </div>

    <icon-component
      class="form-wizard-tab-action-component__arrow"
      :class="{'form-wizard-tab-action-component__arrow--complete': complete}"
      type="chevron-right"
      v-if="!last"
    ></icon-component>
  </button>
</template>

<style>
.form-wizard-tab-action-component {
  background-color: transparent;
  border: none;
  column-gap: 0.5rem;
  cursor: pointer;
  display: inline-grid;
  grid-template-columns: [indicator-start] auto [indicator-end heading-start subtext-start] 1fr [heading-end subtext-end arrow-start] auto [arrow-end];
  grid-template-rows: [arrow-start heading-start indicator-start] auto [heading-end subtext-start] 1fr [arrow-end indicator-end subtext-end];
  text-align: start;
  transition-property: background-color, color;
}

.form-wizard-tab-action-component__indicator {
  align-self: center;
  background-color: rgba(var(--color-border), 0.15);
  border-radius: 0.5rem;
  font-weight: 500;
  grid-area: indicator;
  height: 2.5rem;
  padding: 0.5rem;
  text-align: center;
  width: 2.5rem;
}

.form-wizard-tab-action-component__indicator--active {
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-complement));
}

.form-wizard-tab-action-component__indicator--complete {
  background-color: rgba(var(--color-primary), 0.15);
  color: rgb(var(--color-primary));
}

.form-wizard-tab-action-component__heading {
  color: rgb(var(--color-text));
  font-weight: 500;
  grid-area: heading;
  white-space: nowrap;
}

.form-wizard-tab-action-component__heading--complete {
  color: rgb(var(--color-border));
}

.form-wizard-tab-action-component__subtext {
  color: rgb(var(--color-border));
  font-size: 0.875rem;
  grid-area: subtext;
  white-space: nowrap;
}

.form-wizard-tab-action-component__arrow {
  align-self: center;
  color: rgb(var(--color-text));
  grid-area: arrow;
  margin-left: 1rem;
  margin-right: 1rem;
}

.form-wizard-tab-action-component__arrow--complete {
  color: rgb(var(--color-primary));
}
</style>
