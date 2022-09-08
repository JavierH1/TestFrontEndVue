<template>
  <div class="documentos">
    <!-- Modal de documento -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ titulo }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="nombre">Detalle</label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Detalle del documento"
                      v-model="nuevodocumentos.detalle"
                    />
                  </div>
                </div>

                <!-- Input de archivo -->
                <div v-if="btnCrear" class="form-group">
                  <label for="emailuser">Archivo</label>
                  <input
                    type="file"
                    accept=".pdf"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="xxxxx@xxx.xxx"
                    @change="selectFile"
                  />
                  <br />
                  <p>Progreso de subida</p>
                  <progress max="100" :value="progress"></progress
                  ><span>{{ progress }}%</span>
                </div>
                <div v-if="btnEdit" class="form-group">
                  <label for="emailuser">Archivo</label>
                  <button
                    v-if="btnEdit"
                    class="btn btn-primary form-control"
                    @click="abrir()"
                  >
                    Abrir
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="uploadFile"
                v-if="btnCrear"
              >
                Agregar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="editarDocumentos"
                v-if="btnEdit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Cuadro de vista de archivos -->
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h1 class="display-4 text-center">Administración de Documentos</h1>
            <hr />
            <div class="row">
              <div class="col" style="margin-top: 10px">
                <h5>Página: {{ paginaIndex }}</h5>
              </div>
              <div align="right" class="col">
                <p align="right">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="abrirModalCrear"
                  >
                    Nuevo Documento
                  </button>
                </p>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Detalle</th>

                  <th>Fecha</th>
                  <th style="text-align: center">Opciones</th>
                </tr>
              </thead>

              <tbody>
                <!-- Tabla de documentos creados -->
                <tr v-for="documentos in listDocumentos" :key="documentos.id">
                  <th>
                    {{ documentos.id }}
                  </th>
                  <th>
                    {{ documentos.detalle }}
                  </th>

                  <!-- Fecha en formato AAAA/MM/DD -->
                  <th>
                    {{ getDate(documentos.fecha) }}
                  </th>
                  <th style="text-align: center">
                    <class class="col">
                      <!-- Abre el modal de Ver/Editar en formato de editar -->
                      <span
                        class="cursor"
                        v-on:click.prevent="abrirModalEdit(documentos)"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i class="fas fa-user-edit"></i>
                      </span>

                      <span
                        class="text-danger cursor"
                        v-on:click="
                          eliminarDocumentos(documentos.id, documentos.nombre)
                        "
                      >
                        <i class="fas fa-trash"></i>
                      </span>
                    </class>
                  </th>
                </tr>
              </tbody>
            </table>

            <!-- Boton de paginado -->
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a
                    v-on:click="backPage"
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                <li
                  v-for="pagina in totalPaginado()"
                  :key="pagina"
                  v-on:click="getDataPagina(pagina)"
                  class="page-item"
                >
                  <a class="page-link" href="#">{{ pagina }}</a>
                </li>

                <li class="page-item">
                  <a
                    v-on:click="nextPage"
                    class="page-link"
                    href="#"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
