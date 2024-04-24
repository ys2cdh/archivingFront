<!-- ListView.vue -->
<template>
  <div>
    <h1>List of Messages</h1>
    <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="검색어를 입력하세요">
      <a-icon class="search-icon" :type="SearchOutlined" @click="searchMessages"></a-icon>
      <component :is="filterIconType" class="filter-icon" :type="filterIconType" @click="toggleFilterOptions">
      </component>
    </div>
    <table>
      <thead>
        <tr>
          <th>보낸 사람</th>
          <th>받는 사람</th>
          <th>제목</th>
          <th>시간</th>
          <th>크기</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="message in displayedMessages" :key="message.id">
          <td>{{ message.from }}</td>
          <td>{{ message.to[0].email }}</td>
          <td>
            <!-- 조건부 렌더링 -->
            <span v-if="message.attach">
              <img :src="require('../img/ico_file.gif')" alt="clip icon" width="7" height="13">
            </span>
            {{ message.subject }}
          </td>
          <td>{{ message.date }}</td>
          <td>{{ message.size }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage()" :disabled="currentPage === 1">&#60;</button>
      <button v-for="pageNumber in displayedPages" :key="pageNumber" @click="goToPage(pageNumber)" @input="handleInput">
        {{ pageNumber }}
      </button>
      <button @click="nextPage()" :disabled="currentPage === totalPages">&#62;</button>
    </div>

    <Modalless class="modalless" v-click-outside="closeModalOutside"
      :style="{ 'top': yPosition + 'px', 'left': xPosition + 'px' }" 
      @close="toggleFilterOptions"
      v-if="showFilterOptions"
      ></Modalless>
  </div>
</template>

<script>
import axios from 'axios';
import { watch } from 'vue'
import { SearchOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons-vue';
import Modalless from './SearchMoadlless.vue';
import vClickOutside from 'click-outside-vue3'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    'a-icon': SearchOutlined,
    'caret-down-icon': CaretDownOutlined,
    'caret-up-icon': CaretUpOutlined,
    Modalless,
  },
  data() {
    return {
      messages: [],
      currentPage: 1,
      itemsPerPage: 10, // 페이지당 표시할 항목 수      
      totalItems: 0, // 전체 항목 수
      pageSize: 10,
      searchTerm: '', //전체 검색어,      
      showFilterOptions: false, //토글 상태
      xPosition: 0,
      yPosition: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    displayedMessages() {
      return this.messages;
    },
    displayedPages() {
      // 현재 페이지를 중심으로 앞뒤로 5개씩 총 10개의 페이지 번호를 반환
      const startPage = Math.max(1, this.currentPage - 5);
      const endPage = Math.min(this.totalPages, startPage + 9);
      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    },
    filterIconType() {      
                return this.showFilterOptions ? 'caret-up-icon' : 'caret-down-icon';
            }
  },
  mounted() {
    this.fetchMessages();
    //아래 watch는 작동하는 코드 임
    watch(() => this.currentPage, (current, previous) => { console.log('[count] watch => ', current, previous) });
  },
  methods: {
    fetchMessages() {
      axios.get(`http://localhost:8080/allList.jsp?from=${this.currentPage}&size=${this.pageSize}`)
        .then(response => {
          this.messages = response.data.data;
          this.totalItems = response.data.total;
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    },
    //  formatDate(date) {
    // 날짜 포맷팅 로직
    //  },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchMessages();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchMessages();
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchMessages();
    },
    handleInput(current, previous) {
      console.log('[count] handleInput => ', current, previous)
    },
    searchMessages() {
      axios.get(`http://localhost:8080/searchValueAllList.jsp?from=${this.currentPage}&size=${this.pageSize}&searchValue=${this.searchTerm}`)
        .then(response => {
          this.messages = response.data.data;
          this.totalItems = response.data.total;
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    },
    searchDetailMessages(map){
    
      axios.get(`http://localhost:8080/searchValueList.jsp?from=${this.currentPage}&size=${this.pageSize}&startTime=${map.get("startTime")}&endTime=${map.get("endTime")}`)
       .then(response => {
          this.messages = response.data.data;
          this.totalItems = response.data.total;
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    },
    toggleFilterOptions(event,map) {
      //console.log("showFilterOptions : " + this.showFilterOptions);
      if(typeof map != "undefined" && map != null && map instanceof Map){
        this.searchDetailMessages(map);
      }
      this.showFilterOptions = !this.showFilterOptions;
      if (this.showFilterOptions) {
        this.calculateModalSize();
        this.calculateModalPosition(event);
        //this.xPosition=(event.clientX-100);
        //this.yPosition=(event.clientY+100);
      }      
    },
    calculateModalSize() {
      // 모달 내용의 크기를 측정하기 위해 임시로 모달 내용을 추가하여 크기를 측정
      const modalContent = document.createElement('div');
      modalContent.innerHTML = '<h2>Filter Options</h2><input type="text" placeholder="Filter option"><button>Apply</button>';
      modalContent.style.position = 'absolute';
      modalContent.style.visibility = 'hidden';
      document.body.appendChild(modalContent);
      // 모달의 가로 세로 크기를 측정
      this.modalWidth = modalContent.offsetWidth;
      this.modalHeight = modalContent.offsetHeight;
      // 임시로 추가한 모달 내용을 제거
      document.body.removeChild(modalContent);
    },
    calculateModalPosition(event) {
      console.log("event : " + event);
      // 모달 위치 계산
      this.xPosition = event.clientX - this.modalWidth;
      this.yPosition = event.clientY + this.modalHeight / 2;
    },
    closeModalOutside(event) {
      // 모달 바깥을 클릭하면 모달을 닫음
      if (!event.target.classList.contains('include')) {
        this.toggleFilterOptions();
      }
    },
  }
}
</script>

<style>
/* 모달 스타일 */
.modalless {
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
}

thead {
  background-color: #333;
  color: white;
}

.pagination {
  margin-top: 10px;
}

.pagination button {
  margin: 0 5px;
  border: none;
  /* 테두리 제거 */
  background: none;
  /* 배경 제거 */
  cursor: pointer;
}

.pagination button:hover {
  text-decoration: underline;
  /* 마우스 호버 시 밑줄 추가 */
}

.pagination button:focus {
  font-weight: bold;
  color: blue;
  /* 선택된 페이지 버튼의 배경색을 파란색으로 변경 */
}

.search-container {
  text-align: right;
  margin-bottom: 20px;
}

.search-icon {
  position: relative;
  right: 39px;
  /* 아이콘을 input 오른쪽에 위치시킵니다. */
  top: 8px;
  /* 수직 중앙 정렬 */
  transform: translateY(-50%);
  cursor: pointer;
}

.filter-icon {
  position: relative;
  right: 35px;
  /* 아이콘을 input 오른쪽에 위치시킵니다. */
  top: 8px;
  /* 수직 중앙 정렬 */
  transform: translateY(-50%);
  cursor: pointer;
}
</style>