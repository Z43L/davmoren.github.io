---
layout: post
title: "Redes Neuronales a Fondo"
date: 2026-03-12 02:06:41 
author: David Moreno Jimenez
tags: ["machine-learning", "redes-neuronales", "deep-learning", "ia"]
reading_time: 0
excerpt: ""
audience: intermedio
style: técnico
---

# Redes Neuronales a Fondo


## Fundamentos y Principios Básicos de Redes Neuronales

# Fundamentos y Principios Básicos de Redes Neuronales

Las redes neuronales artificiales constituyen el paradigma central del aprendizaje profundo moderno. Para comprender su funcionamiento en profundidad, resulta imprescindible dominar los conceptos fundamentales que sustentan su diseño y comportamiento. Esta sección establece las bases conceptuales y matemáticas necesarias para abordar arquitecturas más complejas con solidez teórica.

---

## De la Neurona Biológica al Modelo Matemático

### Origen Biológico

El diseño de las redes neuronales artificiales toma inspiración directa del sistema nervioso biológico. En el cerebro humano, las neuronas procesan información mediante señales eléctricas que viajan desde las dendritas (entradas), atravesando el soma (cuerpo celular), hasta los axones (salidas) que conectan con otras neuronas mediante sinapsis. La fuerza de estas conexiones sinápticas determina cómo se transmite y procesa la información.

Esta observación fundamental —un sistema de unidades simples interconectadas que Procesan información de manera distribuida— motivó a los pioneros de la inteligencia artificial a crear un análogo matemático.

### El Perceptrón: Primera Neurona Artificial

El modelo más básico de neurona artificial es el **perceptrón**, propuesto por Frank Rosenblatt en 1958. Su formulación matemática es directas:

```
y = f(w₁x₁ + w₂x₂ + ... + wₙxₙ + b)
```

Donde:
- **x₁, x₂, ..., xₙ** son las entradas
- **w₁, w₂, ..., wₙ** son los pesos sinápticos
- **b** es el bias (umbral)
- **f** es la función de activación
- **y** es la salida

El bias actúa como un término de ajuste que permite desplazar la función de activación, otorgando al modelo mayor flexibilidad. Sin él, la neurona únicamente podría aprender decisiones que pasan por el origen en el espacio de entradas.

### Limitaciones del Perceptrón Simple

Un perceptrón con función de escalón (step function) solo puede resolver problemas linealmente separables. Esta limitación fundamental, demostrada por Marvin Minsky y Seymour Papert en 1969, generó décadas de estancamiento en la investigación hasta el desarrollo de redes multicapa y el algoritmo de retropropagación.

---

## Arquitectura de una Red Neuronal

### Estructura por Capas

Una red neuronal se organiza en tres tipos de capas:

**Capa de entrada**: Recibe los datos crudos del problema. Cada neurona representa una característica (feature) del vector de entrada. El número de neuronas en esta capa queda determinado por la dimensionalidad de los datos.

**Capas ocultas**: Procesan la información mediante transformaciones no lineales. Una red puede tener una o múltiples capas ocultas. La profundidad de una red refiere precisamente al número de estas capas. La arquitectura más simple (una capa oculta) se denomina **perceptrón multicapa (MLP)**.

**Capa de salida**: Genera la predicción final. El número de neuronas depende del tipo de problema: una para regresión o clasificación binaria, múltiples para clasificación multiclase.

### Concepto de Ancho y Profundura

- **Ancho**: Número de neuronas por capa. Una capa-wide tiene muchas neuronas pero pocas capas.
- **Profundura**: Número total de capas. Una red profunda tiene muchas capas pero quizás pocas neuronas por capa.

La propiedad más notable de las redes neuronales es que, teóricamente, una sola capa oculta con suficientes neuronas puede aproximar cualquier función continua —este resultado se conoce como **teorema de aproximación universal**. Sin embargo, en la práctica, las arquitecturas profundas suelen requerir menos parámetros y generalizan mejor.

### Representación Vectorial

En implementación, los pesos entre capas se organizan como matrices. Si la capa *l* tiene *n⁽l⁾* neuronas y la capa *l+1* tiene *n⁽l+1⁾* neuronas, la matriz de pesos **W⁽l⁾** tiene dimensión *n⁽l+1⁾ × n⁽l⁾*. El bias **b⁽l⁾** es un vector de dimensión *n⁽l+1⁾*.

Esta representación vectorial permite cálculos eficientes mediante operaciones matriciales, aprovechando las capacidades de bibliotecas como NumPy o aceleradores de hardware especializado.

---

## Propagación hacia Adelante

### El Mecanismo de Cómputo

La **propagación hacia adelante** (forward propagation) es el proceso mediante el cual la información fluye desde la entrada hasta la salida de la red. En cada capa, se ejecuta:

1. **Combinación lineal**: *z⁽l⁾ = W⁽l⁾a⁽l⁻¹⁾ + b⁽l⁾*
2. **Aplicación de función de activación**: *a⁽l⁾ = f(z⁽l⁾)*

Donde *a⁽l⁻¹⁾* es la activación de la capa anterior (para la primera capa, *a⁽⁰⁾ = X*, la entrada).

### Ejemplo Práctico: Propagación en NumPy

```python
import numpy as np

def sigmoid(x):
    """Función de activación sigmoide"""
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

# Arquitectura: 2 entradas -> 4 neuronas ocultas -> 1 salida
np.random.seed(42)
W1 = np.random.randn(2, 4) * 0.5  # Pesos capa oculta
b1 = np.zeros((1, 4))              # Bias capa oculta
W2 = np.random.randn(4, 1) * 0.5   # Pesos capa salida
b2 = np.zeros((1, 1))              # Bias capa salida

def forward(x):
    """Propagación hacia adelante completa"""
    # Capa oculta
    z1 = np.dot(x, W1) + b1
    a1 = sigmoid(z1)
    
    # Capa de salida
    z2 = np.dot(a1, W2) + b2
    a2 = sigmoid(z2)
    
    return a2, (z1, a1, z2, a2)

# Predicción con un ejemplo
x_ejemplo = np.array([[1.0, 2.0]])
prediccion, _ = forward(x_ejemplo)
print(f"Predicción: {prediccion[0][0]:.4f}")
```