import { required } from "@vuelidate/validators";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export default {
  // Nombre de clase
  name: "DocumentosIndex",

  /**
   * Atrbutos de documento
   */
  data() {
    return {
      selectedFile: null,
      progress: 0,
      nuevodocumentos: {
        id: "",
        nombre: "",
        archivo: "",
        detalle: "",
        procesos: "",
        empresaId: "",
      }, //Clase de documento y atributos
      todos: false,

      listDocumentos: [], //Documento de la tabla
      titulo: "",
      btnCrear: false,
      btnEdit: false,

      paginaIndex: 1,
      listPaginado: [], //Documento presentados en el momento
    };
  },

  methods: {
    /**
     * Abre una pestaña con el documento
     */
    abrir() {
      window.open(this.nuevodocumentos.archivo, "_blank");
    },

    /**
     * Selecciona el archivo, y lo almacena localmente
     */
    selectFile(event) {
      this.progress = 0;
      console.log(event.target.files);
      this.selectedFile = event.target.files;
      for (var i = 0; i < this.selectedFile.length; i++) {
        this.selectedFile[i].progress = 0;
      }
    },

    /**
     * Sube el archivo a firebase y lo almacena en la base de datos
     * de backend con sus atributos
     */
    uploadFile() {
      const storage = getStorage();
      var nombre = this.selectedFile[0].name;

      nombre = nombre.slice(0, -4);
      const numero = Math.floor(Math.random() * 100000);
      nombre = "Documento/" + nombre + numero + ".pdf";

      try {
        var cont = 0;
        this.totalBytes = 0;
        this.totalTranfer = 0;

        for (var i = 0; i < this.selectedFile.length; i++) {
          const storageRef = ref(storage, nombre);
          this.totalBytes += this.selectedFile[i].size;
          const uploadTask = uploadBytesResumable(
            storageRef,
            this.selectedFile[i]
          );
          uploadTask.on("state_changed", (snapshot) => {
            this.progress = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            //Obtiene el link del archivo
            snapshot.task.then((res) => {
              getDownloadURL(ref(storage, nombre))
                .then((url) => {
                  this.nuevodocumentos.id = 0;
                  this.nuevodocumentos.empresaId = this.$route.params.id;
                  this.nuevodocumentos.archivo = url.toString();
                  this.nuevodocumentos.nombre = nombre;
                  if (cont == 0) {
                    cont++;

                    // Sube los datos al backend
                    axios
                      .post(
                        "http://localhost:58613/api/Documento",
                        this.nuevodocumentos
                      )
                      .then((result) => {
                        console.log(result);
                        var prueba = result.data;
                        alert(prueba.message);
                        this.obtenerDocumentos();
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                    console.log(url);
                  }
                })

                .catch((error) => {
                  // Handle any errors
                });

              console.log(res + "Archivo Subido");
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    ...mapActions(["redirectTo"]),

    /**
     * Abre el modal de edit, con los atributos del documento seleccionado
     */
    abrirModalEdit: function (documentos) {
      this.nuevodocumentos = {
        id: documentos.id,
        nombre: documentos.nombre,
        archivo: documentos.archivo,
        detalle: documentos.detalle,
        procesos: documentos.procesos,
        fecha: documentos.fecha,
        empresaId: documentos.empresaId,
      };
      this.titulo = "Actualizar Documentos";
      this.btnCrear = false;
      this.btnEdit = true;
    },

    /**
     * Transforma la fecha recibida al formato establecido
     */
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    /**
     * Verifia si el tipo de usuario es permitido
     */
    tipoVerificacion(consulta) {
      if (consulta == sessionStorage.getItem("tipo")) {
        return true;
      }
      return false;
    },

    /**
     * Obtiene los documentos de la base de datos
     */
    obtenerDocumentos() {
      axios
        .get("http://localhost:58613/api/Documento/" + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.listPaginado = response.data;
          this.getDataPagina(this.paginaIndex);
        });
    },

    /**
     * Elimina un doccumento de firebase y de la base de datos
     */
    eliminarDocumentos(id, nombre) {
      const storage = getStorage();
      let text = "¿Esta seguro de eliminar este documento?";
      if (confirm(text) == true) {
        axios
          .delete("http://localhost:58613/api/Documento/" + id)
          .then((response) => {
            console.log(response);
            this.obtenerDocumentos();
            const desertRef = ref(storage, nombre);
            deleteObject(desertRef)
              .then(() => {
                console.log(desertRef);
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }
    },

    /**
     * Obtiene la pagina siguiente
     */
    nextPage() {
      if (this.totalPaginado() != this.paginaIndex) {
        this.paginaIndex++;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Obtiene la pagina anterior
     */
    backPage() {
      if (this.paginaIndex != 1) {
        this.paginaIndex--;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Devuelve la cantidad de paginas totales por cada 10
     * documento
     */
    totalPaginado() {
      return Math.ceil(this.listPaginado.length / 10);
    },
    getDataPagina(noPagina) {
      this.listDocumentos = [];
      this.paginaIndex = noPagina;
      let ini = noPagina * 10 - 10;
      let fin = noPagina * 10;
      for (let index = ini; index < fin; index++) {
        if (this.listPaginado[index] == null) {
          break;
        }
        this.listDocumentos.push(this.listPaginado[index]);
      }
    },

    /**
     * Edita el documento del modal edit
     */
    editarDocumentos() {
      let text = "Esta seguro de editar el documentos.";
      if (confirm(text) == true) {
        axios
          .put(
            "http://localhost:58613/api/Documento/" + this.nuevodocumentos.id,
            this.nuevodocumentos
          )
          .then((result) => {
            console.log(result);
            this.obtenerDocumentos();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    /**
     * Abre el modal btnCrear y se limpia las variables
     */
    abrirModalCrear() {
      this.titulo = "Nuevo Documento";
      this.btnCrear = true;
      this.btnEdit = false;

      //Limpia nuevodocumentos
      this.nuevodocumentos = {
        id: "",
        nombre: "",
        archivo: "",
        detalle: "",
        procesos: "",

        empresaId: "",
      };
      selectedFile = null;
    },
  },

  /**
   * Funcion que se ejecuta al iniciar la vista
   */
  created: function () {
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
    if (this.$route.params.id == "0") {
      this.todos = true;
    }
    this.obtenerDocumentos();
    this.totalPaginado();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>