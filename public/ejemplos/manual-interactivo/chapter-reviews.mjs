export const CHAPTER_REVIEWS = {
  "OBJECTIVES": {
    summary: {
      en: "This manual prepares the operator to explain equipment functions, reduction fundamentals, instrumentation, control loops, interlocks, start-up, normal operation, shutdown, malfunctions and the reduction compressor. The goal is not memorization: it is understanding how the complete circuit works safely.",
      es: "Este manual prepara al operador para explicar las funciones de los equipos, los fundamentos de reducción, la instrumentación, los lazos de control, los interlocks, el arranque, la operación normal, el paro, las fallas y el compresor de reducción. El objetivo no es memorizar, sino entender cómo funciona el circuito completo de forma segura."
    },
    questions: [
      ["What is the main training goal?", "¿Cuál es el objetivo principal de la capacitación?", ["Understand and safely describe the complete circuit", "Memorize equipment colors", "Learn only the compressor"], ["Entender y describir con seguridad el circuito completo", "Memorizar colores de equipos", "Aprender solamente el compresor"], 0],
      ["Which operating stages are included?", "¿Qué etapas operativas están incluidas?", ["Start-up, normal operation and shutdown", "Only start-up", "Only maintenance"], ["Arranque, operación normal y paro", "Solamente arranque", "Solamente mantenimiento"], 0],
      ["What safety logic is part of the module?", "¿Qué lógica de seguridad forma parte del módulo?", ["Interlocks", "Office alarms", "Warehouse controls"], ["Interlocks", "Alarmas de oficina", "Controles de almacén"], 0],
      ["Which rotating equipment receives special attention?", "¿Qué equipo rotativo recibe atención especial?", ["Reduction compressor PG-671-J", "Cooling fan only", "Conveyor belt"], ["Compresor de reducción PG-671-J", "Solamente ventilador de enfriamiento", "Banda transportadora"], 0],
      ["What should an operator do with malfunction information?", "¿Qué debe hacer el operador con la información de fallas?", ["Recognize causes and corrective measures", "Ignore alarms", "Bypass every trip"], ["Reconocer causas y medidas correctivas", "Ignorar alarmas", "Puentear todos los trips"], 0]
    ]
  },
  "INTRODUCTION": {
    summary: {
      en: "The reduction area produces DRI using hot, high-pressure reducing gas. The main equipment is the reactor, process gas heater and recycle compressor. Hydrogen and carbon monoxide remove oxygen from iron ore, while methane participates in reforming. The circuit conditions pressure, temperature, flow and gas quality before the gas enters the reactor.",
      es: "El área de reducción produce DRI utilizando gas reductor caliente y a alta presión. Los equipos principales son el reactor, el calentador de gas de proceso y el compresor de recirculación. El hidrógeno y el monóxido de carbono eliminan el oxígeno del mineral, mientras el metano participa en el reformado. El circuito acondiciona presión, temperatura, flujo y calidad del gas antes de entrar al reactor."
    },
    questions: [
      ["What product is made in the reduction area?", "¿Qué producto se fabrica en el área de reducción?", ["DRI", "Liquid oxygen", "Steam"], ["DRI", "Oxígeno líquido", "Vapor"], 0],
      ["Which gases remove oxygen from iron ore?", "¿Qué gases eliminan el oxígeno del mineral?", ["Hydrogen and carbon monoxide", "Nitrogen and argon", "Steam only"], ["Hidrógeno y monóxido de carbono", "Nitrógeno y argón", "Solamente vapor"], 0],
      ["Which are the three main equipment items?", "¿Cuáles son los tres equipos principales?", ["Reactor, heater and compressor", "Tower, pump and silo", "Boiler, turbine and condenser"], ["Reactor, calentador y compresor", "Torre, bomba y silo", "Caldera, turbina y condensador"], 0],
      ["What does the circuit condition?", "¿Qué acondiciona el circuito?", ["Pressure, temperature, flow and gas quality", "Only color", "Only water level"], ["Presión, temperatura, flujo y calidad del gas", "Solamente color", "Solamente nivel de agua"], 0],
      ["Where do reduction reactions occur?", "¿Dónde ocurren las reacciones de reducción?", ["Inside the reactor", "Inside the control room", "Inside the oil tank"], ["Dentro del reactor", "Dentro del cuarto de control", "Dentro del tanque de aceite"], 0]
    ]
  },
  "I. SYSTEM BASIC CONCEPTS": {
    summary: {
      en: "Ore moves downward by gravity while reducing gas flows upward in countercurrent. Heat and mass transfer occur together. Early reduction is strongly controlled by temperature; deeper in the bed, diffusion through the pellet becomes important. Oxygen injection pre-reforms gas in the transfer line, and DRI catalyzes complete reforming inside the reactor. TER, FER, TSC, TSR and gas composition describe circuit performance.",
      es: "El mineral desciende por gravedad mientras el gas reductor sube en contracorriente. La transferencia de calor y masa ocurre simultáneamente. Al inicio, la reducción depende fuertemente de la temperatura; más dentro del lecho, la difusión en el pellet se vuelve importante. La inyección de oxígeno hace el pre-reformado en la línea de transferencia y el DRI cataliza el reformado completo dentro del reactor. TER, FER, TSC, TSR y la composición del gas describen el desempeño del circuito."
    },
    questions: [
      ["How do ore and gas move?", "¿Cómo se mueven el mineral y el gas?", ["Countercurrent: ore down, gas up", "Together downward", "Both remain still"], ["En contracorriente: mineral abajo, gas arriba", "Juntos hacia abajo", "Ambos permanecen inmóviles"], 0],
      ["What distributes gas around the reduction zone?", "¿Qué distribuye el gas alrededor de la zona de reducción?", ["The circular plenum", "The oil console", "The motor fan"], ["El plenum circular", "La consola de aceite", "El ventilador del motor"], 0],
      ["What controls reduction early in the bed?", "¿Qué controla la reducción al inicio del lecho?", ["Temperature", "Paint thickness", "Motor speed"], ["Temperatura", "Espesor de pintura", "Velocidad del motor"], 0],
      ["What becomes limiting deeper in the pellet?", "¿Qué se vuelve limitante dentro del pellet?", ["Diffusion of reactants and products", "Lighting", "Cooling-water color"], ["Difusión de reactivos y productos", "Iluminación", "Color del agua de enfriamiento"], 0],
      ["Where does complete reforming occur?", "¿Dónde ocurre el reformado completo?", ["In the reactor with DRI as catalyst", "In the oil filter", "In the control valve"], ["En el reactor con el DRI como catalizador", "En el filtro de aceite", "En la válvula de control"], 0]
    ]
  },
  "II. SYSTEM DESCRIPTION AND EQUIPMENT": {
    summary: {
      en: "HYL ZR combines reforming and reduction without a separate reformer. Gas leaves the heater, receives oxygen, enters the reactor and then passes through heat recovery, quenching, venturis, separators, the quench tower, knockout drums and filters. Compressor PG-671-J raises pressure; the after-cooler and knockout drum protect CO2 removal. VPSA and absorption reduce CO2, the humidifier adjusts water vapor, and the heater closes the recycle loop. The dry helical-lobe compressor depends on timing gears, bearings, seals, lubrication and cooling systems.",
      es: "HYL ZR combina reformado y reducción sin un reformador separado. El gas sale del calentador, recibe oxígeno, entra al reactor y después pasa por recuperación de calor, quench, venturis, separadores, torre de enfriamiento, knockout drums y filtros. El compresor PG-671-J eleva la presión; el after-cooler y el knockout drum protegen la remoción de CO2. VPSA y absorción reducen CO2, el humidificador ajusta el vapor de agua y el calentador cierra el circuito. El compresor seco de lóbulos helicoidales depende de engranes de sincronización, cojinetes, sellos, lubricación y enfriamiento."
    },
    questions: [
      ["What is special about the HYL ZR scheme?", "¿Qué distingue al esquema HYL ZR?", ["It has no separate reformer", "It has no reactor", "It uses no gas"], ["No tiene reformador separado", "No tiene reactor", "No utiliza gas"], 0],
      ["What happens immediately after the heater?", "¿Qué ocurre inmediatamente después del calentador?", ["Oxygen is injected before the reactor", "Oil is injected into the bed", "Gas goes directly to VPSA"], ["Se inyecta oxígeno antes del reactor", "Se inyecta aceite al lecho", "El gas va directamente a VPSA"], 0],
      ["What is the purpose of PG-614-C?", "¿Cuál es la función de PG-614-C?", ["Recover exhaust heat to preheat process gas", "Store pellets", "Lubricate the compressor"], ["Recuperar calor para precalentar el gas", "Almacenar pellets", "Lubricar el compresor"], 0],
      ["Why are venturis, separators and filters used?", "¿Para qué se utilizan venturis, separadores y filtros?", ["Remove water and solids from gas", "Increase ore size", "Add methane"], ["Eliminar agua y sólidos del gas", "Aumentar el tamaño del mineral", "Agregar metano"], 0],
      ["What does compressor PG-671-J do?", "¿Qué hace el compresor PG-671-J?", ["Raises recycle-gas pressure and flow", "Removes all CO2", "Heats ore directly"], ["Eleva presión y flujo del gas reciclado", "Elimina todo el CO2", "Calienta directamente el mineral"], 0],
      ["Why is an after-cooler installed?", "¿Por qué se instala un after-cooler?", ["Cool compressor discharge before CO2 removal", "Raise TER", "Heat lubrication oil"], ["Enfriar la descarga antes de remover CO2", "Elevar TER", "Calentar el aceite"], 0],
      ["What controls process-gas humidity?", "¿Qué controla la humedad del gas de proceso?", ["Humidifier PG-622-E", "Dollinger filter", "Timing gear"], ["Humidificador PG-622-E", "Filtro Dollinger", "Engrane de sincronización"], 0],
      ["Why is the compressor called dry?", "¿Por qué el compresor se considera seco?", ["No oil is required in the compression chamber", "It has no cooling water", "It compresses dry nitrogen only"], ["No requiere aceite en la cámara de compresión", "No tiene agua de enfriamiento", "Solo comprime nitrógeno seco"], 0],
      ["What is the timing gears' primary function?", "¿Cuál es la función principal de los engranes?", ["Synchronize the rotors", "Carry all compressor power", "Control reactor pressure"], ["Sincronizar los rotores", "Transmitir toda la potencia", "Controlar la presión del reactor"], 0],
      ["When is dummy quench used?", "¿Cuándo se utiliza el dummy quench?", ["During start-up or when hot gas must bypass the reactor", "Only during normal production", "To lubricate bearings"], ["Durante arranque o cuando el gas caliente evita el reactor", "Solo en producción normal", "Para lubricar cojinetes"], 0]
    ]
  },
  "III. INSTRUMENTATION, CONTROL LOOPS AND INTERLOCKS": {
    summary: {
      en: "Instrumentation measures flow, pressure, temperature, level, composition and machine condition. Control loops regulate heater flow, VPSA pressure, natural-gas and nitrogen make-up, humidity, vessel levels, quench water, reactor pressure and dummy-quench alignment. Interlocks act automatically when vibration, displacement, temperature, current, oil pressure, liquid level or utility conditions become unsafe. Operators must correct the cause instead of bypassing protection.",
      es: "La instrumentación mide flujo, presión, temperatura, nivel, composición y condición mecánica. Los lazos regulan flujo al calentador, presión de VPSA, reposición de gas natural y nitrógeno, humedad, niveles, agua de quench, presión del reactor y alineación del dummy quench. Los interlocks actúan automáticamente cuando vibración, desplazamiento, temperatura, corriente, presión de aceite, nivel de líquido o servicios llegan a condiciones inseguras. El operador debe corregir la causa y no puentear la protección."
    },
    questions: [
      ["What does FIC-67103 primarily control?", "¿Qué controla principalmente FIC-67103?", ["Process-gas flow to the heater", "Oil tank level", "Ore chemistry"], ["Flujo de gas al calentador", "Nivel del tanque de aceite", "Química del mineral"], 0],
      ["What does PIC-62116 control?", "¿Qué controla PIC-62116?", ["Reactor pressure", "Motor speed", "Humidity"], ["Presión del reactor", "Velocidad del motor", "Humedad"], 0],
      ["Why are vessel level loops important?", "¿Por qué son importantes los lazos de nivel?", ["Prevent water carry-over and gas leakage", "Increase vibration", "Change rotor speed"], ["Evitan arrastre de agua y fuga de gas", "Aumentan vibración", "Cambian velocidad del rotor"], 0],
      ["Which condition can trip the compressor?", "¿Qué condición puede disparar el compresor?", ["Low-low oil pressure", "Correct oil temperature", "Normal vibration"], ["Presión de aceite muy baja", "Temperatura correcta de aceite", "Vibración normal"], 0],
      ["What should an operator do after an interlock acts?", "¿Qué debe hacer el operador después de un interlock?", ["Find and correct the cause before reset", "Bypass it immediately", "Ignore the alarm"], ["Encontrar y corregir la causa antes de resetear", "Puentearlo inmediatamente", "Ignorar la alarma"], 0]
    ]
  },
  "IV. REDUCTION CIRCUIT OPERATION": {
    summary: {
      en: "Before start-up, confirm oil levels and pressure, cooling water, drains, valve alignment, free rotor movement and healthy instruments. Start the heater and charge system, then the compressor with gas initially routed through dummy quench. Add natural gas, oxygen and sulfur only when their conditions and permissives are satisfied. Move gas gradually to the reactor, control TSR and later start CO2 removal. Normal shutdown reverses the sequence, bottles the circuit with nitrogen, cools equipment, empties the reactor and proves a safe atmosphere before opening.",
      es: "Antes del arranque se confirman niveles y presión de aceite, agua de enfriamiento, drenajes, alineación de válvulas, giro libre del rotor e instrumentos sanos. Se arrancan el calentador y la carga, después el compresor con el gas inicialmente por dummy quench. Gas natural, oxígeno y azufre se agregan solo cuando se cumplen condiciones y permisivos. El gas se mueve gradualmente al reactor, se controla TSR y luego se inicia la remoción de CO2. El paro normal invierte la secuencia, inertiza con nitrógeno, enfría equipos, vacía el reactor y comprueba atmósfera segura antes de abrir."
    },
    questions: [
      ["What must be checked before compressor start?", "¿Qué debe verificarse antes de arrancar el compresor?", ["Oil, cooling water, drains and valve alignment", "Only paint color", "Only reactor level"], ["Aceite, agua, drenajes y alineación de válvulas", "Solo color de pintura", "Solo nivel del reactor"], 0],
      ["Where does process gas go first during start-up?", "¿Por dónde va primero el gas durante el arranque?", ["Through dummy quench", "Directly to VPSA", "To the oil console"], ["Por dummy quench", "Directamente a VPSA", "A la consola de aceite"], 0],
      ["When may natural gas be introduced?", "¿Cuándo puede introducirse gas natural?", ["When temperature and permissives are satisfied", "Whenever the operator wants", "Before lubrication starts"], ["Cuando temperatura y permisivos se cumplen", "Cuando el operador quiera", "Antes de lubricar"], 0],
      ["How is gas moved into the reactor?", "¿Cómo se mueve el gas hacia el reactor?", ["Gradually while balancing the dummy line", "Instantly with all valves wide open", "Only after shutdown"], ["Gradualmente balanceando la línea dummy", "Instantáneamente con todas las válvulas abiertas", "Solo después del paro"], 0],
      ["What is the basic normal-shutdown principle?", "¿Cuál es el principio básico del paro normal?", ["Reverse the start-up sequence safely", "Trip everything without preparation", "Keep oxygen on"], ["Invertir de forma segura la secuencia de arranque", "Disparar todo sin preparación", "Mantener oxígeno abierto"], 0]
    ]
  },
  "V. TROUBLE SHOOTING": {
    summary: {
      en: "Troubleshooting begins with the simplest verified cause. Low capacity can come from suction restriction, dirty filters, leaks or excessive demand. High discharge temperature can result from hot suction, high pressure, poor cooling or rotor contact. Vibration points to lubrication, bearing, alignment, pipe strain, foundation or rotor problems. In the process circuit, fines, agglomerates, low pellet level, poor water flow and incorrect recycle-valve position affect pressure drop, TSR, heater flow and metallization.",
      es: "El diagnóstico comienza con la causa verificable más sencilla. La baja capacidad puede venir de restricción en succión, filtros sucios, fugas o demanda excesiva. La alta temperatura de descarga puede resultar de succión caliente, alta presión, poco enfriamiento o contacto de rotores. La vibración apunta a lubricación, cojinetes, alineación, esfuerzos de tubería, cimentación o rotores. En el circuito, finos, aglomerados, bajo nivel de pellets, poco flujo de agua y posición incorrecta de recirculación afectan caída de presión, TSR, flujo al calentador y metalización."
    },
    questions: [
      ["What is a common cause of low compressor capacity?", "¿Cuál es una causa común de baja capacidad?", ["Dirty suction filters", "Correct alignment", "Normal oil pressure"], ["Filtros de succión sucios", "Alineación correcta", "Presión normal de aceite"], 0],
      ["What should be checked for high discharge temperature?", "¿Qué debe revisarse por alta temperatura de descarga?", ["Suction temperature, pressure and cooling", "Office lighting", "Ore color only"], ["Temperatura de succión, presión y enfriamiento", "Iluminación de oficina", "Solo color del mineral"], 0],
      ["What can high vibration indicate?", "¿Qué puede indicar alta vibración?", ["Bearing, alignment or lubrication problems", "Normal operation", "High humidity only"], ["Problemas de cojinetes, alineación o lubricación", "Operación normal", "Solo alta humedad"], 0],
      ["What can cause high circuit pressure drop?", "¿Qué puede causar alta caída de presión?", ["Fines or agglomerates", "Clean filters", "Correct water flow"], ["Finos o aglomerados", "Filtros limpios", "Flujo correcto de agua"], 0],
      ["What is the correct response after a machine trip?", "¿Cuál es la respuesta correcta después de un trip?", ["Find the root cause before restart", "Restart immediately", "Disable protection"], ["Encontrar la causa antes de arrancar", "Rearrancar inmediatamente", "Deshabilitar protección"], 0]
    ]
  }
};
