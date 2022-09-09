<template>
  <div class="seguimiento">
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
              <div v-if="btnCrear" class="form-group">
                <label for="nombre">Fecha</label>
                <input
                  type="date"
                  class="form-control"
                  id="nombre"
                  placeholder="Nombre completo"
                  v-model="nuevaseguimiento.fecha"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevaseguimiento.fecha.$error"
                >
                  {{ v$.nuevaseguimiento.fecha.$errors[0].$message }}
                </div>
              </div>
              <div v-if="btnEdit" class="form-group">
                <label for="nombre">Fecha</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  readonly
                  placeholder="Nombre completo"
                  v-model="nuevaseguimiento.fecha"
                />
              </div>
              <div class="form-group">
                <div v-if="btnEdit">
                  <label for="emailuser">Observación</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    readonly
                    aria-describedby="emailHelp"
                    placeholder="Observación de seguimiento"
                    v-model="nuevaseguimiento.observacion"
                  />
                </div>
              </div>
              <div v-if="btnCrear" class="form-group">
                <label for="emailuser">Observación</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Observación de seguimiento"
                  v-model="nuevaseguimiento.observacion"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="agregarSeguimiento"
                v-if="btnCrear"
              >
                Agregar
              </button>
              <!-- <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="editarSeguimiento"
                v-if="btnEdit"
              >
                Actualizar
              </button>
              -->
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h1 class="display-4 text-center">
              Administración de Seguimientos
            </h1>
            <hr />

            <div class="row justify-content-between">
              <div class="col">
                <div class="form-group">
                  <h5>Página: {{ paginaIndex }}</h5>
                </div>
              </div>
              <div class="col">
                <div align="right" class="col">
                  <p align="right">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      @click="abrirModalCrear"
                    >
                      Nuevo Seguimiento
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Observación</th>
                  <th>Fecha</th>
                  <th style="text-align: center">Opciones</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(seguimiento, index) of listSeguimiento"
                  :key="index"
                >
                  <th>
                    {{ seguimiento.id }}
                  </th>
                  <th>
                    {{ seguimiento.observacion }}
                  </th>
                  <th>
                    {{ getDate(seguimiento.fecha) }}
                  </th>

                  <th style="text-align: center">
                    <span
                      class="cursor"
                      v-on:click.prevent="abrirModalEdit(seguimiento)"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i class="fas fa-edit"></i>
                    </span>
                    <span
                      class="text-danger cursor"
                      v-on:click="
                        seguimiento;
                        eliminarSeguimiento(seguimiento.id);
                      "
                    >
                      <i class="fas fa-trash"></i>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
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
import axios from "axios";
import { mapActions } from "vuex";

import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "SeguimientoIndex",
  data() {
    return {
      id: this.$route.params.id,
      v$: useValidate(),
      nuevaseguimiento: {
        id: "",
        fecha: "",
        observacion: "",
        asistenciaId: "",
      },

      listSeguimiento: [],
      titulo: "",
      btnCrear: false,
      btnEdit: false,

      todos: false,
      paginaIndex: 1,
      listPaginado: [],
    };
  },

  validations() {
    return {
      nuevaseguimiento: {
        fecha: { required },
      },
    };
  },

  methods: {
    ...mapActions(["redirectTo"]),
    abrirModalEdit: function (seguimiento) {
      this.titulo = "Datos de Seguimiento";
      this.btnCrear = false;
      this.btnEdit = true;

      this.nuevaseguimiento = {
        id: seguimiento.id,
        fecha: seguimiento.fecha,
        observacion: seguimiento.observacion,
        asistenciaId: seguimiento.asistenciaId,
      };
      this.obtenetContacto();
    },
     getDate(datetime) {
      let date = new Date(datetime).toJSON().slice(0, 10).replace(/-/g, "/");
      if (date == "0001/01/01") {
        date = "No finalizado";
      }
      return date;
    },
    tipoVerificacion(consulta) {
      if (consulta == sessionStorage.getItem("tipo")) {
        return true;
      }
      return false;
    },

    nextPage() {
      if (this.totalPaginado() != this.paginaIndex) {
        this.paginaIndex++;
        this.getDataPagina(this.paginaIndex);
      }
    },
    backPage() {
      if (this.paginaIndex != 1) {
        this.paginaIndex--;
        this.getDataPagina(this.paginaIndex);
      }
    },
    totalPaginado() {
      return Math.ceil(this.listPaginado.length / 10);
    },
    getDataPagina(noPagina) {
      this.listSeguimiento = [];
      this.paginaIndex = noPagina;
      let ini = noPagina * 10 - 10;
      let fin = noPagina * 10;
      for (let index = ini; index < fin; index++) {
        if (this.listPaginado[index] == null) {
          break;
        }
        this.listSeguimiento.push(this.listPaginado[index]);
      }
    },

    obtenerSeguimiento() {
      axios
        .get("http://localhost:58613/api/Seguimiento/" + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.listPaginado = response.data;
          this.getDataPagina(this.paginaIndex);
        });
    },

    eliminarSeguimiento(id) {
      let text = "¿Está seguro de eliminar el seguimiento?.";
      if (confirm(text) == true) {
        axios
          .delete("http://localhost:58613/api/Seguimiento/" + id)
          .then((response) => {
            console.log(response);
            this.obtenerSeguimiento();
          });
      }
    },

    agregarSeguimiento() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.nuevaseguimiento.id = 0;
        this.nuevaseguimiento.asistenciaId = this.$route.params.id;

        axios
          .post("http://localhost:58613/api/Seguimiento", this.nuevaseguimiento)
          .then((result) => {
            alert("Seguimiento registrado.")
            this.obtenerSeguimiento();
            
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    editarSeguimiento() {
      let text = "¿Está seguro de editar el seguimiento?.";
      if (confirm(text) == true) {
        axios
          .put(
            "http://localhost:58613/api/Seguimiento/" +
              this.nuevaseguimiento.id,
            this.nuevaseguimiento
          )
          .then((result) => {
            alert("Seguimiento editado.")
            this.obtenerSeguimiento();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    abrirModalCrear() {
      this.titulo = "Nuevo Seguimiento";
      this.btnCrear = true;
      this.btnEdit = false;
      this.nuevaseguimiento = {
        id: "",
        fecha: "",
        observacion: "",
        asistenciaId: "",
      };
    },
  },
  created: function () {
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
    if (this.$route.params.id == "0") {
      this.todos = true;
    }
    this.obtenerSeguimiento();
    this.totalPaginado();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
  margin: 6px;
}
</style>