La salida de la red depende exclusivamente de los pesos actuales. En este punto,尚未 existe aprendizaje: la red simplemente aplica transformaciones фиксированные a la entrada.

---

## Funciones de Activación

### Por Qué Son Necesarias

Sin funciones de activación no lineales, la composición de capas se colapsaría en una transformación lineal simple. La composición de funciones lineales siempre resulta en otra función lineal, por lo que múltiples capas no aportarían nada más que una única transformación lineal.

Las funciones de activación introducen la **no linealidad** que permite a la red aprender representaciones complejas y jerárquicas.

### Funciones Comunes

**Sigmoide**: *σ(x) = 1 / (1 + e⁻ˣ)*

- Proporciona salida en intervalo (0, 1)
- Históricamente popular por interpretación probabilística
- Problema: gradientes cercanos a cero para valores extremos (vanishing gradient)

**Tangente hiperbólica**: *tanh(x) = (eˣ - e⁻ˣ)/(eˣ + e⁻ˣ)*

- Proporciona salida en intervalo (-1, 1)
- Centrada en cero, lo que acelera el convergencia
- Mismos problemas de gradiente que la sigmoide

**ReLU (Rectified Linear Unit)**: *f(x) = max(0, x)*

- Computacionalmente eficiente
- Mitiga el problema del gradiente vanishing
- Problema: "neuronas muertas" (ReLU truncadas a cero permanentemente)

**Leaky ReLU**: *f(x) = x si x > 0, αx si x ≤ 0* (donde α ≈ 0.01)

- Variante que permite gradiente pequeño para valores negativos
- Resuelve parcialmente el problema de neuronas muertas

### Selección Práctica

En la mayoría de arquitecturas modernas, **ReLU** constituye la elección predeterminada por su simplicidad computacional y efectividad empírica. La sigmoide mantiene utilidad en la capa de salida para problemas de clasificación binaria donde se requiere interpretación probabilística.

---

## Aprendizaje: Retropropagación y Descenso de Gradiente

### El Problema de Optimización

El aprendizaje en redes neuronales se formula como un problema de optimización: encontrar los pesos *W* y bias *b* que minimizan una **función de pérdida** (loss function) que mide la discrepancia entre las predicciones y los valores reales.

Matemáticamente: *θ\* = argmin_θ L(y, f(x; θ))*

Donde *θ* representa todos los parámetros de la red.

### Descenso de Gradiente

El algoritmo fundamental de optimización es el **descenso de gradiente** (gradient descent). La actualización de parámetros sigue:

*θ ← θ - α ∇θ L*

Donde *α* es la tasa de aprendizaje (learning rate) y *∇θ L* es el gradiente de la pérdida respecto a los parámetros.

El gradiente indica la dirección de máximo ascenso; restarlo mueve los parámetros en la dirección de máximo descenso.

### Retropropagación: El Algoritmo Clave

La **retropropagación** (backpropagation), desarrollada por Rumelhart, Hinton y Williams en 1986, es el algoritmo eficiente para calcular los gradientes. Aplica la regla de la cadena del cálculo diferencial:

1. Calcular el gradiente en la capa de salida directamente desde la función de pérdida
2. Propagar el error hacia atrás, capa por capa, usando la regla de la cadena
3. Obtener el gradiente de cada parámetro como producto de gradientes intermedios

### Ejemplo Completo de Entrenamiento

```python
import numpy as np

class RedNeuronalSimple:
    def __init__(self, tamano_entrada=2, tamano_oculto=4, tamano_salida=1):
        # Inicialización de Xavier para mejor convergencia
        self.W1 = np.random.randn(tamano_entrada, tamano_oculto) * np.sqrt(2.0 / tamano_entrada)
        self.b1 = np.zeros((1, tamano_oculto))
        self.W2 = np.random.randn(tamano_oculto, tamano_salida) * np.sqrt(2.0 / tamano_oculto)
        self.b2 = np.zeros((1, tamano_salida))
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def sigmoid_derivada(self, x):
        s = self.sigmoid(x)
        return s * (1 - s)
    
    def forward(self, X):
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def retropropagar(self, X, y, aprendizaje=0.5):
        m = X.shape[0]  # Número de ejemplos
        
        # Gradiente en capa de salida
        dz2 = self.a2 - y
        dW2 = (1/m) * np.dot(self.a1.T, dz2)
        db2 = (1/m) * np.sum(dz2, axis=0, keepdims=True)
        
        # Gradiente en capa oculta
        da1 = np.dot(dz2, self.W2.T)
        dz1 = da1 * self.sigmoid_derivada(self.z1)
        dW1 = (1/m) * np.dot(X.T, dz1)
        db1 = (1/m) * np.sum(dz1, axis=0, keepdims=True)
        
        # Actualización de parámetros
        self.W2 -= aprendizaje * dW2
        self.b2 -= aprendizaje * db2
        self.W1 -= aprendizaje * dW1
        self.b1 -= aprendizaje * db1
    
    def entrenar(self, X, y, epocas=1000, aprendizaje=0.5):
        perdidas = []
        for epoca in range(epocas):
            self.forward(X)
            # Función de pérdida: error cuadrático medio
            perdida = np.mean((self.a2 - y) ** 2)
            perdidas.append(perdida)
            self.retropropagar(X, y, aprendizaje)
        return perdidas

# Datos de ejemplo: compuerta XOR
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

# Entrenamiento
red = RedNeuronalSimple()
perdidas = red.entrenar(X, y, epocas=5000, aprendizaje=1.0)

# Predicciones
for entrada, esperado in zip(X, y):
    pred = red.forward(entrada.reshape(1, -1))[0][0]
    print(f"Entrada: {entrada} -> Predicción: {pred:.3f}, Esperado: {esperado[0]}")
```

