---
layout: post
title: "Manual de conocimientos base — Proyecto Conectoma"
date: 2026-09-20 23:45:00 -0000
author: David Moreno Jimenez
tags: [machine-learning, redes-neuronales, ia, neurociencia]
reading_time: 120
excerpt: "manual conocimiento base neurociencia"
---
# Manual de conocimientos base — Neurociencia

## Fase 0: Fundamentos (conocimientos base para la investigación)

*Documento de estudio. Última actualización: 20 de septiembre de 2026.*

> **Cómo usar este manual.** Está dividido en 7 módulos ordenados por dependencia: cada módulo usa lo anterior. Regla de oro: por cada módulo, (1) lee la teoría, (2) haz el ejercicio o la comprobación marcada con 🔬, (3) solo avanza cuando puedas explicar cada término del módulo en voz alta. El glosario final es tu lista de control: si un término no te sale de memoria, vuelve a su módulo.

> **Nota de numeración (de programador, para programador):** en la hoja de ruta las fases empiezan en 0. Este manual cubre la **Fase 0 — Fundamentos**, que es exactamente lo que pediste: los conocimientos base. La Fase 1 es ya trabajar con datos reales de FlyWire.

---

## Módulo 1 — La neurona y la sinapsis

Todo conectoma es, en el fondo, un grafo de esto.

### 1.1 Anatomía de una neurona

- **Dendritas**: ramificaciones que *reciben* señales. Piensa en ellas como los puertos de entrada.
- **Soma (cuerpo celular)**: integra lo recibido. Aquí se decide si la neurona "dispara".
- **Axón**: cable largo que *transmite* la señal de salida. Puede ramificarse en miles de terminales.
- **Terminales axónicos / botones sinápticos**: puntos de contacto donde el axón entrega la señal a la siguiente neurona.

🔬 *Compruébalo:* dibuja una neurona de memoria y etiqueta las cuatro partes con su dirección de flujo (entrada → integración → salida).

### 1.2 El potencial de acción (el "1" binario del cerebro)

- En reposo, la membrana neuronal está a unos **-70 mV** (potencial de reposo).
- Cuando la suma de entradas supera un **umbral**, se abre una cascada de canales iónicos: el voltaje sube bruscamente (\~+40 mV) y vuelve a caer. Todo el evento dura **1–2 ms**.
- Es **todo o nada**: o dispara completo o no dispara. La información no va en la *altura* del pico, sino en *cuántos picos por segundo* (frecuencia) y *cuándo ocurren* (timing).
- Tras disparar hay un **período refractario** (\~1–2 ms) en el que la neurona no puede volver a disparar. Esto pone un techo a la frecuencia máxima (\~500–1000 Hz).

🔬 *Compruébalo:* ¿por qué el período refractario limita la frecuencia de disparo? Explícalo con tus palabras.

### 1.3 La sinapsis (la arista del grafo)

- **Sinapsis química** (la gran mayoría en conectomas EM): el terminal libera **neurotransmisores** al espacio sináptico; los receptores de la neurona postsináptica los detectan y cambian su voltaje.
- **Excitatoria** → acerca al umbral (EPSP).
- **Inhibitoria** → aleja del umbral (IPSP).
- **Sinapsis eléctrica (gap junction)**: conexión directa entre citoplasmas, muy rápida, casi invisible en microscopía electrónica estándar. *El conectoma EM no las ve bien: límite importante.*
- Regla mnemotécnica: **la neurona suma entradas (EPSP − IPSP); si cruza el umbral, dispara**. Todo lo demás es detalle.

### 1.4 Neurotransmisores (lo mínimo que debes saber)

- Los principales: **glutamato** (excitatorio, el más común), **GABA** (inhibitorio), **acetilcolina**, **dopamina**, **serotonina**.
- En el conectoma de la mosca, los neurotransmisores de cada sinapsis se **predijeron con IA** (Eckstein et al., *Cell* 2024), no se midieron directamente. El mapa dice *dónde* hay conexiones; el *signo* (excitar/inhibir) es en parte inferido.

