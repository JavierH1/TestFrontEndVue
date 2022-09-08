<template>
  <div class="diagnostico">

    <!-- Modal de diagnostico -->
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
                    <label for="marketing">Marketing</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevodiagnostico.marketing"
                      @change="onChange($event)"
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
                    <label for="nombre">Planificación de recursos</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevodiagnostico.planificacionDeRecursos"
                      @change="onChange($event)"
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
                    <label for="emailuser">Procesos</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevodiagnostico.procesos"
                      @change="onChange($event)"
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
                    <label for="nombre">Gestión y planificación</label>
                    <select
                      id="ciudademp"
                      class="form-control"
                      v-model="nuevodiagnostico.gestionYPlanificacion"
                      @change="onChange($event)"
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
                    <label for="emailuser">Nivel General</label>
                    <input
                      id="ciudademp"
                      class="form-control"
                      v-model="estadoFinal"
                      readonly
                      type="text"
                    />
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
                @click.prevent="editarDiagnostico"
                v-if="btnEdit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Vista principal de diagnostico -->
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h1 class="display-4 text-center">
              Administración de Diagnósticos
            </h1>
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
                      Nuevo Diagnóstico
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nota</th>
                  <th>Id de empresa</th>
                  <th>Fecha</th>
                  <th style="text-align: center">Opciones</th>
                </tr>
              </thead>

              <tbody>
                <!-- Tabla de diagnostico -->
                <tr
                  v-for="diagnostico in listDiagnostico"
                  :key="diagnostico.id"
                >
                  <th>
                    {{ diagnostico.id }}
                  </th>
                  <th>
                    {{ diagnostico.nota }}
                  </th>
                  <th>
                    {{ diagnostico.empresaId }}
                  </th>
                  <th>
                    {{ getDate(diagnostico.fecha) }}
                  </th>
                  <th style="text-align: center">
                    <class class="col">
                      <span
                        class="cursor"
                        v-on:click.prevent="abrirModalEdit(diagnostico)"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i class="fas fa-user-edit"></i>
                      </span>

                      <span
                        v-if="tipoVerificacion('Administrador')"
                        class="text-danger cursor"
                        v-on:click="
                          eliminarDiagnostico(diagnostico.id, diagnostico.excel)
                        "
                      >
                        <i class="fas fa-trash"></i>
                      </span>
                    </class>
                  </th>
                </tr>
              </tbody>
            </table>
            
            <!-- Botones de paginado -->
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
  // Nombre de la clase diagnostico
  name: "DiagnosticoIndex",
  
  /**
   * Atributo de diagnostico
   */
  data() {
    return {
      selectedFile: null,
      progress: 0,
      nuevodiagnostico: {
        id: "",
        nivelGeneral: 0,
        marketing: 0,
        planificacionDeRecursos: 0,
        procesos: "",
        gestionYPlanificacion: 0,
        nota: 0,
        excel: "",
        empresaId: "",
      },
      todos: false,
      listDiagnostico: [],
      titulo: "",
      btnCrear: false,
      btnEdit: false,

      paginaIndex: 1,
      listPaginado: [],
      estadoFinal: "",
    };
  },

  methods: {

    /**
     * Calcula la nota del nivel general y asigna su nivel por, inicial, novato
     * competentem avanzado y experto
     */
    onChange(event) {
      this.nuevodiagnostico.nivelGeneral =
        (parseInt(this.nuevodiagnostico.marketing) +
          parseInt(this.nuevodiagnostico.planificacionDeRecursos) +
          parseInt(this.nuevodiagnostico.procesos) +
          parseInt(this.nuevodiagnostico.gestionYPlanificacion)) /
        4;
      if (this.nuevodiagnostico.nivelGeneral < 2) {
        this.estadoFinal = this.nuevodiagnostico.nivelGeneral + " - Inicial";
      } else if (this.nuevodiagnostico.nivelGeneral < 3) {
        this.estadoFinal = this.nuevodiagnostico.nivelGeneral + " - Novato";
      } else if (this.nuevodiagnostico.nivelGeneral < 4) {
        this.estadoFinal = this.nuevodiagnostico.nivelGeneral + " - Competente";
      } else if (this.nuevodiagnostico.nivelGeneral < 5) {
        this.estadoFinal = this.nuevodiagnostico.nivelGeneral + " - Avanzado";
      } else {
        this.estadoFinal = this.nuevodiagnostico.nivelGeneral + " - Experto";
      }
    },

    /**
     * Abre el archivo del diagnostico
     */
    abrir() {
      window.open(this.nuevodiagnostico.excel, "_blank");
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
     * Sube el archivo a firebase y los guarda en el backend
     */
    uploadFile() {
      const storage = getStorage();
      var nombre = this.selectedFile[0].name;

      nombre = nombre.slice(0, -4);
      const numero = Math.floor(Math.random() * 100000);
      nombre = "Diagnosticos/" + nombre + numero + ".pdf";

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
            snapshot.task.then((res) => {
              getDownloadURL(ref(storage, nombre))
                .then((url) => {
                  this.nuevodiagnostico.id = 0;
                  this.nuevodiagnostico.empresaId = this.$route.params.id;
                  this.nuevodiagnostico.excel = url.toString();

                  if (cont == 0) {
                    cont++;
                    axios
                      .post(
                        "http://localhost:58613/api/Diagnostico",
                        this.nuevodiagnostico
                      )
                      .then((result) => {
                        console.log(result);
                        var prueba = result.data;
                        alert(prueba.message);
                        this.obtenerDiagnostico();
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
     * Abre el modal de editar con los datos de un diagnostico
     */
    abrirModalEdit: function (diagnostico) {
      this.nuevodiagnostico = {
        id: diagnostico.id,
        nivelGeneral: diagnostico.nivelGeneral,
        marketing: diagnostico.marketing,
        planificacionDeRecursos: diagnostico.planificacionDeRecursos,
        procesos: diagnostico.procesos,
        gestionYPlanificacion: diagnostico.gestionYPlanificacion,
        nota: diagnostico.nota,
        empresaId: diagnostico.empresaId,
        fecha: diagnostico.fecha,
        excel: diagnostico.excel,
      };
      this.onChange("d");
      this.titulo = "Actualizar Diagnóstico";
      this.btnCrear = false;
      this.btnEdit = true;
    },

    /**
     * Devuelve la fecha en el formato establecido en AAAA/MM/DD
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
     * Obtiene los diagnostico de la base de datos
     */
    obtenerDiagnostico() {
      axios
        .get("http://localhost:58613/api/Diagnostico/" + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.listPaginado = response.data;
          this.getDataPagina(this.paginaIndex);
        });
    },

    /**
     * Elimina un diagnostico por id
     */
    eliminarDiagnostico(id, nombre) {
      const storage = getStorage();
      var separador = "/o/Diagnosticos%2F";
      var sep = nombre.split(separador);
      separador = ".pdf";
      var final = sep[1].split(separador);
      final = "Diagnosticos/" + final[0] + ".pdf";

      let text = "¿Está seguro de eliminar este diagnóstico?";
      if (confirm(text) == true) {
        axios
          .delete("http://localhost:58613/api/Diagnostico/" + id)
          .then((response) => {
            console.log(response);
            this.obtenerDiagnostico();
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
     * Obtiene los diagnostico del paginado siguiente
     */
    nextPage() {
      if (this.totalPaginado() != this.paginaIndex) {
        this.paginaIndex++;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Obtiene los diagnostico del paginado anterior
     */
    backPage() {
      if (this.paginaIndex != 1) {
        this.paginaIndex--;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Retorna la cantidad de paginas por cada 10 diagnosticos
     */
    totalPaginado() {
      return Math.ceil(this.listPaginado.length / 10);
    },

    /**
     * Cambia la lista de diagnostico por la pagina asignada
     */
    getDataPagina(noPagina) {
      this.listDiagnostico = [];
      this.paginaIndex = noPagina;
      let ini = noPagina * 10 - 10;
      let fin = noPagina * 10;
      for (let index = ini; index < fin; index++) {
        if (this.listPaginado[index] == null) {
          break;
        }
        this.listDiagnostico.push(this.listPaginado[index]);
      }
    },

    /**
     * Edita un diagnostico 
     */
    editarDiagnostico() {
      let text = "¿Está seguro de editar el diagnóstico?.";
      if (confirm(text) == true) {
        axios
          .put(
            "http://localhost:58613/api/Diagnostico/" +
              this.nuevodiagnostico.id,
            this.nuevodiagnostico
          )
          .then((result) => {
            console.log(result);
            this.obtenerDiagnostico();
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
      this.titulo = "Nuevo Diagnóstico";
      this.btnCrear = true;
      this.btnEdit = false;

      this.nuevodiagnostico = {
        id: "",
        nivelGeneral: 1,
        marketing: 1,
        planificacionDeRecursos: 1,
        procesos: 1,
        gestionYPlanificacion: 1,
        nota: 1,
        empresaId: "",
      };
      this.estadoFinal = this.nuevodiagnostico.nota + " - Inicial";
      this.selectedFile = null;
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
    this.obtenerDiagnostico();
    this.totalPaginado();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>