import React from "react";
import "./App.css";
import { init, shuffle } from "./components/utils";

const SEED = 1;

const codes = [
  // Fecha de nacimiento
  { nombre: "María", codigo: "1980", verificacion: 1, codigoAsignado: "" },
  // Últimos 4 números de teléfono
  {
    nombre: "José Antonio",
    codigo: "6979",
    verificacion: 2,
    codigoAsignado: "",
  },
  // Últimos 4 dígitos del dni
  { nombre: "Cristina", codigo: "8315", verificacion: 4, codigoAsignado: "" },
  // Primeros 4 dígitos del dni
  { nombre: "Jónatan", codigo: "4889", verificacion: 8, codigoAsignado: "" },
  // Primeros 4 números del dni
  {
    nombre: "María del Carmen",
    codigo: "3140",
    verificacion: 16,
    codigoAsignado: "",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);

    init(SEED);
    let codigos = codes.map((e) => e.codigo);
    codes.forEach((e, idx) =>
      Object.assign(e, { codigoAsignado: codigos[idx] })
    );

    while (!this.check_valid(codigos)) {
      codigos = shuffle(codigos);
      codes.forEach((e, idx) =>
        Object.assign(e, { codigoAsignado: codigos[idx] })
      );
    }

    console.log(codes);
    this.state = {
      miCodigo: "",
      codigos: codes,
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchByCode = this.searchByCode.bind(this);
  }

  check_valid(codigos) {
    if (codigos.length !== codes.length) {
      console.log("Las longitudes no coinciden");
      return false;
    }
    // Comprobar que nadie está asignado a si mismo
    for (let i = 0; i < codigos.length; i++) {
      if (codigos[i] === codes[i].codigo) {
        console.log("Alguien está asignado a sí mismo");
        return false;
      }
    }
    // Comprobar no hay ningún ciclo de 2 personas
    debugger;
    for (let i = 0; i < codigos.length; i++) {
      const personaA = codes[i];
      const asignadoA = codigos[i];

      let personaB = null;

      for (let j = 0; j < codes.length; j++) {
        if (codes[j].codigo === asignadoA) {
          personaB = codes[j];
        }
      }

      if (personaA.codigo === personaB.codigoAsignado) {
        console.log("Dos personas asignadas entre sí");
        return false;
      }
    }
    return true;
  }

  searchByCode(code) {
    return this.state.codigos.filter((e) => e.codigo === code)[0];
  }

  handleChange(e) {
    const regex = /^\d{0,4}$/gm;
    const newVal = e.target.value;
    if (regex.test(newVal)) {
      this.setState({ miCodigo: newVal });
    }
  }

  render() {
    let resultado = null;
    if (this.state.miCodigo.length === 4) {
      const me = this.searchByCode(this.state.miCodigo);
      if (me) {
        const amigo = this.searchByCode(me.codigoAsignado);
        resultado = (
          <div className="resultado">
            Hola <span className="enfasis">{me.nombre}</span>, tienes que
            hacerle tu regalo a <span className="enfasis">{amigo.nombre}</span>{" "}
            y el código de verificación es{" "}
            <span className="enfasis">{amigo.verificacion}</span>
          </div>
        );
      }
    }
    return (
      <div className="App">
        <h1>Amigo invisible</h1>
        <input
          type="text"
          placeholder="Código"
          value={this.state.miCodigo}
          onChange={this.handleChange}
        ></input>
        {resultado}
      </div>
    );
  }
}

export default App;
