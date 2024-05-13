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
    <div>
      <button v-on:click="fetchMessages()"> Add</button>
    </div>
      
</template>

<script>
import axios from '../utils/axios';
import Modalless from './SearchMoadlless.vue';
import vClickOutside from 'click-outside-vue3'
import { SearchOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons-vue';

export default {
    data() {
        return {
            workData : [{
                title: '금일',
                content: null,
              },
              {
                title: '한달 평균',
                content: null,
              },
              {
                title: '전체개수',
                content: null,
              },],
            data:[],
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
    mounted() {
    this.fetchMessages();    
  },
  methods: {
    fetchMessages() {
      axios.get(`http://localhost:8080/init.jsp`)
        .then(response => {
          //console.debug(response.data);
        
          this.data = response.data;
          this.updateInitData();

          //this.messages = response.data.data;
          //this.totalItems = response.data.total;
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    },
    updateInitData() {
      this.workData[0].content= this.data.todayCount;
      this.workData[1].content= this.data.MonthAvgCount;
      this.workData[2].content= this.data.totalCount;
    },   
  },
  
}
</script>

<style>
</style>