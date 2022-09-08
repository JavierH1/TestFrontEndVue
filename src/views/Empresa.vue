<template>
  <div class="empresa">
    <!-- Modal empresa Crear y Editar -->
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
                <label for="nombre">Nombre de la empresa</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombre"
                  placeholder="Nombre de la empresa"
                  v-model="nuevaempresa.nombre"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevaempresa.nombre.$error"
                >
                  {{ v$.nuevaempresa.nombre.$errors[0].$message }}
                </div>
              </div>
              <div class="form-group">
                <label for="emailuser">Email de la empresa</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="xxxxx@xxx.xxx"
                  v-model="nuevaempresa.correo"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevaempresa.correo.$error"
                >
                  {{ v$.nuevaempresa.correo.$errors[0].$message }}
                </div>
              </div>
              <div class="form-group">
                <label for="emailuser">Nombre de contacto de la empresa</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Nombre de contacto de la empresa"
                  v-model="nuevaempresa.nombreContacto"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevaempresa.nombreContacto.$error"
                >
                  {{ v$.nuevaempresa.nombreContacto.$errors[0].$message }}
                </div>
              </div>
              <div class="form-group">
                <label for="rutuser">Rut de la empresa</label>
                <input
                  @change="validar"
                  type="text"
                  class="form-control"
                  id="rutuser"
                  placeholder="XXXXXXXX-X"
                  v-model="nuevaempresa.rut"
                  v-if="btnCrear"
                />

                <input
                  type="text"
                  class="form-control"
                  id="rutuser"
                  readonly
                  placeholder="XXXXXXXX-X"
                  v-model="nuevaempresa.rut"
                  v-if="btnEdit"
                />
              </div>
              <small id="emailHelp" class="form-text text-muted" v-if="btnCrear"
                >Sin punto y con guión.</small
              >
              <div
                class="body"
                style="color: red"
                v-if="v$.nuevaempresa.rut.$error"
              >
                {{ v$.nuevaempresa.rut.$errors[0].$message }}
              </div>
              <div class="form-group">
                <label for="razonuser">Razón social de la empresa</label>
                <input
                  type="text"
                  class="form-control"
                  id="razon"
                  aria-describedby="razonHelp"
                  placeholder="Razón social de la empresa"
                  v-model="nuevaempresa.razon"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevaempresa.razon.$error"
                >
                  {{ v$.nuevaempresa.razon.$errors[0].$message }}
                </div>
              </div>
              <div>
                <label for="categoriaempr">Categoría de la empresa</label>
                <select
                  id="ciudademp"
                  class="form-control"
                  aria-label="Default select example"
                  v-model="nuevaempresa.categoria"
                >
                  <option>Micro</option>
                  <option>Pequeña</option>
                  <option>Mediana</option>
                  <option>Grande</option>
                  <option>Sin retornos declarados</option>
                  <option>Otros</option>
                </select>
              </div>
              <div>
                <label for="categoriaempr">Rubro de empresa</label>
                <select
                  id="ciudademp"
                  class="form-control"
                  aria-label="Default select example"
                  v-model="nuevaempresa.rubro"
                >
                  <option>Construcción</option>
                  <option>Inmobiliaria</option>
                  <option>Manufactura</option>
                  <option>Servicios</option>
                  <option>Comercio</option>
                  <option>Turismo</option>
                  <option>Otros</option>
                </select>
              </div>
              <div class="form-group">
                <label for="ciudadempr">Ciudad de la empresa</label>
                <select
                  id="ciudademp"
                  class="form-control"
                  aria-label="Default select example"
                  v-model="nuevaempresa.ciudad"
                >
                  <option v-bind:value="ciudadEspecial" v-if="btnEdit">
                    {{ ciudadEspecial }}
                  </option>
                  <option>Antofagasta</option>
                  <option>Calama</option>
                  <option>Maria Elena</option>
                  <option>Mejillones</option>
                  <option>San Pedro de Atacama</option>
                  <option>Taltal</option>
                  <option>Tocopilla</option>
                </select>
              </div>

              <div class="form-group">
                <label for="direccionempr">Dirección de la empresa</label>
                <input
                  type="text"
                  class="form-control"
                  id="direccion"
                  aria-describedby="direccionlHelp"
                  placeholder="Dirección de la empresa"
                  v-model="nuevaempresa.direccion"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevaempresa.direccion.$error"
                >
                  {{ v$.nuevaempresa.direccion.$errors[0].$message }}
                </div>
              </div>

              <div
                v-if="
                  tipoVerificacion('Administrador') ||
                  tipoVerificacion('Extensionista encargado')
                "
                class="form-group"
              >
                <label for="ciudadempr"
                  >Extensionista a cargo de la empresa</label
                >
                <select
                  id="ciudademp"
                  class="form-control"
                  v-model="nuevaempresa.usuarioId"
                >
                  <option v-bind:value="0">Ninguno</option>
                  <option
                    v-for="usuario in listUsuario"
                    :key="usuario.id"
                    v-bind:value="usuario.id"
                  >
                    {{ usuario.rut }} - {{ usuario.nombre }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Boton de agregar en btnCrear=true y boton de editar en btnEdit=true -->
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="agregarEmpresa"
                v-if="btnCrear"
              >
                Agregar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                @click.prevent="editarEmpresa"
                v-if="btnEdit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- Modal de contactos Crear y Editar -->
      <div class="modal-dialog">
        <div class="modal-content" v-if="btnTelefono">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Agregar contactos de empresa
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
                  <th>Nombre de contacto</th>
                  <th>Número de contacto</th>
                  <th>Email de conctacto</th>
                  <th>Eliminar contacto</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(contacto, index) of listContacto" :key="index">
                  <th>
                    {{ contacto.nombreContacto }}
                  </th>
                  <th>
                    {{ contacto.numero }}
                  </th>
                  <th>
                    {{ contacto.correoContacto }}
                  </th>
                  <th>
                    <span
                      class="text-danger cursor"
                      v-on:click.prevent="eliminarContacto(contacto.id)"
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
                <label for="nombContacto">Nombre del contacto</label>
                <input
                  type="text"
                  class="form-control"
                  id="nombContacto"
                  aria-describedby="nombContactoHelp"
                  placeholder="Nombre del contacto"
                  v-model="nuevocontacto.nombreContacto"
                />
              </div>
              <div class="form-group">
                <label for="numContacto">Número del contacto</label>
                <input
                  type="number"
                  class="form-control"
                  id="numContacto"
                  aria-describedby="numContactoHelp"
                  placeholder="Número del contacto"
                  v-model="nuevocontacto.numero"
                />
                <div
                  class="body"
                  style="color: red"
                  v-if="v$.nuevocontacto.numero.$error"
                >
                  {{ v$.nuevocontacto.numero.$errors[0].$message }}
                </div>
              </div>

              <div class="form-group">
                <label for="numContacto">Email del contacto</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email del contacto"
                  v-model="nuevocontacto.correoContacto"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="agregarContacto"
                >
                  Agregar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Vista general de empresas, tabla y opciones -->
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <h1 class="display-4 text-center">Administración de Empresas</h1>
            <hr />
            <div class="row ustify-content-between">
              <div class="col" style="margin-top: 7px">
                <h5>Página: {{ paginaIndex }}</h5>
              </div>
              <div class="col">
                <input
                  type="type"
                  class="form-control"
                  placeholder="Buscar"
                  v-model="valorBuscado"
                />
              </div>
              <div class="col">
                <button class="btn btn-primary" @click.prevent="search">
                  Buscar
                </button>
              </div>
              <div align="right" class="col-md-auto">
                <p align="right">
                  <button
                    type="button"
                    class="btn btn-primary"
                    v-if="esTodas && todos"
                    @click.prevent="empresasSinAsignar"
                  >
                    Todas las Empresas
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    v-if="!esTodas && todos"
                    @click.prevent="empresasSinAsignar"
                  >
                    Empresas sin Extensionista
                  </button>
                  <button
                    type="button"
                    style="margin-left: 5px"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click.prevent="abrirModalCrear"
                  >
                    Nueva Empresa
                  </button>

                  <button
                    type="button"
                    style="margin-left: 5px"
                    class="btn btn-primary"
                    @click.prevent="abrirCargaExcel"
                  >
                    Cargar empresas
                  </button>
                </p>
              </div>
            </div>
            <!-- Tabla de empresas -->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Rut</th>
                  <th style="text-align: center">Vigente</th>
                  <th style="text-align: center">Opciones</th>
                  <th style="text-align: center">Diagnósticos</th>
                  <th style="text-align: center">Chequeos</th>
                  <th style="text-align: center">Asistencias</th>
                  <th style="text-align: center">Documentos</th>
                </tr>
              </thead>

              <tbody>
                <!-- List de empresas -->
                <tr v-for="(empresa, index) of listEmpresa" :key="index">
                  <th v-if="empresa.vigente" class="table-success">
                    {{ empresa.id }}
                  </th>
                  <th v-else class="table-danger">
                    {{ empresa.id }}
                  </th>
                  <th>
                    {{ empresa.nombre }}
                  </th>
                  <th>
                    {{ empresa.rut }}
                  </th>
                  <th style="text-align: center" v-if="empresa.vigente">
                    <i class="fas fa-check"></i>
                  </th>
                  <th style="text-align: center" v-else>
                    <i class="fas fa-times"></i>
                  </th>
                  <th style="text-align: center">
                    <span
                      class="cursor"
                      v-on:click.prevent="abrirModalEdit(empresa)"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i class="fas fa-edit"></i>
                    </span>
                    <span
                      class="text-danger cursor"
                      v-on:click.prevent="
                        eliminarEmpresa(empresa.id, empresa.vigente)
                      "
                    >
                      <i class="fas fa-trash"></i>
                    </span>
                  </th>
                  <th style="text-align: center">
                    <span
                      class="cursor"
                      v-on:click.prevent="abrirDiagnostico(empresa.id)"
                    >
                      <i class="fas fa-file-medical-alt"></i>
                    </span>
                  </th>
                  <th style="text-align: center">
                    <span
                      class="cursor"
                      v-on:click.prevent="abrirChequeo(empresa.id)"
                    >
                      <i class="fas fa-tasks"></i>
                    </span>
                  </th>
                  <th style="text-align: center">
                    <span
                      class="cursor"
                      v-on:click.prevent="abrirAsistencia(empresa.id)"
                    >
                      <i class="fas fa-hands-helping"></i>
                    </span>
                  </th>
                  <th style="text-align: center">
                    <span
                      class="cursor"
                      v-on:click.prevent="archivoDocumento(empresa.id)"
                    >
                      <i class="fas fa-file-download"></i>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a
                    v-on:click.prevent="backPage"
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
/** Import de axios, vuex, vuelidate */
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  /** Nombre de clase */
  name: "EmpresaIndex",

  /** Atributos de clase Empresa */
  data() {
    return {
      id: this.$route.params.id,
      v$: useValidate(),
      nuevaempresa: {
        id: "",
        rut: "",
        nombre: "",
        razon: "",
        correo: "",
        direccion: "",
        ciudad: "",
        categoria: "",
        usuarioId: null,
        vigente: true,
        nombreContacto: "",
        rubro: "",
      },

      v$: useValidate(),
      nuevocontacto: {
        id: "",
        numero: "",
        nombreContacto: "",
        correoContacto: "",
        empresaId: "",
      },
      esTodas: false,
      categoriaEspecial: "",
      listContacto: [],
      listEmpresa: [],
      listEmpresaTotal: [],
      titulo: "",
      btnCrear: false,
      btnEdit: false,
      btnTelefono: false,
      btnModal: false,
      todos: false,
      paginaIndex: 1,
      listPaginado: [],
      listUsuario: [],
      ciudadEspecial: "",
      valorBuscado: "",
      listEmpresaVigente: [],
    };
  },

  /**
   * Validadaciones de vuelidate
   */
  validations() {
    return {
      nuevaempresa: {
        nombre: { required },
        correo: { required, email },
        rut: { required },
        razon: { required },
        direccion: { required },
        nombreContacto: { required },
        rubro: { required },
      },
      nuevocontacto: {
        numero: { required },
      },
    };
  },

  methods: {
    ...mapActions(["redirectTo"]),

    /** Muestra solamente las Empresas sin algun usuario asignada a ella */
    async empresasSinAsignar() {
      await this.busquedaNoAsignados();
      await this.search();
    },

    /** Valida el rut en su formato   */
    validaRut: function (rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
      var tmp = rutCompleto.split("-");
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == "K") digv = "k";

      return this.dv(rut) == digv;
    },

    /** Valida si el rut existe  */
    dv: function (T) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    },

    /** Funcion del boton de Empresas sin Extensionista
     * despliga la empresas que no tengan un usuario asignado  */
    async busquedaNoAsignados() {
      if (!this.esTodas) {
        var cont = 0;
        this.listEmpresaVigente = [];
        for (var i = 0; i < this.listEmpresaTotal.length; i++) {
          if (this.listEmpresaTotal[i].usuarioId.toString() == "0") {
            this.listEmpresaVigente[cont] = this.listEmpresaTotal[i];
            cont++;
          }
        }
        var aux = this.listEmpresaTotal;
        this.listEmpresaTotal = this.listEmpresaVigente;
        this.listEmpresaVigente = aux;
        this.search();
        this.esTodas = true;
      } else {
        this.obtenerEmpresa();
        this.esTodas = false;
        this.search();
      }
    },

    /** Recive los valores de la empresa y se los asigna al model, abre el modal de Empresa */
    abrirModalEdit: function (empresa) {
      this.titulo = "Actualizar Empresa";
      this.btnCrear = false;
      this.btnEdit = true;
      this.btnModal = true;
      this.btnTelefono = true;

      this.ciudadEspecial = empresa.ciudad;
      this.nuevaempresa = {
        id: empresa.id,
        nombre: empresa.nombre,
        correo: empresa.correo,
        rut: empresa.rut,
        razon: empresa.razon,
        ciudad: empresa.ciudad,
        direccion: empresa.direccion,
        categoria: empresa.categoria,
        usuarioId: empresa.usuarioId,
        vigente: empresa.vigente,
        nombreContacto: empresa.nombreContacto,
        rubro: empresa.rubro,
      };

      this.obtenetContacto();
    },

    /** Verifica el tipo de usuario y retorna si es verdaro */
    tipoVerificacion(consulta) {
      if (consulta == sessionStorage.getItem("tipo")) {
        return true;
      }
      return false;
    },

    /** Obtiene la lista de Usuarios de la base de datos */
    obtenerUsuario() {
      axios.get("http://localhost:58613/api/Usuario").then((response) => {
        console.log(response);
        this.listUsuario = response.data;
      });
    },

    /** Obtiene la pagina siguiente de la lista */
    nextPage() {
      if (this.totalPaginado() != this.paginaIndex) {
        this.paginaIndex++;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /** Obtiene la pagina anterior de la lista */
    backPage() {
      if (this.paginaIndex != 1) {
        this.paginaIndex--;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /** Retorna la cantidad de paginas que tendra la lista */
    totalPaginado() {
      return Math.ceil(this.listPaginado.length / 10);
    },

    /** Remplaza la lista a la pagina asignada */
    getDataPagina(noPagina) {
      this.listEmpresa = [];
      this.paginaIndex = noPagina;
      let ini = noPagina * 10 - 10;
      let fin = noPagina * 10;
      for (let index = ini; index < fin; index++) {
        if (this.listPaginado[index] == null) {
          break;
        }
        this.listEmpresa.push(this.listPaginado[index]);
      }
    },

    /** Corrige y valida el rut ingresado */
    validar() {
      var ultimo = this.nuevaempresa.rut.length;
      if (this.nuevaempresa.rut.charAt(ultimo - 1) == "k") {
        var final = [];
        var pos = 0;
        for (var i = 0; i < ultimo; i++) {
          if (Number.isInteger(parseInt(this.nuevaempresa.rut.charAt(i)))) {
            final[pos] = this.nuevaempresa.rut.charAt(i);
            pos++;
          }
        }
        if (final.length == 0) {
          this.nuevaempresa.rut = "";
          alert("Agregue un valor valido.");
        } else {
          this.nuevaempresa.rut = final.join("") + "-k";
        }
      } else {
        var final = [];
        var pos = 0;
        for (var i = 0; i < ultimo; i++) {
          if (Number.isInteger(parseInt(this.nuevaempresa.rut.charAt(i)))) {
            final[pos] = this.nuevaempresa.rut.charAt(i);
            pos++;
          }
        }
        if (final.length == 0) {
          this.nuevaempresa.rut = "";
          alert("Agregue un valor valido.");
        } else {
          final = final.join("");
          var valorultimo = final + "cambio";
          this.nuevaempresa.rut = valorultimo.replace(
            final.charAt(final.length - 1) + "cambio",
            "-" + final.charAt(final.length - 1)
          );
        }
      }
    },

    /** Busca en la lista por nombre de fantasia, rut de empresa, rubro, categoria
     *  y por ciudad los parametros que incluyan los valores de
     *  valorBuscado y lo crea un nuevo listado
     */
    search() {
      if (this.valorBuscado == "") {
        this.listPaginado = this.listEmpresaTotal;
        this.paginaIndex = 1;
        this.getDataPagina(this.paginaIndex);
      } else {
        this.listPaginado = this.listEmpresaTotal;
        var nuevo = [];
        var pos = 0;
        for (var i = 0; i < this.listPaginado.length; i++) {
          if (
            this.listPaginado[i]["rut"].includes(this.valorBuscado.toString())
          ) {
            nuevo[pos] = this.listPaginado[i];
            pos++;
          } else if (
            this.listPaginado[i]["nombre"]
              .toLowerCase()
              .includes(this.valorBuscado.toString().toLowerCase())
          ) {
            nuevo[pos] = this.listPaginado[i];
            pos++;
          } else if (
            this.listPaginado[i]["categoria"]
              .toLowerCase()
              .includes(this.valorBuscado.toString().toLowerCase())
          ) {
            nuevo[pos] = this.listPaginado[i];
            pos++;
          } else if (
            this.listPaginado[i]["ciudad"]
              .toLowerCase()
              .includes(this.valorBuscado.toString().toLowerCase())
          ) {
            nuevo[pos] = this.listPaginado[i];
            pos++;
          }
        }
        this.listPaginado = nuevo;
        this.paginaIndex = 1;
        this.getDataPagina(this.paginaIndex);
      }
    },

    /** Obtiene la lista de empresas de un usuario por su id */
    obtenerPorRut() {
      axios
        .get("http://localhost:58613/api/Empresa/" + this.nuevaempresa.rut)
        .then((response) => {
          console.log(response);
          this.listPaginado = response.data;
          this.getDataPagina(this.paginaIndex);
        });
    },

    /** Validad y agrega un contacto a la base de datos */
    agregarContacto() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.nuevocontacto.empresaId = this.nuevaempresa.id;
        this.nuevocontacto.id = 0;
        axios
          .post("http://localhost:58613/api/Contacto", this.nuevocontacto)
          .then((result) => {
            console.log(result);
            this.obtenetContacto();
          })
          .catch((error) => {
            console.error(error);
          });

        this.nuevocontacto = {
          id: "",
          numero: "",
          nombreContacto: "",
          correoContacto: "",
          empresaId: "",
        };
      }
    },

    /** Verifica si la empresa posee un diagnostico inicial y un cheque digital,
     *  si contiene los dos abre la vista de asistencias
     */
    abrirAsistencia(id) {
      axios
        .post("http://localhost:58613/api/Asistencia/" + id)
        .then((response) => {
          var res = response.data;
          if (res.message.toString() == "Verificado") {
            this.$router.push("/asistencia/" + id);
          } else if (res.message.toString() == "Diagnostico") {
            alert("Falta un diagnóstico.");
          } else if (res.message.toString() == "Chequeo") {
            alert("Falta un chequeo.");
          } else if (res.message.toString() == "No Verificado") {
            alert("Falta un chequeo y un diagnóstico.");
          }
        });
    },
    /**
     * Redirecciones a la vista de diagnostico, chequeo, archivos
     * a traves de una id
     */
    abrirDiagnostico(id) {
      this.$router.push("/diagnostico/" + id);
    },
    abrirChequeo(id) {
      this.$router.push("/chequeo/" + id);
    },
    archivoDiagnostico() {
      this.$router.push("/archivodiagnostico/");
    },
    archivoChequeo() {
      this.$router.push("/archivochequeo/");
    },
    archivoAsistencia() {
      this.$router.push("/archivoasistencia/");
    },
    archivoDocumento(id) {
      this.$router.push("/documentos/" + id);
    },
    abrir(id) {
      this.$router.push("/diagnostico/" + id);
    },

    /** Obtiene las empresas dependiendo si es un extensionista, si no
     * obtiene todos las empresas para administrador o extensionista encargado
     */
    obtenerEmpresa() {
      if (sessionStorage.getItem("tipo") == "Extensionista") {
        axios
          .get(
            "http://localhost:58613/api/Usuario/" + sessionStorage.getItem("id")
          )
          .then((response) => {
            console.log(response);
            this.listEmpresaTotal = response.data;
            this.listPaginado = response.data;
            this.getDataPagina(this.paginaIndex);
            this.search();
          });
      } else if (this.todos) {
        axios.get("http://localhost:58613/api/Empresa").then((response) => {
          console.log(response);
          this.listEmpresaTotal = response.data;
          this.listPaginado = response.data;
          this.getDataPagina(this.paginaIndex);
          this.search();
        });
      } else {
        axios
          .get("http://localhost:58613/api/Usuario/" + this.$route.params.id)
          .then((response) => {
            console.log(response);
            this.listEmpresaTotal = response.data;
            this.listPaginado = response.data;
            this.getDataPagina(this.paginaIndex);
            this.search();
          });
      }
    },

    /** Obtiene los contacto de la empresa que se abre al editar */
    obtenetContacto() {
      axios
        .get("http://localhost:58613/api/Contacto/" + this.nuevaempresa.id)
        .then((response) => {
          console.log(response);
          this.listContacto = response.data;
        });
    },

    /** Inabhilita una empresa o la elimina si ya esta
     * desabilitada de la base de datos
     */
    eliminarEmpresa(id, vigentes) {
      let text;
      if (vigentes) {
        let text =
          "¿Está seguro de deshabilitar esta empresa?. La información de la empresa quedará almacenada.";
        if (confirm(text) == true) {
          axios
            .delete("http://localhost:58613/api/Empresa/" + id)
            .then((response) => {
              console.log(response);
              this.obtenerEmpresa();
            });
        }
      } else {
        let text =
          "¿Estás seguro de eliminar esta empresa?. La información asociada se eliminará.";
        if (confirm(text) == true) {
          axios
            .delete("http://localhost:58613/api/Empresa/" + id)
            .then((response) => {
              console.log(response);
              this.obtenerEmpresa();
            });
        }
      }
    },

    /** Elimina un contacto  */
    eliminarContacto(id) {
      axios
        .delete("http://localhost:58613/api/Contacto/" + id)
        .then((response) => {
          console.log(response);
          this.obtenetContacto();
        });
    },

    /** Abre la vista de cargar un archivo excel */
    abrirCargaExcel() {
      this.$router.push("/cargaexcel/");
    },

    /** Agrega una empresa a la base de datos */
    agregarEmpresa() {
      if (this.validaRut(this.nuevaempresa.rut)) {
        this.nuevocontacto = {
          numero: 0,
          nombreContacto: "nombre",
          correoContacto: "correo",
        };

        this.v$.$validate();
        if (!this.v$.$error) {
          this.nuevaempresa.id = 0;
          if (sessionStorage.getItem("tipo") == "Extensionista") {
            this.nuevaempresa.usuarioId = sessionStorage.getItem("id");
          } else if (this.$route.params.id != "0") {
            this.nuevaempresa.usuarioId = this.$route.params.id;
          }
          axios
            .post("http://localhost:58613/api/Empresa", this.nuevaempresa)
            .then((result) => {
              console.log(result);
              var prueba = result.data;
              if (prueba.message == "rut") {
                alert("El RUT de la empresa ya existe.");
              } else {
                this.obtenerEmpresa();
                axios
                  .get(
                    "http://localhost:58613/api/Empresa/" +
                      this.nuevaempresa.rut
                  )
                  .then((response) => {
                    console.log(response);
                    var empresarut = response.data;
                    this.nuevaempresa.id = empresarut[0].id;
                    this.listContacto = 0;
                    this.esTodas = false;
                    this.abrirContacto();
                    this.search();
                  });
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

    /** Configura si la vista sera para todos */
    privateUsuario() {
      if (this.$route.params.id == "0") {
        return true;
      }
      return false;
    },

    /** Abre el modal de contactos */
    abrirContacto() {
      this.titulo = "Agregar Contactos";
      this.nuevocontacto.nombreContacto = "";
      this.nuevocontacto.numero = 0;
      this.nuevocontacto.correoContacto = "";
      this.btnModal = false;
      this.btnTelefono = true;
    },

    /** Edita la empresa por el modal de btnEditar */
    editarEmpresa() {
      this.nuevocontacto.numero = 1;
      this.v$.$validate();
      if (!this.v$.$error) {
        let text = "¿Está seguro de editar el empresa?.";
        if (confirm(text) == true) {
          axios
            .put(
              "http://localhost:58613/api/Empresa/" + this.nuevaempresa.id,
              this.nuevaempresa
            )
            .then((result) => {
              console.log(result);
              this.obtenerEmpresa();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      this.nuevocontacto.numero = null;
    },

    /** Abre el modal de crear */
    abrirModalCrear() {
      this.titulo = "Nueva Empresa";
      this.btnCrear = true;
      this.btnEdit = false;
      this.btnModal = true;
      this.btnTelefono = false;
      this.nuevaempresa = {
        id: "",
        rut: "",
        nombre: "",
        razon: "",
        correo: "",
        direccion: "",
        ciudad: "Antofagasta",
        categoria: "Micro",
        usuarioId: "0",
        vigente: true,
        nombreContacto: "",
        rubro: "Construcción",
      };
    },
  },

  /** Funcion de creación al abrir la vista de empresa */
  created: function () {
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
    if (this.$route.params.id == "0") {
      this.todos = true;
    }
    this.obtenerEmpresa();
    this.totalPaginado();
    this.obtenerUsuario();
  },
};
</script>


<style scoped>
/** Cambio de efecto de boton */
.cursor {
  cursor: pointer;
  margin: 6px;
}
</style>