Este ejemplo ilustra el funcionamiento completo: la red aprende a resolver el problema XOR, que es imposible para un perceptrón simple pero perfectamente manejable para una red con una capa oculta.

---

## Funciones de Pérdida

### Entropía Cruzada Binaria

Para clasificación binaria, la función estándar es:

*L = -[y log(ŷ) + (1-y) log(1-ŷ)]*

Proporciona gradientes más estables que el error cuadrático medio y se interpreta como la divergencia KL entre la distribución real y la predicha.

### Entropía Cruzada Categórica

Para clasificación multiclase con *C* clases:

*L = -Σ yᵢ log(ŷᵢ)*

Complementada con una capa **softmax** en la salida que convierte los logits en probabilidades que suman uno.

---

## Conexión con Arquitectura Profundas

Los fundamentos presentados —propagación hacia adelante, retropropagación, funciones de activación y pérdida— constituyen el núcleo conceptual sobre el cual se construyen todas las arquitecturas avanzadas. Las redes convolucionales (CNN) mantienen estos principios pero introducen operaciones de convolución que exploit la estructura espacial de datos como imágenes. Las redes recurrentes (RNN) adaptan el paradigma para secuencias temporales. Los transformadores, arquitectura dominante actual, redefinen la atención como mecanismo central manteniendo el marco de optimización por descenso de gradiente.

Dominar estos fundamentos permite abordar arquitecturas más complejas con comprensión profunda de sus mecanismos internos, en lugar de tratarlas como cajas negras mysterious.


## Arquitectura y Estructura de las Capas Neuronales

# Arquitectura y Estructura de las Capas Neuronales

Las capas neuronales constituyen la unidad arquitectónica fundamental de cualquier red neuronal. Cada capa representa una transformación matemática que recibe un tensor de entrada y produce un tensor de salida mediante la aplicación de parámetros aprendibles. La organización secuencial, paralela o híbrida de estas capas determina la capacidad expresiva, eficiencia computacional y suitability de la arquitectura para una tarea específica.

## Definición Formal de una Capa Neuronal

Una capa neuronal se define matemáticamente como una transformación afín seguida de una función de activación no lineal. Para una capa completamente conectada (dense), la transformación se expresa como:

**y = σ(Wx + b)**

Donde:
- **x** ∈ ℝⁿ representa el vector de entrada de dimensión n
- **W** ∈ ℝᵐˣⁿ es la matriz de pesos de dimensiones m×n (m neuronas de salida)
- **b** ∈ ℝᵐ es el vector de sesgos
- **σ(·)** es la función de activación elemento a elemento

El conjunto de parámetros {W, b} constituye lo que la red aprende durante el entrenamiento. Cada neurona individual implementa esta transformación, y la capa agrega múltiples neuronas para producir una representación de mayor o menor dimensionalidad según la任务.

## Tipos de Capas Fundamentales

### Capas Densas (Fully Connected)

Las capas densas conectan cada neurona de entrada con cada neurona de salida. Su implementación en Python con PyTorch ilustra la estructura básica:

```python
import torch
import torch.nn as nn

class CapaDensa(nn.Module):
    def __init__(self, entrada_dim, salida_dim):
        super().__init__()
        # Inicialización de pesos con Xavier para activación tanh/sigmoid
        self.pesos = nn.Parameter(
            torch.randn(entrada_dim, salida_dim) * torch.sqrt(2.0 / entrada_dim)
        )
        self.sesgos = nn.Parameter(torch.zeros(salida_dim))
    
    def forward(self, x):
        # Transformación afín: y = Wx + b
        return torch.matmul(x, self.pesos) + self.sesgos

# Uso práctico
capa = CapaDensa(entrada_dim=784, salida_dim=256)
entrada = torch.randn(32, 784)  # Batch de 32 imágenes aplanadas
salida = capa(entrada)
print(f"Forma de salida: {salida.shape}")  # torch.Size([32, 256])
```

La elección de la inicialización de pesos merece atención especial. Xavier (Glorot) inicializa los pesos con varianza 2/(entrada + salida), optimizada para activaciones lineales en el origen. Kaiming (He) usa varianza 2/entrada, preferible para ReLU que destruye la mitad de la señal en cada paso.

### Capas Convolucionales

Las capas convolucionales implementan conexiones localmente receptivas mediante kernels aprendibles que recorrren la entrada. Esta arquitectura captura correlaciones espaciales y reduce drásticamente los parámetros comparado con capas densas.

```python
class CapaConvolucional2D(nn.Module):
    def __init__(self, canales_entrada, canales_salida, tamano_kernel=3, padding=1):
        super().__init__()
        # Kernel aprendible de tamaño (canales_salida, canales_entrada, H, W)
        self.kernel = nn.Parameter(
            torch.randn(canales_salida, canales_entrada, tamano_kernel, tamano_kernel)
        )
        self.sesgo = nn.Parameter(torch.zeros(canales_salida))
        self.padding = padding
    
    def forward(self, x):
        # Implementación simplificada de convolución 2D
        return torch.conv2d(x, self.kernel, bias=self.sesgo, padding=self.padding)

# Arquitectura típica para procesamiento de imágenes
red_convolucional = nn.Sequential(
    nn.Conv2d(3, 32, kernel_size=3, padding=1),   # 32 filtros de 3x3
    nn.ReLU(),
    nn.MaxPool2d(2),                              # Reduce dimensionalidad a la mitad
    nn.Conv2d(32, 64, kernel_size=3, padding=1),
    nn.ReLU(),
    nn.AdaptiveAvgPool2d((1, 1)),                # Pooling adaptativo
    nn.Flatten(),
    nn.Linear(64, 10)                             # Clasificación final
)
```

El concepto de **receptive field** (campo receptivo) resulta crucial aquí. Cada posición en el mapa de características de salida depende de una región de la entrada cuyo tamaño determina la escala de características que la capa puede capturar. Capas más profundas con kernels de 3×3 efectivos pueden cubrir regiones mayores con menos parámetros que un kernel grande en capas tempranas.

### Capas Recurrentes

