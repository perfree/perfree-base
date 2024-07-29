<template>
  <div class="py-18">
    <el-result
        icon="warning"
        title="404提示"
        sub-title="你找的页面走丢了~"
    >
      <template #extra>
        <el-button type="primary" size="medium" @click="$router.push('/admin')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>