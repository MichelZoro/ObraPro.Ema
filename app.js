// ==========================================
// GESTOR CONTRATISTA - EMANUEL
// ==========================================


// ================= DATOS =================

let empleados =
    JSON.parse(localStorage.getItem("empleados")) || [];

let obras =
    JSON.parse(localStorage.getItem("obras")) || [];

let horas =
    JSON.parse(localStorage.getItem("horas")) || [];

let pagos =
    JSON.parse(localStorage.getItem("pagos")) || [];


// ================= ACCESO =================

let codigoAcceso =
    localStorage.getItem("codigoAcceso") || "";

let appDesbloqueada = false;


// ================= DÍAS =================

const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];


// ================= GUARDAR =================

function guardarDatos() {

    localStorage.setItem(
        "empleados",
        JSON.stringify(empleados)
    );

    localStorage.setItem(
        "obras",
        JSON.stringify(obras)
    );

    localStorage.setItem(
        "horas",
        JSON.stringify(horas)
    );

    localStorage.setItem(
        "pagos",
        JSON.stringify(pagos)
    );
}


// ================= ACCESO =================

function verificarAcceso() {

    const pantalla =
        document.getElementById("pantallaAcceso");

    const app =
        document.getElementById("contenidoApp");

    const input =
        document.getElementById("codigoAcceso");

    if (!codigoAcceso) {

        document
            .getElementById("configurarCodigo")
            .style.display = "block";

        document
            .getElementById("ingresarCodigo")
            .style.display = "none";

        return;
    }

    document
        .getElementById("configurarCodigo")
        .style.display = "none";

    document
        .getElementById("ingresarCodigo")
        .style.display = "block";

    input.value = "";

    pantalla.classList.add("mostrar");
    app.classList.add("oculto");
}


function crearCodigo() {

    const nuevoCodigo =
        document
        .getElementById("nuevoCodigo")
        .value.trim();

    if (nuevoCodigo.length < 4) {

        alert("El código debe tener al menos 4 números.");

        return;
    }

    if (!/^[0-9]+$/.test(nuevoCodigo)) {

        alert("El código debe contener solamente números.");

        return;
    }

    codigoAcceso = nuevoCodigo;

    localStorage.setItem(
        "codigoAcceso",
        codigoAcceso
    );

    alert("Código creado correctamente.");

    document
        .getElementById("nuevoCodigo")
        .value = "";

    mostrarApp();
}


function entrarApp() {

    const codigo =
        document
        .getElementById("codigoAcceso")
        .value.trim();

    if (codigo === codigoAcceso) {

        mostrarApp();

        return;
    }

    document
        .getElementById("errorAcceso")
        .textContent =
            "Código incorrecto. Intentá nuevamente.";

}


function mostrarApp() {

    appDesbloqueada = true;

    document
        .getElementById("pantallaAcceso")
        .classList.remove("mostrar");

    document
        .getElementById("contenidoApp")
        .classList.remove("oculto");

    document
        .getElementById("codigoAcceso")
        .value = "";

    document
        .getElementById("errorAcceso")
        .textContent = "";

    renderizar();
}


function bloquearApp() {

    appDesbloqueada = false;

    document
        .getElementById("contenidoApp")
        .classList.add("oculto");

    document
        .getElementById("pantallaAcceso")
        .classList.add("mostrar");

    verificarAcceso();
}


function cambiarCodigo() {

    const actual =
        prompt("Ingresá tu código actual:");

    if (actual !== codigoAcceso) {

        alert("Código actual incorrecto.");

        return;
    }

    const nuevo =
        prompt("Ingresá el nuevo código:");

    if (!nuevo || nuevo.length < 4) {

        alert("El nuevo código debe tener al menos 4 números.");

        return;
    }

    if (!/^[0-9]+$/.test(nuevo)) {

        alert("El código debe contener solamente números.");

        return;
    }

    codigoAcceso = nuevo;

    localStorage.setItem(
        "codigoAcceso",
        codigoAcceso
    );

    alert("Código cambiado correctamente.");
}


