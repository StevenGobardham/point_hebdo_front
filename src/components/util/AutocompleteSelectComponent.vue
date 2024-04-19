<template>
  <div class="autocomplete-select">
    <input
        v-model="search"
        @input="onChange"
        type="text"
    />
    <ul
        v-show="isOpen"
        class="autocomplete-results"
    >
      <li
          v-for="(result, i) in results"
          :key="i"
          @click="setResult(result)"
          class="autocomplete-result"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AutocompleteSelect',
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
    };
  },
  methods: {
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
    filterResults() {
      // Replace this with your own filtering logic
      this.results = this.items.filter(item => item.toLowerCase().includes(this.search.toLowerCase()));
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit('input', result);
    }
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.autocomplete-select {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  border-top: none;
  list-style: none;
  text-align: left;
  width: 100%;
  z-index: 999;
}

.autocomplete-result {
  padding: 4px 2px;
  cursor: pointer;
  background-color: #ffffff;
}

.autocomplete-result:hover {
  background-color: #4AAE9B;
  color: white;
}
</style>