<template>
  <div class="login">
    <div class="inc">
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <!-- Icon -->
          <div class="fadeIn first">
            <img
              style="
                margin-right: 20px;
                margin-bottom: 20px;
                margin-top: 20px;
                margin-left: 20px;
              "
              src="@/assets/images/LOGORGB.png"
              id="icon"
              alt="User Icon"
              height="120"
              width="100"
            />
          </div>

          <!-- Tabs Titles -->
          <div class="body">Iniciar Sesión</div>

          <!-- Login Form -->
          <form v-on:submit.prevent="login">
            <input
              type="text"
              id="correo"
              class="fadeIn second"
              name="login"
              placeholder="Usuario"
              v-model="state.correo"
            />

            <div class="body" style="color: red" v-if="v$.correo.$error">
              {{ v$.correo.$errors[0].$message }}
            </div>

            <input
              type="password"
              id="pass"
              class="fadeIn third"
              name="login"
              placeholder="Contraseña"
              v-model="state.pass"
            />

            <div class="body" style="color: red" v-if="v$.pass.$error">
              {{ v$.pass.$errors[0].$message }}
            </div>

            <input
              type="submit"
              @click="userLogin()"
              class="fadeIn fourth"
              value="Ingresar"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { reactive, computed } from "@vue/runtime-core";

export default {
  name: "LoginForm",
  setup() {
    //data
    const state = reactive({
      pass: "",
      correo: "",
      auth: "",
    });
    const rules = computed(() => {
      return {
        pass: { required },
        correo: { required, email },
      };
    });

    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },

  methods: {
    ...mapActions(["redirectTo"]),
    async userLogin() {
      this.v$.$validate();

      if (!this.v$.$error) {
        var resultados;
        let result = await axios.get(
          "http://localhost:58613/api/LogUser?correo=" +
            this.state.correo +
            "&pass=" +
            this.state.pass
        );
        console.log(result);
        if (result.data.id > 0) {
          var axiostoken = "Bearer " + result.data.token;

          axios.defaults.headers.common["Authorization"] = axiostoken;

          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("correo", this.state.correo);
          sessionStorage.setItem("rut", result.data.rut);
          sessionStorage.setItem("tipo", result.data.tipo);
          sessionStorage.setItem("nombre", result.data.nombre);
          sessionStorage.setItem("id", result.data.id);
          console.log("logueado");
          this.onSubmit();
          alert("Bienvenido");
        } else if (result.data.id == 0) {
          console.log("usuario");
          alert("Usuario o contraseña incorrecto");
        } else if (result.data.id == -1) {
          console.log("cointraseña");
          alert("Usuario o contraseña incorrecto");
        }
      }
    },
    async onSubmit() {
      try {
        await this.$store.dispatch("doLogin");
        this.$router.push({ name: "inicio" });
      } catch (error) {
        console.error(error);
      }
    },
  },
  created: function () {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + sessionStorage.getItem("token");
  },
};
</script>

<style scoped>
/* BASIC */
html {
  background-color: #56baed;
}
body {
  font-family: "Poppins", sans-serif;
  height: 100%;
}
a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}
h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}
/* STRUCTURE */
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}
#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}
#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}
/* TABS */
h2.inactive {
  color: #cccccc;
}
h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}
/* FORM TYPOGRAPHY*/
input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}
input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
input[type="text"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}
input[type="text"]:placeholder {
  color: #cccccc;
}
input[type="password"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}
input[type="password"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}
input[type="password"]:placeholder {
  color: #cccccc;
}
/* ANIMATIONS */
/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}
.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}
/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}
.underlineHover:hover {
  color: #0d0d0d;
}
.underlineHover:hover:after {
  width: 100%;
}
/* OTHERS */
*:focus {
  outline: none;
}
#icon {
  width: 60%;
}

.inc {
  background-image: url("~@/assets/images/002-FONDOZOOMYTEAMS.png");

  background-repeat: no-repeat;
  background-position: bottom left;
  position: absolute;
  background-color: #fff;
  background-size: 100%;
  height: 100%;
  width: 100%;
}
</style>
