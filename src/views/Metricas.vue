<template>
  <div class="principal">
    <!-- Titulo de la vista Metricas Principales -->
    <div class="col">
      <h1 class="display-4 text-center text-light fw-bold">
        Métricas Principales
      </h1>
    </div>
    <br />
    <br />

    <!-- Dashboard de Metricas -->
    <div class="col">
      <div class="col">
        <div class="card mt-1 bg-light p-2" style="--bs-bg-opacity: 0.3">
          <div class="card-body">
            <div class="row">
              <!-- Carta de dashboard Asistencia técnicas -->
              <div class="col">
                <div class="card bg-primary text-light text-center">
                  <div class="card-body">
                    <h5 class="card-title">Cantidad de Asistencias Técnicas</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      Asistencias Propias: {{ contPropia }}
                    </li>
                    <li class="list-group-item">
                      Asistencias Externas: {{ contExterna }}
                    </li>
                    <li class="list-group-item">
                      Asistencias Multi nivel: {{ contMulti }}
                    </li>
                    <li class="list-group-item">
                      Total de Asistencia: {{ contTotalAsistencias }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Carta de dashboard Cantidad de Diagnósticos -->
              <div class="col">
                <div class="card bg-primary text-light text-center">
                  <div class="card-body">
                    <h5 class="card-title">Cantidad de Diagnósticos</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">{{ contDiag }}</li>
                  </ul>
                </div>
              </div>

              <!-- Carta de dashboard Cantidad de Chequeos -->
              <div class="col">
                <div class="card bg-primary text-light text-center">
                  <div class="card-body">
                    <h5 class="card-title">Cantidad de Chequeos</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">{{ contChequeo }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br /><br />

    <!-- Titulo de Metricas Secundarias -->
    <div class="row">
      <h1 class="display-4 text-center text-light fw-bold">
        Métricas Secundarias
      </h1>
    </div>
    <br /><br />
    <div class="col">
      <div class="col">
        <div class="card mt-1 bg-light p-2" style="--bs-bg-opacity: 0.3">
          <div class="card-body">
            <div class="row">
              <!-- Carta de dashboar Cantidad de Empresas por Ciudad -->
              <div class="col">
                <div class="card bg-primary text-light text-center">
                  <div class="card-body">
                    <h5 class="card-title">Cantidad de Empresas por Ciudad</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      Antofagasta: {{ contAntogagasta }}
                    </li>
                    <li class="list-group-item">Calama: {{ contCalama }}</li>
                    <li class="list-group-item">
                      San Pedro de Atacama: {{ contSanPedro }}
                    </li>
                    <li class="list-group-item">
                      Tocopilla: {{ contTocopilla }}
                    </li>
                    <li class="list-group-item">
                      Maria Elena: {{ contMaria }}
                    </li>
                    <li class="list-group-item">
                      Mejillones: {{ contMejillones }}
                    </li>
                    <li class="list-group-item">Taltal: {{ contTaltal }}</li>
                    <li class="list-group-item">
                      Total por Ciudad: {{ contTotalCiudad }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col">
                <div class="card bg-primary text-light text-center">
                  <div class="card-body">
                    <h5 class="card-title">
                      Cantidad de Empresas por Categoría
                    </h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Micro: {{ contMicro }}</li>
                    <li class="list-group-item">Pequeña: {{ contPequenia }}</li>
                    <li class="list-group-item">Mediana: {{ contMediana }}</li>
                    <li class="list-group-item">Grande: {{ contGrande }}</li>
                    <li class="list-group-item">
                      Sin retornos declarados: {{ contSinRetornos }}
                    </li>
                    <li class="list-group-item">
                      Total por Categoría: {{ contTotalCategoria }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col">
                <div class="card bg-primary text-light text-center">
                  <div class="card-body">
                    <h5 class="card-title">Cantidad de Empresas por Rubro</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      Construcción: {{ contConstruccion }}
                    </li>
                    <li class="list-group-item">
                      Inmobiliaria: {{ contInmobiliaria }}
                    </li>
                    <li class="list-group-item">
                      Manufactura: {{ contManufactura }}
                    </li>
                    <li class="list-group-item">
                      Servicios: {{ contServicios }}
                    </li>
                    <li class="list-group-item">
                      Comercio: {{ contComercio }}
                    </li>
                    <li class="list-group-item">Turismo: {{ contTurismo }}</li>
                    <li class="list-group-item">Otros: {{ contRubroOtros }}</li>
                    <li class="list-group-item">
                      Total por Rubro: {{ contTotalRubro }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="card bg-primary text-light text-center">
                  <div class="card-body">
                    <h5 class="card-title">Cantidad de Empresas Vigente</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      Vigente: {{ contVigenteEmpresa }}
                    </li>
                    <li class="list-group-item">
                      No Vigente: {{ contNoVigenteEmpresa }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="col">
                <div class="card bg-primary text-light text-center">
                  <div class="card-body">
                    <h5 class="card-title">Cantidad de Proveedores</h5>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">{{ contProv }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "UsuarioIndex",
  data() {
    return {
      contProv: 0,
      contChequeo: 0,
      contDiag: 0,
      contSeguimiento: 0,
      contMulti: 0,
      contPropia: 0,
      contExterna: 0,
      contMicro: 0,
      contPequenia: 0,
      contMediana: 0,
      contGrande: 0,
      contSinRetornos: 0,
      contAntogagasta: 0,
      contCalama: 0,
      contSanPedro: 0,
      contTocopilla: 0,
      contMaria: 0,
      contMejillones: 0,
      contTaltal: 0,
      contTotalCategoria: 0,
      contTotalAsistencias: 0,
      contTotalCiudad: 0,
      contConstruccion: 0,
      contInmobiliaria: 0,
      contManufactura: 0,
      contServicios: 0,
      contComercio: 0,
      contTurismo: 0,
      contRubroOtros: 0,
      contTotalRubro: 0,
      contVigenteEmpresa: 0,
      contNoVigenteEmpresa: 0,
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    obtenerDatos() {
      axios.get("http://localhost:58613/api/Metrica").then((response) => {
        console.log(response.data);
        var data = response.data.message;
        var respuesta = data.split(",");
        this.contDiag = respuesta[0];
        this.contChequeo = respuesta[1];
        this.contMulti = respuesta[2];
        this.contPropia = respuesta[3];
        this.contExterna = respuesta[4];
        this.contProv = respuesta[5];
        this.contMicro = respuesta[6];
        this.contPequenia = respuesta[7];
        this.contMediana = respuesta[8];
        this.contGrande = respuesta[9];
        this.contSinRetornos = respuesta[10];
        this.contAntogagasta = respuesta[11];
        this.contCalama = respuesta[12];
        this.contSanPedro = respuesta[13];
        this.contTocopilla = respuesta[14];
        this.contMaria = respuesta[15];
        this.contMejillones = respuesta[16];
        this.contTaltal = respuesta[17];
        this.contConstruccion = respuesta[18];
        this.contInmobiliaria = respuesta[19];
        this.contManufactura = respuesta[20];
        this.contServicios = respuesta[21];
        this.contComercio = respuesta[22];
        this.contTurismo = respuesta[23];
        this.contRubroOtros = respuesta[24];
        this.contVigenteEmpresa = respuesta[25];
        this.contNoVigenteEmpresa = respuesta[26];
        this.contTotalRubro =
          parseInt(this.contInmobiliaria) +
          parseInt(this.contConstruccion) +
          parseInt(this.contManufactura) +
          parseInt(this.contServicios) +
          parseInt(this.contComercio) +
          parseInt(this.contTurismo) +
          parseInt(this.contRubroOtros);
        this.contTotalCategoria =
          parseInt(this.contGrande) +
          parseInt(this.contMicro) +
          parseInt(this.contMediana) +
          parseInt(this.contPequenia) +
          parseInt(this.contSinRetornos);
        this.contTotalAsistencias =
          parseInt(this.contExterna) +
          parseInt(this.contMulti) +
          parseInt(this.contPropia);
        this.contTotalCiudad =
          parseInt(this.contAntogagasta) +
          parseInt(this.contCalama) +
          parseInt(this.contMaria) +
          parseInt(this.contMejillones) +
          parseInt(this.contSanPedro) +
          parseInt(this.contTaltal) +
          parseInt(this.contTocopilla);
      });
    },
  },
  created: function () {
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
    this.obtenerDatos();
  },
};
</script>

<style>
.principal {
  padding-top: 20px;
  width: auto;
  position: center center;
  padding: 5%;
  padding-top: 2%;
}

.bg-success {
  --bs-bg-opacity: 1;
  background-color: rgba(
    var(--bs-success-rgb),
    var(--bs-bg-opacity)
  ) !important;
}
</style>