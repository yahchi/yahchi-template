<template>
  <div class="popup">
    <div class="inner">
      <div class="text"> bloops </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popup",
  props: ["popupTitle"],
  methods: {
    openModal: function(e) {
      e.preventDefault();

      alert("modal");
    }
  }
};
</script>

<style lang="scss">
</style>
