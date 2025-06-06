import { Router } from "express";

import { getKardex, createKardex, updateKardex, deleteKardex, updateTransaccionKardex, getMateriasByGrupo, createKardexExtraordinario } 
from "../../controllers/Parametrizacion/kardex.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getKardex);
router.post("/create",bitacora('Creación', 'Se agrego a un Kardex'), createKardex);
router.put("/update/:idKardex", bitacora('Actualización', 'Se actualizo un Kardex'), updateKardex);
router.delete("/delete/:idKardex",bitacora('Eliminación', 'Se elimino un Kardex') , deleteKardex);

router.put("/update2/:idKardex", bitacora('Actualización', 'Se actualizo un Kardex con transacción'), updateTransaccionKardex);

//EXTRAORDINARIOS
router.get("/materias/:idGrupo", getMateriasByGrupo);
router.post("/createExtraordinario", bitacora('Creación', 'Se agrego a un Kardex Extraordinario'), createKardexExtraordinario);

export default router;
