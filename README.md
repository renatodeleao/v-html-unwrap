# v-html-unwrap
Like Vue’s v-html directive but this one replaces the wrapper element (unwraps)

## Usage
```vue
<script setup>
  import vHtmlUnwrap from 'v-html-unwrap'
  const html = `<span>Yo</span>`
</script>

<template>
  <div v-html="html" />
  <!-- OUTPUT
    <div>
      <span>Yo</span>
    </div>
  -->

  <template v-html="html" />
  <!-- does not work-->

  <div v-html-unwrap="html" />
  <!-- OUTPUT 
    <span>Yo</span>
  -->
  
  <template v-html-unwrap="html" />
  <!-- it works with template tags as well !-->
  <!-- OUTPUT 
    <span>Yo</span>
  -->
</template>
```

## A note on XSS (Cross-site scripting)
Just like Vue’s `v-html`, this directive relies on `Element.innerHTML` and, as such, it is vulnerable to XSS attacks. If you don't have full control of the content that you provide as binding value, you **should sanitize**.
I suggest [`DOMPurify`](https://github.com/cure53/DOMPurify).