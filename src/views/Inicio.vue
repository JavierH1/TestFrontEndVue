<template>
  <div
    class="inicio text-center"
    style="margin-right: 200px; margin-left: 200px; margin-top: 50px"
  >
    <div class="row">
      <h1 class="display-4 text-center text-light fw-bold">
        Sistema de Control FPyme Antofagasta
      </h1>
    </div>
    <br /><br />
    <div class="row g-4 text-center">
      <div
        v-if="
          tipoVerificacion('Administrador') ||
          tipoVerificacion('Extensionista encargado')
        "
        class="col"
      >
        <div class="card text-center rounded rounded-3" style="width: 18rem">
          <img
            style="
              margin-right: auto;
              margin-bottom: auto;
              margin-top: 20px;
              margin-left: auto;
            "
            src="@/assets/images/usuario.png"
            width="150"
            height="150"
          />

          <div style="margin-top: 5px" class="card-body rounded rounded-3">
            <h5 class="card-title rounded rounded-3">
              Sistema de administración de usuarios
            </h5>
          </div>
          <ul class="rounded rounded-3 list-group list-group-flush">
            <li class="list-group-item">Visualizar usuarios</li>
            <li class="list-group-item">Crear usuarios</li>
            <li class="list-group-item">Editar usuarios</li>
            <li class="list-group-item">Eliminar usuarios</li>
            <a href="/usuario" class="btn btn-primary">Ingresar</a>
          </ul>
        </div>
      </div>

      <div
        v-if="
          tipoVerificacion('Administrador') ||
          tipoVerificacion('Extensionista') ||
          tipoVerificacion('Extensionista encargado')
        "
        class="col"
      >
        <div class="card text-center rounded rounded-3" style="width: 18rem">
          <img
            style="
              margin-right: auto;
              margin-bottom: auto;
              margin-top: 20px;
              margin-left: auto;
            "
            src="@/assets/images/empresa.png"
            idth="150"
            height="150"
          />
          <div style="margin-top: 5px" class="card-body">
            <h5 class="card-title rounded rounded-3">
              Sistema de administración de empresas
            </h5>
          </div>
          <ul class="list-group list-group-flush rounded rounded-3">
            <li class="list-group-item">Visualizar empresas</li>
            <li class="list-group-item">Crear empresas</li>
            <li class="list-group-item">Editar empresas</li>
            <li class="list-group-item">Inhabilitar empresas</li>
            <a href="/empresa/0" class="btn btn-primary">Ingresar</a>
          </ul>
        </div>
      </div>

      <div
        v-if="
          tipoVerificacion('Administrador') ||
          tipoVerificacion('Extensionista') ||
          tipoVerificacion('Extensionista encargado')
        "
        class="col"
      >
        <div class="card text-center rounded rounded-3" style="width: 18rem">
          <img
            style="
              margin-right: auto;
              margin-bottom: auto;
              margin-top: 20px;
              margin-left: auto;
            "
            src="@/assets/images/proveedor.png"
            idth="150"
            height="150"
          />

          <div style="margin-top: 5px" class="card-body">
            <h5 class="card-title rounded rounded-3">
              Sistema de administración de proveedores
            </h5>
          </div>
          <ul class="list-group list-group-flush rounded rounded-3">
            <li class="list-group-item">Visualizar proveedores</li>
            <li class="list-group-item">Crear proveedores</li>
            <li class="list-group-item">Editar proveedores</li>
            <li class="list-group-item">Inhabilitar proveedores</li>
            <a href="/proveedor" class="btn btn-primary">Ingresar</a>
          </ul>
        </div>
      </div>
      <div class="col">
        <div class="card text-center rounded rounded-3" style="width: 18rem">
          <img
            style="
              margin-right: auto;
              margin-bottom: auto;
              margin-top: 20px;
              margin-left: auto;
            "
            src="@/assets/images/metrica.png"
            width="150"
            height="150"
          />
          <div style="margin-top: 20px" class="card-body">
            <h5 class="card-title rounded rounded-3">Métricas</h5>
          </div>
          <ul
            style="margin-top: 10px"
            class="list-group list-group-flush rounded rounded-3"
          >
            <li class="list-group-item">Métricas principales</li>
            <li class="list-group-item">Métricas secundarias</li>
            <div style="margin-top: 80px"></div>
            <a href="/metrica" class="btn btn-primary">Ingresar</a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Inicio",

  /** Datos privado de Inicio */
  data() {
    return {
      administrador: false,
      extensionista: false,
      entensionista_encargado: false,
      director: false,
    };
  },

  /** Metodos de Incio */
  methods: {
    /** Verifica el tipo de usuarios */
    tipoVerificacion(consulta) {
      if (consulta == sessionStorage.getItem("tipo")) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.tablita {
  padding-right: 0px;
  padding-left: 500px;
  height: 100%;
  width: 100%;
}

/** Cartas de dashboard */
.bg-success {
  --bs-bg-opacity: 1;
  background-color: rgba(
    var(--bs-success-rgb),
    var(--bs-bg-opacity)
  ) !important;
}
</style>