<script setup></script>

<template>
  <div id="app">
    <div class="container py-4">
      <header class="pb-4 mb-4 border-bottom">
        <!-- 아래 라우터 링크가 memo a--- 글자누르면 링크로 이동하게해주는거 -->
        <router-link to="/" class="text-dark text-decoration-none">
          <b class="fs-4">Memo Application</b>
        </router-link>
        <!-- 라우터 링크가 화면의 링크를 바꾸는거고 -->
      </header>

      <main>
        <!-- 아래가 보여지는게 바뀌는거  -->
        <router-view />
      </main>

      <footer class="pt-4 mt-4 border-top">
        &copy; 2024. Memo. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app .container {
  max-width: 576px;
}
</style>