// ================= MENÚ =================

function toggleMenu() {

    document
        .getElementById("menu")
        .classList.toggle("mostrar");
}


function mostrarSeccion(nombre) {

    document
        .querySelectorAll(".seccion")
        .forEach(seccion => {

            seccion.classList.remove("activa");

        });


    document
        .getElementById(nombre)
        .classList.add("activa");


    document
        .getElementById("menu")
        .classList.remove("mostrar");

}


// ================= MODALES =================

function abrirModalEmpleado(id = null) {

    limpiarEmpleado();

    document
        .getElementById("idEmpleadoEditar")
        .value = "";

    document
        .getElementById("tituloModalEmpleado")
        .textContent = "Nuevo empleado";

    if (id !== null) {

        const empleado =
            empleados.find(e => e.id === id);

        if (!empleado) return;

        document
            .getElementById("idEmpleadoEditar")
            .value = empleado.id;

        document
            .getElementById("nombreEmpleado")
            .value = empleado.nombre;

        document
            .getElementById("puestoEmpleado")
            .value = empleado.puesto;

        document
            .getElementById("telefonoEmpleado")
            .value = empleado.telefono;

        document
            .getElementById("valorEmpleado")
            .value = empleado.valor;

        diasSemana.forEach(dia => {

            const checkbox =
                document.getElementById(
                    "dia" + dia
                );

            if (checkbox) {

                checkbox.checked =
                    empleado.dias
                    ? empleado.dias.includes(dia)
                    : false;
            }
        });

        document
            .getElementById("tituloModalEmpleado")
            .textContent = "Editar empleado";
    }

    document
        .getElementById("modalEmpleado")
        .classList.add("mostrar");
}


function abrirModalObra() {

    document
        .getElementById("modalObra")
        .classList.add("mostrar");
}


function abrirModalHoras() {

    cargarSelects();

    document
        .getElementById("fechaHoras")
        .valueAsDate = new Date();

    document
        .getElementById("modalHoras")
        .classList.add("mostrar");
}


function abrirModalPago() {

    cargarSelects();

    document
        .getElementById("fechaPago")
        .valueAsDate = new Date();

    document
        .getElementById("modalPago")
        .classList.add("mostrar");
}


function cerrarModal(id) {

    document
        .getElementById(id)
        .classList.remove("mostrar");
}


// ================= EMPLEADOS =================

function guardarEmpleado() {

    const id =
        document
        .getElementById("idEmpleadoEditar")
        .value;

    const nombre =
        document
        .getElementById("nombreEmpleado")
        .value.trim();

    const puesto =
        document
        .getElementById("puestoEmpleado")
        .value.trim();

    const telefono =
        document
        .getElementById("telefonoEmpleado")
        .value.trim();

    const valor =
        document
        .getElementById("valorEmpleado")
        .value;


    const dias = [];

    diasSemana.forEach(dia => {

        const checkbox =
            document.getElementById(
                "dia" + dia
            );

        if (checkbox && checkbox.checked) {

            dias.push(dia);

        }

    });


    if (!nombre) {

        alert("Ingresá el nombre del empleado.");

        return;
    }


    if (dias.length === 0) {

        alert("Seleccioná al menos un día de trabajo.");

        return;
    }


    if (id) {

        const empleado =
            empleados.find(
                e => e.id === Number(id)
            );

        if (!empleado) return;

        empleado.nombre = nombre;

        empleado.puesto =
            puesto || "Sin especificar";

        empleado.telefono =
            telefono || "Sin teléfono";

        empleado.valor =
            Number(valor) || 0;

        empleado.dias = dias;

    } else {

        empleados.push({

            id: Date.now(),

            nombre: nombre,

            puesto:
                puesto || "Sin especificar",

            telefono:
                telefono || "Sin teléfono",

            valor:
                Number(valor) || 0,

            dias: dias

        });

    }


    guardarDatos();

    limpiarEmpleado();

    cerrarModal("modalEmpleado");

    renderizar();

}


