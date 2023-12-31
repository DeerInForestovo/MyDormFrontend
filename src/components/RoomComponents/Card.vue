
<!--<script setup>-->
<!--const name = 'Card';-->
<!--const props = {-->
<!--  card: {-->
<!--    type: Object,-->
<!--    required: true-->
<!--  }-->
<!--};-->
<!--</script>-->
<script setup>
</script>
<script>
export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      id: Number,
      title: String,
      content: String,
      required: true,
    },
  },
  methods: {
    emitCardInfo() {
      // 触发自定义事件 'card-clicked'，并传递 card 对象作为参数
      this.$emit('card-clicked', this.id);
    },
  },
};
</script>
<template>
  <div class="card">
    <div class="header">
      <!--      <h2 class="title">{{ card.title }}</h2>-->
    </div>
    <div class="info">
      <h2 class="title">{{ card.title }}</h2>
      <p>{{ card.content }}</p>
    </div>
    <div class="footer">
      <p class="tag">See more info. </p>
      <button type="button" class="action" @click="emitCardInfo">Go</button>
    </div>
  </div>
</template>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.75rem;
  width: 300px;
  height: 300px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,.1),
  0 2px 4px -2px rgba(0,0,0,.1);
}

.header {
  position: relative;
  background-clip: border-box;
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.75rem;
  background-color: rgb(33 150 243);
  box-shadow: 0 10px 15px -3px rgba(33,150,243,.4),0 4px 6px -4px rgba(33,150,243,.4);
  height: 5rem;
}

.info {
  border: none;
  padding: 1.5rem;
  text-align: center;
}

.title {
  letter-spacing: 0;
  line-height: 1.375;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.footer {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 140, 255, 0.082);
}

.tag {
  font-weight: 300;
  font-size: .75rem;
  display: block;
}

.action {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: none;
  outline: none;
  box-shadow: 0 4px 6px -1px rgba(33,150,243,.4),0 2px 4px -2px rgba(33,150,243,.4);
  color: rgb(255 255 255);
  text-transform: uppercase;
  font-weight: 700;
  font-size: .75rem;
  padding: 0.75rem 1.5rem;
  background-color: rgb(33 150 243);
  border-radius: 0.5rem;
}
</style>