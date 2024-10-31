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

const { href, navigate } = (() => {
  switch(true) {
    case props.external: return {href: props.to, navigate() {}};
    default: return useLink(props);
  }
})();
</script>

<template>
  <a
    class="link-component"
    :class="[`link-component--size-${size}`]"
    :href="href"
    @click="navigate"
  >
    <slot>Link</slot>
  </a>
</template>

<style>
.link-component {
  color: rgb(var(--color-primary));
  font-weight: 500;
  text-decoration: none;
}

.link-component--size-small {
  font-size: 0.875rem;
}
</style>
