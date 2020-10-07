<template>
  <div class="card mb-4 shadow">
    <div
      class="img card-img-top"
      :style="{
        backgroundImage: 'url(' + img_url + ')',
        backgroundPosition: img_align,
      }"
    ></div>
    <div class="card-body">
      <div class="d-flex justify-content-start">
        <!-- <div class="btn-group" role="group" aria-label="Basic example"> -->
        <div class="title">{{ title }}</div>
        <a
          class="flex-fill btn btn-sm btn-secondary mr-2"
          role="button"
          :href="code_url"
          target="_blank"
          rel="nofollow noopener noreferrer"
          >檢視程式碼</a
        >
        <a
          class="flex-fill btn btn-sm btn-success"
          role="button"
          :href="demo_url"
          target="_blank"
          rel="nofollow noopener noreferrer"
          >觀看</a
        >
        <!-- </div> -->
      </div>
      <!-- <h4 class="card-title p-2">{{ title }}</h4>
      <p class="card-text">{{ content }}</p> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: {
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    img_url: { type: String, default: "" },
    code_url: { type: String, default: "" },
    demo_url: { type: String, default: "" },
    img_align: { type: String, default: "left center" },
  },
};
</script>
<style scoped>
.card-body {
  /*margin-top: -95px;*/
}
.card-title {
  /*margin-bottom: 0;*/
  /*background-color: rgb(255 255 255 / 70%);
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  backdrop-filter: saturate(180%) blur(5px);*/
}
.title {
  width: 50%;
}
.img {
  display: block;
  padding-bottom: 52%;
  background-color: #ddd;
  background-size: cover;
}
@media (min-width: 576px) {
}
@media (min-width: 768px) {
  .img {
    padding-bottom: 52%;
  }
}
@media (min-width: 992px) {
  .img {
    padding-bottom: 60%;
  }
}
@media (min-width: 1200px) {
  .img {
    padding-bottom: 65%;
  }
  .title {
    width: auto;
    writing-mode: vertical-lr;
    position: absolute;
    white-space: nowrap;
    top: 0.5rem;
    font-size: 1.2rem;
    left: -2.4rem;
    font-family: "genryu-H";
    letter-spacing: 0.1rem;
    color: #464646;

    /*left: -3rem;
    background-color: white;
    padding: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.5rem 0rem 0rem 0.5rem;*/
  }
}
</style>
