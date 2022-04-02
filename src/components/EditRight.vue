<template>
  <div class="content">
    <a-empty
      image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
      :image-style="{
        height: '60px',
      }"
      v-if="flag"
      description=""
    >
      <a-button type="link" @click="addNotes">新建笔记</a-button>
    </a-empty>
  </div>
  <a-modal v-model:visible="visible" title="新建笔记" @ok="handleOk">
    <p>
      笔记名：<a-input
        placeholder="请输入笔记名"
        v-model:value="value"
        @change="onChange"
      />
    </p>
  </a-modal>
</template>

<script lang="ts">
import { ref, onUpdated, onMounted, defineComponent, watch } from "vue";
export default defineComponent({
  name: "EditRight",
  props: {
    selectedKey: String,
    name: String,
    flag: Boolean,
  },
  emits: ["ok"],
  setup(props, { emit }) {
    const key = ref<string>(props.selectedKey);
    const name = ref<string>("");
    const flag = ref<boolean>(props.flag);
    const visible = ref<boolean>(false);
    const value = ref<string>("");
    onUpdated(() => {
      key.value = props.selectedKey;
      name.value = props.name;
      flag.value = props.flag;
    });
    const addNotes = () => {
      visible.value = true;
    };
    const onChange = (e: any) => {
      value.value = e.target.value;
    };
    const handleOk = () => {
      emit("ok", key.value, value.value);
    };
    const onSuccess = () => {
      value.value = "";
      visible.value = false;
    };
    return {
      key,
      name,
      flag,
      addNotes,
      visible,
      onChange,
      value,
      handleOk,
      onSuccess,
    };
  },
});
</script>

<style scoped>
.content {
  text-align: center;
}
</style>
