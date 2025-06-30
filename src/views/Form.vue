<script setup>
import { reactive, onMounted, useTemplateRef } from 'vue';
import httpService from '@/services/HttpService';
import { useRoute, useRouter } from 'vue-router';
// 스토리지 서비스의 객체(인스턴스) 생성
//p.175
//메모 등록, 메모 디테일, 메모 수정
// const httpService = new HttpService();
// 라우터 객체
const router = useRouter(); // 주소 이동 ( 라우터 처리 )
const route = useRoute(); // PathVariable 데이터 가져오기 위한 용도

//useTemplateRef   input 쪽에 ref="ref_title" 이게 들어가야함그리고 ""안의 명칭에는
// 아리 ref랑 명칭이 같아야함 // 이게 이벤트 후에 커서가 내용이나 제목으로 가게 하는거
const refTitle = useTemplateRef('ref_title');
const refCtnts = useTemplateRef('ref_ctnts');

console.log('route.params.memoId', route.params.memoId);

// 반응형 상태
const state = reactive({
  memo: {
    memoId: 0,
    title: '',
    ctnts: '',
    createdAt: '',
  },
});
// 데이터 제출
const submit = async () => {
  //간단한 validation (유효성 검사)
  // 제목에 내용이 없다면 alert('제목을 작성해 주세요.')
  // 내용이 없다면 alert('내용 입력 해라')

  // trim 얖영의 공백 스페이스가 제거하고 검색 할 때 쓰는거
  // 사이의 공백을 제거 하기위해서는 replace(' ','') 공백을 없애는 방식
  // replaceAll ㅡ 이거는 모든 것 위에는 처음 만나는거
  //   const tLen = state.memo.title.trim().length;
  const tLen = (state.memo.title ?? '').trim().length;
  const cLen = (state.memo.ctnts ?? '').trim().length;
  //   const cLen = state.memo.ctnts.trim().length;
  if (tLen === 0 || tLen > 20) {
    alert(tLen === 0 ? '제목 입력 안했는딩?' : '제목 너무 긴딩 20자 이내로혀');
    // 포커싱 위치 주는거
    refTitle.value.focus();
    return;
  } else if (cLen === 0 || cLen > 200) {
    alert(cLen === 0 ? '내용 입력 안했는딩?' : '내용 너무 긴딩 200자 이내로혀');
    refCtnts.value.focus();
    return;
  } else {
    // 등록, 수정 처리인지 구분이 되어야 한다.
    // 수정하기 들어갔을 때 한번 사용 해야한다
    if (route.params.memoId) {
      // 수정 처리
      //   httpService.setItem(state.memo);

      return;
    } else {
      const bodyJson = {
        title: state.memo.title,
        ctnts: state.memo.ctnts,
      };
      const data = await httpService.save(bodyJson);
      if (data.resultData === 1) {
        // 등록 성공
        //홈화면으로 라우터 처리
        router.push({ path: '/' });

        // console.log('글등록 : ', data.resultMessage);
      }
      // 입력 처리
      // httpService.addItem(state.memo);
      else {
        alert(data.resultMessage);
        //실패
      }
    }
    // 메모 삽입3
    // 안내 메시지 출력
    alert('저장했습니다.');
    // 메인 화면으로 이동
    router.push({ path: '/' });
  }
};

onMounted(() => {
  if (route.params.memoId) {
    findById();
  }
});
const findById = async () => {
  const data = await httpService.findById(route.params.memoId);
  state.memo = data.resultData;
};
// onMounted(async () => {
//   // 여기 아래 구문으로 분기를 줘서 // 추가하면 form화면 내용 없애고 있으면
//   // 화면에 제목 내용을 출력하고 // 수정하는 화면도 하는거
//   if (route.params.memoId) {
//     // 값이 있다면 item 클릭, 없다면 [+추가하기] 버튼 클릭
//     state.memo = await httpService.getItme(route.params.memoId);
//     state.memo.memoId = parseInt(route.params.memoId);
//   }
// });
</script>
<template>
  <!-- 아래가 form의 전반적이 ㄴ화면 -->
  <h1>Form.vue</h1>
  <!-- 아래 @submit.prevent="" 이 문법은 vue 문법이다 
   부모에서 자식에게 이벤트가 마구 넘어가는건 캡쳐링 
   자식에서 부모에게 마구 이벤트 넘어가서 진행 되는건 버블링 
   아래는 버블링 막는거 -->
  <form class="detail" @submit.prevent="submit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시 : {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>

      <!-- required 적으면 기본 제공하는 데이터 넣으라는 말이 뜨면서 커서가 제목 밑에 나 
       내용 밑에 간다 -->
      <input
        type="text"
        ref="ref_title"
        id="title"
        class="form-control p-3"
        v-model="state.memo.title"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        id="content"
        ref="ref_ctnts"
        class="form-control p-3"
        v-model="state.memo.ctnts"
      ></textarea>
    </div>
    <!-- 아래의 type=submit 은 생략가능해서 없어도 자동으로button에 이벤트가 걸려서 진행된다
      type이 button이면 이벤트가 발생안된다 type가 submit 이라서 가능 
      클릭이벤트 발생하는건 어떤 태그는 상관없는데 reset button 태그는 각 태그의 이벤트는 form 태그일떄만 사용가능-->
    <button type="submit" class="btn btn-primary w-100 py-3">저장</button>
  </form>
</template>
<style scoped></style>
