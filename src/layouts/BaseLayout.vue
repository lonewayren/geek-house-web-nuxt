<template>
  <a-layout class="ant-layout">
    <BaseHeader style="height: 20vh;"></BaseHeader>
    <BaseContent style="min-height: 70vh"></BaseContent>
    <BaseFooter style="min-height: 10vh"></BaseFooter>
  </a-layout>
</template>

<script>
import BaseFooter from '@/layouts/BaseFooter.vue';
import BaseHeader from '@/layouts/BaseHeader';
import BaseContent from '@/layouts/BaseContent';

export default {
  name: 'BaseLayout',
  components: { BaseFooter, BaseHeader, BaseContent }
};
</script>

<style scoped></style>
