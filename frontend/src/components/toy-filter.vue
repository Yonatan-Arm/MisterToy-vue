<template>
  <section class="toy-filter">
    <label>
    Search
    <el-input
    class="filter-input"
      v-model="filterBy.name"
      @input="setFilter"
      type="text"
      placeholder="Search toy.."
    />
    </label>
    <label>
      Stock:
      <el-select @change="setFilter" v-model="filterBy.inStock">
        <el-option value="">All</el-option>
        <el-option value="true">In stock</el-option>
        <el-option value="false">Not in stock</el-option>
      </el-select>
    </label>
    <label class="multi-select">
      label:
      <select-filter @ChangeFilter="ChangeFilter"> </select-filter>
       </label>
      <label>
        Sort By:
        <el-select  @change="setFilter" v-model="filterBy.sortBy" filterable placeholder="Select">
          <el-option value="time">Time</el-option>
          <el-option value="name">Name</el-option>
          <el-option value="price">Price</el-option>
        </el-select>
     
    </label>
  </section>
</template>

<script>
import selectFilter from "./multi-select-filter.vue";
export default {
  name: "toy-filter",
  data() {
    return {
      filterBy: {
        name: "",
        inStock: "",
        labels: [],
        sortBy: "",
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("filter", JSON.parse(JSON.stringify(this.filterBy)));
    },
    ChangeFilter(filter) {
      this.filterBy.labels = filter;
      this.$emit("filter", JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
  components: {
    selectFilter,
  },
};
</script>
<style>
.multi-select{
  display: flex;
  flex-wrap: wrap;
  gap:5px;
}


</style>
