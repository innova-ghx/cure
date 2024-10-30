<script setup>
import { useLink } from 'vue-router';

defineOptions({name: 'link-component'});
const props = defineProps({
  external: Boolean,
  size: {
    default: 'normal',
    type: String,
  },
  to: {
    required: true,
    type: [
      Object,
      String,
    ],
  },
});

const { navigate } = useLink(props);
</script>

<template>
  <a
    class="link-component"
    :class="[`link-component--${size}`]"
    :href="external ? to : 'javascript:void(0);'"
    @click="if(!external) navigate();"
  >
    <slot>Link</slot>
  </a>
</template>

<style>
.link-component {
  color: rgb(var(--color-primary));
}

.link-component--small {
  font-size: 0.875rem;
}
</style>
