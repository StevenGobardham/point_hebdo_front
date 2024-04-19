<template>
  <div class="autocomplete-dropdown">
    <input
        v-model="search"
        @input="onChange"
        type="text"
        placeholder="Collaborateur"
    />
    <button @click="toggleResults" class="dropdown-toggle">
      <i class="fas fa-caret-down"></i>
    </button>
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
//TODO à supprimer une fois les test terminés
export default {
  name: 'AutocompleteSelectComponent',
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
    };
  },
  methods: {
    filterResults() {
      // ...
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
    },
    toggleResults() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style >
.autocomplete-dropdown {
  position: relative;
}

.dropdown-toggle {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
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
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4AAE9B;
  color: white;
}
</style>