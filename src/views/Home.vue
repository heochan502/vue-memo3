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

// 검색기능 떄문에 param 이필요한데 delete를 따로 빼놔서 간접적으로 호출을 해야하는데
// 삭제쪽에서 삭제만 되고 다시 화면 표출이 되지않아서 param이랑 delete가 연결이 되는 부분이 있어야
// 삭제버튼을 누르고 삭제가 되고 화면이 재 구성되고 다시 출력되어야함
// getItems 가 화면을 다시 뿌려주는건디 그게 안되니께 지금은 그래서 아래 매소드 만들어서 진행
//@remove-item="removeItem" <- "" 이거 안에 이름은 매소드랑 같아야함
// @remove-item <- 요거는 자동으로 MemoCard에서 카멜 케이스로 변경되어서 deleteItem 으로 된다

const removeItem = async (id, msg) => {
  console.log('removeItem: ', id, msg);
};
</script>

<template>
  <div class="memo-list">
    <MemoCard
      @delete-item="removeItem"
      v-for="m in state.memos"
      :item="m"
      :key="m.id"
    />

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
