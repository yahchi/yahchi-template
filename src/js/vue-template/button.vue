<template>
    <div class="button">
        {{ text.text }}
    </div>
</template>

<script>
export default {
    name: "btnVue",
    props: ['text']
}
</script>

<style>
.button {
    background: var(--bluePrimary);
    color: #fff;
    font-weight: bold;
}
</style>
