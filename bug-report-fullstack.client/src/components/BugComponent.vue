<template>
  <div class="row border p-2" :id="'bug' + bugProps.id" :class="[bugProps.closed == true ? 'bg-success' : 'bg-danger']">
    <div class="col-4">
      <router-link class="text-dark" :to="{name:'ActivePage', params:{ bugId: bugProps.id }}">
        <h3>{{ bugProps.title }}</h3>
      </router-link>
    </div>
    <div class="col-3">
      <h3>{{ bugProps.reportedBy }}</h3>
    </div>
    <div class="col-2">
      <h3 v-if="bugProps.closed == true">
        closed
      </h3>
      <h3 v-else>
        open
      </h3>
    </div>
    <div class="col-2">
      <h3>{{ bugProps.createdAt.split('T').splice(0,1).join('') }}</h3>
    </div>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
export default {
  name: 'BugComponent',
  props: ['bugProps'],
  setup(bugProps) {
    // const d = DateTime.toISO(bugProps.createdAt)
    return {
      // d
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
