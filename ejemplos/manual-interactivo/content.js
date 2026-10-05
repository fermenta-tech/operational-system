const REDUCTION_SLIDES = [
  {
    id: "t01", group: "Start", title: "REDUCTION CIRCUIT", kicker: "HYL 4M · Monterrey, N.L.",
    lead: "Training informative document. Reforming gases and iron ore reduction in one circuit: reactor, heater and recycle compressor.",
    audio: "", quiz: [],
    blocks: [
      { type: "ok", text: "Main equipment: reactor RE-621-D · heater PG-601-B · compressor PG-671-J. Together they make DRI." },
      { type: "callout", text: "The full training text is in the left menu: I. Basic concepts, II. Flow diagram, II. Equipment, II. Compressor. Open those chapters — do not stay only on this cover." },
      { type: "list", title: "In this slide manual", items: [
        "System basic concepts",
        "Flow diagram and equipment",
        "Compressor PG-671-J: parts and principles",
        "Instrumentation, control loops and interlocks",
        "Start-up, normal run, shutdown, emergency",
        "Troubleshooting"
      ]}
    ]
  },
  {
    id: "t02", group: "Start", title: "How to use the slides", kicker: "Start",
    lead: "One idea per slide. Use Next and Previous, or the left and right arrow keys.",
    audio: "", quiz: [],
    blocks: [
      { type: "list", title: "Rules", items: [
        "English, short text. Equipment tags stay as written.",
        "Click blue flow boxes, checklists and reveal cards.",
        "At the end of each section: Coach Rivas reads a short summary, then 3 or 4 questions.",
        "70% recommended. If you miss it, repeat. No penalty.",
        "Administrator can edit any slide (PIN 1234)."
      ]}
    ]
  },
  {
    id: "t03", group: "Start", title: "Jump to a section", kicker: "Start",
    lead: "Open a chapter. Finish it with the summary avatar and the quiz.",
    audio: "", quiz: [],
    blocks: [
      { type: "nav-cards", items: [
        { tag: "I", title: "Basic concepts", text: "What the circuit does. TER, FER, countercurrent.", go: "c1" },
        { tag: "II", title: "Flow and equipment", text: "Path of the gas. Reactor to heater.", go: "f1" },
        { tag: "II-C", title: "Compressor", text: "PG-671-J parts and how it runs.", go: "k1" },
        { tag: "II-E", title: "Data sheets", text: "4M Monterrey numbers for the main vessels.", go: "ds1" },
        { tag: "III", title: "Loops and interlocks", text: "FIC, PIC, AIC and trip logic.", go: "l1" },
        { tag: "IV", title: "Operation", text: "Start, run, stop, emergency.", go: "o1" },
        { tag: "V", title: "Troubleshooting", text: "Compressor and circuit faults.", go: "tr1" }
      ]}
    ]
  },
  {
    id: "obj1", group: "Objectives", title: "What you will be able to do", kicker: "Objectives",
    lead: "At the end of this module the trainee can describe the circuit and operate it in a safe sequence.",
    audio: "", quiz: [],
    blocks: [
      { type: "list", title: "You will be able to explain", items: [
        "Equipment function",
        "Reduction circuit fundamental concepts",
        "Instrumentation, control loops and interlocks",
        "Activities before start-up",
        "Normal operation",
        "Equipment malfunction and corrective measures",
        "The reduction compressor and its operation principles"
      ]}
    ]
  },
  {
    id: "objq", group: "Objectives", title: "Section check", kicker: "Objectives · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "This module trains you on the HYL 4M reduction circuit. You will learn equipment function, basic concepts, loops and interlocks, start-up, normal run, and how to act when equipment fails. The compressor is part of that picture.",
    quiz: [
      { q: "This module is mainly about…", options: ["Only electrical isolation of the melt shop", "The reduction circuit that makes DRI", "Warehouse inventory"], a: 1, why: "The circuit reforms gas and reduces iron ore to DRI." },
      { q: "A trainee must be able to describe…", options: ["Only pump colors", "Equipment function, loops, interlocks and the compressor", "Office software"], a: 1, why: "The objectives list function, concepts, loops, start-up, faults and the compressor." },
      { q: "The quiz comes…", options: ["After every sentence", "At the end of each section, after the avatar summary", "Only at the end of the whole plant"], a: 1, why: "Each section closes with the avatar recap and 3 or 4 questions." }
    ],
    blocks: []
  },
  {
    id: "int1", group: "Introduction", title: "What this area does", kicker: "Introduction",
    lead: "Reforming and reduction happen in the reduction area with reducing gases at high pressure and high temperature.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The reactor, the heater and the reduction compressor are the main equipment. Together they produce DRI." },
      { type: "text", text: "At the circuit, reforming gases and reducing gases are set to the pressure, temperature and quality the process needs. The gas is mainly hydrogen, methane and carbon monoxide. It enters the reactor. There, reforming and reduction take place. Hydrogen and carbon monoxide remove oxygen from the iron ore. That is how we get DRI." }
    ]
  },
  {
    id: "int2", group: "Introduction", title: "What this module covers", kicker: "Introduction",
    lead: "Flow, compressor, concepts, loops, interlocks, start, run, stop and main failures.",
    audio: "", quiz: [],
    blocks: [
      { type: "list", title: "You will see", items: [
        "Reduction flow diagram and operating parameters",
        "Compressor PG-671-J: parts, data and instrumentation",
        "Fundamental concepts and equipment",
        "Control loops and interlocks",
        "Start-up, normal operation, shutdown",
        "Principal failures during operation"
      ]}
    ]
  },
  {
    id: "intq", group: "Introduction", title: "Section check", kicker: "Introduction · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "The reduction area uses hot, high-pressure reducing gas. The reactor, heater and compressor make DRI. Gas rich in hydrogen, methane and carbon monoxide enters the reactor. Oxygen is removed from the iron ore.",
    quiz: [
      { q: "The three main pieces of equipment are…", options: ["Reactor, heater and reduction compressor", "Only the flare and the stack", "Cooling tower fans only"], a: 0, why: "Reactor, heater and compressor form the area that produces DRI." },
      { q: "Reducing agents remove…", options: ["Nitrogen from air", "Oxygen from the iron mineral, to make DRI", "Oil from lube tanks"], a: 1, why: "H2 and CO take oxygen out of the ore. The product is DRI." },
      { q: "Process gas is mainly…", options: ["Oxygen and argon", "Hydrogen, methane and carbon monoxide", "Steam only"], a: 1, why: "The reducing gas is H2, CH4 and CO after it is conditioned." }
    ],
    blocks: []
  },
  {
    id: "c1", group: "I. Basic concepts", title: "Circuit function", kicker: "I. SYSTEM BASIC CONCEPTS",
    lead: "The reduction circuit function is to give the process gas the suitable conditions of pressure, temperature and flow, as well as its composition.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Those conditions are required to reduce the iron ores and simultaneously promote reforming reactions within the reduction zone of the reactor." },
      { type: "text", text: "The reduction zone is the superior cylindrical part of the reactor; which is covered internally with insulating material and refractory brick. This zone receives the iron ores through the superior dome of the reactor, which flows towards the inferior part by gravity in countercurrent with the reducing gas flow." }
    ]
  },
  {
    id: "c2", group: "I. Basic concepts", title: "Heat, mass transfer and the plenum", kicker: "I. SYSTEM BASIC CONCEPTS",
    lead: "Here, a quite complex phenomenon appears: the heat and mass transference happen simultaneously.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The heat is provided by the hot process gas that enters the reactor by the low part of the reduction zone. The gas is equally distributed around the reduction zone by a circular plenum." },
      { type: "text", text: "Around the plenum rectangular nozzles are located, radially aimed with a very slight slope downwards, whose function is to distribute in uniform form the process gas in that sectional area." },
      { type: "text", text: "The gas flows upwards in countercurrent with the solid up to the superior part; or reactor dome, of the reduction area. Here the gas is collected and leaves the reactor through the reduction outlet." },
      { type: "callout", text: "Because the process is continuous and in steady state, all the phenomena that happens within the reduction zone is independent of the time, but dependant of the position." }
    ]
  },
  {
    id: "c3", group: "I. Basic concepts", title: "How the mineral heats and starts reducing", kicker: "I. SYSTEM BASIC CONCEPTS",
    lead: "When the iron ores enters the reactor, it makes contact with the process gas which at this point is at its lower potential and lower temperature.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Here the heating of the mineral is just starting. As soon as the solid begins moving down by gravity, its temperature begins to increase until reaching the temperature at which it starts reducing." },
      { type: "text", text: "Its speed is controlled by a rotary valve which is located at the inferior part of the reactor." },
      { type: "text", text: "When the mineral reaches a determined temperature, it begins to be reduced by hydrogen and carbon monoxide. As the temperature of the mineral increases the rate of reduction does too." },
      { type: "ok", text: "Reduction is controlled by temperature; up to here the quality of the reducing gases is not the main parameter for reduction." }
    ]
  },
  {
    id: "c4", group: "I. Basic concepts", title: "When diffusion controls reduction", kicker: "I. SYSTEM BASIC CONCEPTS",
    lead: "An external layer, which surrounds the iron ore surface, makes it difficult for the hydrogen and carbon monoxide to reach the interior of each pellet.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "In addition to this, the gaseous products like CO2 and H2O, which are molecules bigger than the reactants, difficult the reduction reactions." },
      { type: "text", text: "At this height of the reactor, the pellet temperature is relatively high, but the temperature in this case does not control the reduction of the iron mineral. In this case, reduction is controlled by the diffusion of the reactants and products within the solid." },
      { type: "text", text: "As the pellet crosses the reduction zone, the hydrogen and carbon monoxide concentration increases, favoring the diffusion of the reagents within the mineral." }
    ]
  },
  {
    id: "c5", group: "I. Basic concepts", title: "Reforming in two places", kicker: "I. SYSTEM BASIC CONCEPTS",
    lead: "At the same time, inside the reactor, the gaseous reactions of reformation happen and are generated in two places.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The pre-reforming of the process gas is carried out at the transference line by means of an oxygen injection causing a partial combustion." },
      { type: "text", text: "The complete reforming takes place at the reduction zone of the reactor since the DRI acts like a catalyst for these reactions." },
      { type: "text", text: "This way, while in the transference line the reducing gas is pre-reformed and its temperature rises, inside the reactor the iron mineral reduction is taking place, contributing to the DRI formation, which acts as a catalyst for the completion of the reforming reactions." },
      { type: "callout", text: "In addition of the methane reformation and water gas shift other reactions like carburization take place. These reactions have a direct relation with the composition of the process gas." }
    ]
  },
  {
    id: "c6", group: "I. Basic concepts", title: "Parameters handled in HYL 4M", kicker: "I. SYSTEM BASIC CONCEPTS",
    lead: "According to the mentioned concepts above, in the HYL 4M plants the following parameters are handled.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["Tag", "Meaning from the manual", "Unit"], rows: [
        ["TER", "Inlet temperature to the reduction zone of the reactor after partial combustion", "°C"],
        ["FER", "Total specific process gas flow (natural gas make up and decarbonated gas recycled by the compressor) required to reduce a ton of total iron", "NCM/ton Fe"],
        ["IGNR", "Natural gas flow injected to the reduction circuit", "NCM/ton Fe"],
        ["TSC", "Heater outlet temperature", "°C"],
        ["TSR", "Outlet temperature of reduction of the reactor", "°C"],
        ["TAR", "Temperature of reduction ring of the reactor", "°C"],
        ["FO2", "Oxygen flow injected to the combustion chamber", "NCM/ton Fe"],
        ["CO2", "CO2 in reactor inlet gas", "%"],
        ["H2O", "Humidity in the heater process gas inlet", "%"],
        ["CH4", "CH4 in the reduction gas outlet", "%"],
        ["H2S", "H2S concentration in the heater process gas inlet", "ppm V"]
      ]},
      { type: "photos", items: [
        { kind: "tower", caption: "Figure 1 · General block diagram of this circuit" }
      ]}
    ]
  },
  {
    id: "c7", group: "I. Basic concepts", title: "Exhaust gas recycle path", kicker: "I. SYSTEM BASIC CONCEPTS",
    lead: "The exhaust gas leaves the reduction zone and enters the heat recuperator where it yields great part of its sensible heat to the process stream gas.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Later exhaust gas enters to the quench orifice where it continues its stage of cooling and then enters the venturi where all the solids are removed. Later the exhaust gas stream passes through separator to continue with its cleaning and later it enters to a quench tower where its stage of cooling finishes." },
      { type: "text", text: "Next the exhaust gas passes through a K.O. drum where the water is eliminated of the stream gas, then exhaust gas is filtered and then it is recycled by the gas compressor and its discharge passes through an after-cooler where the process gas temperature drops and the water is condensed, later it goes to a K.O. drum where the water particles are separated and retained." },
      { type: "text", text: "The exhaust gas cooled is divided in two streams: one enters to the CO2 adsorption system, the second stream enters to the CO2 absorption system. Both decarbonated process gas outlets join in a single stream and then the decarbonated process gas is mixed with a natural gas make up." },
      { type: "text", text: "The process gas mixed enters to the humidifier where the process gas humidity is incremented and then the process gas stream enters to the heat recuperator and takes the heat from the exhaust reduction gas, increasing its temperature. The process gas stream leaves from the heat recuperator and passes through the process gas heater and before entering the reactor its temperature is risen even more by means of an oxygen injection in the transference line. This way the reduction circuit is completed." }
    ]
  },
  {
    id: "c8", group: "I. Basic concepts", title: "Other connections to the circuit", kicker: "I. SYSTEM BASIC CONCEPTS",
    lead: "There are other connections to the circuit besides the main recycle loop.",
    audio: "", quiz: [],
    blocks: [
      { type: "list", title: "From the training document", items: [
        "Sulphur injections located at the heater inlet.",
        "At the quench tower outlet there is an external cooling system derivation.",
        "Between the Dollinger filters and the compressor suction there is a line that corresponds to the outlet exhaust gas to the tail gas header which controls the reactor pressure.",
        "At the after-cooler outlet there is another cool process gas outlet to the reactor cone and to the external cooling system.",
        "At the exit of the CO2 absorption system there is a gas by-pass to cool the charge ducts.",
        "At the end of the quench orifice there is a venting line of the reactor.",
        "To control the process gas going into the heater there is a re-circulation line that connects the compressor discharge to the cooling quench tower.",
        "The reactor has a process gas by-pass after the oxygen injection that enters to the quench orifice of the dummy quench line, then passes through a K.O. drum and connects to the outlet gas line of the separator.",
        "Process gas outlet from the compressor discharge feeds the pneumatic transport system, which also feeds process gas to the H2S injection system.",
        "The reactor venting line connects to the quench orifice outlet."
      ]}
    ]
  },
  {
    id: "cq", group: "I. Basic concepts", title: "Section check", kicker: "I. Basic concepts · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "The circuit sets gas pressure, temperature, flow and composition. Ore falls by gravity. Gas rises in countercurrent. First temperature controls reduction. Then diffusion. Pre-reforming is in the transfer line with oxygen. Complete reforming is in the bed because DRI is a catalyst. Remember TER, FER, TSC, TSR, TAR and the dummy quench bypass.",
    quiz: [
      { q: "Ore and gas flow…", options: ["In the same direction", "Countercurrent: ore down, gas up", "Only in batch dumps"], a: 1, why: "Solids fall by gravity. Gas flows up through the bed." },
      { q: "Complete reforming in HYL 4M happens…", options: ["In a separate reformer furnace only", "In the reactor reduction zone, with DRI as catalyst", "In the cooling tower"], a: 1, why: "There is no reformer. DRI catalyzes reforming in the reduction zone." },
      { q: "TER is…", options: ["Heater oil level", "Inlet temperature to the reduction zone after partial combustion", "Motor amps"], a: 1, why: "TER is the gas temperature entering the reduction zone after oxygen injection." },
      { q: "Deeper in the bed, reduction is controlled by…", options: ["Only the rotary valve color", "Diffusion of reactants and products within the solid", "The canteen schedule"], a: 1, why: "At that height temperature is already high. Diffusion limits the reaction." }
    ],
    blocks: []
  },
  {
    id: "f0", group: "II. Flow diagram", title: "HYL ZR: no reformer", kicker: "II. SYSTEM DESCRIPTION AND EQUIPMENT",
    lead: "The reduction circuit of the HYL 4M plant works under the HYL ZR scheme, which has the particularity of not having a reformer.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "This scheme combines the two conventional zones that conform the HYL direct reduction process (reforming and reduction), into one. So it is in this circuit that the reformation, reduction and carburization, to produce the DRI at the conditions required by the client, happen." },
      { type: "text", text: "Natural gas, as well as in the conventional process, is used for reformation. In the process without reformer, the reducing gas is generated in two places inside the reduction circuit." }
    ]
  },
  {
    id: "f0b", group: "II. Flow diagram", title: "Pre-reforming reactions in the transfer line", kicker: "II. SYSTEM DESCRIPTION AND EQUIPMENT",
    lead: "The first place where the reforming or pre-reforming reactions are carried out is in the transference line. Here the partial combustion of natural gas takes place using an oxygen injection.",
    audio: "", quiz: [],
    blocks: [
      { type: "list", title: "Reactions (generation of reducing gas by oxygen)", items: [
        "CH4 + 1/2 O2 → 2 H2 + CO    + 36 kJ/mole",
        "CH4 + 2 O2 → CO2 + 2 H2O    + 802 kJ/mole",
        "CO + H2O → CO2 + H2    + 41 kJ/mole"
      ]},
      { type: "ok", text: "The previous reactions show the generation of reducing gas by means of oxygen use." }
    ]
  },
  {
    id: "f0c", group: "II. Flow diagram", title: "Reforming reactions in the reactor", kicker: "II. SYSTEM DESCRIPTION AND EQUIPMENT",
    lead: "The second place is the reactor reduction zone, because the DRI that is in this zone acts as a catalyst for these reactions.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "This way, while in the transference line the gas is pre-reformed, inside the reactor the reduction reactions are carried out, contributing on the formation of DRI as a catalyst." },
      { type: "list", title: "Reforming reactions", items: [
        "CH4 + H2O → 3 H2 + CO    − 206 kJ/mole",
        "CO + H2O → CO2 + H2    + 41 kJ/mole",
        "CH4 + CO2 → 2 CO + 2 H2    − 247 kJ/mole"
      ]},
      { type: "warn", text: "The previous reactions are endothermic as a whole, reason why they require energy to take place." }
    ]
  },
  {
    id: "f1", group: "II. Flow diagram", title: "Reduction circuit flow diagram", kicker: "II-A. REDUCTION CIRCUIT FLOW DIAGRAM",
    lead: "The reduction area function of the HYL 4M plant is to reform “in-situ” the natural gas, and obtain hot DRI to be pneumatically transported to the melt shop or to the external cooling system.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "To carry out its function the reduction area requires a conditioning of the recycled gas. This conditioning consists of cooling, cleaning, compressing and purifying this gas, plus an injection of natural gas, water and DMDS to the recycled gas. It is also necessary to pre-heat the mixture, have a partial combustion of the mixture with oxygen, before entering the reactor." },
      { type: "text", text: "In addition, the reduction circuit has a process gas by-pass line after the oxygen injection to the cooling quench tower. This line is known as dummy quench. This line has a process gas quench orifice (PG-650-C) and a process gas K.O. drum (PG-650-F)." },
      { type: "callout", text: "The dummy quench is mainly used during the start-up while pre-reforming the first gases by the partial combustion and/or during a shut down where it is not required to let pass hot gas through the reactor." }
    ]
  },
  {
    id: "f2", group: "II. Flow diagram", title: "Heater, oxygen and reactor", kicker: "II-A. FLOW DIAGRAM",
    lead: "The reduction circuit description is the following.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The process gas that comes out of the process gas heater (PG-601-B) between 910–930 °C, receives an oxygen injection to increase the temperature to 1065 °C and this way initiate the natural gas pre-reforming." },
      { type: "text", text: "The pre-reformed natural gas enters the reactor (RE-621-D) with a 5.3 kg/cm² (a). The natural gas finishes reforming in-situ and reduces the iron at the reactor reduction zone. The iron ore flows downwards by gravity and the gas flows in countercurrent through the iron ore bed." },
      { type: "text", text: "The exhaust gas leaves through the top section of the reactor with a temperature between 410–440 °C with high water content, CO2 and fines due to the H2 and CO reactions and the fines drag." },
      { type: "ok", text: "The reactor exhaust gas is conditioned to be recycled to the reactor. This conditioning is next described." }
    ]
  },
  {
    id: "f3", group: "II. Flow diagram", title: "First cooling and solids removal", kicker: "II-A. FLOW DIAGRAM",
    lead: "Immediately at the reactor outlet the exhaust gas passes through the gas–gas heat recuperator (PG-614-C).",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The exhaust gas receives the first cooling stage giving up part of its energy to the process gas that is going in to the heater (PG-601-B). The exhaust gas leaves the heat recuperator at 265 °C." },
      { type: "text", text: "This exhaust gas stream is passed to a quench orifice (PG-611-C) where it receives its second cooling stage by direct water contact; the gas leaves within 105–110 °C temperature." },
      { type: "text", text: "Then the exhaust gas passes through the venturi (PG-630-L) where it changes its speed, due to the venturi diameter reduction. With this change of speed the solid is removed from the gas stream. Then the venturi outlet flow enters through the separator (PG-630-F). Here solids and water are removed from the gas by gravity." },
      { type: "text", text: "At the separator bottom, the gas flows upwards through a Chevron grill which removes the solids that the gas still carries. This grill receives a 5 Ton/Hr water flow to avoid obstruction. After the grill the gas goes through a demisting pad which removes the smallest particles from the gas stream." }
    ]
  },
  {
    id: "f3b", group: "II. Flow diagram", title: "Second venturi, quench tower, KO and filters", kicker: "II-A. FLOW DIAGRAM",
    lead: "The separator PG-630-F feeds the exhaust gas to a second venturi (PG-631-L).",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "PG-631-L separates small solid particles from the exhaust gas stream. Solids of greater weight are created due to the change of speed and water injection, making the separation easier." },
      { type: "text", text: "The exhaust gas without an important solid level passes through a third cooling stage, at the exhaust gas cooling quench tower (PG-631-E). Here the gas is redirected through an internal elbow to impact the water at the quench tower bottom of the water level. The gas on its way up goes through a packed bed of flexigrid which enhances the contact surface between the gas and the water which is injected above the packed bed, managing to cool the gas to a temperature of 35–45 °C. Before leaving, the gas passes through a demisting pad." },
      { type: "text", text: "The exhaust gas stream is passed through a K.O. drum (PG-671-F) to ensure that the water in the exhaust gas has been removed. At the superior zone of the K.O. drum there is a demisting pad." },
      { type: "text", text: "Once the exhaust gas is cooled and dried, it is filtered through a filter (PG-671-G) which can remove particles greater than 5 microns, this is to avoid compressor damage. There are 2 filters that operate in parallel. The filters have a by-pass to be changed when they reach a drop pressure of 200 mm of water column." }
    ]
  },
  {
    id: "f3c", group: "II. Flow diagram", title: "Compressor, after-cooler, CO2 cut, humidifier, heater", kicker: "II-A. FLOW DIAGRAM",
    lead: "At the filter exhaust gas outlet, an exhaust gas stream is released from the system. This way it is managed to control the reduction system pressure and the concentration of reducing gases is avoided.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The other exhaust gas stream is fed to the recycle gas compressor (PG-671-J) to increase its pressure and its flow. The compressor discharge conditions are 7.4 kg/cm² abs and 99 °C, this due to compression of gas." },
      { type: "text", text: "The compressed exhaust gas heats up due to compression work. To avoid the problems that condensation could cause at the VPSA it is required to cool the gas at the compressor outlet. An after-cooler is used (PG-671-C) where the exhaust gas temperature is reduced from 99 to 42 °C. Then K.O. drum PG-622-F removes condensation, preventing liquids going into the VPSA." },
      { type: "text", text: "Due to CO reactions, the exhaust gas leaves the reactor with CO2 content between 12–13.0 %. Compressed and cold exhaust gas is divided in two streams: one enters the VPSA CO2 adsorption plant (CO-635-D1/8) where it is adsorbed to 4.5–5.0 % of CO2 at the stream outlet; the second stream enters the CO2 absorption system where it is adsorbed to 1.0 % of CO2. The mixed dry gas is 3.2–3.5 % CO2." },
      { type: "text", text: "It receives an injection of natural gas as make up. This mixture is the process gas. After this injection it passes through a humidifier (PG-622-E), where, with a water injection at 82 °C the humidity percent is raised up to 4.6 %. The process gas enters the gas–gas heat recuperator (PG-614-C) from the shell side to increase its temperature to 275 °C." },
      { type: "text", text: "The pre-heated process gas is injected with sulphur (25 ppm) to minimize metal dusting in the heater’s tubes. The process gas enters the process gas heater (PG-601-B) through the convective zone and then it goes into the radiant cold zone and finally to the radiant hot zone. The gas is collected at the heater transference line at a temperature between 910–930 °C. At this point the process gas is prepared to be partially combusted with oxygen, to initiate another cycle of pre-reforming, reforming and reduction." }
    ]
  },
  {
    id: "f4", group: "II. Flow diagram", title: "Click the flow", kicker: "II-A. FLOW DIAGRAM · Figure 2",
    lead: "Figure 2 shows the reduction circuit flow diagram. Click each block.",
    audio: "", quiz: [],
    blocks: [
      { type: "flow", nodes: [
        { label: "HEATER", sub: "PG-601-B · 910–930 °C", detail: "Process gas is collected at the heater transference line at 910–930 °C. Sulphur 25 ppm is injected before the tubes to minimize metal dusting." },
        { label: "O2 LINE", sub: "TER ~1065 °C", detail: "Oxygen injection increases temperature to 1065 °C and initiates natural gas pre-reforming." },
        { label: "REACTOR", sub: "RE-621-D · 5.3 kg/cm² a", detail: "In-situ reforming and reduction. Ore down, gas up. Exhaust leaves 410–440 °C with water, CO2 and fines." },
        { label: "RECUPERATOR", sub: "PG-614-C · 265 °C out", detail: "First cooling of exhaust. Heat goes to process gas going to the heater." },
        { label: "CLEANING", sub: "PG-611-C · venturi · KO · filters", detail: "Quench 105–110 °C, solids out, quench tower 35–45 °C, KO, Dollinger >5 micron. Purge to tail gas holds pressure." },
        { label: "COMPRESSOR", sub: "PG-671-J · 7.4 kg/cm² a · 99 °C", detail: "Raises pressure and flow. After-cooler PG-671-C takes 99 → 42 °C. KO PG-622-F protects VPSA." },
        { label: "CO2 REMOVAL", sub: "VPSA + absorber · 3.2–3.5 % CO2", detail: "VPSA to 4.5–5.0 % CO2. Absorber to 1.0 %. Mixed dry gas 3.2–3.5 %." },
        { label: "HUMIDIFIER", sub: "PG-622-E · 4.6 % H2O", detail: "Water at 82 °C raises humidity to 4.6 %. Then recuperator to 275 °C, heater, oxygen, reactor again." }
      ]}
    ]
  },
  {
    id: "f5", group: "II. Flow diagram", title: "Gas analysis and equipment list", kicker: "II-A. FLOW DIAGRAM",
    lead: "This is an analysis of the main reduction circuit gases. The VPSA outlet analysis is taken after the natural gas make up.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["Stream", "H2", "CO", "CO2", "CH4", "N2", "C2H6", "C3H8", "H2O"], rows: [
        ["Process gas to heater", "56.99", "12.054", "3.124", "24.855", "2.987", "0.375", "0.005", "4.6"],
        ["VPSA inlet", "56.4", "12.2", "11.4", "15.6", "3.1", "—", "—", "1.3"],
        ["VPSA outlet*", "55.77", "13.02", "3.20", "23.86", "3.73", "0.41", "—", "—"],
        ["Reduction gas outlet", "56.4", "12.2", "11.4", "15.6", "3.1", "—", "—", "1.3"],
        ["Natural gas make up", "1.6", "—", "1.1", "93.3", "0.5", "2.7", "—", "—"]
      ]},
      { type: "list", title: "REDUCTION CIRCUIT EQUIPMENT LIST", items: [
        "Reactor RE-621-D",
        "Heat recuperator PG-614-C",
        "Quench orifice PG-611-C",
        "Venturi PG-630-L",
        "Separator PG-630-F",
        "Venturi PG-631-L",
        "Cooling quench tower PG-631-E",
        "K.O. drum PG-671-F",
        "Dollinger filters PG-671-G 1/2",
        "Compressor PG-671-J",
        "After-cooler PG-671-C",
        "K.O. drum PG-622-F",
        "VPSA adsorption system CO-635-D 1/8",
        "Humidifier PG-622-E",
        "Process gas heater PG-601-B",
        "Quench orifice of the dummy quench line PG-650-C",
        "K.O. drum of the dummy quench line PG-650-F",
        "Absorber tower PG-223-E",
        "K.O. drum PG-223-F"
      ]},
      { type: "photos", items: [
        { kind: "hmi", caption: "Figure 2 · Reduction circuit flow diagram" }
      ]}
    ]
  },
  {
    id: "fq", group: "II. Flow diagram", title: "Section check", kicker: "II-A · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "HYL ZR has no reformer. Gas leaves the heater at 910 to 930 degrees, oxygen takes it to about 1065, then the reactor at 5.3. Exhaust is cooled, cleaned, compressed to 7.4 and 99 degrees, after-cooled to 42, stripped of CO2, mixed with natural gas, humidified to 4.6 percent, reheated and sent back. Dummy quench keeps hot gas out of the reactor on start-up or shut down.",
    quiz: [
      { q: "After the heater, oxygen is injected to…", options: ["Cool the gas to 40 °C", "Raise temperature to 1065 °C and start pre-reforming", "Fill the oil tank"], a: 1, why: "Partial combustion takes TER to about 1065 °C and starts pre-reforming." },
      { q: "Dollinger filters PG-671-G stop…", options: ["Particles larger than 5 microns, to protect the compressor", "Only methane", "Cooling water"], a: 0, why: "Fines above 5 microns must not reach PG-671-J. Bypass at 200 mm w.c." },
      { q: "Compressor discharge is…", options: ["0.2 kg/cm² abs and 20 °C", "7.4 kg/cm² abs and 99 °C", "Atmospheric, 400 °C"], a: 1, why: "The document states 7.4 kg/cm² abs and 99 °C. Then the after-cooler cools to 42 °C." },
      { q: "Dummy quench is used…", options: ["To store pellets", "During start-up pre-reforming and when hot gas must not go through the reactor", "To feed the melt shop"], a: 1, why: "PG-650-C and PG-650-F bypass the reactor." }
    ],
    blocks: []
  },
  {
    id: "e1", group: "II. Equipment", title: "Reactor RE-621-D", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The HYL reactor is a continuous heterogeneous gas–solid type.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Its function is to maintain the solid and gas in temperature and pressure conditions so the reduction reactions and (in the particular case of the HYL 4M plant) the reforming and carburization reactions, take place." },
      { type: "text", text: "The reactor is made of carbon steel plate. The upper part is a semi spherical shaped followed by a cylindrical section, and they connect to another cylindrical section with larger diameter to end in a conical section. With the exception of the conical section, the inner side is covered with insulating material, refractory concrete and refractory brick." },
      { type: "photos", items: [
        { kind: "tower", caption: "Figure 3 · Reactor RE-621-D schematic drawing. Main zones, connections and capacity." }
      ]}
    ]
  },
  {
    id: "e1b", group: "II. Equipment", title: "Reactor zones, plenum and cone", kicker: "II-B. REACTOR RE-621-D",
    lead: "The HYL 4M is divided in two zones: reduction zone and lower zone.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The reduction zone is composed by a cylindrical shaped part of 5.5 m inner diameter and 5.607 m of height, and a 4.556 m height conical section with an internal diameter that increases 2% in relation with the vertical up to the process gas inlet. Inside is covered with insulating concrete VSL-50 and refractory brick KX-99." },
      { type: "text", text: "The reducing gas inlet is located at the bottom part of the reduction zone, which is distributed by a ring made of refractory bricks KX-99 and it is called plenum. It has 124 rectangular exits symmetrically distributed at the plenum interior with an injection area of 1.69 m²." },
      { type: "text", text: "The bottom zone is the conical section located at the bottom part of the reactor, immediately below the reduction plenum. The inner surface of the cone is not thermally isolated but it has four jackets cooled by water externally to avoid hot spots." },
      { type: "ok", text: "The discharge rotary valve is located at the end of this zone of the reactor; this valve controls the production rate. Also in this zone the reactor has two cluster breakers to promote the solid flow inside the reactor when problems may occur. Module 4 shows more detail of the reactor." }
    ]
  },
  {
    id: "e2", group: "II. Equipment", title: "Heat recuperator PG-614-C", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The function of this equipment is to take advantage of the energy of the exhaust gas that leaves the reduction zone to pre-heat the process gas from 70–80 °C to 250–260 °C before this gas enters the heater and at the same time, to cool the exhausted gas (reduction outlet) from 360 °C to 270 °C.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Heat recuperator PG-614-C is a shell-tubes type heat exchanger. The exhaust gas is fed through the 660 tubes of 51.25 mm D.I., while the process gas enters through the shell side with nine baffles to take the sensible heat of the exhaust gas." },
      { type: "text", text: "On the shell process gas side it has a pre-heat section to avoid condensation at the exhaust gas outlet which would cause corrosion by the formation of carbonic gases." },
      { type: "text", text: "The heat recuperator is made of steel plate SA-312 Gr. T-22 with 2.25 % Cr and 1.0 % Mo. Internally is isolated with refractory concrete and refractory brick." },
      { type: "photos", items: [
        { kind: "exchanger", caption: "Figure 4 · Heat recuperator PG-614-C" }
      ]}
    ]
  },
  {
    id: "e3", group: "II. Equipment", title: "Quench orifice PG-611-C", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The exhaust gas after passing through the heat recuperator PG-614-C, enters the orifice cooler PG-611-C, where its temperature goes from 270 to 105 °C.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Here the cooling takes place with a direct water injection to the gas stream." },
      { type: "text", text: "The orifice cooler PG-611-C is an arrangement of two concentric tubes. The shell tube is made of carbon steel, of 1067 mm external diameter, and the inner tube is made of stainless steel 304 and has 965 mm external diameter." },
      { type: "text", text: "Inside in the upper part the tube has two rows of 20 orifices of 13 mm diameter each, with 18° between them. Above these two rows there is one more but just with 4 orifices located with 90° between them to prevent heating in the welding zone." },
      { type: "photos", items: [
        { kind: "exchanger", caption: "Figure 5 · Quench orifice PG-611-C" }
      ]}
    ]
  },
  {
    id: "e4", group: "II. Equipment", title: "Venturi PG-630-L and separator PG-630-F", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The venturi function (PG-630-L) is to separate dust from fines that the gas stream carries by a ΔP. This happens by reducing the venturi diameter and then increasing it.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Separator PG-630-F function is to separate the solids in the gas stream by precipitating them to the bottom of the separator." },
      { type: "text", text: "The gas coming from the venturi at high speed connects to the separator by an elbow. The fines in the gas stream precipitate to the bottom. The gas raises through a Chevron grill which has a spray nozzle header. The exhaust gas is in direct contact with a water flow in countercurrent, finally passing through a demisting pad where the water particles are retained." },
      { type: "text", text: "The separator is a cylindrical tank with a conical bottom zone; it is made of steel carbon plate and has a 2 inch external isolating (51 mm) of mineral wool. It has a special siloxirane covering on the inside of 0.023 inch (0.6 mm) to minimize chlorides corrosion on the tank walls." },
      { type: "photos", items: [
        { kind: "tower", caption: "Figure 6 · Venturi PG-630-L dimensions" },
        { kind: "tower", caption: "Figure 7 · Venturi scrubber PG-630-F general arrangement" }
      ]}
    ]
  },
  {
    id: "e5", group: "II. Equipment", title: "Venturi PG-631-L and quench tower PG-631-E", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The venturi function (PG-631-L) is to slow down the solid particles that are being carried over by the gas stream and separate them from the gas by gravity.",
    audio: "", quiz: [],
    blocks: [
      { type: "list", title: "This happens in two ways", items: [
        "By injecting water at the venturi equipment inlet which produces a bigger size of particle because the bigger particles were removed before.",
        "By the change of speed generated. Then the mixture goes to the process gas cooler."
      ]},
      { type: "text", text: "The venturi is made of stainless steel, is covered inside with siloxirane to avoid corrosion." },
      { type: "text", text: "The process gas quench tower (PG-631-E) function is to complete the cooling of the gas and to separate the condensed water and DRI fines remains that come with the gas from the venturi." },
      { type: "text", text: "The inlet exhaust gas is forced inside to impact with the water level to help solid removal, then passes through a flexigrid packed bed type 3 in countercurrent of the water flow, to later pass through a Chevron grill where the bigger water particles are removed, finally the gas passes through a demisting pad. The exhaust gas leaves the quench tower at 35–45 °C." },
      { type: "callout", text: "At the water outlet, the quench tower has a level control valve, also is provided with a safety relief valve and high and low level alarms. This vessel is also internally covered. See figure 9." }
    ]
  },
  {
    id: "e6", group: "II. Equipment", title: "K.O. drum PG-671-F and filters PG-671-G1/G2", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "K.O. drum PG-671-F function is to remove remaining water particles that could be dragged by the gas that comes from the quench tower, by means of a demisting pad located in the upper part.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "This avoids water in the exhaust gas stream going into the compressor suction and avoids some possible damage to the compressor. The liquid separator is a carbon steel vessel provided with a purge line, a safety relief valve and a high level, and high–high level alarms." },
      { type: "text", text: "Filters PG-671-G1/G2 retain fines with a size larger than 5 microns that wasn’t eliminated by the washing stage and is being carried over by the exhaust gas stream." },
      { type: "text", text: "Two filters set exist and normally they operate in parallel. This set has a by-pass that will be used in case of maintenance or when changing filter elements." },
      { type: "text", text: "These filters are cylindrical recipients with 3.816 m of height, made of carbon steel plate; internally they have 3 cartridge type filter elements. The filter elements are made of iron mesh with a basket type support." },
      { type: "photos", items: [
        { kind: "tower", caption: "Figure 10 · K.O. drum PG-671-F" },
        { kind: "pump", caption: "Figure 11–12 · Compressor filters PG-671-G1/G2 and filter elements" }
      ]}
    ]
  },
  {
    id: "e7", group: "II. Equipment", title: "Compressor, after-cooler and K.O. PG-622-F", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The compressor function (PG-671-J) is to increase pressure and gas flow to the process conditions that the reduction circuit requires, from 4.65 to 7.4 kg/cm² abs, sending process gas flow to the reactor.",
    audio: "", quiz: [],
    blocks: [
      { type: "callout", text: "Since the compressor is equipment that implies other systems, it is described later in this module (compressor slides)." },
      { type: "text", text: "After-cooler PG-671-C is a shell-tubes heat exchanger. The process gas circulates through the 980 tubes which have a 26.2 mm diameter, and the water circulates through the shell side where 13 baffles make the cooling more efficient." },
      { type: "text", text: "The after-cooler function is to decrease the temperature of the compressor outlet from 94 to 42 °C, avoiding a high temperature of the process gas that goes into the VPSA unit." },
      { type: "text", text: "The gas goes through K.O. drum PG-622-F where a demisting pad removes the water particles that somehow manage to get here in the gas stream, avoiding this way water entering the adsorption system and causing damage to the adsorbent material. This liquid separator is a vessel made of carbon steel plate and it has a demisting pad, a drain line, a safety valve, and a high and high–high level alarm." },
      { type: "photos", items: [
        { kind: "exchanger", caption: "Figure 13 · After-cooler PG-671-C" },
        { kind: "tower", caption: "Figure 14 · K.O. drum PG-622-F" }
      ]}
    ]
  },
  {
    id: "e8", group: "II. Equipment", title: "CO2 VPSA adsorption CO-635-D1/8", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The process gas that comes from the reactor, rich in CO2, goes through the VPSA, where the CO2 is removed by the action of the adsorbent material.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "At this unit outlet it is divided in two gas streams: one free of CO2 that is recycled into the reactor, the other stream is fed to the fuel gas header to the heater’s PG-601-B burners. This last stream is the result of the adsorbents regeneration stage; therefore this gas has a high content of CO2." },
      { type: "list", title: "The CO2 adsorption system of the HYL 4M plant has", items: [
        "VPSA adsorbing unit CO-635-D1/8",
        "Vacuum pumps CO-661-J and CO-662-J",
        "Gas holder CO-634-F",
        "VPSA compressor gas purge CO-638-J"
      ]},
      { type: "ok", text: "The exhaust gas enters the adsorption unit with a rate within 11.5 and 12.5 % of CO2 and leaves with a rate within 3.0 and 3.5 %. A detailed description of the adsorption system is given in module 07." }
    ]
  },
  {
    id: "e9", group: "II. Equipment", title: "Humidifier PG-622-E", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The humidifier function is to control the process gas humidity percent. The fundamental reason for this control is to be able to adjust the carbon percent in the DRI.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "This is because in the HYL 4M plant the process gas has a CH4 high content and inside the reactor the pressure and temperature conditions for the DRI carburization are present. Adding a humidity percent to the process gas reduces the possibility of these reactions occurring." },
      { type: "text", text: "The mechanism used to humidify the process gas is to put it in direct contact in countercurrent with an injection of a water flow. Depending on the water temperature, with certain water steam content. This can be calculated with the Dalton and Antoine equation." },
      { type: "callout", text: "Dalton: YH2O = water steam pressure / total absolute pressure of the gas stream. Y is the mole fraction of water steam. Steam pressure is calculated with the Antoine equation, which relates water steam pressure with the outlet gas temperature." },
      { type: "text", text: "For the humidifier PG-622-E, the process gas enters at 36 °C and leaves at 68 °C with a rate within 4.5 and 5.0 % water steam. Water enters at 95 °C and leaves at 76 °C." },
      { type: "text", text: "The humidifier is a vertical vessel made of carbon steel plate which contains a flexigrid bed type 3, a Chevron grill and a demisting pad. It has an internal cover of siloxirane 2031 to avoid chloride corrosion. It is provided with high and low level alarms." },
      { type: "photos", items: [
        { kind: "tower", caption: "Figure 15 · Humidifier PG-622-E" }
      ]}
    ]
  },
  {
    id: "e10", group: "II. Equipment", title: "Heater PG-601-B", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The recycle process gas and natural gas mixture previously heated and with 4.6 % humidity, at 250–260 °C and 6.2 kg/cm² abs, before entering the heater’s convection zone receives a H2S injection to reduce the catastrophic carburization effect called metal dusting.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Then the pre-heating continues and afterwards it enters the radiant zone. The heater operates at high temperature, which is obtained by burners located at the radiant boxes floor. Its principal function is to heat the process gas up to 910–930 °C." },
      { type: "text", text: "After the heater, the process gas enters the transference line. The oxygen injection is located at this point, right before entering the reactor, where the temperature of the process gas is increased to 1085 °C, approximately." },
      { type: "text", text: "The heater PG-601-B is the radiant–convective type and uses forced and induced draft fans. The radiant zone is divided in cold zone and hot zone." },
      { type: "list", title: "Temperature path", items: [
        "Leaves heat recuperator PG-614-C at 270 °C",
        "Enters convective zone and leaves at 500–550 °C",
        "Cold radiant box: leaves at 700 °C",
        "Hot box: increased to 910–930 °C"
      ]},
      { type: "text", text: "The heat is provided by 68 burners distributed in 2 rows of 17 burners in each section, which are designed to burn tail gases, natural gas or both in the same burner but in an independent form. Process gas heater PG-601-B and the H2S injection systems are described with more detail in module 02." }
    ]
  },
  {
    id: "e11", group: "II. Equipment", title: "Dummy quench and absorption tower", kicker: "II-B. EQUIPMENT FUNCTION",
    lead: "The function of quench orifice PG-650-C is to cool the process gas from 1065 °C to 105–110 °C at the moment in which by some contingency the reactor shuts down and it is not possible to send the process gas through the reactor, and it is also used when the system is starting up.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "In this equipment the gas is in direct contact with equipment cooling water coming from pumps WS-610-J1/2. This quench orifice as well as PG-611-C consists of two concentric tubes at whose base a water jacket forms. The water entrance towards the internal tube is through 3 rows with 45 orifices of 13 mm D.I. with 8° from each other." },
      { type: "text", text: "K.O. drum PG-650-F is a cylindrical vessel made of carbon steel plate and has a demisting pad in its top section whose function is to remove any condensation that could be carried on by the gas stream. The function of this vessel is to remove the water from the process gas which is clean and with a temperature of 100 °C." },
      { type: "warn", text: "When the gas is going through the dummy quench line, the outlet gas from this equipment has a high humidity percent due to the water vaporization which was used for cooling. This water steam will condensate at the process gas quench tower PG-631-E." },
      { type: "text", text: "Absorption tower PG-223-E: the removal of CO2 from the recycled gas takes place in this unit, making this gas flow in counter flow with an amine solution. Around 11% of the total process gas, which corresponds to CO2, entering this unit is absorbed." },
      { type: "text", text: "Decarbonated gas passes through K.O. drum PG-223-F for the purpose of eliminating any remnants of amine, as well as moisture. At the K.O. drum outlet, the process gas joins the flow of make-up natural gas." },
      { type: "photos", items: [
        { kind: "exchanger", caption: "Figure 16 · Quench orifice PG-650-C of the dummy quench line" },
        { kind: "tower", caption: "Figure 17 · K.O. drum PG-650-F of the dummy quench line" }
      ]}
    ]
  },
  {
    id: "eq", group: "II. Equipment", title: "Section check", kicker: "II-B · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "The reactor holds the bed and the plenum of 124 exits. Recuperator has 660 tubes. Quench, venturi and filters clean the exhaust. The compressor sets 4.65 to 7.4. VPSA cuts CO2. The humidifier sets humidity with Dalton and Antoine to control carbon. The heater and oxygen set TER. Dummy quench PG-650-C cools 1065 to about 110 when the reactor is bypassed.",
    quiz: [
      { q: "The rotary valve on RE-621-D…", options: ["Sets production rate of solids", "Opens the flare", "Drives the compressor"], a: 0, why: "It is at the bottom of the cone and controls how fast ore leaves." },
      { q: "Why cool after the compressor?", options: ["To make more fines", "To protect VPSA from heat and condensate", "To raise TER"], a: 1, why: "After-cooler and KO drum stop water and heat from reaching the adsorbent." },
      { q: "Humidifier humidity is used to…", options: ["Help control carbon in the DRI", "Lubricate the rotors", "Start the motor"], a: 0, why: "Steam in the gas reduces unwanted carburization when CH4 is high." },
      { q: "PG-650-C cools process gas from…", options: ["40 to 20 °C", "1065 °C to 105–110 °C when the reactor is bypassed", "Oil heater duty"], a: 1, why: "Dummy quench orifice, used on start-up or reactor contingency." }
    ],
    blocks: []
  },
  {
    id: "k1", group: "II. Compressor PG-671-J", title: "Compressor PG-671-J description", kicker: "II-C. REDUCTION GAS COMPRESSOR",
    lead: "The compressor PG-671-J is a two-impeller, helical-lobe, axial flow, rotary positive displacement dry type.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The impeller profiles are mainly semi-circular with modifications to produce a pure rolling motion between adjacent surfaces. The power impeller (male) has four lobes; the secondary (female) impeller has six matching cavities. Outside diameters are identical but the rotative speed of the female impeller is two-thirds of the male." },
      { type: "text", text: "Helical timing gears maintain a synchronized relationship between the lobes so that the impellers rotate without metal to metal contact at all times. Power is transmitted to the secondary impeller through the cushioning of the medium being compressed; the timing gears transmit only a negligible part of the total input horsepower." },
      { type: "text", text: "Positive positioning of the impellers is maintained by precision sleeve-type radial bearings and heavy duty thrust bearings. Since there is no metal to metal contact within the compression chamber, no lubrication of the Impellers is needed." },
      { type: "photos", items: [
        { kind: "pump", caption: "Figure 18 · Compressor PG-671-J longitudinal view" }
      ]}
    ]
  },
  {
    id: "k2", group: "II. Compressor PG-671-J", title: "How the lobes compress the gas", kicker: "II-C. COMPRESSOR DESCRIPTION",
    lead: "The Impellers rotate in such a way that the Lobes and mating cavities part on the intake end and close on the discharge end.",
    audio: "", quiz: [],
    blocks: [
      { type: "steps", title: "From the manual", items: [
        "The parting of the lobes creates an intake suction which causes the interlobal space to be filled with gas.",
        "Further rotation isolates this space from the intake, and the intermeshing of the helical lobes reduces its volume gradually compressing the gas.",
        "As the leading edges of the lobes pass the stationary edges which form the discharge opening in the casing, the gas flows into the discharge line under the positive action of the intermeshing lobes.",
        "The closing action is completed and the interlobal space is reduced to zero before passing the discharge opening thereby avoiding trapped pockets.",
        "It also produces a practically continuous and even delivery of gas flow."
      ]},
      { type: "ok", text: "The construction of bearings and seals used in the compressor is such that any leakage of lubricant from the bearings or seals would normally be to the atmosphere and not into the compressor chamber. The compressor housings are jacketed for water cooling. The rotors are cooled by oil flowing through the hollow rotor shafts." }
    ]
  },
  {
    id: "k3", group: "II. Compressor PG-671-J", title: "Compressor parts list", kicker: "II-D. REDUCTION COMPRESSOR PARTS",
    lead: "The reduction compressor PG-671-J consists of the following components.",
    audio: "", quiz: [],
    blocks: [
      { type: "list", title: "Components", items: [
        "Compressor housing",
        "Inlet casing",
        "Rotors and shafts",
        "Radial bearings",
        "Thrust bearings",
        "Seal assembly",
        "Timing gears",
        "Couplings",
        "Silencers",
        "Lubricating system",
        "Cooling system",
        "Auxiliary equipment"
      ]}
    ]
  },
  {
    id: "k4", group: "II. Compressor PG-671-J", title: "Housing and inlet casing", kicker: "II-D. COMPRESSOR PARTS",
    lead: "The standard compressor housing is a (semi-steel) iron casting, suitably cored with water passages for jacket cooling.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The discharge nozzle faces vertically up and is sized for machining flat face flange standards, depending on the design working pressure of the application. Compressor PG-671-J has two-piece housings split on the horizontal center line." },
      { type: "text", text: "Passages for conveying oil to the discharge end bearings are drilled into the housing. Passages for gas to seals or venting special discharge end shaft seals are also drilled into the housing." },
      { type: "text", text: "The inlet casing is a (semi-steel) iron casting. The intake nozzle for the standard inlet casing faces vertically up and is an integral part of the casing. The nozzle is sized and drilled to fit faced standards. The casing is tested hydrostatically. Compressor PG-671-J has a two-piece housing split on the horizontal center line." },
      { type: "photos", items: [
        { kind: "pump", caption: "Figure 19 · Compressor housing" },
        { kind: "pump", caption: "Figure 20 · Compressor PG-671-J casing" }
      ]}
    ]
  },
  {
    id: "k5", group: "II. Compressor PG-671-J", title: "Rotors and shafts", kicker: "II-D. COMPRESSOR PARTS",
    lead: "The standard helical-lobe rotors are of forged steel and precision machined to exact geometry. All rotors are balanced statically and dynamically to assure that there is no vibration.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The rotors are cooled internally by oil passing through the longitudinal bores. This cooling tends to reduce the temperature gradient across the rotors, thereby minimizing the possibility of thermal distortion. In certain applications, internal cooling of rotors may not be required, and in these cases the rotors and shafts will not be bored for cooling." },
      { type: "ok", text: "Both rotors have the same diameter, but the difference is that the male rotor has four lobes and the female has six lobes or cavities. This causes that the female rotor speed is 2/3 the speed of the male rotor." },
      { type: "photos", items: [
        { kind: "pump", caption: "Figure 21 · Rotors. Male 4 lobes, female 6 cavities." }
      ]}
    ]
  },
  {
    id: "k6", group: "II. Compressor PG-671-J", title: "Radial and thrust bearings", kicker: "II-D. COMPRESSOR PARTS",
    lead: "Pressure lubricated sleeve bearings are used to support the radial loads imposed upon the rotors.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The bearings are located outboard of the compression chamber and are completely separated from the gas stream to insure oil-free gas delivery. The bearings are of the full or 360° type and are of “heavy-wall” construction with steel backing and a Babbitt rubbing surface. The rubbing surface is relieved at the point of lubricating oil entry (approximately opposite point of load) to assist in the formation of an ideal hydrodynamic fluid film." },
      { type: "text", text: "The Waukesha thrust bearings supplied with this compressor are of the self leveling pad type design and are located on the timing gear end of the compressor. These bearings absorb the thrust load imposed by the gas reaction on the rotors. The thrust is in the direction of the compressor drive end." },
      { type: "text", text: "The thrust bearings consist of a thrust collar and a mating thrust ring assembly. The thrust collar is keyed to the rotor shaft and is held in axial position by the timing gear which is shrunk on the shaft. The gear is locked by means of a nut on the end of the rotor shaft." },
      { type: "text", text: "The male rotor ring carries six self-leveling thrust pads and the female rotor ring carries two of such pads. These pads are free to tilt, thus allowing an oil film to be maintained constantly between the pads and thrust collar. The pads do not rotate. The ring thrust pads may be replaced individually because of the self-leveling feature and without removing rotor shaft or cover housing." },
      { type: "photos", items: [
        { kind: "pump", caption: "Figure 22 · Radial bearings" },
        { kind: "pump", caption: "Figure 23 · Thrust bearings" }
      ]}
    ]
  },
  {
    id: "k7", group: "II. Compressor PG-671-J", title: "Seals and timing gears", kicker: "II-D. COMPRESSOR PARTS",
    lead: "Seals on this compressor are labyrinth type. Its function is to avoid process gas leaks to the ambient.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The oil is injected between the seal face and the limit to provide a differential pressure with the process gas. The oil pressure must be controlled in such way to avoid any process gas leak." },
      { type: "text", text: "The helical timing gears are located at the discharge end of the rotor shafts. These gears synchronize the rotation of the rotors as well as maintain a positive rotor-to-rotor running clearance. They are provided in matched sets and are manufactured to close tolerance. The teeth on the male rotor gear are crowned, thereby assuring ideal wear-in and quiet, smooth operation. It is advisable that when a gear is replaced, the gear set must be completely replaced." },
      { type: "text", text: "The female rotor has a two piece gear composed of a hub and gear rim. The hub is pressed into the shaft and secured with a key and locknut. After that it is then doweled in place. Gear pullers are provided to facilitate removal. Gear lubrication and cooling is accomplished by a spray of oil forced fed through a spitter inserted in the discharge end cover." },
      { type: "callout", text: "Only a very small portion of the load is transmitted through the gears. The dynamic forces, imposed by the gas in its compression cycle, tend to turn the female rotor. Therefore the only function of the timing gears is of synchronization." },
      { type: "photos", items: [
        { kind: "pump", caption: "Figure 24 · Labyrinth type seal arrangement" },
        { kind: "pump", caption: "Figure 25 · Timing gears" }
      ]}
    ]
  },
  {
    id: "k8", group: "II. Compressor PG-671-J", title: "Couplings and silencers", kicker: "II-D. COMPRESSOR PARTS",
    lead: "The flexible coupling should not be considered as a universal joint and must be aligned the same as the solid coupling to ensure continued satisfactory service.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "On assembly, or if it becomes necessary to disassemble a coupling, watch for match marks on the component parts. The match marks indicate the coupling has been dynamically balanced at the factory and it must be reassembled exactly as when it was originally assembled if the dynamic balance is to be retained. Couplings should be kept in alignment at all times and the coupling bolts should be checked periodically for tightness." },
      { type: "text", text: "The recycle gas compressor PG-671-J has two silencers which are installed at the suction and discharge of the compressor. The inlet silencer is required to hold down objectionable intake sound level and should always be located at the compressor inlet flange. The outlet silencer is always located at the compressor discharge flange and it is required to reduce sound level and high frequency pulsations in the gas stream caused by the gas release from the individual interlobal spaces of the rotors." },
      { type: "warn", text: "All piping must be adequately supported so that minimum weights and strains are imposed on the compressor nozzles. Excessive weight upon the compressor may cause misalignment at the couplings and place stress on the compressor housing. Allowances, in the gas process line, must be made for thermal expansion." },
      { type: "text", text: "Each silencer has two concentric steel tubes. The internal tube has orifices that help to reduce the noise level. Figure 26 illustrates this concept." }
    ]
  },
  {
    id: "k9", group: "II. Compressor PG-671-J", title: "Lubricating system", kicker: "II-D. COMPRESSOR PARTS",
    lead: "Lubricant oil is fed to the compressor, the speed increaser gear and electric motor by independent units.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Lubrication unit PG-691-U lubricates the compressor and the speed increaser gear and the PG-692-U unit lubricates only the electric motor." },
      { type: "text", text: "Lubrication unit PG-691-U has an oil tank, two pumps, oil coolers, filters, pressure gauges, thermometers, switches and necessary pipes. The oil tank has a breather-filter vent and fill, an internal oil heater and a visual level indicator. The oil tank is rectangular with the purpose of preventing dirt accumulation to the suction pumps. The console transference valves (4 ways) are used to isolate a filter or oil coolers without interrupting the unit operation." },
      { type: "text", text: "Lubrication oil circulates through the system by means of the principal pumps; one is in service and the other one in reserve and in automatic mode so it can operate at anytime, when the oil pressure decreases below the required level." },
      { type: "text", text: "Lubrication unit PG-692-U has two pumps, filters, pressure gauges, oil coolers, switches and necessary pipes. The oil tank is rectangular and has an oil heater and a visual level indicator. The adjustment for this unit must be in such way that the pump can be manually operated, so it can be put in service for pre-lubrication before the compressor start-up or to circulate oil through the different parts that are lubricated when the compressor stops." },
      { type: "callout", text: "To protect the pumps in both units, there are relief valves. A pressure regulator valve is installed at the discharge of the pumps to maintain pressure of the lubrication oil header. Figure 27 is a flow diagram of the lubrication system." }
    ]
  },
  {
    id: "k10", group: "II. Compressor PG-671-J", title: "Cooling system and auxiliary equipment", kicker: "II-D. COMPRESSOR PARTS",
    lead: "Compressor PG-671-J uses equipment cooling water for the compressor water jacket and lube oil cooling equipment. Cooling water is also required for intercoolers and after coolers.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The shell and tube type lube oil cooler is included as part of the lube oil system. The cooling water flows through the tubes and lube oil around the tubes as it passes through the shell. Control of the oil temperature, as it is discharged from the cooler, is achieved by regulating the water flow through the cooler." },
      { type: "warn", text: "The water jacket should be circulated for a few (10–15) minutes before starting, to check the system, and after stopping, to dissipate heat from the bearings, rotors and housing. A visual overflow is preferred in the discharge pipes from the compressor jackets, oil cooler, and intercooler." },
      { type: "text", text: "The auxiliary equipment is the filters and the vibration and temperature control panel. The compressor has two gas filters located at the suction. These are designed to avoid solid material with a size above 5 micron to get to the compressor, avoiding this way any rotor damage. At normal operation, both filters are operating, and in a high pressure drop case a by-pass will be used during the change of the filter elements." },
      { type: "warn", text: "High pressure drop at the filters should not exceed 0.3 kg/cm². Any pressure drop increase will be a warning for putting the filter out of service and replacing the filter elements." }
    ]
  },
  {
    id: "k11", group: "II. Compressor PG-671-J", title: "Vibration, displacement and temperature panel", kicker: "II-D. COMPRESSOR PARTS",
    lead: "The compressor interlock system is designed to provide versatility to the monitoring and vibration measures and draft position at the rotating equipment.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The vibration console has four monitors for compressor vibrations, two for compressor displacement, two for the speed increaser vibrations and two for the electric motor vibrations. See figure 28." },
      { type: "text", text: "The vibration monitors indicate the maximum variation peak to peak. Vibration monitors have two levels of action, alarm and shutdown, and they are adjustable over the scale. When shutdown levels are reached, yellow and red lights activate corresponding to the shutdown levels." },
      { type: "text", text: "The shutdown level must be frequently checked by pressing the appropriate button in the frontal part of the panel; the scale will indicate the correspondent shutdown value. Using the controls at the front of the monitor doesn’t have any effect at the interlock circuit." },
      { type: "text", text: "The displacement position panel has the zero at the center of the scale. Normal or positive position at the displacement indicator will always be towards the test tube unless it is specified otherwise. When the shutdown level is reached lights and alarms activate." },
      { type: "callout", text: "With respect to the temperature indication, the engine, compressor and speed increaser have a set of indicators. Their localization is represented in figure 29." }
    ]
  },
  {
    id: "k12", group: "II. Compressor PG-671-J", title: "Speed increaser and motor", kicker: "II-D. COMPRESSOR PARTS",
    lead: "The gear box or speed increaser gear has a housing made of carbon steel plate, which has a gears and shaft set.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "The gear is mounted in the low speed shaft which is the inlet shaft and is connected to an electric motor. The pinion to which the power is transmitted is integrated to the shaft, which in this case, is the high speed shaft. Figure 30 shows a transversal section of the gear box. The bearings are mounted at the end of each shaft. Two bearings at each shaft, one for high and the other for low speed; as well as oil seals." },
      { type: "text", text: "The motor unit is a General Electric motor, totally closed, with air–water heat exchanger, forced lubrication bearings, with 6900 HP, horizontal, induction, three-phase. It is divided in two sections: an internal section, which houses the active motor parts; and an external section, which makes up the cooling system. No exchange of air takes place between the two sections." },
      { type: "simulator", title: "Practice: start PG-671-J", success: "Compressor at speed. Stay 5 minutes in the area. No strange noise. Oil 40–45 °C, oil pressure above 1.8 kg/cm².", fail: "Start blocked. A permissive is still false. Do not force.", items: [
        "Oil tank level in range",
        "Oil pressure ≥ 1.8 kg/cm², temperature 35–45 °C",
        "No lube trip or vibration trip",
        "PDV-67103 open 100%, suction and discharge valves open",
        "KO PG-671-F drained, no condensate in the case",
        "Jacket and motor cooling water flowing",
        "Filter ΔP < 0.3 kg/cm²"
      ]}
    ]
  },
  {
    id: "kq", group: "II. Compressor PG-671-J", title: "Section check", kicker: "II-C/D · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "PG-671-J is a dry helical-lobe compressor. Male four lobes, female six. Female speed is two thirds of the male. No oil in the gas. Timing gears only keep time. Housings are water jacketed. Rotors are oil cooled. Watch discharge temperature, filter drop of 0.3, oil and vibration. Circulate jacket water 10 to 15 minutes before start. Motor is General Electric, 6900 horsepower.",
    quiz: [
      { q: "Why is this compressor called dry?", options: ["It has no cooling water", "No lubrication on the impellers; no metal contact in the chamber", "It only compresses nitrogen"], a: 1, why: "Lobes do not touch. Oil is not in the compression chamber." },
      { q: "Female rotor speed is…", options: ["The same as the male", "Two-thirds of the male", "Twice the male"], a: 1, why: "Four lobes vs six cavities. Female runs at 2/3 male speed." },
      { q: "Timing gears…", options: ["Transmit almost all the horsepower", "Only synchronize; gas turns the female rotor", "Are not used on PG-671-J"], a: 1, why: "The document: only a negligible part of horsepower goes through the gears." },
      { q: "High filter ΔP must not exceed…", options: ["0.3 kg/cm²", "30 kg/cm²", "Oil is cold"], a: 0, why: "Bypass and change elements. Protect the rotors." }
    ],
    blocks: []
  },
  {
    id: "ds1", group: "II. Data sheets", title: "Recuperator, quench, venturi", kicker: "II-E. Data sheets · 4M Monterrey",
    lead: "Numbers from the training data sheets. Use them to check a field reading, not to redesign the plant.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["PG-614-C recuperator", "Tube side (process)", "Shell side (exhaust)"], rows: [
        ["Flow", "97 285", "134 284 kg/h"],
        ["In / out temperature", "71.7 → 275 °C", "448 → 286 °C"],
        ["Inlet pressure / ΔP", "5.37 / 0.15", "4.0 / 0.05 kg/cm²"],
        ["Tubes", "660 · 316 SS · 842.6 m²", "Shell 316 SS"],
        ["Design P / T", "7.5 / 480 °C", "8.81 / 400 °C"],
        ["Empty / water-full weight", "48 000 kg", "71 600 kg"]
      ]},
      { type: "table", headers: ["PG-611-C quench orifice", "Internal tube", "External tube"], rows: [
        ["Material / diameter", "SS 304 · 965 mm", "CS 515-Gr 70 · 1067 mm"],
        ["Inlet flow", "134 371 kg/h", "105 859 kg/h"],
        ["In / out temperature", "265 → 107 °C", "83 → 107 °C"],
        ["Op / design pressure", "4.98 / 7.09", "4.48 / 6.59 kg/cm² man"],
        ["Code", "ASME VIII-1, 1/8 in corrosion, X-ray yes", "Same"]
      ]},
      { type: "table", headers: ["Venturi", "PG-630-L", "PG-631-L"], rows: [
        ["Gas / liquid in", "147 941 / 94 144 kg/h", "147 576 / 87 609 kg/h"],
        ["Op T / P", "105.7 °C · 3.92 kg/cm² man", "104.9 °C · 3.82 kg/cm² man"],
        ["Throat / cones", "620 mm · SS 654 SMO", "620 mm · CS A-515 Gr 70"],
        ["Design ΔP max", "0.152 kg/cm²", "0.152 kg/cm²"]
      ]}
    ]
  },
  {
    id: "ds2", group: "II. Data sheets", title: "Scrubber, quench tower, KO, filters", kicker: "II-E. Data sheets · 4M Monterrey",
    lead: "Volume, metal and operating window for the cleaning train.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["Vessel", "Size / volume", "Op · design"], rows: [
        ["PG-630-F separator", "Ø 4267 mm · 7.5 m high · 141.4 m³", "107 °C · 3.83 / design 6.0 kg/cm² man"],
        ["PG-631-E quench tower", "Ø 4572 mm · 12.8 m · 225 m³ · 46 643 kg empty", "107 °C · 3.82 / design 6.0 · water-full 268 t"],
        ["PG-671-F KO", "54.85 m³ · 13 551 kg · 16 mm wall", "38 °C · 3.73 · 167 064 NMCH · ΔP 0.1"],
        ["PG-622-F KO", "38.4 m³ · 13 382 kg · 19/25 mm", "42 °C · 6.23 · 165 490 Nm³/h"],
        ["PG-650-F dummy KO", "53.06 m³ · 15 474 kg", "112.5 °C · 4.28 · 150 000 NMHC"]
      ]},
      { type: "table", headers: ["PG-671-G1/G2 Dollinger", "Value"], rows: [
        ["Type / quantity", "Cartridge · two in parallel"],
        ["Nominal / max flow", "165 958 / 177 349 NCMH"],
        ["Op / design", "38 °C · 3.62 kg/cm² · design 343 °C · 6.79 kg/cm²"],
        ["ΔP / removal", "0.035 kg/cm² · >5 micron · 95% efficiency"],
        ["Size", "Ø 111.8 cm · H 381.6 cm · 3 elements · 24 in nozzles"]
      ]},
      { type: "callout", text: "Scrubber and quench tower: CS A-515 Gr 70, siloxirane lining, SS 304 chevron / flexigrid / demister. High and high-high level alarms." }
    ]
  },
  {
    id: "ds3", group: "II. Data sheets", title: "Compressor, after-cooler, humidifier", kicker: "II-E. Data sheets · 4M Monterrey",
    lead: "PG-671-J is A.C. Compressor 250-L 2, series 50288. Motor GE 6900 HP.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["PG-671-J", "Value"], rows: [
        ["Type / model", "Rotary screw · 250-L 2 · qty 1"],
        ["Inlet capacity / T", "165 958 m³/h · 38 °C"],
        ["Guaranteed P in / out", "4.6 → 7.4 kg/cm² man"],
        ["Guaranteed power / speed", "5476 HP · 3778 rpm · max cont. 3778"],
        ["Critical speeds", "1st 540 rpm · 2nd 1980 rpm"],
        ["MW / k", "13.947 · 1.353"],
        ["Motor", "GE 6900 HP · 13.2 kV · 264 A · 3 ph · 60 Hz · 1790 rpm · SF 1.15"],
        ["Gearbox Lufkin N 2102C", "Ratio 2.128 · 1785 → 3804 rpm · SF 1.79"]
      ]},
      { type: "table", headers: ["PG-671-C after-cooler", "Tube (water)", "Shell (gas)"], rows: [
        ["Flow", "246 330", "220 519 kg/h"],
        ["In / out T", "32 → 45 °C", "99 → 42 °C"],
        ["P / ΔP", "3.5 / 0.7", "5.48 / 0.37 kg/cm²"],
        ["Tubes", "980 · 410 SS · 6096 mm · 477 m²", "Shell 410 SS"]
      ]},
      { type: "table", headers: ["PG-622-E humidifier", "Value"], rows: [
        ["Op / design", "71.7 °C · 5.53 / design 7.18 kg/cm² man · 150.6 m³"],
        ["Shell", "CS A-515 Gr 70 · Ø 3962 mm · H 12 928 mm · 19 mm"],
        ["Packing", "Flexigrid style 3 · 3048 mm · 37.58 m³ · ~43% flood"],
        ["Duty in text", "Gas in ~36 °C out ~68 °C · 4.5–5.0% steam · water 95 → 76 °C"]
      ]},
      { type: "table", headers: ["PG-650-C dummy quench", "Internal", "External"], rows: [
        ["Flow / T in", "84 243 kg/h · 910 °C", "37 203 kg/h · 32 °C"],
        ["Out T", "112.5 °C", "32 °C"],
        ["Diameter / length", "SS 304 · 848 / 2798 mm", "CS · 1219 / 2208 mm"]
      ]}
    ]
  },
  {
    id: "dsq", group: "II. Data sheets", title: "Section check", kicker: "II-E · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "Data sheets are for the 4M plant in Monterrey. Recuperator has 660 tubes. Filters are two Dollinger cartridges in parallel. The compressor is a rotary screw, about 166 thousand cubic meters an hour, 4.6 to 7.4. Motor 6900 horsepower. After-cooler takes discharge from 99 to 42 degrees. Humidifier sets steam at 4.5 to 5 percent.",
    quiz: [
      { q: "PG-671-J guaranteed pressures are about…", options: ["0.2 to 1.0 kg/cm²", "4.6 to 7.4 kg/cm² man", "40 to 80 kg/cm²"], a: 1, why: "The compressor data sheet lists 4.6 in and 7.4 out, kg/cm² man." },
      { q: "After-cooler PG-671-C cools gas from…", options: ["99 °C to 42 °C", "910 °C to 40 °C", "38 °C to 400 °C"], a: 0, why: "Shell side: 99 → 42 °C before VPSA." },
      { q: "How many Dollinger filters?", options: ["One only, no bypass", "Two, normally in parallel, with bypass for change-out", "Ten in series"], a: 1, why: "PG-671-G1/G2. Change when ΔP is high." },
      { q: "Humidifier steam target in the sheet text is…", options: ["0.1%", "4.5–5.0%", "40%"], a: 1, why: "That range is used to hold DRI carbon." }
    ],
    blocks: []
  },
  {
    id: "l1", group: "III. Control loops", title: "Instrumentation", kicker: "III-A. Instrumentation",
    lead: "Indicators, recorders, transmitters and control valves. The operator watches and moves set points. Safety logic still trips.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Figures 32 and 33 in the paper manual show the full P&ID set. This slide deck keeps the loops that run the circuit every day." },
      { type: "callout", text: "Oxygen injection at the transfer line is in module 15. Heater detail is module 02. VPSA is module 07." }
    ]
  },
  {
    id: "l2", group: "III. Control loops", title: "Loops in this circuit", kicker: "III-B. Control loops",
    lead: "Know the tag and the job. Click one.",
    audio: "", quiz: [],
    blocks: [
      { type: "reveal", title: "Click a loop", items: [
        { label: "FIC-67103 / PDV-67103", detail: "Process gas flow to the heater. Recycle extra gas from compressor discharge back to quench tower PG-631-E." },
        { label: "PIC-62215 / PV-62215", detail: "Pressure at VPSA inlet. Bypass to humidifier if VPSA cannot take the flow." },
        { label: "AIC-63000 / FIC-62214 / FV-62214", detail: "Natural-gas make-up. Holds CH4 in the exhaust and can help system pressure." },
        { label: "FIC-62298 / FV-62298", detail: "Nitrogen make-up. Used when CH4 is high or when you bottle the circuit." },
        { label: "TIC-62210 / TV-62210", detail: "Humidity to the heater by water to PG-622-E. Target about 4.5–5.5%." },
        { label: "PIC-62116 / PV-62116 A/B", detail: "Reactor pressure. Purge to tail-gas header. Small valve A first, then B." },
        { label: "Dummy quench valves", detail: "FV-65002 / FV-65003 move gas reactor ↔ dummy. TIC-6500 and LIC-65001 run the bypass cooler." }
      ]}
    ]
  },
  {
    id: "l3", group: "III. Control loops", title: "Heater flow loop FIC-67103", kicker: "III-B. Control loops",
    lead: "This loop protects the heater and the compressor, not only the flow number.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Operator sets FIC-67103. PV comes from FY-62212 (humidifier outlet flow, humidity-compensated)." },
      { type: "text", text: "FY-67103 is a selector. It looks at heater flow demand, high TSR (TIC-62115), compressor vibration VIC-67103, and high differential PDIC-67103." },
      { type: "list", title: "What the valve does", items: [
        "If flow to the heater is too high → PDV-67103 opens → more recycle → less gas to the heater",
        "If TSR jumps (example 430 → 480 °C) → TIC-62115 takes the selector → valve opens → less gas to the reactor",
        "If filter ΔP is high → PDIC-67103 opens the recycle valve to protect the machine"
      ]},
      { type: "warn", text: "Do not sit on a wide-open recycle as a normal way to run. Find why flow, TSR or ΔP moved." }
    ]
  },
  {
    id: "l4", group: "III. Control loops", title: "Make-up, humidity, dummy line", kicker: "III-B. Control loops",
    lead: "CH4, water and the bypass decide quality and whether the bed sees hot gas.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Natural gas: FY-62214A is a low selector between FIC-62214, AIC-63000 and PIC-62116A. FV-62214 fails closed (air to open)." },
      { type: "text", text: "Humidity: HIK-62210 sets % H2O. TY-62210 uses PI-62212. TIC-62210 moves TV-62210 (air to close)." },
      { type: "text", text: "Dummy: open FV-65002 in steps to put gas in parallel, then close FV-65003 so all gas goes dummy. Reverse to put gas back in the reactor. Shift chief decides auto or manual." },
      { type: "ok", text: "Always balance water between PG-650-C and PG-611-C when you move the dummy valves." }
    ]
  },
  {
    id: "l5", group: "III. Control loops", title: "Levels, quench water, VPSA pressure", kicker: "III-B. Control loops",
    lead: "Stable levels stop water in the gas and gas in the water. Water flow holds outlet temperature.",
    audio: "", quiz: [],
    blocks: [
      { type: "reveal", title: "Click a loop", items: [
        { label: "PIC-62215 / PV-62215", detail: "Holds VPSA inlet pressure. PT-62215 → PIC-62215 (direct) → PV-62215 bypass to humidifier. If VPSA is down, valve can go 100% open. Flow is pressure-compensated on FI-62215." },
        { label: "LIC-62206 humidifier", detail: "ΔP level. Direct LIC → invert → LV-62206 (air to close). Stops water carry-over or gas into the water return." },
        { label: "TIC-61101 quench PG-611-C", detail: "TE/TT-61101 → TIC (direct) → FY-61101 high selector with TIC-61400 (reactor vent to stack). Cascade to FIC-61101 → FV-61101 (air to close)." },
        { label: "LIC-63002 scrubber", detail: "LT-63002 → LIC-63002 (direct) → LV-63002 (air to close)." },
        { label: "FIC-63105 venturi water", detail: "FE/FT-63105 → FIC (reverse) → invert → FV-63105 (air to close). Holds wash water." },
        { label: "TIC/FIC-63106 quench tower", detail: "High selector TY-63106 between gas-out TIC-63106 and water-out TIC-63102. Cascade to FIC-63106 → FV-63106 (air to close)." },
        { label: "LIC-63101 quench tower", detail: "LT-63101 → LIC (direct) → LV-63101 on pump PG-631-J1/2 to the humidifier (air to close)." }
      ]},
      { type: "photos", items: [
        { kind: "hmi", caption: "Figures 32–33 · Reduction circuit instrumentation (replace with plant graphics)" },
        { kind: "hmi", caption: "Figures 34–46 · Loop graphics for flow, VPSA, make-up, humidity, levels" }
      ]}
    ]
  },
  {
    id: "l6", group: "III. Control loops", title: "Reactor pressure and dummy quench", kicker: "III-B. Control loops",
    lead: "PIC-62116 purges to tail gas. Dummy valves move the hot gas around the bed.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "PV-62116A is the small valve and runs first. PIC-62116 is split 20/80: at 20% output A is already 100% open; above 20% valve B takes the extra purge." },
      { type: "text", text: "Dummy temperature: TE/TT-6500 → TIC-6500 (direct) → FIC-6500, feed-forward from FT-65002. FV-6500 is air to close." },
      { type: "text", text: "Dummy KO level: LT/LIC-65001 (direct) → LV-65001 (air to close). Water returns toward the humidifier." },
      { type: "steps", title: "Move gas reactor ↔ dummy", items: [
        "Shift chief chooses auto (XIC-65003 / XIC-65002 ramp) or manual (HIK-65002 / HIK-65003).",
        "To dummy: open FV-65002 in steps until gas is in parallel, then close FV-65003.",
        "Back to reactor: open FV-65003 and close FV-65002 together so the bed is not starved, then not bypassed.",
        "Balance water PG-650-C ↔ PG-611-C and watch FI-65002 and FIC-67103."
      ]},
      { type: "warn", text: "Used on start-up, heater-tube chemical treatment, pneumatic-transport problems, or solid-flow problems in the reactor." }
    ]
  },
  {
    id: "lq", group: "III. Control loops", title: "Section check", kicker: "III-B · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "FIC-67103 and PDV-67103 hold heater flow and protect TSR, vibration and compressor differential. VPSA pressure can bypass to the humidifier. Natural gas and nitrogen make-up hold methane and pressure. The humidifier loop holds humidity. Dummy valves move gas around the reactor. Balance water when you do that.",
    quiz: [
      { q: "PDV-67103 opens to…", options: ["Send more gas to the heater", "Recycle gas so flow to the heater falls", "Trip the motor"], a: 1, why: "It recycles compressor discharge to the quench tower inlet." },
      { q: "If TSR rises fast, the flow loop should…", options: ["Force more gas into the reactor", "Open recycle and cut gas to the reactor", "Ignore TIC-62115"], a: 1, why: "TIC-62115 can take the selector and open PDV-67103." },
      { q: "Humidity to the heater is set at…", options: ["The humidifier, about 4.5–5.5%", "The oil console", "The melt shop"], a: 0, why: "TIC/HIK-62210 on PG-622-E holds steam in the process gas." },
      { q: "FV-62214 is air-to-open, so loss of air…", options: ["Opens natural gas wide", "Closes natural gas", "Starts the compressor"], a: 1, why: "Air to open means fail closed. That is the safe make-up fail position." }
    ],
    blocks: []
  },
  {
    id: "i1", group: "III. Interlocks", title: "Compressor trips", kicker: "III-C. Interlocks",
    lead: "Alarm first. Shutdown if the value stays bad. These are automatic.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["Signal", "Alarm", "Shutdown"], rows: [
        ["Radial vibration, coupling, female / male", "2 mils", "3 mils"],
        ["Axial displacement, female", "−6 mils", "−8 mils"],
        ["Axial displacement, male", "−12 mils", "−14 mils"],
        ["Motor bearing temperature", "85 °C", "90 °C"],
        ["Oil temperature", "53 °C", "60 °C"],
        ["Motor amps", "264 A", "270 A"],
        ["Oil pressure", "1.3 kg/cm²", "1.0 kg/cm²"]
      ]},
      { type: "text", text: "Low-low oil: stand-by pump starts. If pressure is still low, the compressor stops. High-high amps protect the motor windings." }
    ]
  },
  {
    id: "i2", group: "III. Interlocks", title: "Other events that stop the compressor", kicker: "III-C. Interlocks",
    lead: "The compressor is the motor of the circuit. Many plant faults stop it.",
    audio: "", quiz: [],
    blocks: [
      { type: "list", title: "Also trip PG-671-J", items: [
        "Shutdown button with vent",
        "High fuel or high temperature in heater PG-601-B (level 3 / 4)",
        "Reactor vent valve lost position and low reactor pressure, or hot gas to vent (XSV-61400 / TE-61400)",
        "Low instrument-air pressure (level 4)",
        "High-high level on KO PG-671-F (water to the machine)",
        "High compressor discharge temperature",
        "Low reactor pressure and high-high level in PG-630-F or PG-631-E"
      ]},
      { type: "warn", text: "High-high level in the suction KO is a hard stop. Water wrecks the rotors." }
    ]
  },
  {
    id: "i3", group: "III. Interlocks", title: "Natural-gas valve permissives", kicker: "III-C. Interlocks",
    lead: "XSV-62214 and FV-62214 stay closed if any of these are true. Practice on the simulator.",
    audio: "", quiz: [],
    blocks: [
      { type: "simulator", title: "Practice: open NG to the circuit", success: "XSV-62214 can open. FV-62214 is energized. Inject NG only when heater outlet is above 700 °C and the start-up program says so.", fail: "Valve stays closed. A trip or bad condition is still present.", items: [
        "Compressor is running (not off)",
        "No SD button without vent",
        "No high fuel / high temperature on heater",
        "Instrument air healthy",
        "TSR not high-high (TIC-62115 level 3)",
        "Quench PG-611-C and PG-631-E not high temperature",
        "No high-high level PG-631-E or PG-671-F",
        "Cooling-water headers not low-low",
        "Heater fans not tripped, no flame failure 2-of-3"
      ]}
    ]
  },
  {
    id: "iq", group: "III. Interlocks", title: "Section check", kicker: "III-C · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "Interlocks alarm, then trip. Vibration, axial displacement, oil, amps and suction KO level protect PG-671-J. Heater faults, vent faults and low instrument air also stop the compressor. Natural gas will not open if those conditions are still bad. Never bypass a safety trip to keep running.",
    quiz: [
      { q: "Low-low lube oil pressure first…", options: ["Opens the flare", "Starts the stand-by pump; if still low, trips the compressor", "Opens FV-62214"], a: 1, why: "The spare pump starts. If pressure does not recover, the machine stops." },
      { q: "High-high level in PG-671-F…", options: ["Is only a log note", "Trips the compressor to keep water out of the rotors", "Raises TER"], a: 1, why: "Water at suction is a hard shutdown." },
      { q: "You may open XSV-62214 when…", options: ["Any trip is still active", "The listed heater, level, air and fan conditions are clear and the compressor is not off for those trips", "The canteen is open"], a: 1, why: "The paper lists the conditions that must not be present." },
      { q: "A safety interlock may be bypassed…", options: ["Never in normal operation", "If the shift is short", "To hold rate"], a: 0, why: "Fix the cause. Then reset." }
    ],
    blocks: []
  },
  {
    id: "o1", group: "IV. Operation", title: "Before start-up", kicker: "IV-A. Start-up",
    lead: "Do not press start until this list is true.",
    audio: "", quiz: [],
    blocks: [
      { type: "checklist", title: "Tick each check", items: [
        "F keys available to open and close valves",
        "Oil tank levels on PG-691-U and PG-692-U in range",
        "Stand-by oil pumps operable",
        "After repairs: pipe, valves and instruments installed",
        "Main oil pump in service, pressure ≥ 1.8 kg/cm², oil 35–40 °C",
        "No lube alarms or trips — if yes, call instrumentation",
        "Bar the compressor by hand. Rotors must turn.",
        "PDV-67103 100% open. Suction and discharge valves open. Filter valves open.",
        "Drain PG-671-F, PG-622-F, filters and compressor case",
        "Jacket and motor cooling water flowing",
        "Levels in service: PG-630-F, PG-631-E. Water seal on humidifier and PG-650-F. Water on after-cooler.",
        "If VPSA is not ready: be able to bypass with PV-62215"
      ]}
    ]
  },
  {
    id: "o2", group: "IV. Operation", title: "Start sequence", kicker: "IV-A. Start-up",
    lead: "Heater and charge first. Compressor about hour 6. Then NG, oxygen, H2S, gas through the reactor, then VPSA.",
    audio: "", quiz: [],
    blocks: [
      { type: "steps", title: "Order", items: [
        "Start heater PG-601-B and reactor charge (~70 °C/h radiant, charge ~150 t/h). See modules 02 and 03.",
        "Start PG-671-J. Oil 40–45 °C, oil ≥ 1.8 kg/cm², seal ΔP ~1.0 psi, filter ΔP < 0.3. Stay 5 minutes. If it trips, wait 10 minutes.",
        "First gas goes dummy: FV-65003 closed, FV-65002 open. Water on PG-650-C. PG-611-C water ready but closed.",
        "Control heater flow with PDV-67103. After compressor start, ramp on hottest riser TI-60115: 70 °C/h to 650 °C, then 100 °C/h.",
        "NG when heater outlet > 700 °C and XSV/FV-62214 permissives are clear. Put PV-62116 A/B in control to purge nitrogen.",
        "When gas gravity is about 0.85, start oxygen (module 15). Then H2S 20–25 ppm at heater inlet.",
        "At TER 910 °C, move gas into the reactor slowly (FV-65002 / FV-65003). Water control shifts to PG-611-C.",
        "Rotary valve slow (1 turn / 15 min). Hold TSR about 430–470 °C on TIC-62115.",
        "When CO2 is about 12%, start VPSA and hold about 3.0% (module 07)."
      ]},
      { type: "warn", text: "Times can move (fill time, compressor hour). Follow the written start-up program for that outage." }
    ]
  },
  {
    id: "o3", group: "IV. Operation", title: "Normal operation targets", kicker: "IV-B. Normal operation",
    lead: "Hold these. Small drift is normal. Fast change is a problem.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["Parameter", "Target"], rows: [
        ["TER", "1060–1085 °C  (TIC-60150)"],
        ["FER", "1665 NCM/ton FeT"],
        ["TSC", "910–930 °C  (TIC-60116)"],
        ["IGNR / FIC-62214", "160 NCM/ton FeT · about 23 500 NCMH"],
        ["O2 / FIC-60155", "61.5 NCM/ton FeT · 5 500–6 500 NCMH"],
        ["FIC-67103", "160 000–165 000 NCMH"],
        ["CO2 to heater, dry", "3.1%"],
        ["H2O humidifier out", "4.5–5.0%"],
        ["H2S to heater", "20–25 ppm V"],
        ["CH4 to heater", "< 40%"],
        ["TSR (this table)", "360–380 °C"],
        ["TAR", "770–800 °C"]
      ]},
      { type: "callout", text: "The start-up text uses TSR 430–470 °C while the bed comes up. The normal-operation table lists 360–380 °C. Use the start-up program and the current operating window posted by process." }
    ]
  },
  {
    id: "o4", group: "IV. Operation", title: "Normal shutdown", kicker: "IV-C. Normal shut down",
    lead: "Reverse of start-up. Follow the schedule.",
    audio: "", quiz: [],
    blocks: [
      { type: "steps", title: "Order", items: [
        "Hour 1: cut flow and temperature. Heater down 100 °C/h on TIC-60116. Discharge follows TSR.",
        "At TER 900 °C: stop oxygen.",
        "Move gas to dummy quench. Water control to PG-650-C. Close water to PG-611-C. Stop charge. Ducts empty. Cold-gas ready.",
        "Stop VPSA (no more CO2). Bypass PV-62215.",
        "Stop NG. Bottle the circuit with nitrogen (FV-62298). Close FV-62214 and PV-62116 A/B. Stop using tail gas as heater fuel. Stop H2S.",
        "From TSC 650 °C ramp 70 °C/h on TI-60115. At TSC 370 °C stop the compressor. Then ramp on radiant TI-60113/114. Close water to PG-650-C and PG-631-L.",
        "Discharge as fast as transport and cooling allow. Sort DRI quality.",
        "When the reactor is empty: take PG-630-F, PG-631-E, humidifier out of service with water seal. Depressure.",
        "Nitrogen purge. Gas test. Then blinds before manways."
      ]}
    ]
  },
  {
    id: "o5", group: "IV. Operation", title: "Emergency shutdown", kicker: "IV-D. Emergency shut down",
    lead: "Used when equipment or people are at risk: bad machine condition, low instrument air, ESD button, power loss.",
    audio: "", quiz: [],
    blocks: [
      { type: "text", text: "Valves go to the fail-safe state defined in the 4M general interlock table. Do not fight the trip. Make the area safe, then find the cause." },
      { type: "warn", text: "This is not a normal shutdown. Do not restart until the cause is clear and permissives are healthy." }
    ]
  },
  {
    id: "oq", group: "IV. Operation", title: "Section check", kicker: "IV · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "Before start, oil, water, drains and a free rotor. Heater and charge first. Compressor on dummy quench. Natural gas after 700 degrees. Oxygen when gravity is about 0.85. Then H2S. Move gas into the reactor at TER 910. Start VPSA at about 12 percent CO2. Shutdown is the reverse: cut oxygen, go dummy, stop VPSA and NG, bottle with nitrogen, stop the compressor, empty, purge. Emergency is a trip. Do not fight it.",
    quiz: [
      { q: "First process gas after compressor start goes…", options: ["Straight through the full ore bed at 1085 °C", "Through dummy quench (FV-65002 open, FV-65003 closed)", "To the sewer"], a: 1, why: "Dummy quench is used until the circuit is ready for the reactor." },
      { q: "Natural gas starts when…", options: ["The heater is cold", "Heater outlet is above 700 °C and NG permissives are clear", "Oil is at 10 °C"], a: 1, why: "The start-up text is explicit: >700 °C and no trip on XSV/FV-62214." },
      { q: "On a scheduled shutdown, oxygen stops…", options: ["After the compressor is already down", "When TER is about 900 °C, then gas goes dummy", "Never"], a: 1, why: "Stop O2 at TER 900 °C, then bypass through dummy quench." },
      { q: "Before a manway you must…", options: ["Only close one control valve", "Depressure, nitrogen purge and prove no flammable mix", "Keep NG open"], a: 1, why: "Purge, test, then blinds." }
    ],
    blocks: []
  },
  {
    id: "tr1", group: "V. Troubleshooting", title: "Compressor, gearbox, motor", kicker: "V. Trouble shooting",
    lead: "Inspect often. Act when you first see the fault.",
    audio: "", quiz: [],
    blocks: [
      { type: "reveal", title: "Click the symptom", items: [
        { label: "Low capacity or low discharge pressure", detail: "Suction restriction or dirty filters. Circuit leak or open relief. Demand higher than the machine. Clean suction, change filters, find leaks, reset relief, cut demand." },
        { label: "High discharge temperature", detail: "Hot suction (check PG-631-E), high discharge pressure, dirty suction filter, low jacket water, rotor rub. Correct the cause. Do not wait for 105 °C." },
        { label: "High vibration or axial displacement", detail: "Bad oil or oil pressure, damaged bearing or thrust bearing, pipe strain, misalignment, foundation, rotor contact. Stop if trip. Repair. Do not keep running." },
        { label: "Trips on low oil pressure", detail: "Switch out of calibration, dirty oil filter, real leak. Calibrate, change filter, find the leak." },
        { label: "Gearbox noise / motor hot bearings", detail: "Wear, misalignment, lube failure, wrong oil, seal leak, winding contamination. Align, correct oil, clean or repair windings." }
      ]}
    ]
  },
  {
    id: "tr2", group: "V. Troubleshooting", title: "Circuit faults", kicker: "V. Trouble shooting",
    lead: "Most process faults are bed, filters, recycle valve or water.",
    audio: "", quiz: [],
    blocks: [
      { type: "reveal", title: "Click the symptom", items: [
        { label: "High pressure drop in the circuit", detail: "Too many fines in the ore, or agglomerates. Cut rate. Fix bins and parameters." },
        { label: "Low pellet level", detail: "Charge system or material handling. Fix the feed. Do not run the bed empty." },
        { label: "High TSR", detail: "Agglomerates, discharge or pneumatic transport problems. Cut rate. Free the discharge." },
        { label: "High ΔP on suction filters", detail: "Dirty elements. Use bypass and change them." },
        { label: "Not enough flow to the heater", detail: "PDV-67103 open too far, or a relief open. Check the valve. Do not starve the heater." },
        { label: "Low DRI metallization", detail: "Low TER, low FER, or bad ore. Put parameters back. Check ore spec." },
        { label: "High temperature at PG-631-E", detail: "Water flow failed or process water is hot. Fix water and the cooling tower." }
      ]}
    ]
  },
  {
    id: "tr3", group: "V. Troubleshooting", title: "Compressor fault table", kicker: "V. Trouble shooting",
    lead: "Observation → cause → action. Act as soon as you see it.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["Observation", "Likely cause", "Action"], rows: [
        ["Insufficient capacity / low discharge P", "Suction restriction or dirty filters", "Clean suction. Bypass and change elements."],
        ["Low discharge pressure", "Circuit leak, open relief, or demand above capacity", "Find leak. Reset relief. Cut demand. Check gauge."],
        ["High discharge temperature", "Hot suction, high P, dirty filter, low jacket water, rotor rub", "Check PG-631-E, jacket flow, filters, rotor clearance."],
        ["High bearing temperature", "High oil T or low cooling on the oil exchanger", "Check water to the oil cooler. Clean if needed."],
        ["High vibration", "Bad oil, oil P high/low, damaged bearing, pipe strain, misalignment, foundation, rotor contact", "Stop if trip. Repair. Support pipe. Align."],
        ["Trip on low oil pressure", "Switch out of cal, dirty oil filter, real leak", "Calibrate switch. Change filter. Find leak."],
        ["High axial displacement", "Thrust bearing damaged", "Stop. Replace the bearing."]
      ]}
    ]
  },
  {
    id: "tr4", group: "V. Troubleshooting", title: "Gearbox and motor table", kicker: "V. Trouble shooting",
    lead: "Same rule: oil, alignment, then parts.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["Observation", "Likely cause", "Action"], rows: [
        ["Noisy gearbox", "Worn parts, misalignment, lube failure, bad coupling", "Repair or replace. Re-align. Fix oil. Inspect coupling."],
        ["Low oil pressure", "Dirty filter, worn bearings, pump, suction block, relief set wrong", "Clean filter and suction. Adjust relief. Change bearings if worn."],
        ["Abnormal heating", "Dirty cooler, low oil flow, wrong oil, sun on the box, heater fault", "Clean cooler. Check flow and oil type. Isolate radiant heat."],
        ["Excessive vibration", "Misalignment, unbalance, resonance, torsion or flex excitation", "Align with thermal growth. Check keys. Measure frequency."],
        ["Motor bearings hot / oil leak", "Dirty oil, low oil, thrust, damaged bearing, high oil P, seal leak", "Correct oil, thrust, pressure valve, seal."],
        ["Low insulation / winding fail", "Humidity, dirt, metal dust, over-temp, voltage surge", "Clean, varnish, dry. Check voltage and sources."],
        ["Motor will not start / accelerate", "Wrong connections, open circuit, low voltage, overload, shaft bent, mechanical rub", "Check circuits, voltage, load. Inspect rotor and shaft."]
      ]},
      { type: "videos", items: [
        { title: "Tutorial · compressor high discharge temperature", url: "", steps: [
          "Read discharge T and suction T. Normal discharge is about 94 °C.",
          "Check PG-631-E outlet. Hot suction makes hot discharge.",
          "Check Dollinger ΔP. Dirty filters cut suction and heat the machine.",
          "Check jacket water and oil cooler flow.",
          "If T approaches 105 °C, expect a trip. Do not bypass it."
        ]},
        { title: "Tutorial · high circuit ΔP / high TSR", url: "", steps: [
          "Look at pellet level and charge system.",
          "If fines or agglomerates: cut rate and free the discharge.",
          "Check pneumatic transport and rotary valve.",
          "Do not raise TER to 'push' a stuck bed."
        ]}
      ]}
    ]
  },
  {
    id: "tr5", group: "V. Troubleshooting", title: "Circuit fault table", kicker: "V. Trouble shooting",
    lead: "Process faults are usually bed, filters, recycle valve or water.",
    audio: "", quiz: [],
    blocks: [
      { type: "table", headers: ["Observation", "Likely cause", "Action"], rows: [
        ["High ΔP in the circuit", "Too many fines or agglomerates", "Cut rate. Fix bins and parameters."],
        ["Low pellet level", "Charge or material-handling failure", "Fix feed. Do not run the bed empty."],
        ["High TSR", "Agglomerates, discharge or transport problems", "Cut rate. Free the discharge."],
        ["High ΔP on suction filters", "Dirty elements", "Bypass and change elements."],
        ["Not enough flow to the heater", "PDV-67103 open too far, or a relief open", "Check the recycle and relief valves."],
        ["Low DRI metallization", "Low TER, low FER, or poor ore", "Put parameters back. Check ore spec."],
        ["High T at PG-631-E", "Water injection failed or process water is hot", "Fix water flow and the cooling tower."]
      ]}
    ]
  },
  {
    id: "trq", group: "V. Troubleshooting", title: "Section check", kicker: "V · end",
    lead: "Listen to the summary. Then answer the questions.",
    audio: "For the compressor, first check suction, filters, oil, water and alignment. High discharge temperature is a warning before the 105 degree trip. For the circuit, fines and agglomerates raise pressure drop and TSR. Dirty filters and a recycle valve stuck open cut heater flow. Low metallization is TER, FER or ore. Fix the simple cause first.",
    quiz: [
      { q: "Dirty Dollinger filters. First action…", options: ["Raise TER to burn the dust", "Use the bypass and change the elements", "Open NG wide"], a: 1, why: "The trouble table: bypass and clean or replace elements." },
      { q: "High compressor discharge temperature. A useful check is…", options: ["Quench-tower outlet and jacket water", "Canteen temperature", "Only the parking lights"], a: 0, why: "Hot suction or weak cooling raises discharge temperature." },
      { q: "Low DRI metallization often means…", options: ["Low TER or low FER, or poor ore", "Too much lighting in the control room", "High oil level only"], a: 0, why: "Reduction needs heat, gas and ore quality." },
      { q: "High vibration after a trip…", options: ["Start immediately to 'smooth' it", "Find bearing, alignment or oil cause before a new start", "Bypass the vibration rack"], a: 1, why: "The tables say inspect and replace damaged parts. Do not force a start." }
    ],
    blocks: []
  }
];