---

## Módulo 2 — El cerebro como sistema: sensores, coordinación, acción

Aquí está el corazón de tu pregunta: cómo el cerebro recibe, dirige y coordina.

### 2.1 Dirección del flujo: aferente vs. eferente

- **Aferente** = hacia dentro (del sensor al cerebro). *Recibir.*
- **Eferente** = hacia fuera (del cerebro al músculo o glándula). *Dirigir.*
- Mnemotecnia: **A**ferente = **A**dentro; **E**ferente = **E**xterior.

### 2.2 La jerarquía sensorimotora

El flujo típico en mamíferos (y con variantes, en la mosca):

1. **Sensor** (retina, cóclea, piel) → convierte el mundo físico en picos.
2. **Núcleos de relevo** → primera parada de procesamiento.
3. **Corteza sensorial primaria** → representación fiel del estímulo (mapa topográfico).
4. **Áreas de asociación** → integran varios sentidos, memoria, contexto. Aquí ocurre la "coordinación".
5. **Corteza motora / neuronas descendentes** → planifican y ordenan la acción.
6. **Motoneuronas** → contraen el músculo.

En la mosca el esquema es análogo pero compacto: sensores → **lóbulos ópticos / antenales** → **mushroom bodies** (aprendizaje, memoria) y **complejo central** (navegación, coordinación) → **neuronas descendentes** → neuronas motoras.

### 2.3 Principios de organización (los que buscarás en los conectomas)

- **Topografía**: neuronas vecinas representan puntos vecinos del mundo. Retinotopía (visión), somatotopía (tacto). El mapa conserva la geometría del sensor.
- **Jerarquía**: procesamiento por etapas, de simple a complejo.
- **Recurrencia**: conexiones de vuelta (feedback). Sin recurrencia no hay memoria de trabajo ni atención; todo sería un pipeline sin estado.
- **Modularidad**: grupos densamente conectados entre sí y poco con el resto. Cada módulo, una función.
- **Paralelismo**: millones de canales procesando a la vez a \~10–100 Hz cada uno, frente a tu CPU que hace una cosa a gigahercios. El cerebro gana por paralelismo masivo, no por velocidad de reloj.

🔬 *Compruébalo:* traza con el dedo el camino de un fotón que entra al ojo hasta el movimiento de la mano que lo esquiva, nombrando cada etapa aferente/eferente.

---

## Módulo 3 — Conectómica: cómo se mapea un cerebro

### 3.1 Qué es un conectoma

- **Conectoma estructural**: el diagrama de cableado completo —qué neurona conecta con cuál y con cuántas sinapsis. Es lo que mapeó FlyWire.
- **Conectoma funcional**: qué neuronas se activan *juntas* (correlación de actividad), sin decir si hay cable directo.
- **Conectoma efectivo**: modelo causal —qué neurona *influye* en cuál.
- **Projectoma**: mapa de a dónde proyectan los axones (origen → destino), sin detalle sináptico.

Los cuatro se complementan; el estructural es la base física sobre la que se interpretan los demás.

### 3.2 El pipeline de mapeo por microscopía electrónica

Así se construyó el conectoma de la mosca (y así se intentará el del ratón):

1. **Fijación y tinción**: el cerebro se conserva y se tiñe con metales pesados para dar contraste.
2. **Seccionado ultrafino**: se corta en lonchas de \~40 nm (ssTEM) o se escanea la superficie del bloque capa a capa (sbSEM, FIB-SEM).
3. **Imagen**: millones de imágenes de electrones. El cerebro de la mosca generó decenas de terabytes; 1 mm³ humano, 1,4 petabytes.
4. **Alineación**: las lonchas se deforman al cortarlas; hay que re-alinearlas por software.
5. **Segmentación con IA**: redes neuronales (p. ej., *flood-filling networks*) pintan qué píxeles pertenecen a cada neurona. Es la etapa que la IA aceleró brutalmente.
6. **Proofreading**: humanos (y cada vez más IA) corrigen los errores de la segmentación: fusiones falsas, divisiones falsas. En FlyWire participaron cientos de personas.
7. **Esqueletización y anotación**: se extrae el "esqueleto" de cada neurona y se detectan y cuentan las sinapsis; se predicen neurotransmisores.