Las arquitecturas recurrentes procesan secuencias temporales manteniendo un estado oculto que se actualiza en cada paso temporal. La ecuación de recurrencia estándar es:

**hₜ = σ(Wᵢₕ · xₜ + Wₕₕ · hₜ₋₁ + bₕ)**

```python
class CeldaRNNCustom(nn.Module):
    def __init__(self, entrada_dim, oculto_dim):
        super().__init__()
        self.oculto_dim = oculto_dim
        # Pesos de entrada a oculto
        self.W_ih = nn.Linear(entrada_dim, oculto_dim)
        # Pesos de oculto a oculto (recurrencia)
        self.W_hh = nn.Linear(oculto_dim, oculto_dim)
    
    def forward(self, entrada, estado_oculto):
        # Nueva implementación de la relación de recurrencia
        nuevo_estado = torch.tanh(self.W_ih(entrada) + self.W_hh(estado_oculto))
        return nuevo_estado, nuevo_estado

class RedRecurrenteCompleta(nn.Module):
    def __init__(self, entrada_dim, oculto_dim, num_capas=2):
        super().__init__()
        self.capas = nn.ModuleList([
            CeldaRNNCustom(entrada_dim if i == 0 else oculto_dim, oculto_dim)
            for i in range(num_capas)
        ])
        self.oculto_dim = oculto_dim
    
    def forward(self, secuencia):
        # secuencia: (batch, tiempo, caracteristicas)
        batch_size, tiempo, _ = secuencia.shape
        
        # Inicializar estado oculto
        estados = [torch.zeros(batch_size, self.oculto_dim) for _ in self.capas]
        
        for t in range(tiempo):
            x_t = secuencia[:, t, :]
            for capa_idx, capa in enumerate(self.capas):
                estados[capa_idx], estados[capa_idx] = capa(x_t, estados[capa_idx])
                x_t = estados[capa_idx]  # Pasar salida como entrada a sig. capa
        
        return estados[-1]  # Retornar último estado oculto
```

La dificultad fundamental del entrenamiento de redes recurrentes es el **vanishing gradient**. Cuando la secuencia es larga, el gradiente se multiplica repetidamente por derivadas menores a 1 (como las de tanh o sigmoid), convergiendo a cero y imposibilitando el aprendizaje de dependencias lejanas. LSTM y GRU mitigan este problema mediante mecanismos de puertas (gates) que regulan el flujo de información.

### Capas de Normalización

Las capas de normalización estabilizan el entrenamiento alnormalizar activaciones dentro de mini-batches o características individuales. La normalización por batch opera como:

**y = γ * (x - μ) / √(σ² + ε) + β**

Donde μ y σ² son la media y varianza del batch, y γ, β son parámetros aprendibles que permiten a la red aprender la transformación óptima.

```python
# Comparación de diferentes normalizaciones
capas_normalizacion = nn.ModuleDict({
    'batch_norm': nn.BatchNorm2d(64),
    'layer_norm': nn.LayerNorm([64, 32, 32]),
    'instance_norm': nn.InstanceNorm2d(64),
    'group_norm': nn.GroupNorm(num_groups=8, num_channels=64)
})

# BatchNorm: normaliza sobre batch y dimensiones espaciales
# Adecuado para batch sizes grandes, sensible a tamaño de batch
# LayerNorm: normaliza por muestra completa
# Preferido en transformers y RNNs
# InstanceNorm: normaliza por canal y espacial, independiente por muestra
# Común en style transfer
# GroupNorm: normaliza grupos de canales
# Alternativa robusta a BatchNorm para batch sizes pequeños
```

## Arquitectura y Conectividad

### Patrones de Conexión

Latopología de conexiones entre capas define la arquitectura global de la red:

**Feed-forward (acíclica):** La información fluye unidireccionalmente desde entrada hacia salida. Ejemplos incluyen perceptrón multicapa (MLP) y redes convolucionales. Su propiedad matemática clave es que representan funciones continuas y diferenciables que pueden aproximarbitrariamente cualquier función continua bajo condiciones suficientes.

**Redes con conexiones residuales (ResNet):** Introducen conexiones de salto (skip connections) que permiten el flujo directo del gradiente y facilitan el entrenamiento de redes muy profundas:

```python
class BloqueResidual(nn.Module):
    def __init__(self, canales):
        super().__init__()
        self.conv1 = nn.Conv2d(canales, canales, 3, padding=1)
        self.bn1 = nn.BatchNorm2d(canales)
        self.conv2 = nn.Conv2d(canales, canales, 3, padding=1)
        self.bn2 = nn.BatchNorm2d(canales)
        self.relu = nn.ReLU(inplace=True)
    
    def forward(self, x):
        identidad = x
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.bn2(self.conv2(out))
        out += identidad  # Conexión residual
        return self.relu(out)
```

La conexión residual resuelve el problema de degradación donde redes más profundas comienzan a tener mayor error de entrenamiento. Permite que la red aprenda la función identidad como caso base, haciendo el aprendizaje de perturbaciones más sencillo que la transformación completa.

**Redes densamente conectadas (DenseNet):** Cada capa recibe como entrada las características de todas las capas precedentes:

```python
class BloqueDenso(nn.Module):
    def __init__(self, crecimiento, num_capas):
        super().__init__()
        self.capas = nn.ModuleList()
        for i in range(num_capas):
            self.capas.append(nn.Sequential(
                nn.BatchNorm2d(crecimiento * i),
                nn.ReLU(inplace=True),
                nn.Conv2d(crecimiento * i, crecimiento, 3, padding=1)
            ))
    
    def forward(self, x):
        características = [x]
        for capa in self.capas:
            nuevo = capa(torch.cat(características, dim=1))
            características.append(nuevo)
        return torch.cat(características[1:], dim=1)
```

Esta arquitectura maximiza la reutilización de características y mejora el flujo de gradientes, aunque incrementa significativamente el consumo de memoria por mantener todas las activaciones intermedias.

### Profundidad vs Ancho

