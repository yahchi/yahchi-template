<template>
  <div class="hello">
    <div class="inner">
      <div class="text"> {{ helloTitle }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["helloTitle"],
  methods: {
    openModal: function(e) {
      e.preventDefault();

      alert("modal");
    }
  }
};
</script>

<style lang="scss">
.hello {
    margin-top: 1rem;
    font-size: 1rem;
}
</style>