function limpiarEmpleado() {

    const campos = [
        "nombreEmpleado",
        "puestoEmpleado",
        "telefonoEmpleado",
        "valorEmpleado",
        "idEmpleadoEditar"
    ];

    campos.forEach(id => {

        const elemento =
            document.getElementById(id);

        if (elemento) {

            elemento.value = "";

        }

    });


    diasSemana.forEach(dia => {

        const checkbox =
            document.getElementById(
                "dia" + dia
            );

        if (checkbox) {

            checkbox.checked = false;

        }

    });

}


function editarEmpleado(id) {

    abrirModalEmpleado(id);
}


function eliminarEmpleado(id) {

    if (!confirm("¿Eliminar este empleado?")) {

        return;
    }


    empleados =
        empleados.filter(e => e.id !== id);


    guardarDatos();

    renderizar();
}


// ================= OBRAS =================

function guardarObra() {

    const nombre =
        document
        .getElementById("nombreObra")
        .value.trim();

    const direccion =
        document
        .getElementById("direccionObra")
        .value.trim();

    const cliente =
        document
        .getElementById("clienteObra")
        .value.trim();


    if (!nombre) {

        alert("Ingresá el nombre de la obra.");

        return;
    }


    obras.push({

        id: Date.now(),

        nombre: nombre,

        direccion:
            direccion || "Sin dirección",

        cliente:
            cliente || "Sin cliente",

        activa: true

    });


    guardarDatos();

    limpiarObra();

    cerrarModal("modalObra");

    renderizar();

}


function limpiarObra() {

    document
        .getElementById("nombreObra")
        .value = "";

    document
        .getElementById("direccionObra")
        .value = "";

    document
        .getElementById("clienteObra")
        .value = "";
}


function eliminarObra(id) {

    if (!confirm("¿Eliminar esta obra?")) {

        return;
    }


    obras =
        obras.filter(o => o.id !== id);


    guardarDatos();

    renderizar();
}


// ================= HORAS =================

function guardarHoras() {

    const empleadoId =
        Number(
            document
            .getElementById("empleadoHoras")
            .value
        );

    const obraId =
        Number(
            document
            .getElementById("obraHoras")
            .value
        );

    const fecha =
        document
        .getElementById("fechaHoras")
        .value;

    const cantidad =
        Number(
            document
            .getElementById("cantidadHoras")
            .value
        );


    if (!empleadoId || !obraId || !fecha || !cantidad) {

        alert("Completá todos los datos.");

        return;
    }


    const fechaObj =
        new Date(fecha + "T12:00:00");

    const dia =
        fechaObj.toLocaleDateString(
            "es-ES",
            { weekday: "long" }
        );

    const diaCapitalizado =
        dia.charAt(0).toUpperCase() +
        dia.slice(1);


    horas.push({

        id: Date.now(),

        empleadoId,

        obraId,

        fecha,

        dia: diaCapitalizado,

        cantidad

    });


    guardarDatos();


    document
        .getElementById("cantidadHoras")
        .value = "";

    cerrarModal("modalHoras");

    renderizar();

}


// ================= PAGOS =================

function guardarPago() {

    const empleadoId =
        Number(
            document
            .getElementById("empleadoPago")
            .value
        );

    const fecha =
        document
        .getElementById("fechaPago")
        .value;

    const monto =
        Number(
            document
            .getElementById("montoPago")
            .value
        );

    const concepto =
        document
        .getElementById("conceptoPago")
        .value.trim();


    if (!empleadoId || !fecha || !monto) {

        alert("Completá los datos del pago.");

        return;
    }


    pagos.push({

        id: Date.now(),

        empleadoId,

        fecha,

        monto,

        concepto:
            concepto || "Pago"

    });


    guardarDatos();


    document
        .getElementById("montoPago")
        .value = "";

    document
        .getElementById("conceptoPago")
        .value = "";


    cerrarModal("modalPago");

    renderizar();

}


