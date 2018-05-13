<template>
  <div class="home-page-wrapper">
    <h1>Domain Scraper</h1>

    <div class="input-container">
      <label for="domain">Domain</label>
      <input type="text" name="domain" v-model="domain">
    </div>
    <div class="pattern-container">
      <h3>{{ pattern }}</h3>
      <button @click="pattern += 'V'">V</button>
      <button @click="pattern += 'C'">C</button>
      <button class="warning" @click="pattern = ''">Clear</button>
    </div>

    <div class="place-container">
      <h3>{{ place }}</h3>
      <button @click="place = 'end'">End</button>
      <button @click="place = 'start'">Start</button>
    </div>

    <div class="number-container">
      <div class="input-container">
        <label for="numOfDomains">Number</label>
        <input type="number" name="numOfDomains" v-model="numOfDomains">
      </div>
    </div>

    <button
      @click="testShit"
      class="test">
      Check Domains
    </button>

    <div class="results" v-if="!loading">
      <div class="domain" v-for="(domain, key) in domains" :key="key">
        <p>{{ domain.name }}</p>
        <p>Status: {{ domain.status }}</p>
      </div>
    </div>
    <div class="loading" v-if="loading">
      LOADING...
    </div>
  </div>
</template>

<script>
import { api } from 'services/api'

export default {
  data () {
    return {
      domain: '',
      domains: [],
      loading: false,
      pattern: '',
      place: 'end',
      numOfDomains: 1
    }
  },
  methods: {
    async testShit () {
      this.loading = true
      const response = await api('post', 'Scrape/Test', {
        domain: this.domain,
        pattern: this.pattern.toLowerCase().split(''),
        place: this.place,
        num: this.numOfDomains
      })

      this.domains = response.data
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-page-wrapper {
  }

  .input-container {
    margin: 10px;
    width: 340px;

    input {
      width: 100%;
      height: 50px;
      font-size: 20px;
    }
  }

  .domain {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 1.5rem;
      margin: 5px 10px;
    }
  }
</style>
