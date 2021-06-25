const mongoose = require("mongoose");

let TareaSchema = new mongoose.Schema({
  /* idTarea: Number,
  nombreTarea: String,
  detalleTarea: String, */
  tipoDocuTarea: String,
  docuTarea: Number,
  nombreTarea: String,
  apellidoTarea: String,
  direcTarea: String,
  correoTarea: String,
  teleFijoTarea: Number,
  teleCeluTarea: Number,
  webTarea: String,
  descripTarea: String,
});

module.exports = mongoose.model("tarea", TareaSchema, "Tareas");
