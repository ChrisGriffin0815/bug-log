<template>
  <div class="activePage container-fluid">
    <!-- <transition-group name="fade"> -->
    <div class="row">
      <div class="col-6">
        <button class="btn btn-link text-dark">
          Previous
        </button>
      </div>
      <div class="col-6">
        <button class="btn btn-link text-dark">
          Next
        </button>
      </div>
      <div class="col-6"></div>
    </div>
    <div class="row justify-content-between mt-1">
      <div class="col-5 ">
        <p>
          created on: {{ activeBug.createdAt }}
        </p>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <p>
          created by: {{ activeBug.reportedBy }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p>last updated: {{ activeBug.updatedAt }}</p>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <p>ticket #: {{ activeBug.id }}</p>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <h1 class="ml-3">
        {{ activeBug.title }}
      </h1>
    </div>

    <div class="row justify-content-center">
      <div v-if="activeBug.closed==false" class="d-flex justify-content-center col-12">
        <button type="button" class="mr-1 btn btn-primary" data-toggle="modal" data-target="#model">
          Edit Ticket
        </button>
        <button @click="closeBug(bugId, state.closedBug)" class="ml-2 btn btn-danger">
          Close Ticket
        </button>
      </div>
      <div v-else class="col-12">
        <h1 class="text-danger text-center">
          This Ticket Is Closed
        </h1>
      </div>
    </div>
    <div class="row">
      <!-- Button trigger modal -->

      <!-- Modal -->
      <form action="" @submit.prevent.="createNote()">
        <div class="modal fade"
             id="modelId"
             tabindex="-1"
             role="dialog"
             aria-labelledby="modelTitleId"
             aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h1>{{ activeBug.title }}</h1>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                  <input class="form-control" type="text" placeholder="Comment Here" v-model="state.newComment.content">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button @click="createNote(state.newComment)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modelId">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade"
         id="model"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <form action="" @submit.prevent="editBug()">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ activeBug.title }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <textarea v-model="state.editBug.description" name="" id="" cols="57" rows="10"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button data-toggle="modal" data-target="#model" type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="row mb-5 mt-5 ml-5">
      <div class="col-1 d-flex justify-content-end">
        <h6 class="mt-3">
          description:
        </h6>
      </div>
      <div class="col-10">
        <h3>{{ activeBug.description }}</h3>
      </div>
    </div>
    <div class="row mb-3 border">
      <div class="col-2">
        <h3>User</h3>
      </div>
      <div class="col-8">
        <h3>Message</h3>
      </div>

      <div class="col-2">
        <button :disabled="state.newComment.closed == true" type="button" class="btn btn-success" data-toggle="modal" data-target="#modelId">
          Add Comment
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <NoteComponent v-for="n in notes" :key="n.id" :note-props="n" />
      </div>
    </div>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import NoteComponent from '../components/NoteComponent'
export default {
  name: 'ActivePage',
  setup() {
    const state = reactive({
      editBug: {},
      newComment: {
        bugId: computed(() => AppState.activeBug.id),
        closed: computed(() => AppState.activeBug.closed)
      },
      closedBug: {
        closed: true
      }
    })
    const route = useRoute()
    onMounted(() => {
      bugService.getActiveBug(route.params.bugId)
      bugService.getNotes(route.params.bugId)
      state.editBug = computed(() => AppState.activeBug)
    })
    return {
      state,
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      editBug(id, editBug) {
        bugService.editBug(route.params.bugId, state.editBug)
      },
      createNote(newComment) {
        bugService.createNote(state.newComment)
        this.resetForm()
      },
      getActiveBug(bugId) {
        bugService.getActiveBug(route.params.bugId)
      },
      closeBug(bugId, closedBug) {
        bugService.closeBug(route.params.bugId, closedBug)
      }
    }
  },
  components: { NoteComponent }
}
</script>

<style lang="scss" scoped>

</style>
