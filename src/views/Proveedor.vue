<template>
  <div class="proveedor">

    <!-- Modal de proveedor -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" v-if="btnModal">
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
              <div class="form-group">
                <label for="rutuser">Nombre del proveedor</label>
                <input
                  type="text"
                  class="form-control"
                  id="rutuser"
                  placeholder="Nombre del proveedor"
                  v-model="nuevoproveedor.nombre"
                  v-if="btnCrear"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevoproveedor.nombre.$error"
                >
                  {{ v$.nuevoproveedor.nombre.$errors[0].$message }}
                </div>

                <input
                  type="text"
                  class="form-control"
                  id="rutuser"
                  placeholder="Nombre del proveedor"
                  v-if="btnEdit"
                  readonly
                  v-model="nuevoproveedor.nombre"
                />
              </div>

              <div class="form-group">
                <label for="rutuser">Propósito del proveedor</label>
                <input
                  type="text"
                  class="form-control"
                  id="rutuser"
                  placeholder="Propósito de del proveedor"
                  v-model="nuevoproveedor.proposito"
                  v-if="btnCrear"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevoproveedor.nombre.$error"
                >
                  {{ v$.nuevoproveedor.nombre.$errors[0].$message }}
                </div>

                <input
                  type="text"
                  class="form-control"
                  id="rutuser"
                  placeholder="Propósito de del proveedor"
                  v-if="btnEdit"
                  readonly
                  v-model="nuevoproveedor.proposito"
                />
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="agregarProveedor"
                v-if="btnCrear"
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Modal de servicios -->
      <div class="modal-dialog">
        <div class="modal-content" v-if="btnServicios">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Servicios del proveedor
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Tipo</th>
                  <th>Precio</th>
                  <th>Eliminar</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(servicios, index) of listServicios" :key="index">
                  <th>
                    {{ servicios.descripcion }}
                  </th>
                  <th>
                    {{ servicios.tipo }}
                  </th>
                  <th>
                    {{ servicios.precio }}
                  </th>
                  <th>
                    <span
                      class="text-danger cursor"
                      v-on:click="eliminarServicios(servicios.id)"
                    >
                      <i class="fas fa-trash"></i>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <form>
            <div class="modal-body">
              <div class="form-group">
                <label for="nombServicios">Descripción del servicio</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombServicios"
                  aria-describedby="nombServiciosHelp"
                  placeholder="Nombre del servicio"
                  v-model="nuevoservicios.descripcion"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevoservicios.descripcion.$error"
                >
                  {{ v$.nuevoservicios.descripcion.$errors[0].$message }}
                </div>
              </div>
              <div class="form-group">
                <label for="numServicios">Tipo del servicio</label>
                <input
                  type="text"
                  class="form-control"
                  id="numServicios"
                  aria-describedby="numServiciosHelp"
                  placeholder="Tipo de servicio"
                  v-model="nuevoservicios.tipo"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevoservicios.tipo.$error"
                >
                  {{ v$.nuevoservicios.tipo.$errors[0].$message }}
                </div>
              </div>
              <div class="form-group">
                <label for="numServicios">Precio del servicio</label>
                <input
                  type="number"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Precio del servicio"
                  v-model="nuevoservicios.precio"
                />
              </div>

              <div
                class="body"
                style="color: red"
                v-if="v$.nuevoservicios.precio.$error"
              >
                {{ v$.nuevoservicios.precio.$errors[0].$message }}
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="agregarServicios"
                >
                  Agregar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Vista general de proveedores -->
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h1 class="display-4 text-center">Administración de Proveedores</h1>
            <hr />

            <div class="row justify-content-between">
              <div class="col">
                <div class="form-group">
                  <h5>Página: {{ paginaIndex }}</h5>
                </div>
              </div>
              <div class="col-md-auto">
                <div class="input-group">
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      @click="abrirModalCrear"
                    >
                      Nuevo Proveedor
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Propósito</th>
                  <th style="text-align: center">Vigente</th>
                  <th style="text-align: center">Opciones</th>
                </tr>
              </thead>

              <tbody>

                <!-- Tabla de proveedores -->
                <tr v-for="(proveedor, index) of listProveedor" :key="index">
                  <th v-if="proveedor.vigente" class="table-success">
                    {{ proveedor.id }}
                  </th>
                   <th v-else class="table-danger">
                    {{ proveedor.id }}
                  </th>
                  <th >
                    {{ proveedor.nombre }}
                  </th>
                  <th >
                    {{ proveedor.proposito }}
                  </th>
                  <th style="text-align: center" v-if="proveedor.vigente">
                    <i class="fas fa-check"></i>
                  </th>
                  <th style="text-align: center" v-else>
                    <i class="fas fa-times"></i>
                  </th >
                  <th   style="text-align: center">
                    <span
                      class="cursor"
                      v-on:click.prevent="abrirModalEdit(proveedor)"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i class="fas fa-user-edit"></i>
                    </span>

                    <span
                      class="text-danger cursor"
                      v-if="proveedor.vigente"
                      v-on:click="
                        eliminarProveedor(proveedor.id, proveedor.vigente)
                      "
                    >
                      <i class="fas fa-trash"></i>
                    </span>
                    
                  </th>
                </tr>
              </tbody>
            </table>

            <!-- Paginado de proveedores -->
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
  // Nombre de la clase Proveedores 
  name: "ProveedorIndex",
  
  /**
   * Atributo de proveedores
   */
  data() {
    return {
      id: this.$route.params.id,
      v$: useValidate(),
      nuevoproveedor: {
        id: "",
        nombre: "",
        proposito: "",
        vigente: "",
      },
      v$: useValidate(),
      nuevoservicios: {
        id: "",
        descripcion: "",
        tipo: "",
        precio: "",
        proveedorId: "",
      },
      listServicios: [],
      listProveedor: [],
      titulo: "",
      btnCrear: false,
      btnEdit: false,
      btnServicios: false,
      btnModal: false,
      todos: false,
      paginaIndex: 1,
      listPaginado: [],
    };
  },

  /**
   * Validaciones de nuevoproveedor y nuevoservicios
   */
  validations() {
    return {
      nuevoproveedor: {
        nombre: { required },
        proposito: { required },
      },
      nuevoservicios: {
        descripcion: { required },
        tipo: { required },
        precio: { required },
      },
    };
  },

  methods: {
    ...mapActions(["redirectTo"]),

    /** 
     * Abre el modal editar de proveedores
     */
    abrirModalEdit: function (proveedor) {
      this.titulo = "Datos Proveedor";
      this.btnCrear = false;
      this.btnEdit = true;
      this.btnModal = true;
      this.btnServicios = true;

      this.nuevoproveedor = {
        id: proveedor.id,
        nombre: proveedor.nombre,
        proposito: proveedor.proposito,
      };
      this.obtenetServicios();
    },

    /**
     * Abre el modal crear de proveedores
     */
    abrirModalCrear() {
      this.titulo = "Nuevo Proveedor";
      this.btnCrear = true;
      this.btnEdit = false;
      this.btnModal = true;
      this.btnServicios = false;
      this.nuevoproveedor = {
        id: "",
        nombre: "",
        proposito: "",
        vigente: "",
      };
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
     * Obtiene los proveedores del paginado siguiente
     */
    nextPage() {
      if (this.totalPaginado() != this.paginaIndex) {
        this.paginaIndex++;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Obtiene los proveedores del paginado anterior
     */
    backPage() {
      if (this.paginaIndex != 1) {
        this.paginaIndex--;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /**
     * Retorna la cantidad de pagina por cada 10 proveedores
     */
    totalPaginado() {
      return Math.ceil(this.listPaginado.length / 10);
    },

    /**
     * Obtiene el listado de la pagina
     */
    getDataPagina(noPagina) {
      this.listProveedor = [];
      this.paginaIndex = noPagina;
      let ini = noPagina * 10 - 10;
      let fin = noPagina * 10;
      for (let index = ini; index < fin; index++) {
        if (this.listPaginado[index] == null) {
          break;
        }
        this.listProveedor.push(this.listPaginado[index]);
      }
    },

    /**
     * Agrega un servicio 
     */
    agregarServicios() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.nuevoservicios.proveedorId = this.nuevoproveedor.id;
        this.nuevoservicios.id = 0;
        axios
          .post("http://localhost:58613/api/Servicios", this.nuevoservicios)
          .then((result) => {
            console.log(result);
            this.obtenetServicios();
          })
          .catch((error) => {
            console.error(error);
          });
        this.nuevoservicios = {
          id: "",
          descripcion: "",
          tipo: "",
          precio: "",
          proveedorId: "",
        };
      }
    },

    /**
     * Obtiene todos los proveedores
     */
    obtenerProveedor() {
      axios
        .get("http://localhost:58613/api/Proveedor/todo")
        .then((response) => {
          console.log(response);
          this.listPaginado = response.data;
          this.getDataPagina(this.paginaIndex);
        });
    },

    /**
     * Obtiene los servicios de un proveedor
     */
    obtenetServicios() {
      axios
        .get("http://localhost:58613/api/Servicios/" + this.nuevoproveedor.id)
        .then((response) => {
          console.log(response);
          this.listServicios = response.data;
        });
    },

    /**
     * Elimina un proveedor por id
     */
    eliminarProveedor(id, vigentes) {
      let text;
      if (vigentes) {
        let text =
          "¿Está seguro de deshabilitar este proveedor?. La informacionación del proveedor quedará almacenada.";
        if (confirm(text) == true) {
          axios
            .delete("http://localhost:58613/api/Proveedor/" + id)
            .then((response) => {
              console.log(response);
              this.obtenerProveedor();
            });
        }
      } else {
        let text =
          "¿Está seguro de eliminar este proveedor?. La información asociada se eliminará.";
        if (confirm(text) == true) {
          axios
            .delete("http://localhost:58613/api/Proveedor/" + id)
            .then((response) => {
              console.log(response);
              this.obtenerProveedor();
            });
        }
      }
    },

    /**
     * Elimina un servicio por id
     */
    eliminarServicios(id) {
      axios
        .delete("http://localhost:58613/api/Servicios/" + id)
        .then((response) => {
          console.log(response);
          this.obtenetServicios();
        });
    },
    
    /**
     * Agrega un proveedor
     */
    agregarProveedor() {
      this.nuevoservicios = {
        tipo: "tipo",
        precio: 0,
        descripcion: "descripcion",
      };
      this.v$.$validate();
      if (!this.v$.$error) {
        this.nuevoproveedor.id = 0;
        this.nuevoproveedor.vigente = true;
        axios
          .post("http://localhost:58613/api/Proveedor", this.nuevoproveedor)
          .then((result) => {
            console.log(result);
            var prueba = result.data;
            this.nuevoproveedor.id = prueba.message;

            this.obtenerProveedor();
            this.abrirServicios();
          })

          .catch((error) => {
            console.error(error);
          });
      }
    },
    
    /**
     * Abre  el modal de servicios
     */
    abrirServicios() {
      this.titulo = "Agregar Servicios";
      this.btnModal = false;
      this.btnServicios = true;
      this.listServicios=null;
      this.nuevoservicios = {
        id: "",
        descripcion: "",
        tipo: "",
        precio: 0,
        proveedorId: "",
      };
    },
  
    /**
     * Edita un proveedor 
     */
    editarProveedor() {
      let text = "¿Está seguro de editar el proveedor?.";
      if (confirm(text) == true) {
        axios
          .put(
            "http://localhost:58613/api/Proveedor/" + this.nuevoproveedor.id,
            this.nuevoproveedor
          )
          .then((result) => {
            console.log(result);
            this.obtenerProveedor();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
  created: function () {
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
    this.obtenerProveedor();
    this.totalPaginado();
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>