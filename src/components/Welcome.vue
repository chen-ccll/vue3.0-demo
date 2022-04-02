<template>
  <a-result>
    <template #icon>
      <smile-twoTone />
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SmileTwoTone } from "@ant-design/icons-vue";
export default defineComponent({
  name: "Welcome",
  components: { SmileTwoTone },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
