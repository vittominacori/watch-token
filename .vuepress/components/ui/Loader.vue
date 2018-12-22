<template>
    <div v-if="loading" class="p-4">
        <BeatLoader
                class="text-center"
                :loading="loading"
                color="#e74c3c"
                :size="15"></BeatLoader>
    </div>
</template>

<script>
  export default {
    name: 'Loader',
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