Existe una tensión fundamental entre hacer una red más profunda (más capas) o más ancha (más neuronas por capa):

- **Profundidad:** Permite representar funciones más complejas mediante composición de transformaciones simples. Las redes profundas tienen menor costo computacional para la misma capacidad funcional debido a la compartición de representaciones. Sin embargo, el entrenamiento se dificulta por problemas de gradiente.

- **Ancho:** Capas anchas pueden capturar más características en paralelo y son teóricamente más expresivas según resultados de aproximación universal. Las redes anchas son más robustas al ruido y degradan más gracefully bajo condiciones de estrés.

La evidencia empírica sugiere que la profundidad tiene mayor impacto que el ancho para lograr buenos resultados, aunque redes extremadamente profundas requieren técnicas adicionales como normalización, conexiones residuales y inicialización cuidadosa.

## Diseño Práctico de Arquitecturas

### Selección de Tipo de Capa

La elección del tipo de capa depende fundamentalmente de la estructura de los datos de entrada:

| Estructura de Datos | Capa Recomendada | Razón |
|---------------------|------------------|-------|
| Vectores (features) | Dense | No hay estructura espacial que explotar |
| Imágenes | Convolucional 2D | Captura correlaciones espaciales locales |
| Secuencias (texto) | Transformer/GRU | Dependencias temporales largas |
| Audio/Series temporales | Convolucional 1D o LSTM | Patrones locales y dependencias temporales |
| Grafos | Graph Neural Network | Estructura no euclidiana |

### Ejemplo: Arquitectura Híbrida para Clasificación de Texto

```python
class ClasificadorTextoHibrido(nn.Module):
    """
    Arquitectura que combina embedding, LSTM y atención para clasificación.
    Adecuada para datasets de texto de tamaño mediano.
    """
    def __init__(self, vocab_size, embed_dim=128, oculto_dim=64, num_clases=2):
        super().__init__()
        
        # Capa de embedding: transforma índices a vectores densos
        self.embedding = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        
        # Encoder LSTM: procesa secuencia de embeddings
        self.lstm = nn.LSTM(
            input_size=embed_dim,
            hidden_size=oculto_dim,
            num_layers=2,
            batch_first=True,
            bidirectional=True,  # Captura contexto en ambas direcciones
            dropout=0.3           # Regularización entre capas LSTM
        )
        
        # Capa de atención: pondera importancia de cada posición temporal
        self.atencion = nn.MultiheadAttention(
            embed_dim=oculto_dim * 2,
            num_heads=4,
            dropout=0.1
        )
        
        # Clasificador final
        self.clasificador = nn.Sequential(
            nn.Linear(oculto_dim * 2, oculto_dim),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(oculto_dim, num_clases)
        )
    
    def forward(self, secuencia_ids, longitud_secuencia):
        # secuencia_ids: (batch, longitud)
        mascara = torch.arange(secuencia_ids.max())[None, :] >= longitud_secuencia[:, None]
        
        embeddings = self.embedding(secuencia_ids)  # (batch, longitud, embed)
        
        # LSTM produce representación de toda la secuencia
        lstm_out, _ = self.lstm(embeddings)  # (batch, longitud, oculto*2)
        
        # Atención permite enfocarse en partes relevantes
        contexto_atento, pesos = self.atencion(
            lstm_out, lstm_out, lstm_out,
            key_padding_mask=mascara
        )
        
        #Pooling sobre dimensión temporal
        promedio = contexto_atento.mean(dim=1)  # (batch, oculto*2)
        
        return self.clasificador(promedio), pesos
```

Esta arquitectura ejemplifica varios principios de diseño: uso de dropout para regularización, bidirectionalidad para contexto completo, y atención para selección adaptativa de información.

## Consideraciones de Implementación

### Memoria y Eficiencia Computacional

El consumo de memoria en redes neuronales proviene principalmente de dos fuentes: parámetros (pesos y sesgos) y activaciones intermedias necesarias para el backward pass. Para una capa convolucional con:

- Entrada: Cᵢ × H × W
- Kernel: K × K
- Canales de salida: Cₒ

Los parámetros son Cₒ × Cᵢ × K² y las activaciones de salida son Cₒ × H' × W'. Las arquitecturas modernas balancean estos factores mediante técnicas como depthwise separable convolution, que reduce parámetros en aproximadamente Cᵢ × K² versus Cᵢ × Cₒ × K².

### Transfer Learning y Arquitecturas Pre-entrenadas

La práctica contemporánea raramente entrena redes desde cero. El transfer learning adapta arquitecturas pre-entrenadas (ResNet, BERT, ViT) a nuevas tareas mediante:

1. Fine-tuning completo: continuar entrenamiento con tasa de aprendizaje baja
2. Feature extraction: congelar capas tempranas y entrenar solo clasificadores
3. Adapter layers:插入 capas pequeñas que se entrenan mientras se congela el modelo base

```python
import torchvision.models as models

# Cargar modelo pre-entrenado
resnet = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)

# Modificar última capa para nueva tarea (10 clases vs 1000 originales)
resnet.fc = nn.Sequential(
    nn.Linear(resnet.fc.in_features, 256),
    nn.ReLU(),
    nn.Dropout(0.4),
    nn.Linear(256, 10)
)

# Fine-tuning: descongelar últimas capas
for param in resnet.parameters():
    param.requires_grad = False
for param in resnet.layer4.parameters():
    param.requires_grad = True
for param in resnet.fc.parameters():
    param.requires_grad = True
```

---

La comprensión profunda de las capas neuronales y sus patrones de conexión constituye el fundamento para diseñar arquitecturas efectivas. Los principios aquí expuestos—inicialización apropiada, normalización establecedora, conexiones residuales para profundidad, y selección de arquitectura según estructura de datos—forman el toolkit esencial del profesional en aprendizaje profundo.


## Funciones de Activación y su Rol en la No-Linealidad

# Funciones de Activación y su Rol en la No-Linealidad

## Introducción: El Puente Entre lo Lineal y lo Complejo

