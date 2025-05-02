<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nobis
    reprehenderit, facere magni numquam laudantium nemo, veniam dolor facilis
    corporis, molestiae error placeat exercitationem! Tempora deserunt
    laudantium officia totam natus.
    <nuxt-link to="/">Главная</nuxt-link>
  </div>
</template>

<script lang="ts" setup>
const { slug } = useRoute().params;
</script>
