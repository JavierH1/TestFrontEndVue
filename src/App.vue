<template >
  <div class="full">
    <div id="app">
      <nav
        v-if="this.$route.name != 'login'"
        class="navbar navbar-expand-lg bg-light"
      >
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
          v-if="this.$route.name != 'login'"
        >
          <div class="container">
            <a class="navbar-brand">
              <img
                src="@/assets/images/LOGO2.png"
                alt=""
                width="250"
                height="100"
                class="d-inline-block align-text-top"
              />
            </a>
          </div>
        </ul>

        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
          v-if="this.$route.name != 'login'"
        >
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/inicio"
              >Inicio</a
            >
          </li>

          <li
            v-if="
              tipoVerificacion('Administrador') ||
              tipoVerificacion('Extensionista encargado')
            "
            class="nav-item"
          >
            <a class="nav-link active" aria-current="page" href="/usuario"
              >Administración de Usuarios</a
            >
          </li>
          <li
            v-if="
              tipoVerificacion('Administrador') ||
              tipoVerificacion('Extensionista') ||
              tipoVerificacion('Extensionista encargado')
            "
            class="nav-item"
          >
            <a class="nav-link active" aria-current="page" href="/empresa/0"
              >Administración de Empresas</a
            >
          </li>
          <li
            v-if="
              tipoVerificacion('Administrador') ||
              tipoVerificacion('Extensionista') ||
              tipoVerificacion('Extensionista encargado')
            "
            class="nav-item"
          >
            <a class="nav-link active" aria-current="page" href="/proveedor"
              >Administración de Proveedores</a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/metrica"
              >Métricas</a
            >
          </li>
        </ul>

        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
          v-if="this.$route.name != 'login'"
        >
          <li class="nav-item">
            <a href="/perfil" class="btn btn-outline-primary">Perfil</a>
          </li>
        </ul>

        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
          v-if="this.$route.name != 'login'"
        >
          <li class="nav-item">
            <button
              class="btn btn-danger my-2 my-sm-0"
              @click="logoutt()"
              href="#"
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>

        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
          v-if="this.$route.name != 'login'"
        >
          <div class="container">
            <a class="navbar-brand">
              <img
                src="@/assets/images/CDT.png"
                alt=""
                width="200"
                height="100"
                class="d-inline-block align-text-top"
              />
            </a>
          </div>
        </ul>
      </nav>

      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      login: true,
      logout: false,
      administrador: false,
      extensionista: false,
      entensionista_encargado: false,
      director: false,
      pass: "",

      usuario: {
        id: sessionStorage.getItem("id"),
        nombre: sessionStorage.getItem("nombre"),
        correo: sessionStorage.getItem("correo"),
        rut: sessionStorage.getItem("rut"),
        tipo: sessionStorage.getItem("tipo"),
      },
    };
  },

  methods: {
    tipoVerificacion(consulta) {
      if (consulta == sessionStorage.getItem("tipo")) {
        return true;
      }
      return false;
    },

    logoutt() {
      sessionStorage.clear();
      this.onLogout();
    },
onLogout() {
    this.$store.dispatch("doLogout");
    this.$router.push("/");
  },
    editarUsuario() {
      let text = "Esta seguro de editar el usuario.";
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
    },

    nombreUsuario() {
      this.usuario.nombre = sessionStorage.getItem("nombre");
    },
  },
  created: function () {
    this.nombreUsuario();
  },
  
};
</script>

<style>
.full {
  background-image: url("~@/assets/images/VIRUS2.png");
  background-repeat: no-repeat;
  background-position: bottom left;
  position: absolute;
  background-attachment: fixed;
  background-color: #009fe3;
  background-size: 40%;
  overflow: scroll;
  height: 100%;
  width: 100%;
}
</style>