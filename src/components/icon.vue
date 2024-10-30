<script setup>
import { computed } from 'vue';
import icons from '@/assets/data/icons.json';

const props = defineProps({
  type: {
    type: String,
    default: 'eye',
  },
  variant: {
    type: String,
    default: 'broken',
  },
});
defineOptions({name: 'icon-component'});

const definition = computed(() => icons[props.type]?.[props.variant]);
</script>

<template>
  <svg
    class="icon-component"
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      class="icon-component__path"
      clip-rule="evenodd"
      :d="definition"
      fill-rule="evenodd"
    ></path>
  </svg>
</template>

<style>
.icon-component {
  display: inline-block;
  height: 1.5em;
  vertical-align: bottom;
  width: 1.5em;
}

.icon-component__path {
  fill: currentColor;
}
</style>
