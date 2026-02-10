<script lang="ts" setup></script>

<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLayout>
      <NuxtPage keepalive />
    </NuxtLayout>
  </UApp>
</template>
