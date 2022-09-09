<template>
  <div id="perfil">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h5 class="modal-title" id="exampleModalLabel">
              Perfil de usuario
            </h5>

            <form>
              <div class="modal-body">
                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input
                    type="text"
                    class="form-control"
                    id="nombre"
                    placeholder="Nombre completo"
                    v-model="usuario.nombre"
                  />
                  <div class="body" style="color:red" v-if="v$.usuario.nombre.$error">
                    {{ v$.usuario.nombre.$errors[0].$message }}
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
                    v-model="usuario.correo"
                    readonly
                  />
                </div>
                <div class="form-group">
                  <label for="rutuser">Rut</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="xxxxx@xxx.xxx"
                    v-model="usuario.rut"
                    readonly
                  />
                </div>

                <div class="form-group">
                  <label for="tipouser">Tipo</label>
                  <select
                    id="tipouser"
                    class="form-control col"
                    v-model="usuario.tipo"
                    disabled
                  >
                    <option>Administrador</option>
                    <option>Extensionista</option>
                    <option>Extensionista encargado</option>
                    <option>Director</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="emailuser">Contraseña</label>

                  <div class="row ustify-content-between">
                    <div class="col">
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        aria-describedby="passwordHelp"
                       
                        v-model="loguser.clave"
                      />
                    </div>

                    <div class="col-auto">
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click.prevent="cambiarClave"
                      >
                        Cambiar
                      </button>
                    </div>
                  </div>
                </div>

                <div class="body" style="color:red" v-if="v$.loguser.clave.$error">
                  {{ v$.loguser.clave.$errors[0].$message }}
                </div>
              </div>
              <br>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="editarUsuario"
                  data-bs-dismiss="modal"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      v$: useValidate(),
      login: true,
      logout: false,
      administrador: false,
      extensionista: false,
      director: false,

      usuario: {
        id: sessionStorage.getItem("id"),
        nombre: sessionStorage.getItem("nombre"),
        correo: sessionStorage.getItem("correo"),
        rut: sessionStorage.getItem("rut"),
        tipo: sessionStorage.getItem("tipo"),
      },
      btnPerfil: false,
      loguser: {
        id: "1",
        clave: null,
        userId: "1",
        usuario: null,
      },
    };
  },

  validations() {
    return {
      usuario: {
        nombre: { required },
      },
      loguser: {
        clave: { required, minLength: minLength(6) },
      },
    };
  },

  methods: {
    cambiarClave() {
      this.usuario.nombre=sessionStorage.getItem("nombre");
      this.v$.$validate();
      if (!this.v$.$error) {
        let text = "¿Está seguro de cambiar la clave?.";
        if (confirm(text) == true) {
          axios
            .put(
              "http://localhost:58613/api/LogUser/" +
                this.usuario.id +
                "?clave=" +
                this.loguser.clave
            )
            .then((result) => {
              console.log(result);
            })

            .catch((error) => {
              console.error(error);
            });
        }
      }

    },
    editarUsuario() {
      this.loguser.clave="clave1fgdgrd";
      this.v$.$validate();
      if (!this.v$.$error) {
        let text = "¿Está seguro de editar el usuario?.";
        if (confirm(text) == true) {
          axios
            .put(
              "http://localhost:58613/api/Usuario/" + this.usuario.id,
              this.usuario
            )
            .then((result) => {
              console.log(result);
              sessionStorage.setItem("nombre", this.usuario.nombre);
              sessionStorage.getItem("correo", this.usuario.correo);
              sessionStorage.getItem("tipo", this.usuario.correo);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      this.loguser.clave="";
    },
    created: function () {
    this.loguser.clave="";
  },
  },
 
};
</script>