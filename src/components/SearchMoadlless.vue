<template>
    <div class="modal-content">
        <a-dropdown class="include">
            <a class="ant-dropdown-link" @click.prevent>
                Hover me
                <DownOutlined />
            </a>
            <template #overlay>
                <a-menu class="include">
                    <a-menu-item class="include">
                        <a href="javascript:;" class="include">1st menu item</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;">2nd menu item</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;">3rd menu item</a>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
        <input type="text" v-model="startTime" placeholder="" @click="showCalendar('startTime')">
        <input type="text" v-model="endTime" placeholder="" @click="showCalendar('endTime')">
        <div style="height:'400px';width: '300px'">
            <a-calendar class="searchCalendar" v-if="calendarVisible" @vue:mounted="dosearchCalendarMounted" @select="onPanelChange" ></a-calendar>
        </div>
        <button @click="applyFilter">Apply</button>
    </div>

</template>

<script>
import { DownOutlined } from '@ant-design/icons-vue'; // eslint-disable-line no-unused-vars
import { Calendar } from 'ant-design-vue'; // eslint-disable-line no-unused-vars

export default {
    props: {
        //          close:Function,
    },
    components: {
        DownOutlined,
        Calendar
    },
    data() {
        return {
            showFilterOptions: false, //토글 상태
            xPosition: 0,
            yPosition: 0,
            calendarVisible: false, // 달력의 가시성 상태를 저장하는 데이터
            selectCalendar:'', //선택된 달력
        };
    },
    computed: {

    },
    methods: {

        applyFilter() {
            // 여기에 필터 적용 로직을 추가할 수 있습니다.
            // 현재는 filterOption을 사용하는 예시입니다.
            console.log('startTime :', this.startTime);
            console.log('endTime :', this.endTime);
            //  this.toggleFilterOptions(); // 검색 버튼을 누르면 모달리스를 닫습니다.
            this.$emit('close');
        },
        showCalendar(id) {
            
            this.calendarVisible = true; // 달력을 보이도록 설정
            this.selectCalendar=id;
        },
        hideCalendar() {
            this.calendarVisible = false; // 달력을 숨기도록 설정
        },
        dosearchCalendarMounted(){
            var bar = document.getElementsByClassName("ant-picker-calendar-date-content");
                 for (var i = 0; i < bar.length; i++) {
                bar[i].style.height = "10px";
                bar[i].style.width = '20px';
               }
        },
        onPanelChange(value, mode) {
            console.log(value.format('YYYY-MM-DD'), mode);
            if ('startTime' === this.selectCalendar){
                this.startTime=value.format('YYYY-MM-DD');
            } else if ('endTime' === this.selectCalendar) {
                this.endTime=value.format('YYYY-MM-DD');
            }
            this.hideCalendar();
        }
    }
}
</script>
<style>
.modal-content {
    background-color: #fefefe;
    border: 1px solid #888;
}

.App {
  font-family: sans-serif;
  text-align: center;
}


</style>