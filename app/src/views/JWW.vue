<template>
  <div class="ma-3">
    <v-card flat width="700">
      <v-toolbar flat color="blue-grey lighten-5" dense>
        <v-toolbar-title>JWW Files</v-toolbar-title>
      </v-toolbar>
      <div class="ml-3">
        <a-list
          item-layout="horizontal"
          size="small"
          :pagination="pagination"
          :data-source="listData"
        >
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-list-item-meta :description="item.description">
              <a slot="title" :href="item.href">
                <v-icon color="green" xs>zoom_in</v-icon>
                {{ item.title }}
              </a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </v-card>
  </div>
</template>
<script>
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://www.antdv.com/",
    title: `S115${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: `Hinban: S115${i}-LK || Material:額縁※レッドパインムク羽目板貼、踏込、杉腰板のみに使用可`,
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

export default {
  data() {
    return {
      listData,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
      },
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" },
      ],
    };
  },
};
</script>
<style></style>
