<template>
  <div>
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <div class="input-group">
              <div class="input-group-append">
                <h1>Documentos de asistencias</h1>

                <!-- Se adjunta el archivo -->
                <input type="file" accept=".pdf" @change="selectFile" />
                <button class="btn btn-primary" @click="uploadFile()">
                  Subir Archivo
                </button>
                <br />
                <p>Progreso de subida</p>
                
                <progress max="100" :value="progress"></progress
                ><span>{{ progress }}%</span>
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="(file, index) in selectedFile"
                    :key="file + index"
                  >
                    {{ file.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export default {
  name: "UploadFile",
  data() {
    return {
      selectedFile: null,
      progress: 0,
    };
  },

  methods: {
    selectFile(event) {
      this.progress = 0;
      console.log(event.target.files);
      this.selectedFile = event.target.files;
      //console.log(this.selectedFile);
      for (var i = 0; i < this.selectedFile.length; i++) {
        this.selectedFile[i].progress = 0;
      }
    },
    uploadFile() {
      try {
        this.totalBytes = 0;
        this.totalTranfer = 0;
        const storage = getStorage();
        for (var i = 0; i < this.selectedFile.length; i++) {
          console.log(
            "el tipos es" + this.selectedFile[i] + this.selectedFile[i].name
          );
          const storageRef = ref(
            storage,
            "Asistencias/" + this.selectedFile[i].name
          );
          this.totalBytes += this.selectedFile[i].size;
          const uploadTask = uploadBytesResumable(
            storageRef,
            this.selectedFile[i]
          );
          uploadTask.on("state_changed", (snapshot) => {
            this.progress = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            snapshot.task.then((res) => {
              console.log(res + "Archivo Subido");
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>