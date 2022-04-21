<template>
    <h1>About</h1>
    <Button type="button" @click="openDialog()">Click to show dialog</Button>
    
  
  <Dialog v-model:visible="display" header="Header">
  	Content
  </Dialog>
</template>

<script lang="ts">
  import { ref } from 'vue';

  export default {
      setup() {
        const display = ref(false);

        const openDialog = () => {
            display.value = true;
        };

        return { display, openDialog };
      }
  }
</script>