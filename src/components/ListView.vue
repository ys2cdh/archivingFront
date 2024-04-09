<!-- ListView.vue -->
<template>
  <div>
    <h1>List of Messages</h1>
    <ul>
      <li v-for="message in displayedMessages" :key="message.messageId">
        <div>{{ message.from }} -> {{ message.to[0].email  }}  {{ message.subject }}</div>
        
       
      </li>
    </ul>
    <button @click="prevPage()" :disabled="currentPage === 1">Previous</button>
    <button @click="nextPage()" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      currentPage: 1,
      pageSize: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.messages.length / this.pageSize);
    },
    displayedMessages() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.messages.slice(start, end);
    }
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      axios.get(`http://localhost:8080/allList.jsp?from=${this.currentPage}&size=${this.pageSize}`)
        .then(response => {
          this.messages = response.data.data;
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
    }
  }
}
</script>

<style>
/* CSS 스타일을 여기에 추가할 수 있습니다. */
</style>