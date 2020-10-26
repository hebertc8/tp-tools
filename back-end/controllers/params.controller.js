const TYPES = require("tedious").TYPES;
const moment = require("moment");


/*
let parametrizacion = (data) => {
    console.log(data)
    try {
        let obj = {
            table: [],
        };
        data.forEach((dato) => {
            let nombre = dato.item;
            let valor = dato.datos.valor;
            let tipo = dato.datos.tipo;
            console.log(nombre, valor, tipo)
            if (tipo == "varchar") {
                obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.VarChar });
            } else if (tipo == "int") {
                obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Int });
            } else if (tipo == "bit") {
                obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Bit });
            } else if (tipo == "date") {
                obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Date });
            } else if (tipo == "time") {
                obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Time });
            } else if (tipo == "char") {
                obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Char });
            } else if (tipo == "bigint") {
                obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.BigInt });
            }
        });
        return obj.table;
    } catch (error) {
        console.log(error);
        return error;
    }
};*/

let = parametrizacion = (data) => {
    try {
        return data.map(({ name, value, type, schema }) => ({ nombre: name, valor: value, tipo: type }));
    } catch (error) {
        console.error(error);
        return error;
    }
}


class SpParam {
    name;
    value;
    type;
    schema;

    constructor(name, value, type, schema = null) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.schema = schema;
    }
}

exports.parametros = (req, tipo) => {
    switch (tipo) {
        case "SP_Users": // trae campaña de usuario
            console.log(req);
            return parametrizacion([
                new SpParam('ID', req.idccms, TYPES.Int)
            ]);

        case "SP_Tools":
            return parametrizacion([
                new SpParam('Campaign', req.data, TYPES.VarChar)
            ]);
        case "sp_urls":
            return parametrizacion([
                new SpParam('Tool_ID', req.tool, TYPES.Int)
            ])
        case "spInsertCentral":
            return parametrizacion([
                { item: "central", datos: { valor: req.central, tipo: "varchar" } },
                { item: "mercado", datos: { valor: req.mercado, tipo: "varchar" } },
                { item: "pais", datos: { valor: req.pais, tipo: "varchar" } },
            ]);
        case "spUpdateCentral":
            return parametrizacion([
                { item: "id", datos: { valor: req.id, tipo: "int" } },
                { item: "central", datos: { valor: req.central, tipo: "varchar" } },
                { item: "mercado", datos: { valor: req.mercado, tipo: "varchar" } },
                { item: "pais", datos: { valor: req.pais, tipo: "varchar" } },
            ]);
        case "spDeleteCentral":
            return parametrizacion([
                { item: "id", datos: { valor: req.id, tipo: "int" } },
            ]);

        default:
            break;
    }
    var size = Object.keys(req.body).length;
    if (size == 0) {
        return [];
    }
};