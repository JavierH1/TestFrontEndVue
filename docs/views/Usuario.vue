<template>
  <div class="usuario">
    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1">
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
                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombre"
                    placeholder="Nombre completo"
                    v-model="nuevousuario.nombre"
                  />
                  <div
                    class="body"
                    style="color: red"
                    v-if="v$.nuevousuario.nombre.$error"
                  >
                    {{ v$.nuevousuario.nombre.$errors[0].$message }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="emailuser">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="xxxxx@xxx.xxx"
                    v-model="nuevousuario.correo"
                  />
                  <div
                    class="body"
                    style="color: red"
                    v-if="v$.nuevousuario.correo.$error"
                  >
                    {{ v$.nuevousuario.correo.$errors[0].$message }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="rutuser">Rut</label>
                  <input
                    @change="validar"
                    type="text"
                    class="form-control"
                    id="rutuser"
                    placeholder="XXXXXXXX-X"
                    v-model="nuevousuario.rut"
                    v-if="btnCrear"
                  />
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="xxxxx@xxx.xxx"
                    v-if="btnEdit"
                    v-model="nuevousuario.rut"
                    readonly
                  />
                </div>

                <small
                  id="emailHelp"
                  class="form-text text-muted"
                  v-if="btnCrear"
                  >Sin puntos y con guión</small
                >
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevousuario.rut.$error"
                >
                  {{ v$.nuevousuario.rut.$errors[0].$message }}
                </div>
                <div class="form-group">
                  <label for="tipouser">Tipo</label>
                  <select
                    id="tipouser"
                    class="form-control"
                    v-model="nuevousuario.tipo"
                  >
                    <option v-if="tipoVerificacion('Administrador')">
                      Administrador
                    </option>
                    <option>Extensionista</option>
                    <option>Extensionista encargado</option>
                    <option>Director</option>
                  </select>
                  <div
                    class="body"
                    style="color: red"
                    v-if="v$.nuevousuario.tipo.$error"
                  >
                    {{ v$.nuevousuario.tipo.$errors[0].$message }}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="AgregarUsuario()"
                  v-if="btnCrear"
                >
                  Agregar
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="reiniciarPass()"
                  v-if="btnEdit"
                >
                  Reiniciar Contraseña
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="editarUsuario()"
                  v-if="btnEdit"
                >
                  Actualizar
                </button>
              </div>
            </form>
            <!--
            <div class="alert alert-success">
              <strong>Completado!</strong> Se agrego el Usuario.
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h1 class="display-4 text-center">Administración de Usuarios</h1>
            <hr />

            <div class="row">
              <div class="col" style="margin-top: 10px">
                <h5>Página: {{ paginaIndex }}</h5>
              </div>
              <div align="right" class="col">
                <p align="right">
                  <button
                    v-if="tipoVerificacion('Administrador')"
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click.prevent="abrirModalCrear"
                  >
                    Nuevo Usuario
                  </button>
                </p>
              </div>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Rut</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                  <th style="text-align: center">Opciones</th>
                  <th style="text-align: center">Empresas</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="usuario in listUsuario" :key="usuario.id">
                  <th>
                    {{ usuario.id }}
                  </th>
                  <th>
                    {{ usuario.nombre }}
                  </th>
                  <th>
                    {{ usuario.rut }}
                  </th>
                  <th>
                    {{ usuario.correo }}
                  </th>
                  <th>
                    {{ usuario.tipo }}
                  </th>
                  <th style="text-align: center">
                    <class class="col">
                      <span
                        class="cursor"
                        v-on:click.prevent="abrirModalEdit(usuario)"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i class="fas fa-user-edit"></i>
                      </span>

                      <span
                        v-if="tipoVerificacion('Administrador')"
                        class="text-danger cursor"
                        v-on:click.prevent="eliminarUsuario(usuario.id)"
                      >
                        <i class="fas fa-trash"></i>
                      </span>
                    </class>
                  </th>
                  <th style="text-align: center">
                    <span
                      class="cursor col-row"
                      v-on:click.prevent="abrirEmpresas(usuario.id)"
                    >
                      <i class="fas fa-city"></i>
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
                  v-on:click.prevent="getDataPagina(pagina)"
                  class="page-item"
                >
                  <a class="page-link" href="#">{{ pagina }}</a>
                </li>

                <li class="page-item">
                  <a
                    v-on:click.prevent="nextPage"
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
import * as bootstrap from "bootstrap";
import { mapActions } from "vuex";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { Modal } from "bootstrap";
export default {
  name: "UsuarioIndex",
  data() {
    return {
      v$: useValidate(),
      nuevousuario: {
        id: "",
        nombre: "",
        correo: "",
        rut: "",
        tipo: "",
      },
      esModal: false,
      listUsuario: [],
      titulo: "",
      btnCrear: false,
      btnEdit: false,

      paginaIndex: 1,
      listPaginado: [],
    };
  },
  validations() {
    return {
      nuevousuario: {
        nombre: { required },
        correo: { required, email },
        rut: { required },
        tipo: { required },
      },
    };
  },

  methods: {
    ...mapActions(["redirectTo"]),
    reiniciarPass() {
      let text = "¿Está seguro de cambiar la clave?.";
      if (confirm(text) == true) {
        axios
          .put(
            "http://localhost:58613/api/LogUser/" +
              this.nuevousuario.id +
              "?clave=reset"
          )
          .then((result) => {
            console.log(result);
          })

          .catch((error) => {
            console.error(error);
          });
      }
    },
    /* Metodo verificacion de Tipo de usuario */
    tipoVerificacion(consulta) {
      if (consulta == sessionStorage.getItem("tipo")) {
        return true;
      }
      return false;
    },
    /** Metodos de Usuario */
    abrirModalEdit: function (usuario) {
      this.titulo = "Actualizar Usuario";
      this.btnCrear = false;
      this.btnEdit = true;
      this.esModal = true;
      this.nuevousuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rut: usuario.rut,
        tipo: usuario.tipo,
      };
    },

    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
      var tmp = rutCompleto.split("-");
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == "K") digv = "k";

      return this.dv(rut) == digv;
    },
    dv: function (T) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    },

    obtenerUsuario() {
      axios.get("http://localhost:58613/api/Usuario").then((response) => {
        console.log(response);
        this.listPaginado = response.data;
        this.getDataPagina(this.paginaIndex);
      });
    },
    eliminarUsuario(id) {
      let text =
        "¿Está seguro de eliminar este usuario?. No se eliminarán las empresas asociadas.";
      if (confirm(text) == true) {
        axios
          .delete("http://localhost:58613/api/Usuario/" + id)
          .then((response) => {
            console.log(response);
            this.obtenerUsuario();
          });
      }
    },
    validar() {
      var ultimo = this.nuevousuario.rut.length;
      if (this.nuevousuario.rut.charAt(ultimo - 1) == "k") {
        var final = [];
        var pos = 0;
        for (var i = 0; i < ultimo; i++) {
          if (Number.isInteger(parseInt(this.nuevousuario.rut.charAt(i)))) {
            final[pos] = this.nuevousuario.rut.charAt(i);
            pos++;
          }
        }
        if (final.length == 0) {
          this.nuevousuario.rut = "";
          alert("Agregue un valor valido.");
        } else {
          this.nuevousuario.rut = final.join("") + "-k";
        }
      } else {
        var final = [];
        var pos = 0;
        for (var i = 0; i < ultimo; i++) {
          if (Number.isInteger(parseInt(this.nuevousuario.rut.charAt(i)))) {
            final[pos] = this.nuevousuario.rut.charAt(i);
            pos++;
          }
        }
        if (final.length == 0) {
          this.nuevousuario.rut = "";
          alert("Agregue un valor valido.");
        } else {
          final = final.join("");
          var valorultimo = final + "cambio";
          this.nuevousuario.rut = valorultimo.replace(
            final.charAt(final.length - 1) + "cambio",
            "-" + final.charAt(final.length - 1)
          );
        }
      }
    },

    abrirEmpresas(id) {
      this.$router.push("/empresa/" + id);
    },
    AgregarUsuario() {
      if (this.validaRut(this.nuevousuario.rut)) {
        this.v$.$validate();
        if (!this.v$.$error) {
          this.nuevousuario.id = 0;
          axios
            .post("http://localhost:58613/api/Usuario", this.nuevousuario)
            .then((result) => {
              console.log(result);
              var prueba = result.data;
              if (prueba.message == "correo") {
                alert("Correo existente.");
              } else if (prueba.message == "rut") {
                alert("RUT existente.");
              } else {
                this.obtenerUsuario();
                alert(prueba.message);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        alert("El rut no existe.");
      }
    },

    editarUsuario() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let text = "¿Está seguro de editar el usuario?.";
        if (confirm(text) == true) {
          axios
            .put(
              "http://localhost:58613/api/Usuario/" + this.nuevousuario.id,
              this.nuevousuario
            )
            .then((result) => {
              console.log(result);
              this.obtenerUsuario();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    },
    abrirModalCrear() {
      this.titulo = "Nuevo Usuario";
      this.btnCrear = true;
      this.btnEdit = false;
      this.esModal = true;
      this.nuevousuario = {
        id: "",
        nombre: "",
        correo: "",
        rut: "",
        tipo: "Extensionista",
      };
    },
    /** Metodos de paginaci */
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
      this.listUsuario = [];
      this.paginaIndex = noPagina;
      let ini = noPagina * 10 - 10;
      let fin = noPagina * 10;
      for (let index = ini; index < fin; index++) {
        if (this.listPaginado[index] == null) {
          break;
        }
        this.listUsuario.push(this.listPaginado[index]);
      }
    },
  },
  created: function () {
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
    this.obtenerUsuario();
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