### 3.3 Lo que el conectoma EM **no** ve (límites honestos)

- Uniones eléctricas (gap junctions) — casi invisibles.
- Qué receptores hay en cada sinapsis (fuerza real de la conexión).
- Actividad: el mapa es estático, no dice qué neurona está disparando ahora.
- Plasticidad: las sinapsis cambian con el aprendizaje; el conectoma es una foto.
- Neuromoduladores (dopamina, serotonina): bañan regiones enteras sin cable dedicado.

**El conectoma es el diagrama de cableado, no el cerebro en funcionamiento.** Memoriza esta frase: te protegerá del hype.

### 3.4 Los datasets que debes conocer

| Dataset | Organismo | Tamaño | Qué tiene de especial |
| --- | --- | --- | --- |
| *C. elegans* (White 1986; Cook 2019) | Gusano | 302 neuronas | El primer conectoma de la historia; tu campo de prácticas |
| Hemibrain (Scheffer 2020) | Mosca | \~25.000 neuronas | Medio cerebro de mosca, previo a FlyWire |
| FlyWire / FAFB (Dorkenwald 2024) | Mosca | 139.255 neuronas, 54,5 M sinapsis | **El primer cerebro adulto completo** |
| MICrONS (2025) | Ratón | \~200.000 células, \~500 M sinapsis | Conectoma + **actividad funcional** de las mismas neuronas |
| H01 (2024) | Humano (fragmento) | 1 mm³, 1,4 PB | El coste de escalar: 326 días de imagen por mm³ |
| HCP | Humano | \~1.200 sujetos | Macro-conectoma por MRI (resolución milimétrica, no sináptica) |

### 3.5 Herramientas del conectomista

- **Codex** (codex.flywire.ai): explorador web del conectoma de la mosca. Tu "Google Maps" del cerebro de *Drosophila*.
- **neuPrint**: base de datos consultable del hemibrain, con cliente Python.
- **MICrONS Explorer**: el conectoma de ratón con datos funcionales.
- **Neuroglancer**: visor 3D estándar para volúmenes de microscopía, en el navegador.
- **navis**: librería Python para analizar morfología neuronal.
- **WormWiring**: matrices de adyacencia del gusano en tablas simples. Tu punto de partida en código.

🔬 *Compruébalo:* explica en dos frases por qué el proofreading humano fue necesario aunque la IA segmentara bien.

---

## Módulo 4 — Teoría de grafos aplicada a conectomas

Tu ventaja: esto lo hablas con fluidez. Un conectoma **es** un grafo dirigido y ponderado.

### 4.1 El diccionario de traducción

| Conectómica | Grafos |
| --- | --- |
| Neurona | Nodo (vértice) |
| Sinapsis | Arista dirigida (de pre- a postsináptica) |
| Nº de sinapsis entre dos neuronas | Peso de la arista |
| Circuito | Subgrafo |
| Matriz de conectividad | Matriz de adyacencia |

### 4.2 Métricas que debes dominar

