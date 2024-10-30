<script setup>
defineOptions({name: 'spinner-component'});
</script>

<template>
  <div class="spinner-component"></div>
</template>

<style>
.spinner-component {
  display: inline-block;
  height: 1.5em;
  width: 1.5em;
  vertical-align: bottom;
}

.spinner-component::before, .spinner-component::after {
  border: calc(3 * var(--px)) solid transparent;
  border-radius: 100vmax;
  content: "";
  height: 100%;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 100%;
}

.spinner-component::before {
  border-color: currentColor;
  opacity: 0.15;
}

.spinner-component::after {
  animation-duration: 720ms;
  animation-name: spinner-component__spin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  border-top-color: currentColor;
}

@keyframes spinner-component__spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
