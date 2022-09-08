<template>
  <div id="cargaexcel">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="card mt-4">
          <div class="card-body">
            <div class="input-group">
              <div class="input-group-append">
                <h4>Cargar Empresas</h4>
                <br />
                <h5>
                  Ingrese documento en Excel para hacer la carga masiva de
                  empresas
                </h5>
                <br />
                <input
                  class="form-control"
                  id="archivoExcel"
                  type="file"
                  @change="subirExcel()"
                />
                <!-- Tabla de datos de excel -->
                <table class="table">
                  <tbody>
                    <tr v-for="empresa in items" :key="empresa.rut">
                      <th scope="row">{{ empresa[4] }}</th>
                      <th scope="row">{{ empresa[2] }}</th>
                      <th scope="row">{{ empresa[6] }}</th>
                      <th scope="row">{{ empresa[3] }}</th>
                      <th scope="row">{{ empresa[7] }}</th>
                      <th scope="row">{{ empresa[8] }}</th>
                      <th scope="row">{{ empresa[10] }}</th>
                      <th scope="row">{{ empresa[11] }}</th>
                    </tr>
                  </tbody>
                </table>
                <button
                  v-if="subir"
                  type="button"
                  class="btn btn-primary"
                  @click="subirdatos"
                >
                  Subir Empresas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import readXlsFile from "read-excel-file";
import axios from "axios";
export default {
  
  /**
   * Atributos de excel
   */
  data() {
    return {
      errores: [],
      items: [],
      subir: false,
      nuevaempresa: {
        rut: "",
        nombre: "",
        razon: "",
        correo: "",
        direccion: "",
        ciudad: "",
        categoria: "",
        rubro: "",
      },
    };
  },

  methods: {

    /**
     * Sube el archivo excel a la instancia de la vista
     */
    subirExcel() {
      const input = document.getElementById("archivoExcel");
      readXlsFile(input.files[0]).then((rows) => {
        this.items = rows;
        this.subir = true;
      });
    },

    /**
     * Valida el rut ingresado y lo corrige en su formato
     */
    validar(ingresado) {
      var ultimo = ingresado.length;
      if (ingresado.charAt(ultimo - 1) == "k") {
        var final = [];
        var pos = 0;
        for (var i = 0; i < ultimo; i++) {
          if (Number.isInteger(parseInt(ingresado.charAt(i)))) {
            final[pos] = ingresado.charAt(i);
            pos++;
          }
        }
        if (final.length == 0) {
          ingresado = "";
          alert("Agregue un valor valido.");
        } else {
          return final.join("") + "-k";
        }
      } else {
        var final = [];
        var pos = 0;
        for (var i = 0; i < ultimo; i++) {
          if (Number.isInteger(parseInt(ingresado.charAt(i)))) {
            final[pos] = ingresado.charAt(i);
            pos++;
          }
        }
        if (final.length == 0) {
          ingresado = "";
          alert("Agregue un valor valido.");
        } else {
          final = final.join("");
          var valorultimo = final + "cambio";
          return valorultimo.replace(
            final.charAt(final.length - 1) + "cambio",
            "-" + final.charAt(final.length - 1)
          );
        }
      }
    },

    /** 
     * Verfica si el rut exite, si existe retorna true, al 
     * contrario false
     */
    validaRut: function (rutCompleto) {
      rutCompleto = rutCompleto.replace("‐", "-");
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
      var tmp = rutCompleto.split("-");
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == "K") digv = "k";

      return this.dv(rut) == digv;
    },

    /**
     * Calcula si el numero verificador es correcto, si lo es retorna
     * true, al contrario false
     */
    dv: function (T) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    },

    /**
     * Sube todas las row del archuivo excel, verifica si estan en los valores corrector,
     * los verifica, corrigue y si nos es podible emitira que la empresa 
     * no se pudo ingresar a la base de datos
     */
    async subirdatos() {
      let text = "¿Estás seguro de subir el archivo?";
      var pos = 0;

      if (confirm(text) == true) {
        for (var i = 1; i < this.items.length; i++) {
          this.items[i][2] = this.validar(this.items[i][2].toString());
          if (this.validaRut(this.items[i][2])) {
            if (this.items[i][4] == null) {
              this.items[i][4] = "Sin asignar";
            }
            if (this.items[i][5] == null) {
              this.items[i][5] = "Sin asignar";
            }
            if (
              this.items[i][10] != "Construcción" &&
              this.items[i][10] != "Inmobiliaria" &&
              this.items[i][10] != "Manufactura" &&
              this.items[i][10] != "Servicios" &&
              this.items[i][10] != "Comercio" &&
              this.items[i][10] != "Turismo"
            ) {
              this.items[i][10] = "Otros";
            }
            if (this.items[i][7] == null) {
              this.items[i][7] = "Sin asignar";
            }
            if (this.items[i][11] == "micro" || this.items[i][11] == "Micro") {
              this.items[i][11] = "Micro";
            } else if (
              this.items[i][11] == "pequeña" ||
              this.items[i][11] == "Pequeña"
            ) {
              this.items[i][11] = "Pequeña";
            } else if (
              this.items[i][11] == "mediana" ||
              this.items[i][11] == "Mediana"
            ) {
              this.items[i][11] = "Mediana";
            } else if (
              this.items[i][11] == "grande" ||
              this.items[i][11] == "Grande"
            ) {
              this.items[i][11] = "Grande";
            } else if (
              this.items[i][11] == "sin retornos declarado" ||
              this.items[i][11] == "sin retornos declarados" ||
              this.items[i][11] == "Sin retornos declarado" ||
              this.items[i][11] == "Sin retornos declarados"
            ) {
              this.items[i][11] = "Sin retornos declarados";
            } else {
              this.items[i][11] = "Otros";
            }
            this.nuevaempresa = {
              id: 0,
              nombreContacto: this.items[i][5],
              rut: this.items[i][2],
              nombre: this.items[i][4],
              razon: this.items[i][3],
              correo: this.items[i][6],
              direccion: this.items[i][7],
              ciudad: this.items[i][8],
              rubro: this.items[i][10],
              categoria: this.items[i][11],
            };
            await axios
              .post("http://localhost:58613/api/Empresa", this.nuevaempresa)
              .then((result) => {
                console.log(result);
                var prueba = result.data;
                if (prueba.message == "rut") {
                  this.errores[pos] = this.nuevaempresa.rut;
                  pos++;
                }
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            this.errores[pos] = this.items[i][2];
            pos++;
          }
        }
        if (pos == 0) {
          await alert("Se agregaron todas las empresas.");
        } else {
          await alert(
            "No se agregaron las siguientes empresas: " + this.errores
          );
        }
      }
    },
  },
  created:function(){
    axios.defaults.headers.common['Authorization']='Bearer ' +sessionStorage.getItem("token");
  }
  
};
</script>
