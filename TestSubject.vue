<script setup>
import vHtmlSwap from './index.js'

defineProps({
  html: {
    type: String,
  }
})
</script>

<template>
  <div data-test="unwrap-on-el">
    <div data-test="replaced" v-html-swap="html" />
  </div>
  <div data-test="unwrap-on-template">
    <template data-test="replaced" v-html-swap="html" />
  </div>
</template>