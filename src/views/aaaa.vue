<!--Modal.vue-->
  
<script>
window._ = require("lodash");
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;
window.axios = require("axios");
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
export default {
  name: "modalView",
  data() {
    return {
      theModal: null,
    };
  },
  methods: {
    cerrar() {
      var myModalEl = document.getElementById("exampleModal");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      
      myModalEl.addEventListener('hidden.bs.modal', function (event) {
        alert("hola");
        
      });

      // window.location.href = window.location.href;
    },
  },
  
};
</script>
<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Launch demo modal
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="cerrar">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
