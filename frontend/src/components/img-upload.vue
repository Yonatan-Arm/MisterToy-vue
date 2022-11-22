<template>
  <div>
    <label v-if="!isLoading">
      <img src="../assets/upload.png" alt="" />
      <input type="file" @change="onUploadImg" hidden />
    </label>
    <img v-else src="../assets/loader.gif" alt="" />
  </div>
</template>

<script>
  import {uploadImg} from '../services/imgUpload.service.js';
  export default {
    data() {
      return {
        isLoading: false,
      };
    },
    methods: {
      async onUploadImg(ev) {
        this.isLoading = true;
        const res = await uploadImg(ev);
        this.$emit('save', res.url);
        this.isLoading = false;
      },
    },
  };
</script>

<style></style>