// ================= SELECTS =================

function cargarSelects() {

    const empleadoHoras =
        document.getElementById("empleadoHoras");

    const empleadoPago =
        document.getElementById("empleadoPago");


    if (!empleadoHoras || !empleadoPago) return;


    empleadoHoras.innerHTML =
        '<option value="">Seleccionar empleado</option>';

    empleadoPago.innerHTML =
        '<option value="">Seleccionar empleado</option>';


    empleados.forEach(empleado => {

        const option =
            document.createElement("option");

        option.value = empleado.id;

        option.textContent =
            empleado.nombre;


        empleadoHoras.appendChild(
            option.cloneNode(true)
        );

        empleadoPago.appendChild(option);

    });


    const obraHoras =
        document.getElementById("obraHoras");


    obraHoras.innerHTML =
        '<option value="">Seleccionar obra</option>';


    obras.forEach(obra => {

        const option =
            document.createElement("option");

        option.value = obra.id;

        option.textContent =
            obra.nombre;


        obraHoras.appendChild(option);

    });

}


// ================= MOSTRAR EMPLEADOS =================

function renderizarEmpleados() {

    const contenedor =
        document.getElementById("listaEmpleados");


    if (empleados.length === 0) {

        contenedor.innerHTML =
            '<div class="vacio">Todavía no hay empleados cargados.</div>';

        return;
    }


    contenedor.innerHTML = "";


    empleados.forEach(empleado => {

        const dias =
            empleado.dias &&
            empleado.dias.length
            ? empleado.dias.join(" · ")
            : "Sin días asignados";


        const div =
            document.createElement("div");

        div.className = "item";


        div.innerHTML = `

            <div class="item-info">

                <h3>👷 ${empleado.nombre}</h3>

                <p>${empleado.puesto}</p>

                <p>📞 ${empleado.telefono}</p>

                <p>
                    💰 Valor diario:
                    $${formatearNumero(empleado.valor)}
                </p>

                <p>
                    📅 ${dias}
                </p>

            </div>

            <div class="acciones">

                <button
                    class="editar"
                    onclick="editarEmpleado(${empleado.id})">

                    ✏️ Editar

                </button>

                <button
                    class="eliminar"
                    onclick="eliminarEmpleado(${empleado.id})">

                    🗑️

                </button>

            </div>

        `;


        contenedor.appendChild(div);

    });

}


// ================= MOSTRAR OBRAS =================

function renderizarObras() {

    const contenedor =
        document.getElementById("listaObras");


    if (obras.length === 0) {

        contenedor.innerHTML =
            '<div class="vacio">Todavía no hay obras cargadas.</div>';

        return;
    }


    contenedor.innerHTML = "";


    obras.forEach(obra => {

        const div =
            document.createElement("div");

        div.className = "item";


        div.innerHTML = `

            <div class="item-info">

                <h3>🏗️ ${obra.nombre}</h3>

                <p>📍 ${obra.direccion}</p>

                <p>👤 Cliente: ${obra.cliente}</p>

            </div>

            <button
                class="eliminar"
                onclick="eliminarObra(${obra.id})">

                🗑️

            </button>

        `;


        contenedor.appendChild(div);

    });

}


// ================= MOSTRAR HORAS =================