- **Grado** (in-degree / out-degree): cuántas conexiones entran/salen. Su distribución en cerebros reales es de cola pesada: pocas neuronas concentran muchísimas conexiones.
- **Hubs**: nodos de grado altísimo. Suelen ser puntos de integración o de difusión (piensa en un load balancer).
- **Coeficiente de clustering**: ¿los vecinos de una neurona se conectan entre ellos? Alto clustering = procesamiento local denso.
- **Camino mínimo / eficiencia**: cuántos saltos separan dos neuronas cualesquiera. Los cerebros son eficientes: pocos saltos entre cualquier par.
- **Small-world**: la combinación ganadora — alto clustering local + caminos cortos globales. Aparece en el gusano, la mosca, el ratón y el humano.
- **Modularidad / comunidades**: partición del grafo en grupos densos. En el cerebro, los módulos ≈ funciones (visión, olfato, motor...).
- **Centralidad** (betweenness, eigenvector): qué nodos son "cuellos de botella" o "influencers" de la red.
- **Motivos**: pequeños subgrafos recurrentes (p. ej., tríadas feedforward). Son como los *design patterns* del cableado.
- **Rich-club**: los hubs tienden a conectarse entre ellos, formando una "columna vertebral" de la red.

### 4.3 El ejercicio fundacional 🔬

Con las matrices de *C. elegans* (wormwiring.org) y Python + `networkx`:

1. Carga la matriz de adyacencia.
2. Calcula la distribución de grados (¿cola pesada?).
3. Identifica los 10 hubs (mayor grado total).
4. Calcula clustering medio y longitud media de camino mínimo: ¿es small-world?
5. Detecta comunidades (p. ej., Louvain) y pregúntate: ¿coinciden con funciones conocidas?

*Este ejercicio ES el hito de la Fase 0: el notebook del gusano.*

---

## Módulo 5 — Neurociencia computacional: modelos de neurona

Para entender cómo del cableado emerge el cómputo (y para leer el paper de Shiu et al.).

### 5.1 Modelos de neurona, de simple a complejo

- **McCulloch-Pitts (1943)**: suma ponderada + umbral. La neurona como perceptrón. Sin tiempo.
- **Integrate-and-fire (IF)**: el voltaje integra las entradas con el tiempo; al cruzar el umbral, dispara y se resetea. El "hola mundo" de las redes de picos.
- **LIF (leaky integrate-and-fire)**: como IF, pero el voltaje *gotea* (decae) con el tiempo. Más realista: las entradas viejas "se olvidan".
- **Hodgkin-Huxley (1952)**: el modelo biofísico completo (canales de Na⁺/K⁺). Preciso pero carísimo de simular; para redes grandes se usan los anteriores.
- **Modelos de tasa**: en vez de picos individuales, la neurona emite una frecuencia continua. Más baratos; pierden el timing.

La lección de Shiu et al. (2024): con neuronas **simples** (tipo LIF) colocadas sobre la **topología real** del conectoma de la mosca, sin entrenar nada, el modelo predijo correctamente el 91% de 164 respuestas sensorimotoras medidas en moscas reales. **El cableado ya contiene el cómputo.**

### 5.2 Cómo codifican información las neuronas

- **Codificación por tasa (rate coding)**: la información va en la frecuencia de picos. Robusto, lento.
- **Codificación temporal**: la información va en el *momento exacto* de cada pico. Más capacidad, más frágil.
- **Codificación poblacional**: la información está distribuida en la actividad conjunta de muchas neuronas (como un vector embedding, pero biológico).

### 5.3 Plasticidad: cómo aprende el cerebro

- **Regla de Hebb**: "las neuronas que disparan juntas, se conectan" (*fire together, wire together*). La base conceptual de todo aprendizaje biológico.
- **STDP** (plasticidad dependiente del tiempo de pico): si la presináptica dispara *justo antes* que la postsináptica, la conexión se refuerza; si es al revés, se debilita. Hebb con reloj.
- Traduce esto a ML: el aprendizaje es **cambiar los pesos de las aristas**. La diferencia es que la biología lo hace localmente (cada sinapsis con su propia regla), sin backprop global.

### 5.4 Recurrencia: por qué importa

Una red feedforward (sin ciclos) es una función pura: misma entrada → misma salida, sin memoria. Las conexiones recurrentes (ciclos en el grafo) crean **dinámica**: memoria de trabajo, atención, secuencias, oscilaciones. Cuando analices conectomas, busca los ciclos: ahí vive la "coordinación" que te interesa.