En el corazón de toda red neuronal profunda yace un elemento aparentemente simple pero fundamentalmente crucial: la función de activación. Sin ella, una red neuronal se reduciría a una mera transformación lineal, incapaz de capturar las complejidades inherentes a los patrones en datos del mundo real. Este capítulo explora en profundidad las funciones de activación, su fundamento matemático, y por qué la no-linealidad constituye el pilar que permite a las redes neuronales aprender representaciones cada vez más abstractas y sofisticadas.

## El Problema de la Composicion Lineal

### Por Qué las Redes Lineales Son Insuficientes

Para comprender el rol de las funciones de activación, primero debemos entender qué sucede en su ausencia. Considérese una red neuronal feedforward con múltiples capas, pero sin funciones de activación entre ellas. Cada capa realizaría simplemente una transformación lineal de la forma:

$$y = W^{(L)} \cdot (W^{(L-1)} \cdot (... \cdot (W^{(1)} \cdot x + b^{(1)})...)) + b^{(L)}$$

Por propiedades de la multiplicación de matrices, esta composición de transformaciones lineales puede simplificarse en una única transformación lineal equivalente:

$$y = W_{eq} \cdot x + b_{eq}$$

donde $W_{eq} = W^{(L)} \cdot W^{(L-1)} \cdot ... \cdot W^{(1)}$ y los términos de sesgo se combinan de manera análoga.

Esta equivalencia mathematics tiene una consecuencia profunda: **una red neuronal sin funciones de activación, sin importar cuántas capas posea, es exactamente equivalente a una red de una sola capa lineal**. La profundidad, en este caso, no aporta capacidad representacional adicional. La red queda limitada a aprender únicamente funciones separables linealmente, un subconjunto extraordinariamente restrictivo de todas las posibles relaciones entre entradas y salidas.

### El Poder de la No-Linealidad

La introducción de funciones de activación no lineales rompe esta limitación fundamental. Cuando cada capa aplica una transformación no lineal después de su operación lineal, la composición de capas produce una familia de funciones extraordinariamente rica. Esta propiedad, conocida como **aproximación universal**, establece que una red neuronal feedforward con una única capa oculta y un número suficiente de neuronas puede aproximar cualquier función continua en un dominio compacto.

Matemáticamente, esto significa que la red puede aprender:

- fronteras de decisión complejas y no convexas
- interacciones no lineales entre características de entrada
- transformaciones jerárquicas de representación

La no-linealidad es, en esencia, lo que permite a la red "plegar" el espacio de entrada de maneras elaboradas, proyectando datos originalmente inseparables linealmente hacia espacios donde la separación becomes posible.

## Funciones de Activación Clasicas

### La Funcion Escalon (Step Function)

La función escalón representa la activación más primitiva, utilizada históricamente en los primeros modelos de perceptrón:

$$f(x) = \begin{cases} 1 & \text{si } x \geq 0 \\ 0 & \text{si } x < 0 \end{cases}$$

Su naturaleza binaria resulta intuitiva: la neurona "dispara" completamente o no lo hace. Sin embargo, esta discontinuidad en $x=0$ impide el uso de técnicas de gradiente descendente, ya que el gradiente es cero en casi todas partes (excepto en el punto de discontinuidad). Durante el entrenamiento con retropropagación, los gradientes no pueden fluir efectivamente, causando que la red no aprenda.

### La Funcion Sigmoide

La función sigmoide, también conocida como logística, suaviza la escalón proporcionando una transición continua:

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

**Propiedades fundamentales:**

- **Rango de salida:** $(0, 1)$, útil para modelar probabilidades
- **Derivada:** $\sigma'(x) = \sigma(x) \cdot (1 - \sigma(x))$
- **Saturation:** Para valores extremos de $x$, la función satura cerca de 0 y 1

La sigmoide resolve el problema de diferenciabilidad, permitiendo el entrenamiento mediante gradiente descendente. No obstante, presenta limitaciones significativas:

**Problema del gradiente desvaneciente:** En las regiones de saturación, la derivada máxima es 0.25 (cuando $\sigma(x) = 0.5$). En redes profundas, al propagar el error hacia atrás, el gradiente se multiplica repetidamente por valores menores a 0.25, resultando en gradientes que convergen exponencialmente a cero. Esto dificulta el entrenamiento de redes con muchas capas.

**No centrado en cero:** Las salidas siempre son positivas, lo que puede causar oscilaciones durante el entrenamiento y slowar la convergencia.

### La Funcion Tangente Hiperbolico

La función tangente hiperbólico resuelve parcialmente el problema de centrado en cero:

$$\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$$

**Propiedades:**

- **Rango de salida:** $(-1, 1)$, media en cero
- **Derivada:** $\tanh'(x) = 1 - \tanh^2(x)$
- **Relación con sigmoide:** $\tanh(x) = 2\sigma(2x) - 1$

Aunque el rango centrado en cero mejora la convergencia respecto a la sigmoide, el problema del gradiente desvaneciente persiste porque la derivada máxima es 1 (no mayor). Las neuronas sigmoide y tanh siguen siendo susceptibles a la saturación en redes profundas.

## ReLU y la Revolucion del Activador Lineal Rectificado

### Introduccion a ReLU

La Rectified Linear Unit (ReLU), introducida por Nair y Hinton en 2010, transformó el entrenamiento de redes profundas:

$$f(x) = \max(0, x)$$

**Propiedades:**

- **Computacionalmente eficiente:** Solo requiere comparaciones y operaciones de máximo
- **Gradiente constante:** Para $x > 0$, la derivada es exactamente 1
- **Esparsidad:** Produce activaciones dispersas, donde muchos valores son exactamente cero

La simplicidad de ReLU resolve múltiples problemas de sus predecesoras. Al no saturar para valores positivos grandes, el gradiente fluye sin atenuación, permitiendo el entrenamiento efectivo de redes con cientos de capas.

### El Problema de la "Dying ReLU"

Sin embargo, ReLU introduce un nuevo fenómeno: neuronas que permanentemente 输出an cero, conocida como el problema de la "ReLU muriendo" o "Dying ReLU".

