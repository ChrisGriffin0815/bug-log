<template>
  <div class="home container-fluid">
    <div class="mt-5 row text-center">
      <div class="col-12">
        <b class="text-lg">BUG LOG</b>
      </div>
    </div>
    <div class="row mb-5
      justify-content-center"
    >
      <div class="col-4 d-flex align-content-center justify-content-end mt-4 mb-4">
        <button data-target="#model2" data-toggle="modal" type="button" class="btn btn-block btn-success btn-lg">
          Create New Ticket
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div class="row">
      <div class="col-8 card offset-2">
        <form action="" @submit.prevent="createNewBug(state.newBug)">
          <div class="modal fade p-5 mt-3"
               id="model2"
               tabindex="-1"
               role="dialog"
               aria-labelledby="modelTitleId"
               aria-hidden="true"
          >
            <div class="row m-1">
              <div class="col-6">
                <input type="text"
                       name=""
                       id=""
                       class="form-control radius-10 shadow"
                       placeholder="Your Name Here"
                       v-model="state.newBug.reportedBy"
                >
              </div>
              <div class="col-6">
                <input type="text"
                       name=""
                       id=""
                       class="form-control radius-10 shadow"
                       placeholder="Report Title"
                       v-model="state.newBug.title"
                >
              </div>
            </div>
            <div class="row mt-3 justify-content-center p-3">
              <div class="col-12">
                <textarea name=""
                          class="form-control radius-10 shadow"
                          id=""
                          cols="180"
                          rows="3"
                          placeholder="Description"
                          v-model="state.newBug.description"
                >
            </textarea>
              </div>
            </div>
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="container-fluid row justify-content-evenly">
                    <div class="col-6">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">
                        Cancel
                      </button>
                    </div>
                    <div class="col-6 d-flex justify-content-end">
                      <button type="submit" class="btn btn-success" data-toggle="modal" data-target="#model2">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-4 ml-1">
        <h5>Title:</h5>
      </div>
      <div class="col-3">
        <h5>Reported By:</h5>
      </div>
      <div class="col-2">
        <h5>Status:</h5>
      </div>
      <div class="col-2">
        <h5>Date:</h5>
      </div>
    </div>
    <BugComponent v-for="b in bugs" :key="b.id" :bug-props="b" />
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import BugComponent from '../components/BugComponent'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      bugs: computed(() => AppState.bugs),

      createNewBug(newBug) {
        bugService.createBug(state.newBug)
      }
    }
  },
  components: { BugComponent }
}
</script>

<style scoped lang="scss">
.text-lg {
  font-size: 150px;
}

</style>
