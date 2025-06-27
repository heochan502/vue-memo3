<script setup>
import { reactive, onMounted } from 'vue';
import httpService from '@/services/HttpService.js';
import MemoCard from '@/components/MemoCard.vue';
// import Form from '@/views/Form.vue';

const state = reactive({
  memos: [],
});

onMounted(() => {
  getItems({});
});
const getItems = async (param) => {
  const data = await httpService.getMemoList(param);
  state.memos = data.resultData;
  console.log('state.memos : ', state.memos);
};
</script>

<template>
  <div class="memo-list">
    <MemoCard v-for="m in state.memos" :item="m" :key="m.id" />

    <!-- 메모를 순회하며 출력 -->
    <!-- <router-link
      v-for="m in state.memos"
      :key="m.id"
      class="item"
      :to="`/memos/${m.id}`"
    > -->

    <!-- <div class="d-flex pt-3">
        <div class="pb-3 mb-0 w-100">
          <div class="d-flex justify-content-between"> -->
    <!-- 메모 제목 -->
    <!-- <b>{{ m.title }}</b>
            <div> -->
    <!-- prevent 자식에서 시작된 이벤트가 부모까지 영향 주는 버블링 현상 막기위해서는거 -->
    <!-- <span role="button" @click.prevent="remove(m.id)" button>삭제</span>추후 구현 -->
    <!-- </div>
          </div> -->
    <!-- 메모내용 -->
    <!-- <div class="mt-2">{{ m.content }}</div>
        </div>
      </div>      
    </router-link> -->

    <!-- router-link to="" 이경로로 액션이 들어오면 이경로로 들어가지게 한다 -->
    <router-link to="/memos/add" class="add btn btn-light">
      + 추가하기
    </router-link>
  </div>
</template>

<style lang="scss">
// .memo-list {
//   .item {
//     background-color: #f8f9fa;
//     border: 1px solid;
//     display: block;
//     color: #000;
//     text-decoration: none;
//     padding: 20px 30px;
//     margin: 15px 0px;

//     // 아이템 위에 마우스가 올라갔을떄
//     &:hover {
//       border-color: #aaa;
//     }
//   }
// }
.add {
  display: block;
  padding: 25px;
  border: 1px solid #eee;
}
</style>
