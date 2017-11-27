<template>
  <table>
    <thead>
      <th>x</th>
      <th>y</th>
      <th>y2</th>
    </thead>
    <tbody>
      <tr v-for="(d, i) in data" :key="d.x">
        <td>
          {{d.x}}
        </td>
        <td>
          {{d.y}}
        </td>
        <td>
          {{d.y2}}
        </td>
        <td>
          <button @click="removeAt(i)">delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'data-table',
  props: ['data'],

  data() {
    return {
      viewType: 'svg',
      xScale: null,
      yScale: null,
      height: 300,
    };
  },

  methods: {
    removeAt(index) {
      this.data.splice(index, 1);
    },
  },

};
</script>

<style lang="scss">
table {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  th {
    text-align: right;
  }
  td {
    min-width: 100px;
    text-align: right;
  }
}
</style>
