<template>
    <a-card>
      <a-row :gutter="16">
        <a-col v-for="(item, index) in workData" :key="index" :xs="24" :sm="8">
          <div class="flex flex-col items-center justify-center">
            <div class="text-zinc-400">
              {{ item.title }}
            </div>
            <div style="font-size: 24px;">
              {{ item.content }}
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="검색어를 입력하세요">
      <a-icon class="search-icon" :type="SearchOutlined" @click="searchMessages"></a-icon>
      <component :is="filterIconType" class="filter-icon" :type="filterIconType" @click="toggleFilterOptions">
      </component>
    </div>
    <div>
        <Modalless class="modalless" v-click-outside="closeModalOutside"
        :style="{ 'top': yPosition + 'px', 'left': xPosition + 'px' }" 
        @close="toggleFilterOptions"
        v-if="showFilterOptions"
        ></Modalless>
    </div>    

</template>

<script>
import Modalless from './SearchMoadlless.vue';
import vClickOutside from 'click-outside-vue3'
import { SearchOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons-vue';

export default {
    data() {
        return {
            workData : [{
                            title: '我的待办',
                            content: '8个任务',
                        },
                        {
                            title: '本周任务平均处理时间',
                            content: '32分钟',
                        },
                        {
                            title: '本周完成任务数',
                            content: '24个任务',
                        },],
        }
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    components: {
        'a-icon': SearchOutlined,
        'caret-down-icon': CaretDownOutlined,
        'caret-up-icon': CaretUpOutlined,
        Modalless,
    },
}
</script>

<style>
</style>