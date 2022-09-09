<template>
  <div class="chequeo">
    <!-- Modal de chequeo -->
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
                    <label for="nombre">Nivel de madurez</label>
                    <input
                      type="text"
                      class="form-control"
                      id="nombre"
                      placeholder="Nivel de madurez"
                      v-model="nuevochequeo.nivelMadurez"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="emailuser">Cultura y liderazgo</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevochequeo.culturaLiderazgo"
                    >
                      <option v-bind:value="1">1 - Inicial</option>
                      <option v-bind:value="2">2 - Novato</option>
                      <option v-bind:value="3">3 - Competente</option>
                      <option v-bind:value="4">4 - Avanzado</option>
                      <option v-bind:value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="nombre">Estrategia y transformación</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevochequeo.estrategiaTransformacion"
                    >
                      <option v-bind:value="1">1 - Inicial</option>
                      <option v-bind:value="2">2 - Novato</option>
                      <option v-bind:value="3">3 - Competente</option>
                      <option v-bind:value="4">4 - Avanzado</option>
                      <option v-bind:value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="emailuser">Nivel de comunicaciones</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevochequeo.comunicaciones"
                    >
                      <option v-bind:value="1">1 - Inicial</option>
                      <option v-bind:value="2">2 - Novato</option>
                      <option v-bind:value="3">3 - Competente</option>
                      <option v-bind:value="4">4 - Avanzado</option>
                      <option v-bind:value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="nombre">Datos y analítica</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevochequeo.datosYAnalitica"
                    >
                      <option v-bind:value="1">1 - Inicial</option>
                      <option v-bind:value="2">2 - Novato</option>
                      <option v-bind:value="3">3 - Competente</option>
                      <option v-bind:value="4">4 - Avanzado</option>
                      <option v-bind:value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="emailuser">Tecnología y habilidad</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevochequeo.tecnologiaHabilidad"
                    >
                      <option v-bind:value="1">1 - Inicial</option>
                      <option v-bind:value="2">2 - Novato</option>
                      <option v-bind:value="3">3 - Competente</option>
                      <option v-bind:value="4">4 - Avanzado</option>
                      <option v-bind:value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="nombre">Persona y Organización</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevochequeo.personaOrganizacion"
                    >
                      <option v-bind:value="1">1 - Inicial</option>
                      <option v-bind:value="2">2 - Novato</option>
                      <option v-bind:value="3">3 - Competente</option>
                      <option v-bind:value="4">4 - Avanzado</option>
                      <option v-bind:value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="emailuser">Proceso</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevochequeo.proceso"
                    >
                      <option v-bind:value="1">1 - Inicial</option>
                      <option v-bind:value="2">2 - Novato</option>
                      <option v-bind:value="3">3 - Competente</option>
                      <option v-bind:value="4">4 - Avanzado</option>
                      <option v-bind:value="5">5 - Experto</option>
                    </select>
                  </div>
                </div>
              </div>
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
                @click.prevent="editarChequeo"
                v-if="btnEdit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Vista general de chequeo -->
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h1 class="display-4 text-center">Administración de Chequeos</h1>
            <hr />

            <div class="row justify-content-between">
              <div class="col-4">
                <div class="form-group">
                  <h5>Página: {{ paginaIndex }}</h5>
                </div>
              </div>
              <div class="col-2">
                <div class="input-group">
                  <div class="input-group-append">
                    <button
                      v-if="tipoVerificacion('Administrador')"
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      @click="abrirModalCrear"
                    >
                      Nuevo Chequeo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Id de empresa</th>
                  <th>Fecha</th>
                  <th style="text-align: center">Opciones</th>
                </tr>
              </thead>

              <tbody>
                <!-- Tabla de listas de cheque por listChequeo -->
                <tr v-for="chequeo in listChequeo" :key="chequeo.id">
                  <th>
                    {{ chequeo.id }}
                  </th>
                  <th>
                    {{ chequeo.empresaId }}
                  </th>
                  <th>
                    {{ getDate(chequeo.fecha) }}
                  </th>
                  <th style="text-align: center">
                    <class class="col">
                      <span
                        class="cursor"
                        v-on:click.prevent="abrirModalEdit(chequeo)"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i class="fas fa-user-edit"></i>
                      </span>

                      <span
                        v-if="tipoVerificacion('Administrador')"
                        class="text-danger cursor"
                        v-on:click="eliminarChequeo(chequeo.id, chequeo.excel)"
                      >
                        <i class="fas fa-trash"></i>
                      </span>
                    </class>
                  </th>
                </tr>
              </tbody>
            </table>

            <!-- Paginado de cequeo -->
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

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default {
  // Nombre de la clase
  name: "ChequeoIndex",

  /**
   * Atributos de chequeo
   */
  data() {
    return {
      selectedFile: null,
      progress: 0,
      nuevochequeo: {
        id: "",
        nivelMadurez: "",
        culturaLiderazgo: 1,
        estrategiaTransformacion: 1,
        comunicaciones: 1,
        datosYAnalitica: 1,
        tecnologiaHabilidad: 1,
        personaOrganizacion: 1,
        proceso: 1,
        empresaId: "",
        excel: "",
      },
      todos: false,
      listChequeo: [],
      titulo: "",
      btnCrear: false,
      btnEdit: false,
      paginaIndex: 1,
      listPaginado: [],
    };
  },

  methods: {
    /**
     * Abre una pestaña con el archivo de un chequeo
     */
    abrir() {
      window.open(this.nuevochequeo.excel, "_blank");
    },

    /**
     * Guarda el archivo adjunto en la instancia de la vista
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
     * Sube el archivo a la firebase y almacena los datos en
     * el backend
     */
    uploadFile() {
      const storage = getStorage();
      var nombre = this.selectedFile[0].name;
      nombre = nombre.slice(0, -4);
      const numero = Math.floor(Math.random() * 100000);
      nombre = "Chequeos/" + nombre + numero + ".pdf";
      try {
        var cont = 0;
        this.totalBytes = 0;
        this.totalTranfer = 0;

        for (var i = 0; i < this.selectedFile.length; i++) {
          console.log("el tipos es" + this.selectedFile[i] + nombre);
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
            // Obtiene el link de descarga del archivo subido
            snapshot.task.then((res) => {
              getDownloadURL(ref(storage, nombre))
                .then((url) => {
                  this.nuevochequeo.id = 0;
                  this.nuevochequeo.empresaId = this.$route.params.id;
                  this.nuevochequeo.excel = url.toString();
                  cont++;
                  if (cont == 1) {
                    axios
                      .post(
                        "http://localhost:58613/api/Chequeo",
                        this.nuevochequeo
                      )
                      .then((result) => {
                        console.log(result);
                        var prueba = result.data;
                        alert(prueba.message);
                        this.obtenerChequeo();
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                    console.log(url);
                  }
                })

                .catch((error) => {
                  console.log(error);
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
     * Abre el modal de edit con los datos de un chequeo
     */
    abrirModalEdit: function (chequeo) {
      this.nuevochequeo = {
        id: chequeo.id,
        nivelMadurez: chequeo.nivelMadurez,
        culturaLiderazgo: chequeo.culturaLiderazgo,
        estrategiaTransformacion: chequeo.estrategiaTransformacion,
        comunicaciones: chequeo.comunicaciones,
        datosYAnalitica: chequeo.datosYAnalitica,
        tecnologiaHabilidad: chequeo.tecnologiaHabilidad,
        personaOrganizacion: chequeo.personaOrganizacion,
        proceso: chequeo.proceso,
        empresaId: chequeo.empresaId,
        excel: chequeo.excel,
      };
      this.titulo = "Actualizar Chequeo";
      this.btnCrear = false;
      this.btnEdit = true;
    },

    /**
     * Devuelve la fecha con el formato establecido en AAAA/MM/DD
     */
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      return date;
    },

    /**
     * Verifica el tipo de usuario
     */
    tipoVerificacion(consulta) {
      if (consulta == sessionStorage.getItem("tipo")) {
        return true;
      }
      return false;
    },

    /**
     * Obtiene los chequeo por EmpresaId
     */
    obtenerChequeo() {
      axios
        .get("http://localhost:58613/api/Chequeo/" + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.listPaginado = response.data;
          this.getDataPagina(this.paginaIndex);
        });
    },

    /**
     * Elimina un chequeo por id y su archivo en firebase
     */
    eliminarChequeo(id, nombre) {
      const storage = getStorage();
      var separador = "/o/Chequeos%2F";
      var sep = nombre.split(separador);

      separador = ".pdf";
      var final = sep[1].split(separador);

      final = "Chequeos/" + final[0] + ".pdf";

      let text = "¿Está seguro de eliminar este chequeo?";
      if (confirm(text) == true) {
        axios
          .delete("http://localhost:58613/api/Chequeo/" + id)
          .then((response) => {
            console.log(response);
            this.obtenerChequeo();
            const desertRef = ref(storage, final);
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
     * Obtiene los chequeo del paginado siguiente
     */
    nextPage() {
      if (this.totalPaginado() != this.paginaIndex) {
        this.paginaIndex++;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Obtiene los chequeo del paginado anterior
     */
    backPage() {
      if (this.paginaIndex != 1) {
        this.paginaIndex--;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Obtiene la cantidad de pagina por cada 10 chequeo
     */
    totalPaginado() {
      return Math.ceil(this.listPaginado.length / 10);
    },

    /**
     * Obtiene los datos de la pagina
     */
    getDataPagina(noPagina) {
      this.listChequeo = [];
      this.paginaIndex = noPagina;
      let ini = noPagina * 10 - 10;
      let fin = noPagina * 10;
      for (let index = ini; index < fin; index++) {
        if (this.listPaginado[index] == null) {
          break;
        }
        this.listChequeo.push(this.listPaginado[index]);
      }
    },

    /**
     * Edita un chequeo
     */
    editarChequeo() {
      let text = "¿Está seguro de editar el chequeo?.";
      if (confirm(text) == true) {
        axios
          .put(
            "http://localhost:58613/api/Chequeo/" + this.nuevochequeo.id,
            this.nuevochequeo
          )
          .then((result) => {
            console.log(result);
            this.obtenerChequeo();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    /**
     * Abre el modal crear
     */
    abrirModalCrear() {
      this.titulo = "Nuevo Chequeo";
      this.btnCrear = true;
      this.btnEdit = false;

      this.nuevochequeo = {
        id: "",
        nivelMadurez: "",
        culturaLiderazgo: 1,
        estrategiaTransformacion: 1,
        comunicaciones: 1,
        datosYAnalitica: 1,
        tecnologiaHabilidad: 1,
        personaOrganizacion: 1,
        proceso: 1,
        empresaId: "",
        excel: "",
      };
    },
  },
  
  /**
   * Metodo que se ejecuta al iniciar la vista
   */
  created: function () {
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
    if (this.$route.params.id == "0") {
      this.todos = true;
    }
    this.obtenerChequeo();
    this.totalPaginado();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>