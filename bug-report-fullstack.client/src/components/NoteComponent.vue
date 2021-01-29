<template>
  <div class="row noteComponent mb-3">
    <div class="col-2">
      <p>{{ noteProps.creatorEmail }}</p>
    </div>
    <div class="col-8">
      <h5>{{ noteProps.content }}</h5>
    </div>
    <div v-if="state.activeBug.closed==false" class="col-1 d-flex justify-content-end">
      <button @click="deleteNote(noteProps.id, noteProps.bugId)" class="btn btn-link btn-sm text-danger">
        Delete
      </button>
    </div>
    <div v-else class="col-1 d-flex justify-content-center">
      <button class="btn btn-link btn-sm text-danger">
        Closed
      </button>
    </div>
    <div class="row">
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
export default {
  name: 'NoteComponent',
  props: ['noteProps'],
  setup() {
    const state = reactive({
      activeBug: {
        closed: computed(() => AppState.activeBug.closed)
      }
    })
    return {
      state,
      deleteNote(noteId, bugId) {
        bugService.deleteNote(noteId, bugId)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
