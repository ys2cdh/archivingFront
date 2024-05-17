<template>
    <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" @change="handleTableChange" >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
          </span>
        </template>
      </template>
    </a-table>
  </template>
  <script setup>
  import { ref,computed,onMounted } from 'vue';
  import axios from '../utils/axios';
  import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
  import { usePagination } from 'vue-request';
  

  const columns = [
    {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '보낸 사람',
      dataIndex: 'sent',
      key: 'sent',
    },
    {
      title: '받는 사람',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: '제목',
      dataIndex: 'subject',
      key: 'subject',      
    },
    {
      title: '시간',
      dataIndex: 'time',
      key: 'time',      
    },
    {
      title: '크기',
      dataIndex: 'size',
      key: 'size',
    },
  ];

  const data1 = [
  {
    key: '1',
    to: 'John Brown',
    subject: 32,
    time: 'New York No. 1 Lake Park',    
  },
  {
    key: '2',
    to: 'Jim Green',
    subject: 42,
    time: 'London No. 1 Lake Park',
    
  },
  
];

  
const total = ref(100);

 const {
  data: dataSource,
  run,
//  loading,
  current,
  pageSize,
  
} = usePagination(fetchMessages, {
  defaultParams: [{ current: 0, pageSize: 10}],  
  formatResult: res => res,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'size',
    totalKey: 'total',
  },
}); 

const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}));


onMounted(() => {
    //this.current=1;
    //this.pageSize=10;
  //  console.log("total onMounted " +total.value);
});
 
function fetchMessages({ current, pageSize }) {
    console.log("current " +current + ", pageSize "+ pageSize);
    if (undefined==current){
        return;
    }
    return axios.get(`http://localhost:8080/allList.jsp`, {
    params: {
      from: current,
      size: pageSize,
    },
  })
    .then(response => {
        total.value=response.data.total;
        return response.data.data;
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
    }

    const handleTableChange = (
   //     pag,
) => {
//     const axiosTest = async () => {
//         try {
//             // use data destructuring to get data from the promise object
//             const { data: response } = await axios.get(url); 
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
// };
//   let result = fetchMessages({current :pag?.current,pageSize:pag?.pageSize});
  run(data1)
};
  </script>
  