<!-- ListView.vue -->
<template>
  <div>
    <h1>List of Messages</h1>
    <table>
      <thead>
        <tr>
          <th>보낸 사람</th>
          <th>받는 사람</th>
          <th >제목</th>
          <th >시간</th>
          <th >크기</th>
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
      <button  @click="prevPage()" :disabled="currentPage === 1">&#60;</button>
      <button v-for="pageNumber in displayedPages" :key="pageNumber" @click="goToPage(pageNumber)" @input="handleInput">
        {{ pageNumber }}
      </button>
      <button @click="nextPage()" :disabled="currentPage === totalPages">&#62;</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { watch  } from 'vue'


export default {    
  data() {
    return {
      messages: [],  
      currentPage:1,    
      itemsPerPage: 10, // 페이지당 표시할 항목 수      
      totalItems: 0, // 전체 항목 수
      pageSize: 10
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
    handleInput (current, previous) {
      console.log('[count] handleInput => ', current, previous) 
    },
  }
}
</script>

<style>
thead {
  background-color: #333;
  color: white;
}
.pagination {
  margin-top: 10px;
}

.pagination button {
  margin: 0 5px;
  border: none; /* 테두리 제거 */
  background: none; /* 배경 제거 */
  cursor: pointer;
}

.pagination button:hover {
  text-decoration: underline; /* 마우스 호버 시 밑줄 추가 */
}

.pagination button:focus {
  font-weight: bold; 
  color: blue; /* 선택된 페이지 버튼의 배경색을 파란색으로 변경 */
}
</style>