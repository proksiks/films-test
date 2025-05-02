<template>
  <div class="card">
    <picture class="card-cover">
      <nuxt-link :to="`film/${data}`">
        <img
          class="card-image"
          :src="replaceImageSize(data.title.assets, 'poster')"
          :alt="data.title.title"
        />
      </nuxt-link>
    </picture>
    <h2 class="card-title">
      {{ data.title.title }}
    </h2>
    <p class="card-description">
      {{ data.title.synopsis }}
    </p>
    <div class="card-under">
      <slot name="under" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ data: Slide }>();
</script>

<style lang="scss" scoped>
@use "index" as *;
</style>
