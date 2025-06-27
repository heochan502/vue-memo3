<script setup>
const props = defineProps({
  item: Object,
});
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
        <div class="mt-2">{{ props.item.content }}</div>
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