🔬 *Compruébalo:* explica por qué una red sin recurrencia no puede "recordar" nada entre dos entradas consecutivas.

---

## Módulo 6 — Interfaces cerebro-ordenador: leer y escribir

El puente físico hacia la fusión cerebro-IA. Dos direcciones, dos dificultades distintas.

### 6.1 Leer: del cerebro a la máquina

Técnicas ordenadas de menos a más invasivas (y de peor a mejor resolución):

| Técnica | Qué mide | Invasiva | Resolución espacial / temporal |
| --- | --- | --- | --- |
| EEG | Actividad eléctrica en el cuero cabelludo | No | cm / ms |
| MEG | Campos magnéticos | No | cm / ms |
| fMRI | Flujo sanguíneo (BOLD) | No | mm / segundos |
| ECoG | Electrodos sobre la corteza | Sí (cirugía) | mm / ms |
| Microelectrodos (Utah, Neuropixels) | Picos de neuronas individuales | Sí | 1 neurona / sub-ms |
| Stentrode (Synchron) | Señal endovascular | Mínima (catéter) | mm / ms |

- **Decodificación**: entrenar un modelo de ML que mapee actividad neural → intención (mover un cursor, una palabra intentada). Estado real: tecleado a \~22 palabras/min (BrainGate), habla decodificada a 62–78 palabras/min (UCSF), frente a \~160 palabras/min de habla natural.
- **Calibración**: cada cerebro es distinto y las señales derivan con el tiempo; los decodificadores se recalibran por persona y por sesión.
- **Límite honesto**: las BCI actuales decodifican *intentos motores y habla intentada*. No leen pensamientos, recuerdos ni conceptos abstractos.

### 6.2 Escribir: de la máquina al cerebro

- **Estimulación eléctrica**: DBS (estimulación cerebral profunda, rutinaria en Parkinson; primer sistema adaptativo aprobado en 2025), ICMS (microestimulación cortical), TMS (no invasiva, magnética).
- **Optogenética**: neuronas modificadas genéticamente que responden a la luz. Precisión de neurona individual... pero en humanos requeriría terapia génica + implantes de luz. En cerebro humano, a día de hoy, no es una vía clínica realista.
- **Estado real**: escribir información *detallada* en el cerebro (no solo "estimular una zona") está en pañales. La prótesis visual Orion lleva años en ensayos con resultados modestos (fosfenos = destellos, no imágenes).

### 6.3 La frontera que define tu proyecto

Leer (decodificar) funciona razonablemente para señales motoras. Escribir (codificar) es el cuello de botella. Y entre medias está la pregunta dura: **¿en qué "formato" habría que escribir para que el cerebro lo entienda?** Esa pregunta es exactamente para lo que sirve estudiar conectomas.

🔬 *Compruébalo:* ¿por qué decodificar el habla es más fácil que decodificar un recuerdo? (Pista: piensa en qué tienen en común el habla y el movimiento.)

---

## Módulo 7 — IA bioinspirada y cómputo neuromórfico

El otro extremo del puente: IA que hable el idioma del cerebro (picos, no floats).

### 7.1 Redes de neuronas de picos (SNN)

- Las neuronas se comunican con **eventos discretos** (picos), no con activaciones continuas. La red solo computa cuando hay un pico: **computación dirigida por eventos**, esparsa y de bajo consumo.
- Problema clásico: los picos no son diferenciables → no hay backprop directa. Solución moderna: **surrogate gradients** (aproximar la derivada durante el entrenamiento).
- Simuladores para practicar: **Brian2**, **NEST** (los clásicos), **Lava** (Intel, para Loihi).

### 7.2 Hardware neuromórfico

- **Intel Loihi 2 / Hala Point**: chips que implementan neuronas de picos en silicio; consumo órdenes de magnitud menor que GPUs para estas cargas.
- **SpiNNaker** (Manchester/Dresde), **IBM NorthPole**, **BrainChip Akida**: distintas apuestas del mismo paradigma.
- **Límite honesto**: en precisión en benchmarks clásicos, el deep learning en GPU sigue ganando. El valor neuromórfico hoy es **eficiencia energética y latencia**, no superioridad general.

