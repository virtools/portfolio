<template>
  <div class="card mb-4 shadow-sm">
    <div
      class="img card-img-top"
      :style="{ backgroundImage: 'url(' + img_url + ')', backgroundPosition:img_align}"
    ></div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ content }}</p>
      <div class="d-flex justify-content-start">
        <!-- <div class="btn-group" role="group" aria-label="Basic example"> -->
        <a
          class="flex-fill btn btn-sm btn-secondary mr-2"
          role="button"
          :href="code_url"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >檢視代碼</a>
        <a
          class="flex-fill btn btn-sm btn-success"
          role="button"
          :href="demo_url"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >演示</a>
        <!-- </div> -->
      </div>
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
    img_align: { type: String, default: "left center" }
  }
};
</script>
<style scope>
</style>
