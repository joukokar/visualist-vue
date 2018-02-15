<template>
  <div>
    <table>
      <thead>
        <th v-for="key in getAllKeys(data)" :key="key">
          {{key}}
        </th>
      </thead>
      <tbody>
        <tr v-for="(d, i) in data" :key="d.$$index">
          <td v-for="key in getAllKeys(data)" :key="key">
            {{d[key]}}
          </td>
          <td>
            <button @click="removeAt(i)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VstData from '../data/data';

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

    getAllKeys: VstData.getAllKeys,
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
