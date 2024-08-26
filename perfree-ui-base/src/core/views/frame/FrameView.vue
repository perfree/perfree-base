<template>
  <div class="page" v-loading="pageLoading">
    <iframe class="frame" v-if="url" :src="url" width="100%" frameborder="none" height="100%"></iframe>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {menuGetApi} from "@/core/api/menu.js";
import {ref} from "vue";

const route = useRoute();
let url = ref('');
let pageLoading = ref(true);

function initInfo() {
  menuGetApi(route.params.id).then(res => {
    url.value = res.data.url;
    pageLoading.value = false;
  })
}

initInfo();
</script>
<style scoped>
.page{
  position: relative;
}
.frame{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>