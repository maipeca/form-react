import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const App = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Aquí podrías enviar los datos al servidor si fuera necesario.
      // En este ejemplo, solo mostraremos los datos en la sección de resultados.
      setSubmittedData(data);

      // Limpia el formulario después del envío.
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Formulario</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nome:</label>
            <input {...register("nombre", { required: true })} />
            {errors.nombre && <p>Este campo es obligatorio</p>}
          </div>

          <div>
            <label>Idade:</label>
            <input type="number" {...register("edad", { required: true })} />
            {errors.edad && <p>Este campo es obligatorio</p>}
          </div>

          <div>
            <label>Gênero:</label>
            <select {...register("sexo", { required: true })}>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            {errors.sexo && <p>Este campo es obligatorio</p>}
          </div>

          <div>
            <label>Estado civil:</label>
            <input {...register("estadoCivil")} />
          </div>

          {/* Si se selecciona un tipo de documento, muestra el campo CPF */}
          <div>
            <label>Tipo de documento:</label>
            <select {...register("tipoDocumento")}>
              <option value="dni">CPF</option>
              <option value="pasaporte">Passaporte</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {["cpf", "passaporte", "outro"].includes(register("tipoDocumento")?.value) && (
            <div>
              <label>CPF:</label>
              <input {...register("cpf")} />
            </div>
          )}

          <button type="submit">Enviar</button>
        </form>
      </div>

      {submittedData && (
        <div className="result-container">
          <h2>Resposta:</h2>
          <p>Nome: {submittedData.nombre}</p>
          <p>Idade: {submittedData.edad}</p>
          <p>Gênero: {submittedData.sexo}</p>
          <p>Estado civil: {submittedData.estadoCivil}</p>
          <p>Tipo de documento: {submittedData.tipoDocumento}</p>
          {submittedData.tipoDocumento === "dni" && (
            <p>CPF {submittedData.cpf}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;