Cuando una neurona con activación ReLU recibe suficiente información negativa durante el entrenamiento, su sesgo puede desplazarse de manera que **toda entrada produzcan salida negativa**, causando que la neurona siempre output cero. En este estado, el gradiente es cero para todas las entradas, y la neurona deja de aprender.

Matemáticamente, si $W \cdot x + b < 0$ para todas las entradas del conjunto de datos, el gradiente con respecto a $W$ y $b$ será siempre cero durante la retropropagación.

## Variantes de ReLU

### Leaky ReLU

Leaky ReLU introduce una pequeña pendiente para entradas negativas:

$$f(x) = \begin{cases} x & \text{si } x > 0 \\ \alpha x & \text{si } x \leq 0 \end{cases}$$

donde $\alpha$ es un hiperparámetro pequeño (típicamente 0.01). Esto permite que un gradiente pequeño pero no nulo fluya incluso cuando la entrada es negativa, previniendo el problema de la neurona mueta.

### Parametric ReLU (PReLU)

PReLU generaliza Leaky ReLU haciendo que el parámetro $\alpha$ sea aprendible durante el entrenamiento:

$$f(x) = \begin{cases} x & \text{si } x > 0 \\ \alpha x & \text{si } x \leq 0 \end{cases}$$

donde $\alpha$ se actualiza mediante gradiente descendente junto con los demás parámetros de la red.

### Exponential Linear Unit (ELU)

ELU utiliza una exponencial para entradas negativas:

$$f(x) = \begin{cases} x & \text{si } x > 0 \\ \alpha(e^x - 1) & \text{si } x \leq 0 \end{cases}$$

donde $\alpha > 0$ es un hiperparámetro. Para valores negativos, ELU produce valores ligeramente negativos que empujan las activaciones hacia cero, manteniendo una media cercana a cero. Esto puede mejorar el aprendizaje, aunque con mayor costo computacional debido a la exponencial.

### Scaled Exponential Linear Unit (SELU)

SELU, introducida por Klambauer et al. en 2017, representa un enfoque fundamentalmente distinto. Para entradas normalizadas adecuadamente, SELU produce activaciones con propiedades estadísticas específicas:

$$f(x) = \lambda \begin{cases} x & \text{si } x > 0 \\ \alpha(e^x - 1) & \text{si } x \leq 0 \end{cases}$$

con $\lambda \approx 1.0507$ y $\alpha \approx 1.6733$. Bajo ciertas condiciones (normalización de entradas, pesos inicializados correctamente), las activaciones de una red feedforward con SELU se autorregulan, manteniendo media cero y varianza uno a través de las capas. Esto permite construir redes muy profundas sin necesidad de técnicas como Batch Normalization.

## Funciones de Activacion Modernas

### GELU (Gaussian Error Linear Unit)

GELU, introducida en el paper de BERT (Devlin et al., 2019), combina propiedades de dropout, regularización y funciones de activación no lineales:

$$\text{GELU}(x) = x \cdot \Phi(x)$$

donde $\Phi(x)$ es la función de distribución acumulativa de la distribución normal estándar. Una aproximación computacionalmente eficiente es:

$$\text{GELU}(x) \approx 0.5x\left(1 + \tanh\left(\sqrt{2/\pi}(x + 0.044715x^3)\right)\right)$$

GELU weighting las entradas por su valor, pero multiplicándolas por la probabilidad de que la entrada provenga de una distribución normal positiva. Esto produce una activación que es más suave que ReLU y estadísticamente más significativa.

### Swish

Swish, descubierta mediante búsqueda automática de arquitecturas, se define como:

$$\text{Swish}(x) = x \cdot \sigma(\beta x) = \frac{x}{1 + e^{-\beta x}}$$

donde $\beta$ es un hiperparámetro aprendible o constante. Para $\beta = 1$, tenemos la versión estándar.

Swish Exhibe propiedades únicas: no monotonía (puede decrecer para ciertos valores negativos pequeños), smoothness (es infinitamente diferenciable), y produce mejores resultados que ReLU en redes profundas en numerosos experimentos.

### Mish

Mish, propuesta por Misra en 2019, sigue una forma similar a Swish:

$$\text{Mish}(x) = x \cdot \tanh(\ln(1 + e^x))$$

Utiliza la función softplus en lugar de sigmoid, proporcionando una curva más suave. Experimentos empíricos sugieren que Mish supera consistentemente a ReLU y se desempeña comparable o mejor que Swish en muchas tareas.

## Implementacion Practica

A continuacion se presenta una implementacion en PyTorch que permite experimentar con diferentes funciones de activacion:

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.pyplot as plt
import numpy as np

# Definicion de funciones de activacion personalizadas
class Swish(nn.Module):
    """Swish: x * sigmoid(beta * x)"""
    def __init__(self, beta=1.0):
        super().__init__()
        self.beta = beta
    
    def forward(self, x):
        return x * torch.sigmoid(self.beta * x)


class GELU(nn.Module):
    """Gaussian Error Linear Unit"""
    def forward(self, x):
        # Aproximacion usada en Hugging Face transformers
        return 0.5 * x * (1 + torch.tanh(
            torch.sqrt(torch.tensor(2.0 / np.pi)) * 
            (x + 0.044715 * torch.pow(x, 3))
        ))


class Mish(nn.Module):
    """Mish: x * tanh(softplus(x))"""
    def forward(self, x):
        return x * torch.tanh(F.softplus(x))


