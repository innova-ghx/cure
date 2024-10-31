<script setup>
import { onActivated, onDeactivated, onUnmounted, ref } from 'vue';
import SpinnerComponent from '@/components/spinner.vue';

defineOptions({name: 'button-component'});
defineProps({
  disabled: Boolean,
  spinner: Boolean,
  theme: {
    default: 'primary',
    type: String,
  },
  type: {
    default: 'button',
    type: String,
  },
  variant: {
    default: 'normal',
    type: String,
  },
});

const maxSplashCount = 5;
const splashPool = [];
let frame = null;


const contentRef = ref(null);
const mainRef = ref(null);

function releaseSplash(splash) {
  splash.remove();
        
  const index = splashPool.findIndex(item => item === splash);

  if(index >= 0) {
    splashPool.splice(index, 1);
  }
}

function splash(event) {
  if(!!mainRef.value && !event.repeat) {
    cancelAnimationFrame(frame);

    const rect = mainRef.value.getBoundingClientRect();

    const x = event.clientX ? (event.clientX - rect.x) : (rect.width / 2);
    const y = event.clientY ? (event.clientY - rect.y) : (rect.height / 2);
    const size = Math.sqrt(rect.height ** 2 + rect.width ** 2) * 2;

    const splash = document.createElement('div');

    splash.classList.add('button-component__splash');
    splash.style.left = `${x - size / 2}px`;
    splash.style.top = `${y - size / 2}px`;
    splash.style.width = `${size}px`;
    splash.style.height = `${size}px`;
    splash.style.setProperty('--button-component__splash-scale', Math.min(size * 0.5, Math.min(innerWidth * 0.0388 * 2.5, 35) / size));

    mainRef.value.insertBefore(splash, contentRef.value);
    
    frame = requestAnimationFrame(() => {
      if(splashPool.length == maxSplashCount) splashPool.shift().remove();

      splashPool.push(splash);

      splash.classList.add('button-component__splash--active');
    });
  }
}

function unsplash(event) {
  if(!(event instanceof KeyboardEvent) || ['Enter', 'Space'].includes(event.code)) {
    cancelAnimationFrame(frame);

    for(const splash of splashPool) {
      splash.classList.toggle('button-component__splash--dead', true);
      splash.addEventListener('transitionend', () => releaseSplash(splash));
    }
  }
}

onActivated(() => {
  addEventListener('keyup', unsplash);
  addEventListener('mouseup', unsplash);
});
onDeactivated(() => {
  removeEventListener('keyup', unsplash);
  removeEventListener('mouseup', unsplash);
});
onUnmounted(() => {
  removeEventListener('keyup', unsplash);
  removeEventListener('mouseup', unsplash);
});

addEventListener('keyup', unsplash);
addEventListener('mouseup', unsplash);
</script>

<template>
  <button
    class="button-component"
    :class="[
      `button-component--theme-${theme}`,
      `button-component--variant-${variant}`,
      {'button-component--disabled': disabled},
    ]"
    :disabled="disabled"
    ref="mainRef"
    :type="type"
    @mousedown="splash"
    @keydown.space.enter="splash"
  >
    <span
      class="button-component__content"
      ref="contentRef"
    >
      <slot>Button</slot>
    </span>

    <spinner-component
      class="button-component__spinner"
      v-if="spinner"
    ></spinner-component>
  </button>
</template>

<style>
.button-component {
  --button-component__base-color: var(--color-primary);
  --button-component__complement-color: var(--color-complement);
  --button-component__splash-color: var(--color-shine);
  --button-component__tint-color: var(--color-shade);

  background-color: rgb(var(--button-component__base-color));
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 0px 0px rgba(var(--button-component__base-color), 0);
  color: rgb(var(--button-component__complement-color));
  cursor: pointer;
  outline: 0px solid rgba(var(--color-primary), 0);
  outline-offset: 0.35rem;
  overflow: hidden;
  padding: calc(0.5rem + var(--px)) calc(1.5rem + var(--px));
  transition-property: background-color, opacity, outline, outline-offset;
}

.button-component::before {
  background-color: rgba(var(--button-component__tint-color), 0);
  border-radius: 0.5rem;
  content: "";
  height: 100%;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 100%;
}

.button-component:hover::before {
  background-color: rgba(var(--button-component__tint-color), 0.15);
}

.button-component--theme-text {
  --button-component__base-color: var(--color-border);
  --button-component__complement-color: var(--color-text);
}

.button-component--variant-tonal {
  --button-component__splash-color: var(--button-component__base-color);

  background-color: rgba(var(--button-component__base-color), 0.15);
  color: rgb(var(--button-component__complement-color));
}

.button-component--variant-tonal:hover {
  background-color: rgba(var(--button-component__base-color), 0.25);
}

.button-component--variant-tonal::before {
  display: none;
}

.button-component--disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.button-component__spinner {
  margin-left: 0.35rem;
}

.button-component__splash {
  background-color: rgba(var(--button-component__splash-color), 0.05);
  border-radius: 100vmax;
  position: absolute;
  transform: scale(var(--button-component__splash-scale));
  transform-origin: center;
  transition-duration: 540ms;
  transition-property: background-color, transform;
}

.button-component__splash--active {
  background-color: rgba(var(--button-component__splash-color), 0.35);
  transform: scale(1);
}

.button-component__splash--dead {
  background-color: rgba(var(--button-component__splash-color), 0);
  transition-duration: inherit;
}

.button-component:focus-visible {
  box-shadow: 0px 0px 1rem var(--px) rgba(var(--color-primary), 0.15);
  outline-color: rgb(var(--color-primary));
  outline-offset: calc(-1 * var(--px));
  outline-width: calc(2 * var(--px));
}
</style>
