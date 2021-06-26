//console.log("Hola mundo Node.js");
const port = 3000;

const express = require("express");
const mongoose = require("mongoose");
const TareaSchema = require("./modelos/Tarea.js");

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conexión a base de datos
mongoose.connect(
  "mongodb+srv://prog_web:ProgWebMintic2022@clusterprogweb.y4mgk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
//Operaciones CRUD
router.get("/", (req, res) => {
  res.send("El inicio de mi API");
});

router.get("/tarea", (req, res) => {
  TareaSchema.find((err, datos) => {
    if (err) {
      console.log("Error leyendo las tareas");
    } else {
      res.send(datos);
    }
  });
});

router.put("/tarea",(req,res)=>{
  let body = req.body
  TareaSchema.updateOne({_id:body._id},{
    $set: req.body
  },function(error, info) {
            if (error) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo modificar el cliente',
                    err
                });
            } else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        })

})

router.delete("/tarea/:id", async (req, res) => {
  // res.send(`Se elimino ${req.params.perId}`);
  let pId = req.params.id;
  console.log(pId);
  await TareaSchema.findByIdAndDelete(pId);
  res.send(`Se elimino ${pId}`);

  /* TareaSchema.findById(pId, (err, person) => {
    res.send(`Se elimino ${person}`);
      if (err)
      res.status(500).send({ message: `Error al borrar el producto: ${err}` });

    person.remove((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `Error al borrar el producto: ${err}` });
      } else {
        res.status(200).send({ message: `La persona se ha eliminado` });
      }
    });
  }); */
  // res.send(`Se elimino ${req.body.documento}`);
});

router.post("/tarea", (req, res) => {
  let nuevaTarea = new TareaSchema({
    /* idTarea: req.body.id,
    nombreTarea: req.body.nombre,
    detalleTarea: req.body.detalle, */
    tipoDocuTarea: req.body.tipo,
    docuTarea: req.body.documento,
    nombreTarea: req.body.nombre,
    apellidoTarea: req.body.apellido,
    direcTarea: req.body.direccion,
    correoTarea: req.body.correo,
    teleFijoTarea: req.body.fijo,
    teleCeluTarea: req.body.celular,
    webTarea: req.body.web,
    descripTarea: req.body.descripcion,
  });

  nuevaTarea.save((err, datos) => {
    if (err) {
      console.log(err);
    }
    //console.log(idTarea);
    res.send("Tarea almacenada correctamente");
  });
});
//iniciar el servidor
app.use(router);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