# Comparacion visual de funciones de activacion
def plot_activation_functions():
    """Grafica las funciones de activacion y sus derivadas"""
    x = torch.linspace(-5, 5, 500)
    
    activations = {
        'ReLU': F.relu,
        'Leaky ReLU(0.01)': lambda t: F.leaky_relu(t, 0.01),
        'ELU(1.0)': lambda t: F.elu(t, 1.0),
        'GELU': GELU(),
        'Swish': Swish(),
        'Mish': Mish(),
    }
    
    fig, axes = plt.subplots(2, 3, figsize=(14, 8))
    axes = axes.flatten()
    
    for idx, (name, func) in enumerate(activations.items()):
        y = func(x)
        
        # Calcular derivadas numericamente
        eps = 1e-7
        y_plus = func(x + eps)
        y_minus = func(x - eps)
        dy = (y_plus - y_minus) / (2 * eps)
        
        ax = axes[idx]
        ax.plot(x.numpy(), y.numpy(), 'b-', linewidth=2, label='Activación')
        ax.plot(x.numpy(), dy.numpy(), 'r--', linewidth=1.5, label='Derivada')
        ax.axhline(y=0, color='k', linestyle='-', linewidth=0.5)
        ax.axvline(x=0, color='k', linestyle='-', linewidth=0.5)
        ax.set_title(name, fontsize=12, fontweight='bold')
        ax.set_xlabel('x')
        ax.legend(loc='upper left')
        ax.grid(True, alpha=0.3)
        ax.set_ylim(-1.5, 5)
    
    plt.tight_layout()
    plt.savefig('activation_functions.png', dpi=150)
    plt.show()


# Ejemplo de uso en una red neuronal
class Red NeuronalEjemplo(nn.Module):
    """Red feedforward con seleccion de activacion configurable"""
    
    def __init__(self, input_dim, hidden_dims, output_dim, activation='relu'):
        super().__init__()
        
        # Seleccionar funcion de activacion
        if activation == 'relu':
            self.act = nn.ReLU()
        elif activation == 'leaky_relu':
            self.act = nn.LeakyReLU(0.01)
        elif activation == 'elu':
            self.act = nn.ELU()
        elif activation == 'gelu':
            self.act = nn.GELU()
        elif activation == 'selu':
            self.act = nn.SELU()
        elif activation == 'swish':
            self.act = Swish()
        elif activation == 'mish':
            self.act = Mish()
        else:
            raise ValueError(f"Activacion desconocida: {activation}")
        
        # Construir capas
        capas = []
        prev_dim = input_dim
        for h_dim in hidden_dims:
            capas.extend([
                nn.Linear(prev_dim, h_dim),
                self.act
            ])
            prev_dim = h_dim
        capas.append(nn.Linear(prev_dim, output_dim))
        
        self.network = nn.Sequential(*capas)
    
    def forward(self, x):
        return self.network(x)


# Demonstracion de entrenamiento comparativo
def entrenamiento_comparativo():
    """Compara diferentes funciones de activacion en un problema simple"""
    # Generar datos sinteticos: XOR
    torch.manual_seed(42)
    X = torch.tensor([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=torch.float32)
    y = torch.tensor([[0], [1], [1], [0]], dtype=torch.float32)
    
    activaciones = ['relu', 'leaky_relu', 'gelu', 'elu', 'mish']
    resultados = {}
    
    print("Comparando funciones de activacion en problema XOR")
    print("=" * 60)
    
    for act_name in activaciones:
        # Crear modelo
        modelo = RedNeuronalEjemplo(
            input_dim=2,
            hidden_dims=[16, 16],
            output_dim=1,
            activation=act_name
        )
        
        optimizador = torch.optim.Adam(modelo.parameters(), lr=0.01)
        criterio = nn.MSELoss()
        
        # Entrenamiento
        perdidas = []
        for epoca in range(500):
            optimizador.zero_grad()
            salida = modelo(X)
            loss = criterio(salida, y)
            loss.backward()
            optimizador.step()
            perdidas.append(loss.item())
        
        # Evaluar
        with torch.no_grad():
            predicciones = (modelo(X) > 0.5).float()
            precision = (predicciones == y).float().mean()
        
        resultados[act_name] = {
            'loss_final': perdidas[-1],
            'precision': precision.item(),
            'curva_perdida': perdidas
        }
        
        print(f"{act_name:15} - Loss final: {perdidas[-1]:.4f}, Precision: {precision.item()*100:.1f}%")
    
    return resultados
```

## Seleccion de la Funcion de Activacion

### Guia Practica

La eleccion de la funcion de activacion depende del contexto especifico de la tarea y la arquitectura:

**Recomendaciones generales:**

| Contexto | Activacion Recomendada |
|----------|------------------------|
| Redes convolucionales (CV) | ReLU, Leaky ReLU |
| Redes recurrentes | tanh, LSTM/GRU gates |
| Redes transformer | GELU |
| Redes muy profundas | SELU (connormalization apropiada) |
| Clasificacion binaria (salida) | Sigmoid |
| Clasificacion multiclase (salida) | Softmax |
| Valoracion general | GELU, Mish, o Swish |

### Consideraciones de Implementacion

**Computo:** ReLU es la mas eficiente; GELU, Swish y Mish incluyen operaciones trigonometricas mas costosas.

**Compatibilidad con normalizacion:** Las funciones que mantienen la media cero (SELU, ELU, GELU) funcionan mejor con Batch Normalization o cuando se combina con dropout.

**Regulacion implicita:** Funciones como GELU y Swish pueden actuar como regularizadores debil, reduciendo la necesidad de otras tecnicas de regularizacion en algunos casos.

## Conclusion

Las funciones de activacion constituyen el mecanismo fundamental que permite a las redes neuronales trascender las limitaciones de los modelos lineales. Desde la funcion escalon original hasta las funciones modernas como GELU y Swish, la evolucion de las activaciones refleja la busqueda continua de metodos que permitan entrenar redes mas profundas, mas estables y mas precisas.

La no-linealidad introducida por estas funciones habilita la composicion jerarquica de representaciones que subyace al exito del deep learning moderno. Comprender las propiedades matematicas de cada funcion, sus fortalezas y limitaciones, resulta esencial para disenar arquitecturas efectivas y diagnosticar problemas durante el entrenamiento.

En secciones posteriores, exploraremos como las funciones de activacion interactuan con otras tecnicas fundamentales como la normalizacion de capas, la inicializacion de pesos, y las arquitecturas especializadas que han emergido para diferentes dominios de aplicacion.

