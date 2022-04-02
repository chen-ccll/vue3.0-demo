<template>
  <a-row>
    <a-col span="5">
      <a-button type="link" @click="onAdd">新建文件</a-button>
      <a-directory-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        :tree-data="data"
        @select="onSelect"
        @expand="onExpand"
      >
      </a-directory-tree>
    </a-col>
    <a-divider
      type="vertical"
      style="min-height: 800px; background-color: #f0f2f5"
    />
    <a-col span="18">
      <p v-if="name">
        <span>{{ name }}</span
        >&nbsp; <edit-two-tone @click="goEdit" />&nbsp;
        <a-popconfirm
          :title="`确定删除${flag ? '此文件（包括所有笔记）' : '此笔记'}?`"
          ok-text="Yes"
          cancel-text="No"
          placement="right"
          @confirm="goDelete"
        >
          <delete-two-tone two-tone-color="#eb2f96" />
        </a-popconfirm>
      </p>
      <EditRight
        :selectedKey="selectedKey"
        :name="name"
        :flag="flag"
        @ok="onOK"
        ref="eidtRight"
      />
      <v-md-editor
        :model-value="markdown"
        v-if="flag === false"
        height="800px"
        @save="onSave"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
      ></v-md-editor>
    </a-col>
  </a-row>
  <a-modal v-model:visible="visible" title="文件" @ok="handleOk">
    <p>
      名字：<a-input
        placeholder="请输入"
        v-model:value="value"
        @change="onChange"
      />
    </p>
  </a-modal>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { message } from "ant-design-vue";
// import EditRight from "@components/EditRight.vue";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons-vue";
interface tree {
  title: string;
  key: string;
  children: {
    title: string;
    key: string;
    isLeaf: boolean;
  }[];
}

export default defineComponent({
  name: "Notes",
  components: { EditTwoTone, DeleteTwoTone },
  setup() {
    const expandedKeys = ref<string[]>([]);
    const selectedKeys = ref<string[]>([]);
    const selectedKey = ref<string>("");
    const name = ref<string>("");
    const visible = ref<boolean>(false);
    const value = ref<string>("");
    //判断是否是父节点
    const flag = ref<boolean>(null);
    const eidtRight = ref();
    const eidtFlag = ref<boolean>(false);
    const markdown = ref<string>("");
    const treeData = [
      {
        title: "我的文件名1",
        key: "0-0",
        children: [
          {
            title: "笔记1",
            key: "0-0-0",
            isLeaf: true,
          },
          {
            title: "笔记2",
            key: "0-0-1",
            isLeaf: true,
          },
        ],
      },
      {
        title: "我的文件名2",
        key: "0-1",
        children: [
          {
            title: "笔记3",
            key: "0-1-0",
            isLeaf: true,
          },
          {
            title: "笔记4",
            key: "0-1-1",
            isLeaf: true,
          },
        ],
      },
    ];
    const data = ref<tree[]>(treeData);

    const onSelect = (keys: string[], e: any) => {
      selectedKeys.value = keys;
      selectedKey.value = keys[0];
      name.value = e.selectedNodes[0].title;
      if (e.selectedNodes[0].isLeaf) {
        flag.value = false;
      } else {
        flag.value = true;
      }
    };
    const handleOk = () => {
      if (!eidtFlag.value) {
        if (value.value) {
          let key = data.value.length;
          data.value.push({ title: value.value, key: `${key}`, children: [] });
          value.value = "";
          visible.value = false;
          message.success("新建成功");
        } else {
          message.warning("文件名不能为空");
        }
      } else {
        name.value = value.value;
        visible.value = false;
        message.success("新建成功");
        setName(data.value, selectedKey.value, true);
      }
    };
    const setName = (tree: any, key: string, type: boolean) => {
      if (type) {
        tree.forEach((item: any) => {
          if (item.key === key) {
            item.title = name.value;
          } else {
            setName(item.children || [], key, true);
          }
        });
      } else {
        tree.forEach((item: any, index: number) => {
          if (item.key === key) {
            tree.splice(index, 1);
            selectedKey.value = "";
            selectedKeys.value = [];
            name.value = "";
            flag.value = null;
          } else {
            setName(item.children || [], key, false);
          }
        });
      }
    };
    const onAdd = () => {
      eidtFlag.value = false;
      value.value = "";
      visible.value = true;
    };
    const onChange = (e: any) => {
      value.value = e.target.value;
    };
    const onOK = (key: string, newName: string) => {
      if (!expandedKeys.value.includes(key)) {
        expandedKeys.value.push(key);
      }
      data.value.forEach((item) => {
        if (item.key == key) {
          let key = `${newName}-${item.children.length}`;
          item.children.push({
            title: newName,
            key: key,
            isLeaf: true,
          });
          // markdown.value = "### " + key;
          selectedKeys.value = [key];
          selectedKey.value = key;
          name.value = newName;
          flag.value = false;
        }
      });
      eidtRight.value.onSuccess();
    };
    const onExpand = (Keys: string[]) => {
      expandedKeys.value = Keys;
    };
    const goEdit = () => {
      eidtFlag.value = true;
      visible.value = true;
      value.value = name.value;
    };
    const onChangeName = (e: any) => {
      name.value = e.target.value;
    };
    const onSave = (text: string, html: string) => {
      console.log(selectedKey.value);
      console.log(text);
      console.log(html);
    };
    const goDelete = () => {
      setName(data.value, selectedKey.value, false);
    };
    const handleUploadImage = (
      event: any,
      insertImage: Function,
      files: any
    ) => {
      // console.log(event);
      // console.log(files[0]);
      let formData = new FormData();
      formData.append("file", files[0]);
      console.log(formData.get("file"));
    };
    return {
      expandedKeys,
      selectedKeys,
      treeData,
      onSelect,
      selectedKey,
      name,
      flag,
      visible,
      handleOk,
      onAdd,
      value,
      onChange,
      data,
      onOK,
      eidtRight,
      onExpand,
      goEdit,
      eidtFlag,
      onChangeName,
      markdown,
      onSave,
      goDelete,
      handleUploadImage,
    };
  },
});
</script>

<style scoped></style>
