<template>
  <div>
    {{ slug }}
  </div>
</template>

<script lang="ts" setup>
const { slug } = useRoute().params;
</script>
