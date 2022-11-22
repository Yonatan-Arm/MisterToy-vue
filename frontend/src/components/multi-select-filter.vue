<template>
    <div>
    <el-select
    @change="setFilter"
      v-model="value1"
      multiple
      collapse-tags
      placeholder="Select"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
 
export default {
    data(){
        return{

 value1: [],

options : [
  {
    value: 'On wheels',
    label: 'On wheels',
  },
  {
    value: 'Box game',
    label: 'Box game',
  },
  {
    value: 'Art',
    label: 'Art',
  },
  {
    value: 'Baby',
    label: 'Baby',
  },
  {
    value: 'Doll',
    label: 'Doll',
  },
  {
    value: 'Puzzle',
    label: 'Puzzle',
  },
  {
    value: 'Outdoor',
    label: 'Outdoor',
  },
        
]
    }
},
methods:{
    setFilter() {
        this.$emit('ChangeFilter', JSON.parse(JSON.stringify(this.value1)));
      },
}


}
</script>

<style>

</style>