<template>
  <el-popover  trigger="click" width="500" placement="bottom-start" ref="iconSelect">
    <template #reference>
      <el-input
          :modelValue="modelValue"
          class="w-50 m-2"
          placeholder="请选择图标"
      >
        <template #prefix>
          <font-awesome-icon :icon="modelValue" v-if="modelValue"/>
        </template>
      </el-input>
    </template>
    <div class="el-icon-picker">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="实心图标" name="fas">
          <div class="icon-panel">
            <font-awesome-icon :class="[icon, 'icon', { 'icon-active': icon === modelValue }]"
                               :icon="icon" v-for="icon in fasIconList" :key="icon" @click="selectIcon(icon)"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="常规图标" name="far">
          <div class="icon-panel">
            <font-awesome-icon :class="[icon, 'icon', { 'icon-active': icon === modelValue }]"
                               :icon="icon" v-for="icon in farIconList" :key="icon" @click="selectIcon(icon)"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="品牌图标" name="fab">
          <div class="icon-panel">
            <font-awesome-icon :class="[icon, 'icon', { 'icon-active': icon === modelValue }]"
                               :icon="icon" v-for="icon in fabIconList" :key="icon" @click="selectIcon(icon)"/>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </el-popover>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core'
import {ref} from "vue";

let fasIconList = ref([])
Object.keys(library.definitions.fas).forEach(r => {
  fasIconList.value.push("fa-solid fa-" + r)
})

let farIconList = ref([])
Object.keys(library.definitions.far).forEach(r => {
  farIconList.value.push("fa-regular fa-" + r)
})

let fabIconList = ref([])
Object.keys(library.definitions.fab).forEach(r => {
  fabIconList.value.push("fa-brands fa-" + r)
})


const props = defineProps({
  modelValue: String
});

let activeTab = "fas";

const emits = defineEmits(['update:modelValue'])
const iconSelect = ref();
function selectIcon(icon) {
  emits('update:modelValue', icon);
  iconSelect.value.hide();
}

</script>

<style scoped>
.el-icon-picker {
  height: 300px;
  overflow: hidden;
}
.icon-panel{
  height: 256px;
  overflow-y: scroll;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  color: var(--el-text-color-regular);
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  line-height: 45px;
  margin: 5px;
}

.icon:hover {
  color: var(--el-color-primary);
}

.icon-active {
  color: var(--el-color-primary);
}
</style>