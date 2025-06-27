<script setup>
import httpService from '@/services/HttpService.js';

const props = defineProps({
  item: Object,
});

// 삭제 버튼 누르면 콘솔에 id 값 출력되게 해주세요.

const remove = () => {
  console.log('id : ', props.item.id);

  // 확인 눌렀을때만 처리하고싶은 내용 if 안에 적으면 된다
  if (confirm('삭제하시겠습니다.')) {
    console.log('삭제하겠다');
    // axios 가 데이터 보내면 객체로 보낸다
    const params = {
      memo_id: props.item.id,
    };
    const data = httpService.deleteMemo(params);
  }
};
</script>

<template>
  <router-link
    :key="props.item.id"
    class="item"
    :to="`/memos/${props.item.id}`"
  >
    <div class="d-flex pt-3">
      <div class="pb-3 mb-0 w-100">
        <div class="d-flex justify-content-between">
          <!-- 메모 제목 -->
          <b>{{ props.item.title }}</b>
          <div>
            <!-- prevent 자식에서 시작된 이벤트가 부모까지 영향 주는 버블링 현상 막기위해서는거 -->
            <span role="button" @click.prevent="remove(props.item.id)" button
              >삭제</span
            ><!--추후 구현-->
          </div>
        </div>
        <!-- 메모내용 -->
        <!-- <div class="mt-2">{{ props.item.content }}</div> -->
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.memo-list {
  .item {
    background-color: #f8f9fa;
    border: 1px solid;
    display: block;
    color: #000;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 0px;

    // 아이템 위에 마우스가 올라갔을떄
    &:hover {
      border-color: #aaa;
    }
  }
}
</style>
