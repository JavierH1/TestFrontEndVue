<template>
  <div class="asistencia">
    <!-- Modal de asistencia -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <!-- Titulo adaptativo de Modal -->
            <h5 class="modal-title" id="exampleModalLabel">{{ titulo }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Formulario de asistencia -->
          <form>
            <div class="modal-body">
              <div class="form-group">
                <label for="emailuser">Tipo de Asistencia</label>
                <select
                  v-if="btnCrear"
                  id="ciudademp"
                  class="form-control"
                  v-model="tipo"
                >
                  <option>Seleccionar</option>
                  <option>Externa</option>
                  <option>Propia</option>
                  <option v-bind:value="'MultiNivel'">Multi Nivel</option>
                </select>
                <input
                  v-if="btnEdit"
                  readonly
                  id="ciudademp"
                  class="form-control"
                  v-model="tipo"
                />
              </div>
              <div
                v-if="
                  tipoVerificacion('Externa') ||
                  tipoVerificacion('Propia') ||
                  tipoVerificacion('MultiNivel')
                "
                class="form-group"
              >
                <label for="nombre">Descripción </label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  placeholder="Descripción de la asistencia"
                  v-model="descripcion"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.descripcion.$error"
                >
                  {{ v$.descripcion.$errors[0].$message }}
                </div>
              </div>
              <div
                v-if="
                  tipoVerificacion('Externa') ||
                  tipoVerificacion('Propia') ||
                  tipoVerificacion('MultiNivel')
                "
                class="form-group"
              >
                <label for="nombre">Resultado esperado </label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  placeholder="Resultado esperado de la asistencia"
                  v-model="resultado"
                />
                <div class="body" style="color: red" v-if="v$.resultado.$error">
                  {{ v$.resultado.$errors[0].$message }}
                </div>
              </div>

              <div v-if="tipoVerificacion('Propia')" class="form-group">
                <label for="nombre">Presupuesto del proveedor</label>
                <input
                  type="number"
                  class="form-control"
                  id="nombre"
                  placeholder="Presupuesto asignado a la asistencia"
                  v-model="presupuesto"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.presupuesto.$error"
                >
                  {{ v$.presupuesto.$errors[0].$message }}
                </div>
              </div>

              <div v-if="tipoVerificacion('Propia')" class="form-group">
                <label for="nombre">Trabajo a realizar</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  placeholder="Resumen del trabajo"
                  v-model="trabajo"
                />
                <div class="body" style="color: red" v-if="v$.trabajo.$error">
                  {{ v$.trabajo.$errors[0].$message }}
                </div>
              </div>
              <div v-if="tipoVerificacion('MultiNivel')" class="form-group">
                <label for="nombre">Entidad asignada</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  placeholder="Entidad"
                  v-model="entidad"
                />
                <div class="body" style="color: red" v-if="v$.entidad.$error">
                  {{ v$.entidad.$errors[0].$message }}
                </div>
              </div>
              <div v-if="tipoVerificacion('Externa')" class="form-group">
                <label for="ciudadempr">Proveedor asignado</label>
                <select
                  id="ciudademp"
                  class="form-control"
                  v-model="proveedorAsistencia"
                  @change="onChange($event)"
                  v-if="btnCrear"
                >
                  <option v-bind:value="0">Ninguno</option>
                  <option
                    v-for="proveedor in listProveedor"
                    :key="proveedor.id"
                    v-bind:value="proveedor.id"
                  >
                    {{ proveedor.nombre }}
                  </option>
                </select>
                <select
                  id="ciudademp"
                  class="form-control"
                  v-model="proveedorAsistencia"
                  @change="onChange($event)"
                  v-if="btnEdit"
                >
                  <option
                    v-for="proveedorEspecial in listProveedorEspecial"
                    :key="proveedorEspecial.id"
                    v-bind:value="proveedorEspecial.id"
                  >
                    {{ proveedorEspecial.nombre }}
                  </option>
                </select>
              </div>
              <div
                v-if="esServicio && tipoVerificacion('Externa')"
                class="form-group"
              >
                <label for="ciudadempr">Servicio</label>
                <select
                  id="ciudademp"
                  class="form-control"
                  v-model="proveedorServicio"
                >
                  <option v-bind:value="0">Ninguno</option>
                  <option
                    v-for="servicios in listServicios"
                    :key="servicios.id"
                    v-bind:value="servicios.id"
                  >
                    {{ servicios.descripcion }}-{{ servicios.precio }}
                  </option>
                </select>
              </div>
            </div>
            <div
              v-if="
                tipoVerificacion('Externa') ||
                tipoVerificacion('Propia') ||
                tipoVerificacion('MultiNivel')
              "
              class="modal-footer"
            >
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="agregarAsistencia"
                v-if="btnCrear"
              >
                Agregar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="editarAsistencia"
                v-if="btnEdit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Cuadro de vista de asistencia -->
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h1 class="display-4 text-center">Administración de Asistencia</h1>
            <hr />

            <div class="row">
              <!-- Pagina de asistencia -->
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
                    Nueva Asistencia
                  </button>
                </p>
              </div>
            </div>

            <!-- Tabla de asistencia -->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Tipo de asistencia</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha finalizado</th>
                  <th style="text-align: center">Opciones</th>
                  <th style="text-align: center">Seguimientos</th>
                  <th style="text-align: center">Finalizar</th>
                </tr>
              </thead>

              <tbody>
                <!-- Listado de asistencia de listAsistencia -->
                <tr v-for="asistencia in listAsistencia" :key="asistencia.id">
                  <th>
                    {{ asistencia.id }}
                  </th>
                  <th>
                    {{ asistencia.descripcion }}
                  </th>
                  <th>
                    {{ asistencia.discriminator }}
                  </th>
                  <th>
                    {{ getDate(asistencia.fecha) }}
                  </th>
                  <th>
                    {{ getDate(asistencia.fechaFinalizado) }}
                  </th>

                  <th style="text-align: center">
                    <class class="col">
                      <span
                        class="cursor"
                        v-on:click.prevent="abrirModalEdit(asistencia)"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i class="fas fa-user-edit"></i>
                      </span>

                      <span
                        class="text-danger cursor"
                        v-on:click="eliminarAsistencia(asistencia.id)"
                      >
                        <i class="fas fa-trash"></i>
                      </span>
                    </class>
                  </th>

                  <th style="text-align: center">
                    <class class="col">
                      <span
                        class="cursor"
                        v-on:click="abrirSeguimiento(asistencia.id)"
                      >
                        <i class="fas fa-headset"></i>
                      </span>
                    </class>
                  </th>
                  <th style="text-align: center">
                    <span
                      class="text-danger cursor"
                      v-on:click="finalizado(asistencia.id)"
                    >
                      <i class="far fa-calendar-check"></i>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>

            <!-- Boton de paginado de asistencia -->
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
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  // Nombre de la clas de asistencia
  name: "AsistenciaIndex",

  /**
   * Atributos de asistencia
   */
  data() {
    return {
      tipo: "",
      modal: false,
      v$: useValidate(),
      presupuesto: "",
      descripcion: "",
      esServicio: false,
      proveedorServicio: "",
      resultado: "",
      listAsistencia: [], //Lista desplegada en la tabla
      titulo: "",
      trabajo: "",
      btnCrear: false,
      btnEdit: false,
      proveedorAsistencia: "",
      paginaIndex: 1,
      listPaginado: [], //Lista total de asistencia
      entidad: "",
      listProveedor: [], //Lista de proveedores, se inicializa al abrir una externa
      listServicios: [], // Lista de servicios, se inicializa al seleccionar un proveedor
      listProveedorTodos: [], //Lista con todos los proveedores
      listProveedorEspecial: [], //Lista de proveedores con no vigente
      id: "",
    };
  },

  /**
   * Validaciones de formulario
   */
  validations() {
    return {
      presupuesto: { required },
      descripcion: { required },
      resultado: { required },
      trabajo: { required },
      entidad: { required },
    };
  },

  methods: {
    ...mapActions(["redirectTo"]),

    /**
     * Cambia listServicios al seleccionar un proveedor en una asistencia externa
     */
    onChange(event) {
      if (event.target.value == 0) {
        this.proveedorServicio = 0;
        this.listServicios = "";
        this.descripcion = "";
        this.resultado = "";
        this.presupuesto = 0;
        this.trabajo = "";
        this.entidad = "";
        this.esServicio = false;
      } else {
        axios
          .get("http://localhost:58613/api/Servicios/" + event.target.value)
          .then((response) => {
            console.log(response);
            this.listServicios = response.data;
            this.esServicio = true;
          });
      }
    },

    /**
     * Retorna el formato de fecha en AAAA/MM/DD, para el caso en que
     * la asistencia no esta finalizada retorna 'No finalizado'
     */
    getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      if (date == "0001/01/01") {
        date = "No finalizado";
      }
      return date;
    },

    /**
     * Obtiene la la asistencia por empresaId
     */
    obtenerAsistencia() {
      axios
        .get("http://localhost:58613/api/Asistencia/" + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.listPaginado = response.data;
          this.getDataPagina(this.paginaIndex);
        });
    },

    /**
     * Elimina una asistencia por id
     */
    eliminarAsistencia(id) {
      let text =
        "¿Está seguro de eliminar esta asistencia?. No se eliminara la empresa asociada.";
      if (confirm(text) == true) {
        axios
          .delete("http://localhost:58613/api/Asistencia/" + id)
          .then((response) => {
            console.log(response);
            this.obtenerAsistencia();
          });
      }
    },

    /**
     * Abre la vista de seguimiento de una asistencia
     */
    abrirSeguimiento(id) {
      this.$router.push("/seguimiento/" + id);
    },

    /**
     * Finaliza una empresa con la fecha actual
     */
    finalizado(id) {
      let text = "Esta seguro de finalizar la asistencia.";
      if (confirm(text) == true) {
        axios
          .put("http://localhost:58613/api/Asistencia/" + id)
          .then((response) => {
            console.log(response);
            this.obtenerAsistencia();
          });
      }
    },

    /**
     * Agrega una asistencia por tipo
     */
    agregarAsistencia() {
      // Agrega una asistencia propia
      if (this.tipo == "Propia") {
        (this.entidad = "entidad"), this.v$.$validate();
        if (!this.v$.$error) {
          var propia = {
            trabajo: this.trabajo,
            presupuestoPropia: this.presupuesto,
            descripcion: this.descripcion,
            empresaId: this.$route.params.id,
            resultado: this.resultado,
          };
          axios
            .post("http://localhost:58613/api/Propia", propia)
            .then((result) => {
              console.log(result);
              alert("Asistencia registrada");

              this.obtenerAsistencia();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      // Agrega una asistencia Externa
      else if (this.tipo == "Externa") {
        (this.entidad = "entidad"),
          (this.trabajo = "trabajo"),
          (this.presupuesto = 0);
        this.v$.$validate();
        if (!this.v$.$error) {
          var externa = {
            presupuesto: this.presupuesto,
            descripcion: this.descripcion,
            proveedorId: this.proveedorAsistencia,
            empresaId: this.$route.params.id,
            resultado: this.resultado,
            servicioId: this.proveedorServicio,
          };
          axios
            .post("http://localhost:58613/api/Externa", externa)
            .then((result) => {
              console.log(result);

              alert("Asistencia registrada");
              this.obtenerAsistencia();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      // Agrega una asistencia Multi nivel
      else {
        (this.trabajo = "trabajo"), (this.presupuesto = 0), this.v$.$validate();
        if (!this.v$.$error) {
          var multi = {
            descripcion: this.descripcion,
            empresaId: this.$route.params.id,
            entidad: this.entidad,
            resultado: this.resultado,
          };
          axios
            .post("http://localhost:58613/api/MultiNivel", multi)
            .then((result) => {
              console.log(result);
              alert("Asistencia registrada");

              this.obtenerAsistencia();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    },

    /**
     * Edita una asistencia por su tipo
     */
    async editarAsistencia() {
      // Edita una asistencia propia
      if (this.tipo == "Propia") {
        (this.entidad = "entidad"), this.v$.$validate();
        if (!this.v$.$error) {
          var propia = {
            trabajo: this.trabajo,
            presupuestoPropia: this.presupuesto,
            descripcion: this.descripcion,
            empresaId: this.$route.params.id,
            resultado: this.resultado,
            id: this.id,
          };

          await axios
            .put("http://localhost:58613/api/Propia/" + this.id, propia)
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      // Edita una asistencia externa
      else if (this.tipo == "Externa") {
        (this.entidad = "entidad"),
          (this.trabajo = "trabajo"),
          this.v$.$validate();
        if (!this.v$.$error) {
          var externa = {
            presupuesto: this.presupuesto,
            descripcion: this.descripcion,
            empresaId: this.$route.params.id,
            resultado: this.resultado,
            id: this.id,
            proveedorId: this.proveedorAsistencia,
            servicioId: this.proveedorServicio,
          };
          await axios
            .put("http://localhost:58613/api/Externa/" + this.id, externa)
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      // Edita una asistencia multi nivel
      else if (this.tipo == "MultiNivel") {
        (this.trabajo = "trabajo"), (this.presupuesto = 0), this.v$.$validate();
        if (!this.v$.$error) {
          var multi = {
            descripcion: this.descripcion,
            empresaId: this.$route.params.id,
            resultado: this.resultado,
            id: this.id,
            entidad: this.entidad,
          };
          await axios
            .put("http://localhost:58613/api/MultiNivel/" + this.id, multi)
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    },

    /** 
     * Abre el modal Crear de asistencia
     */
    abrirModalCrear() {
      this.titulo = "Nueva Asistencia";
      this.tipo = "Seleccionar";
      this.btnCrear = true;
      this.btnEdit = false;
      this.resultado = "";
      this.descripcion = "";
      this.presupuesto = "";
      this.proveedorAsistencia = 0;

      this.proveedorServicio = 0;
    },

    /**
     * Abre el modal de editar asistencia
     */
    abrirModalEdit: async function (asistencia) {
      this.id = asistencia.id;
      //Abre el modal de editar asistencia propia
      if (asistencia.discriminator == "Propia") {
        await axios
          .get("http://localhost:58613/api/Propia/" + this.id)
          .then((result) => {
            console.log(result);
            var prueba = result.data[0];
            this.descripcion = prueba.descripcion;
            this.presupuesto = prueba.presupuestoPropia;
            this.trabajo = prueba.trabajo;
            this.tipo = prueba.discriminator;
            this.resultado = prueba.resultado;
            this.esServicio = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // Abre el modal de editar asistencia externa
      if (asistencia.discriminator == "Externa") {
        await axios
          .get("http://localhost:58613/api/Externa/" + asistencia.id)
          .then((result) => {
            console.log(result);
            var prueba = result.data[0];
            this.descripcion = prueba.descripcion;
            this.presupuesto = prueba.presupuesto;
            this.proveedorAsistencia = prueba.proveedorId;
            this.tipo = prueba.discriminator;
            this.resultado = prueba.resultado;
            this.esServicio = true;
            this.listProveedorEspecial = this.listProveedor;

            for (var i = 0; i < this.listProveedorTodos.length; i++) {
              if (this.listProveedorTodos[i].id == this.proveedorAsistencia) {
                this.listProveedorEspecial[this.listProveedorEspecial.length] =
                  this.listProveedorTodos[i];
              }
            }

            axios
              .get("http://localhost:58613/api/Servicios/" + prueba.proveedorId)
              .then((response) => {
                console.log(response);
                this.listServicios = response.data;
                this.proveedorServicio = prueba.servicioId;
              });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // Abre el modal de editar asistencia multi nivel
      if (asistencia.discriminator == "MultiNivel") {
        await axios
          .get("http://localhost:58613/api/MultiNivel/" + asistencia.id)
          .then((result) => {
            console.log(result);
            var prueba = result.data[0];
            this.descripcion = prueba.descripcion;
            this.trabajo = prueba.trabajo;
            this.tipo = prueba.discriminator;
            this.resultado = prueba.resultado;
            this.esServicio = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      this.titulo = "Actualizar Asistencia";
      this.btnCrear = false;
      this.btnEdit = true;
    },
    /** 
     * Obtiene las asistencia del paginado siguiente
     */
    nextPage() {
      if (this.totalPaginado() != this.paginaIndex) {
        this.paginaIndex++;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Obtiene las asistencia del paginado anterior
     */
    backPage() {
      if (this.paginaIndex != 1) {
        this.paginaIndex--;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Obtiene la cantidad de pagina por cada 10 asistencia
     */
    totalPaginado() {
      return Math.ceil(this.listPaginado.length / 10);
    },
    
    /**
     * Obtiene los datos de la pagina 
     */
    getDataPagina(noPagina) {
      this.listAsistencia = [];
      this.paginaIndex = noPagina;
      let ini = noPagina * 10 - 10;
      let fin = noPagina * 10;
      for (let index = ini; index < fin; index++) {
        if (this.listPaginado[index] == null) {
          break;
        }
        this.listAsistencia.push(this.listPaginado[index]);
      }
    },
    /** 
     * Verifica el tipo de usuario de la persona conectada 
     */
    tipoVerificacion(consulta) {
      if (consulta == this.tipo) {
        return true;
      }
      return false;
    },

    /**
     * Obtiene los proveedores
     */
    obtenerProveedores() {
      axios
        .get("http://localhost:58613/api/Proveedor/vigente")
        .then((response) => {
          console.log(response);
          this.listProveedor = response.data;
        });
      axios
        .get("http://localhost:58613/api/Proveedor/todo")
        .then((response) => {
          console.log(response);
          this.listProveedorTodos = response.data;
        });
    },
  },

  /**
   * Metodo que se ejecuta al iniciar la vista
   */
  created: function () {
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
    this.obtenerAsistencia();
    this.totalPaginado();
    this.obtenerProveedores();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
  margin: 6px;
}
</style>