### 7.3 Principios biológicos que la IA puede robar (tu lista de trabajo)

1. **Escasez estructurada**: pocas conexiones fuertes, no todo-con-todo.
2. **Jerarquía + recurrencia**: etapas feedforward con feedback.
3. **Modularidad funcional**: subredes especializadas, no un monolito.
4. **Plasticidad local**: aprender sin backprop global (STDP y familia).
5. **Codificación eficiente**: representar con pocos picos lo esencial (sparse coding).

Estos cinco son hipótesis de investigación, no dogma: tu trabajo en fases posteriores será comprobar cuáles aguantan en datos reales.

🔬 *Compruébalo:* ¿qué dos principios de la lista ves ya reflejados en la arquitectura de un transformer? ¿Cuáles faltan?

---

## Glosario de términos

*Orden alfabético. Entre paréntesis, el módulo donde se explica en profundidad. Objetivo: poder definir cada término en una frase sin mirar.*

- **Acción, potencial de** — Pulso eléctrico breve (\~1–2 ms) y de todo-o-nada que una neurona emite al superar su umbral. La unidad básica de comunicación neural. (M1)
- **Aferente** — Dirección de flujo: del sensor hacia el cerebro (recibir). Mnemotecnia: **A**ferente = **A**dentro. (M2)
- **BCI** (*brain-computer interface*) — Sistema que lee actividad neural (decodificación), la escribe (estimulación) o ambas cosas. (M6)
- **BOLD** — Señal de fMRI basada en oxigenación sanguínea; correlato indirecto y lento de la actividad neural. (M6)
- **Calibración** — Ajuste individual de un decodificador BCI a cada persona y sesión, porque las señales varían. (M6)
- **Centralidad** — Familia de métricas de grafos que miden la importancia de un nodo (betweenness: cuántos caminos mínimos pasan por él; eigenvector: estar conectado a nodos importantes). (M4)
- **Clustering (coeficiente de)** — Probabilidad de que dos vecinos de un nodo estén conectados entre sí. Alto = procesamiento local denso. (M4)
- **Codex** — Explorador web del conectoma de la mosca (codex.flywire.ai). (M3)
- **Codificación por tasa** — La información viaja en la frecuencia de picos. (M5)
- **Codificación temporal** — La información viaja en el instante exacto de cada pico. (M5)
- **Complejo central** — Región del cerebro del insecto implicada en navegación y coordinación motora. (M2)
- **Comunidad (detección de)** — Partición de un grafo en grupos densamente conectados; en cerebros suele coincidir con funciones. (M4)
- **Conectoma** — Diagrama completo de las conexiones neuronales de un organismo. (M3)
- **Conectoma efectivo** — Modelo causal de qué neurona influye en cuál. (M3)
- **Conectoma estructural** — El cableado físico: qué conecta con qué. Lo que mapeó FlyWire. (M3)
- **Conectoma funcional** — Qué neuronas se activan juntas, sin implicar cable directo. (M3)
- **DBS** (*deep brain stimulation*) — Estimulación cerebral profunda con electrodos implantados; tratamiento rutinario del Parkinson. (M6)
- **Decodificación** — Traducir actividad neural a intención o acción mediante ML (cerebro → máquina). (M6)
- **Dendrita** — Ramificación neuronal que recibe señales (puertos de entrada). (M1)
- **ECoG** — Electrodos sobre la superficie cortical; alta resolución temporal, requiere cirugía. (M6)
- **Eferente** — Dirección de flujo: del cerebro hacia músculos o glándulas (dirigir). Mnemotecnia: **E**ferente = **E**xterior. (M2)
- **EEG** — Electroencefalografía: registro eléctrico no invasivo desde el cuero cabelludo. (M6)
- **EPSP / IPSP** — Potenciales postsinápticos excitatorios / inhibitorios: acercan o alejan a la neurona de su umbral. (M1)
- **FAFB** (*full adult fly brain*) — El volumen de microscopía electrónica del cerebro adulto completo de mosca que FlyWire segmentó. (M3)
- **FIB-SEM** — Microscopía de haz de iones + electrones para seccionado e imagen 3D a nanoescala. (M3)
- **Flood-filling networks** — Familia de redes neuronales usada para segmentar neuronas en volúmenes EM. (M3)
- **fMRI** — Resonancia magnética funcional; mide actividad vía flujo sanguíneo, resolución de segundos. (M6)
- **Gap junction** — Sinapsis eléctrica: conexión directa entre citoplasmas, rapidísima, casi invisible en EM. (M1)
- **Grado (in/out)** — Número de aristas que entran/salen de un nodo; en cerebros su distribución es de cola pesada. (M4)
- **Hemibrain** — Conectoma de medio cerebro de mosca (\~25.000 neuronas), predecesor de FlyWire. (M3)
- **Hodgkin-Huxley** — Modelo biofísico detallado de la neurona (1952); preciso y costoso. (M5)
- **Hub** — Nodo de grado muy alto; punto de integración o difusión de la red. (M4)
- **ICMS** — Microestimulación intracortical: escribir señales con microelectrodos. (M6)
- **Integrate-and-fire** — Modelo de neurona: integra entradas hasta el umbral, dispara y se resetea. (M5)
- **LIF** (*leaky integrate-and-fire*) — Integrate-and-fire con decaimiento temporal ("goteo") del voltaje. (M5)
- **Loihi** — Familia de chips neuromórficos de Intel para redes de picos. (M7)
- **Matriz de adyacencia** — Tabla N×N que codifica qué nodo conecta con cuál (y con qué peso). (M4)
- **McCulloch-Pitts** — Neurona artificial original (1943): suma ponderada + umbral, sin tiempo. (M5)
- **MEG** — Magnetoencefalografía: mide campos magnéticos cerebrales, no invasiva. (M6)
- **MICrONS** — Conectoma de 1 mm³ de corteza visual de ratón con actividad funcional registrada. (M3)
- **Modularidad** — Grado en que una red se divide en grupos densos poco conectados entre sí. (M4)
- **Motivo** — Pequeño subgrafo que aparece más de lo esperado por azar; *design pattern* del cableado. (M4)
- **Mushroom bodies** — Estructuras del cerebro del insecto asociadas a aprendizaje y memoria olfativa. (M2)
- **navis** — Librería Python para análisis de morfología neuronal. (M3)
- **Neuroglancer** — Visor 3D web estándar para volúmenes de conectómica. (M3)
- **Neuromodulador** — Sustancia (dopamina, serotonina...) que modula regiones enteras sin cable dedicado; invisible en el conectoma EM. (M3)
- **neuPrint** — Base de datos consultable del hemibrain con cliente Python. (M3)
- **Neuropixels** — Sondas de registro de alta densidad (cientos de neuronas a la vez). (M6)
- **Neurotransmisor** — Molécula que cruza la sinapsis química (glutamato, GABA, acetilcolina, dopamina, serotonina...). (M1)
- **Optogenética** — Control de neuronas con luz tras modificación genética; potentísima en animales, no viable aún en cerebro humano. (M6)
- **Período refractario** — Ventana tras un pico en la que la neurona no puede redisparar; limita la frecuencia máxima. (M1)
- **Plasticidad** — Capacidad de las sinapsis de cambiar su fuerza; base física del aprendizaje. (M5)
- **Potencial de reposo** — Voltaje de membrana en reposo, \~−70 mV. (M1)
- **Projectoma** — Mapa de proyecciones axonales (origen → destino) sin detalle sináptico. (M3)
- **Proofreading** — Corrección humana (o asistida) de los errores de la segmentación automática. (M3)
- **Recurrencia** — Conexiones que forman ciclos; permiten memoria, atención y dinámica. Sin ella no hay coordinación. (M2, M5)
- **Regla de Hebb** — "Las neuronas que disparan juntas, refuerzan su conexión". (M5)
- **Retinotopía / somatotopía** — Organización topográfica: neuronas vecinas representan puntos vecinos de la retina / del cuerpo. (M2)
- **Rich-club** — Los hubs tienden a conectarse entre sí, formando la columna vertebral de la red. (M4)
- **sbSEM / ssTEM** — Técnicas de microscopía electrónica seriada para volúmenes 3D (bloque escaneado / secciones ultrafinas). (M3)
- **Segmentación** — Proceso de asignar cada píxel/vóxel del volumen EM a su neurona, con IA. (M3)
- **Sinapsis** — Punto de contacto donde una neurona transmite a otra; la arista del grafo conectómico. (M1)
- **Small-world** — Red con alto clustering local y caminos globales cortos; propiedad de cerebros reales. (M4)
- **SNN** (*spiking neural network*) — Red de neuronas que se comunican con picos discretos; computación dirigida por eventos. (M7)
- **Soma** — Cuerpo celular de la neurona; integra las entradas. (M1)
- **STDP** — Plasticidad dependiente del tiempo de pico: el orden temporal de los picos decide si la sinapsis se refuerza o debilita. Hebb con reloj. (M5)
- **Surrogate gradients** — Truco para entrenar SNNs: aproximar la derivada no diferenciable del pico durante el backprop. (M7)
- **TMS** — Estimulación magnética transcraneal; estimulación cerebral no invasiva. (M6)
- **Topografía** — Principio de organización: el mapa neural conserva la geometría del sensor. (M2)
- **Tractografía** — Reconstrucción de haces de fibras a partir de MRI de difusión; macro-conectoma aproximado. (M3)
- **Tren de picos** — Secuencia temporal de potenciales de acción de una neurona; el "código" que hay que decodificar. (M1, M6)
- **Umbral** — Nivel de voltaje que, al superarse, dispara el potencial de acción. (M1)