function renderizarHoras() {

    const contenedor =
        document.getElementById("listaHoras");


    if (horas.length === 0) {

        contenedor.innerHTML =
            '<div class="vacio">Todavía no hay horas registradas.</div>';

        return;
    }


    contenedor.innerHTML = "";


    horas
        .slice()
        .reverse()
        .forEach(registro => {

            const empleado =
                empleados.find(
                    e => e.id === registro.empleadoId
                );

            const obra =
                obras.find(
                    o => o.id === registro.obraId
                );


            const div =
                document.createElement("div");

            div.className = "item";


            div.innerHTML = `

                <div class="item-info">

                    <h3>
                        ⏱️ ${registro.cantidad} horas
                    </h3>

                    <p>
                        👷 ${
                            empleado
                            ? empleado.nombre
                            : "Empleado eliminado"
                        }
                    </p>

                    <p>
                        🏗️ ${
                            obra
                            ? obra.nombre
                            : "Obra eliminada"
                        }
                    </p>

                    <p>
                        📅 ${registro.dia || registro.fecha}
                    </p>

                    <p>
                        ${registro.fecha}
                    </p>

                </div>

            `;


            contenedor.appendChild(div);

        });

}


// ================= MOSTRAR PAGOS =================

function renderizarPagos() {

    const contenedor =
        document.getElementById("listaPagos");


    if (pagos.length === 0) {

        contenedor.innerHTML =
            '<div class="vacio">Todavía no hay pagos registrados.</div>';

        return;
    }


    contenedor.innerHTML = "";


    pagos
        .slice()
        .reverse()
        .forEach(pago => {

            const empleado =
                empleados.find(
                    e => e.id === pago.empleadoId
                );


            const div =
                document.createElement("div");

            div.className = "item";


            div.innerHTML = `

                <div class="item-info">

                    <h3>
                        💰 $${formatearNumero(pago.monto)}
                    </h3>

                    <p>
                        👷 ${
                            empleado
                            ? empleado.nombre
                            : "Empleado eliminado"
                        }
                    </p>

                    <p>
                        ${pago.concepto}
                    </p>

                    <p>
                        📅 ${pago.fecha}
                    </p>

                </div>

            `;


            contenedor.appendChild(div);

        });

}


// ================= DASHBOARD =================

function actualizarDashboard() {

    document
        .getElementById("totalEmpleados")
        .textContent =
            empleados.length;


    document
        .getElementById("totalObras")
        .textContent =
            obras.length;


    document
        .getElementById("totalHoras")
        .textContent =
            horas.reduce(
                (total, h) =>
                    total + Number(h.cantidad),
                0
            );


    document
        .getElementById("totalPagos")
        .textContent =
            pagos.length;


    const totalDinero =
        pagos.reduce(
            (total, pago) =>
                total + Number(pago.monto),
            0
        );


    document
        .getElementById("resumenInicio")
        .innerHTML = `

            <p>
                👷 <strong>${empleados.length}</strong>
                empleados registrados.
            </p>

            <p>
                🏗️ <strong>${obras.length}</strong>
                obras registradas.
            </p>

            <p>
                ⏱️ <strong>${horas.reduce(
                    (t,h) => t + Number(h.cantidad),
                    0
                )}</strong>
                horas cargadas.
            </p>

            <p>
                💰 Total de pagos:
                <strong>
                    $${formatearNumero(totalDinero)}
                </strong>
            </p>

        `;
}


// ================= UTILIDADES =================

function formatearNumero(numero) {

    return Number(numero || 0)
        .toLocaleString("es-AR");
}


// ================= ACTUALIZAR TODO =================

function renderizar() {

    renderizarEmpleados();

    renderizarObras();

    renderizarHoras();

    renderizarPagos();

    actualizarDashboard();

    cargarSelects();

}


// ================= INICIO =================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (!codigoAcceso) {

            document
                .getElementById("pantallaAcceso")
                .classList.add("mostrar");

            document
                .getElementById("contenidoApp")
                .classList.add("oculto");

            verificarAcceso();

        } else {

            document
                .getElementById("pantallaAcceso")
                .classList.add("mostrar");

            document
                .getElementById("contenidoApp")
                .classList.add("oculto");

            verificarAcceso();

        }

    }
);