---

## Checklist de dominio — hito de la Fase 0

Marca cada casilla solo cuando sea verdad, no cuando "casi":

- [ ] Puedo definir de memoria todos los términos del glosario en una frase.
- [ ] Notebook reproducible: conectoma de *C. elegans* cargado, grados, hubs, small-world y comunidades calculados.
- [ ] Leído Dorkenwald et al. 2024 (introducción + métodos + figuras principales).
- [ ] Curso de Computational Neuroscience (Coursera, U. Washington) en marcha.
- [ ] Cuenta en Codex creada y primer paseo visual por el conectoma de la mosca. 
- [ ] Pregunta propia formulada sobre el gusano (p. ej.: ¿qué neuronas son hubs? ¿qué módulos emergen?).

**Cuando todo esté marcado → Fase 1:** circuito sensoriomotor completo en FlyWire (de fotorreceptores a neuronas descendentes), informe técnico propio + notebook reproducible.

## Recursos (URLs verificadas en la hoja de ruta)

- Datos del gusano: https://wormwiring.org/pages/adjacency.html
- Explorador de la mosca: https://codex.flywire.ai/
- Hemibrain consultable: https://neuprint.janelia.org
- Ratón MICrONS: https://www.microns-explorer.org/
- Curso base: https://www.coursera.org/learn/computational-neuroscience
- Escuela intensiva: https://neuromatch.io/courses/
- Neuroimagen abierta: https://openneuro.org
- Librería navis: https://github.com/navis-org/navis
- Visor 3D: https://github.com/google/neuroglancer
- Comunidad: https://neurostars.org
- Papers (DOIs): Dorkenwald `10.1038/s41586-024-07558-y` · Shiu `10.1038/s41586-024-07763-9` · White 1986 (PubMed 22462104) · Cook `10.1038/s41586-019-1352-7`
