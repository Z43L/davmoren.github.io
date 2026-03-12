---
---
layout: post
title: "Redes Neuronales a Fondo"
date: 2026-03-12 02:06:41 
author: David Moreno Jimenez
tags: ["machine-learning", "redes-neuronales", "deep-learning", "ia"]
reading_time: 78
excerpt: "Redes Neuronales a Fondo"
audience: intermedio
style: técnico

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


## El Algoritmo de Retropropagación y el Entrenamiento

# El Algoritmo de Retropropagación y el Entrenamiento

La retropropagación (*backpropagation*) constituye el mecanismo fundamental que permite a las redes neuronales aprender de sus errores. Sin este algoritmo, el entrenamiento de redes profundas sería computacionalmente inviable. En esta sección se Examina el funcionamiento interno de la retropropagación, sus fundamentos matemáticos y las técnicas prácticas para entrenar redes neuronales efectivamente.

---

## El Problema del Aprendizaje en Redes Neuronales

Una red neuronal aprende ajustando sus pesos y sesgos para minimizar una función de pérdida que mide la discrepancia entre las predicciones de la red y los valores objetivo. Este proceso de optimización requiere calcular cómo cambia la pérdida cuando cada parámetro de la red se modifica ligeramente.

**Definición formal:** La retropropagación es un algoritmo de optimización que utiliza la regla de la cadena del cálculo diferencial para calcular los gradientes de la función de pérdida respecto a cada peso de la red, propagando el error desde la capa de salida hacia la capa de entrada.

La intuición es directa: si un peso contribuye a aumentar el error en la salida, debemos ajustarlo en la dirección opuesta. El desafío radica en calcular esta contribución eficientemente en redes con millones de parámetros.

---

## Fundamentos Matemáticos

### La Regla de la Cadena

La retropropagación explota la regla de la cadena para descomponer el cálculo del gradiente global en cálculos locales manageable. Si tenemos una función compuesta *f(g(x))*, la derivada se calcula como:

$$\frac{df}{dx} = \frac{df}{dg} \cdot \frac{dg}{dx}$$

En el contexto de una red neuronal, la función de pérdida depende de la salida, que depende de las activaciones de la capa anterior, que a su vez dependen de los pesos. La regla de la cadena permite propagar el error a través de esta cadena de dependencias.

### Gradientes Locales y Remotos

Considérese una neurona simple en una capa oculta. Su salida *z* depende de la suma ponderada de sus entradas:

$$z = \sum_i w_i \cdot x_i + b$$

La activación de la neurona es *a = σ(z)*, donde *σ* es la función de activación. Para calcular el gradiente de la pérdida respecto al peso *w_i*, aplicamos la regla de la cadena:

$$\frac{\partial L}{\partial w_i} = \frac{\partial L}{\partial a} \cdot \frac{\partial a}{\partial z} \cdot \frac{\partial z}{\partial w_i}$$

Cada término tiene un significado específico: el primero representa el error que llega a esta neurona (*gradiente remoto*), el segundo captura la no linealidad local, y el tercero es simplemente la entrada asociada al peso.

---

## El Algoritmo de Retropropagación Paso a Paso

El algoritmo opera en dos fases distintivas que constituyen un ciclo completo de entrenamiento:

### Fase hacia adelante (Forward Pass)

1. Presentar un ejemplo de entrada a la red
2. Para cada capa, calcular las sumas ponderadas: *z^(l) = W^(l) · a^(l-1) + b^(l)*
3. Aplicar la función de activación: *a^(l) = σ(z^(l))*
4. En la capa de salida, calcular el valor predicho *ŷ*
5. Calcular la función de pérdida *L(y, ŷ)*

### Fase hacia atrás (Backward Pass)

1. Calcular el gradiente de la pérdida respecto a la salida: *δ^(L) = ∂L/∂a^(L) ⊙ σ'(z^(L))*
2. Para cada capa *l* desde la última hasta la primera:
   - Calcular el gradiente respecto a los pesos: *∂L/∂W^(l) = (δ^(l)) · (a^(l-1))^T*
   - Calcular el gradiente respecto al sesgo: *∂L/∂b^(l) = δ^(l)*
   - Propagar el gradiente a la capa anterior: *δ^(l-1) = (W^(l))^T · δ^(l) ⊙ σ'(z^(l-1))*

La notación *⊙* denota el producto elemento a elemento (producto de Hadamard).

---

## Implementación Práctica

La siguiente implementación en NumPy ilustra los componentes esenciales de la retropropagación para una red con una capa oculta:

```python
import numpy as np

class RedNeuronalSimple:
    def __init__(self, tamano_entrada, oculto, tamano_salida, tasa_aprendizaje=0.01):
        """
        Inicializa la red con pesos aleatorios pequeños.
        Xavier/Glorot initialization: escala los pesos según el tamaño de las capas.
        """
        self.tasa_aprendizaje = tasa_aprendizaje
        
        # Pesos de la capa oculta: conexión entrada -> oculta
        self.W1 = np.random.randn(tamano_entrada, oculto) * np.sqrt(2.0 / tamano_entrada)
        self.b1 = np.zeros((1, oculto))
        
        # Pesos de la capa de salida: conexión oculta -> salida
        self.W2 = np.random.randn(hidden, tamano_salida) * np.sqrt(2.0 / oculto)
        self.b2 = np.zeros((1, tamano_salida))
    
    def relu(self, z):
        """Función de activación ReLU: max(0, z)"""
        return np.maximum(0, z)
    
    def relu_derivada(self, z):
        """Derivada de ReLU: 1 si z > 0, 0 si z <= 0"""
        return (z > 0).astype(float)
    
    def softmax(self, z):
        """Softmax para clasificación multiclase"""
        exp_z = np.exp(z - np.max(z, axis=1, keepdims=True))
        return exp_z / np.sum(exp_z, axis=1, keepdims=True)
    
    def forward(self, X):
        """Fase hacia adelante completa"""
        # Capa oculta
        self.z1 = X @ self.W1 + self.b1
        self.a1 = self.relu(self.z1)
        
        # Capa de salida
        self.z2 = self.a1 @ self.W2 + self.b2
        self.a2 = self.softmax(self.z2)
        
        return self.a2
    
    def retropropagacion(self, X, y):
        """
        Calcula gradientes mediante retropropagación.
        Asume entropía cruzada categórica con softmax.
        """
        m = X.shape[0]  # número de ejemplos
        
        # One-hot encoding de las etiquetas
        y_onehot = np.zeros_like(self.a2)
        y_onehot[np.arange(m), y] = 1
        
        # Gradiente en la capa de salida
        # Para softmax + entropía cruzada, el gradiente simplifica a: predicción - objetivo
        delta2 = self.a2 - y_onehot
        
        # Gradientes de W2 y b2
        dW2 = self.a1.T @ delta2 / m
        db2 = np.sum(delta2, axis=0, keepdims=True) / m
        
        # Propagación hacia la capa oculta
        delta1 = (delta2 @ self.W2.T) * self.relu_derivada(self.z1)
        
        # Gradientes de W1 y b1
        dW1 = X.T @ delta1 / m
        db1 = np.sum(delta1, axis=0, keepdims=True) / m
        
        # Actualización de pesos (descenso de gradiente)
        self.W2 -= self.tasa_aprendizaje * dW2
        self.b2 -= self.tasa_aprendizaje * db2
        self.W1 -= self.tasa_aprendizaje * dW1
        self.b1 -= self.tasa_aprendizaje * db1
    
    def entrenar(self, X, y, epocas=1000):
        """Bucle de entrenamiento completo"""
        for epoca in range(epocas):
            # Forward pass
            predicciones = self.forward(X)
            
            # Cálculo de pérdida (entropía cruzada)
            epsilon = 1e-15
            perdida = -np.mean(y_onehot * np.log(predicciones + epsilon))
            
            # Retropropagación y actualización de pesos
            self.retropropagacion(X, y)
            
            if epoca % 100 == 0:
                print(f"Época {epoca}: Pérdida = {perdida:.4f}")
```

Esta implementación demuestra los conceptos fundamentales: la fase hacia adelante combina transformaciones lineales con no linealidades, mientras que la fase hacia atrás calcula gradientes que fluyen desde la pérdida hacia los pesos, multiplicando gradientes remotos por derivadas locales en cada paso.

---

## Estrategias de Entrenamiento Efectivo

### Tamaño de Lote (Batch Size)

El tamaño de lote determina cuántos ejemplos se procesan antes de actualizar los pesos:

| Estrategia | Descripción | Ventajas | Desventajas |
|------------|-------------|----------|-------------|
| **Stochastic (SGD)** | Lote = 1 | Actualizaciones frecuentes, escapa óptimos locales | Alta varianza, ineficiente en hardware |
| **Mini-batch** | Lote = 32-256 | Balance entre velocidad y estabilidad | Requiere ajuste del tamaño |
| **Batch** | Lote = todo el dataset | Gradientes precisos, convergencia estable | Requiere toda la data en memoria |

**Recomendación práctica:** Para la mayoría de aplicaciones, usar mini-batches de 32 o 64 ejemplos proporciona el mejor balance entre eficiencia computacional y calidad de convergencia.

### Tasas de Aprendizaje

La tasa de aprendizaje controla la magnitud de las actualizaciones de pesos. Una tasa demasiado alta causa oscilaciones e diverge; demasiado baja converge lentamente o queda atrapada en óptimos locales.

```python
class TasaAprendizajeAdaptativa:
    """
    Implementa decaying learning rate con reinicio.
    Reduce la tasa cuando la pérdida se estanca.
    """
    def __init__(self, tasa_inicial=0.1, factor=0.5, paciencia=10):
        self.tasa = tasa_inicial
        self.factor = factor
        self.paciencia = paciencia
        self.mejor_perdida = float('inf')
        self.sin_mejora = 0
    
    def paso(self, perdida_actual):
        if perdida_actual < self.mejor_perdida:
            self.mejor_perdida = perdida_actual
            self.sin_mejora = 0
        else:
            self.sin_mejora += 1
        
        if self.sin_mejora >= self.paciencia:
            self.tasa *= self.factor
            self.sin_mejora = 0
            print(f"Tasa de aprendizaje reducida a: {self.tasa:.6f}")
```

### Normalización de Datos

La normalización de las entradas es crucial para el entrenamiento estable. Sin ella, las escalas diferentes entre características causan gradientes desbalanceados que ralentizan o impiden la convergencia.

```python
def normalizar(X_train, X_test):
    """Normalización Z-score: media 0, desviación estándar 1"""
    media = np.mean(X_train, axis=0)
    std = np.std(X_train, axis=0)
    
    X_train_norm = (X_train - media) / (std + 1e-8)
    X_test_norm = (X_test - media) / (std + 1e-8)
    
    return X_train_norm, X_test_norm
```

---

## El Problema del Desvanecimiento del Gradiente

En redes profundas, los gradientes pueden multiplicarse repetidamente, volviéndose extremadamente pequeños (desvanecimiento) o extremadamente grandes (explosión). Este problema limita la profundidad efectiva de las redes.

### Síntomas y Diagnóstico

- **Desvanecimiento:** la pérdida deja de disminuir después de algunas épocas; los gradientes cerca de la entrada son cercanos a cero
- **Explosión:** la pérdida diverge a valores infinitos o NaN; los pesos se vuelven NaN

### Soluciones

**Inicialización adecuada:** Xavier/He initialization escala los pesos según el tamaño de las capas:

```python
# Inicialización de He (para ReLU)
W = np.random.randn(fan_in, fan_out) * np.sqrt(2.0 / fan_in)

# Inicialización de Xavier (para tanh/sigmoid)
W = np.random.randn(fan_in, fan_out) * np.sqrt(1.0 / fan_in)
```

**Funciones de activación apropiadas:** ReLU y sus variantes mitigan el desvanecimiento al no saturar para entradas positivas.

**Normalización de capas:** Batch Normalization estabiliza las activaciones intermedias:

```python
def batch_norm(z, gamma, beta, epsilon=1e-8):
    """Normalización de batch con parámetros aprendibles"""
    media = np.mean(z, axis=0)
    varianza = np.var(z, axis=0)
    z_norm = (z - media) / np.sqrt(varianza + epsilon)
    return gamma * z_norm + beta
```

---

## Ejemplo Completo: Clasificación de Dígitos

A continuación se presenta un ejemplo integral que entrena una red para clasificar dígitos del conjunto MNIST:

```python
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split

# Carga y preparación de datos
digitos = load_digits()
X = digitos.data / 16.0  # Normalización: pixels en [0, 1]
y = digitos.target

X_entrena, X_prueba, y_entrena, y_prueba = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Crear y entrenar la red
red = RedNeuronalSimple(
    tamano_entrada=64,
    oculto=128,
    tamano_salida=10,
    tasa_aprendizaje=0.5
)

# Entrenamiento con evaluación periódica
def entrenarYEvaluar(red, X_train, y_train, X_test, y_test, epocas=500):
    for epoca in range(epocas):
        # Entrenamiento
        red.forward(X_train)
        
        # Mini-batches de 64
        indices = np.random.permutation(len(X_train))
        for inicio in range(0, len(X_train), 64):
            fin = min(inicio + 64, len(X_train))
            idx = indices[inicio:fin]
            red.retropropagacion(X_train[idx], y_train[idx])
        
        # Evaluación cada 50 épocas
        if epoca % 50 == 0:
            predicciones = np.argmax(red.forward(X_test), axis=1)
            precision = np.mean(predicciones == y_test)
            print(f"Época {epoca}: Precisión = {precision:.4f}")

entrenarYEvaluar(red, X_entrena, y_entrena, X_prueba, y_prueba)
```

Este ejemplo demuestra la aplicación práctica de todos los conceptos discutidos: la arquitectura de la red, el ciclo de entrenamiento, la retropropagación y la evaluación del rendimiento.

---

## Consideraciones Avanzadas

### Regularización

Para prevenir el sobreajuste en redes complejas, se emplean técnicas de regularización:

- **Dropout:** apaga aleatoriamente neuronas durante el entrenamiento
- **L2 (weight decay):** penaliza pesos grandes adicionando λ||W||² a la pérdida
- **Early stopping:** detiene el entrenamiento cuando la pérdida de validación aumenta

### Optimizadores Avanzados

Adam (Adaptive Moment Estimation) combina momentum con tasas de aprendizaje adaptativas por parámetro:

```python
class Adam:
    def __init__(self, tasa=0.001, beta1=0.9, beta2=0.999):
        self.tasa = tasa
        self.beta1 = beta1
        self.beta2 = beta2
        self.m = {}  # Primer momento (media)
        self.v = {}  # Segundo momento (varianza)
        self.t = 0   # Contador de pasos
    
    def paso(self, params, grads):
        self.t += 1
        for clave, grad in grads.items():
            if clave not in self.m:
                self.m[clave] = np.zeros_like(grad)
                self.v[clave] = np.zeros_like(grad)
            
            # Actualización de momentos
            self.m[clave] = self.beta1 * self.m[clave] + (1 - self.beta1) * grad
            self.v[clave] = self.beta2 * self.v[clave] + (1 - self.beta2) * (grad ** 2)
            
            # Bias correction
            m_hat = self.m[clave] / (1 - self.beta1 ** self.t)
            v_hat = self.v[clave] / (1 - self.beta2 ** self.t)
            
            # Actualización de parámetros
            params[clave] -= self.tasa * m_hat / (np.sqrt(v_hat) + 1e-8)
```

---

## Resumen de Conceptos Clave

La retropropagación transforma el problema de optimización de una red neuronal en un cálculo eficiente mediante la regla de la cadena. El algoritmo propaga el error desde la salida hacia la entrada, calculando en cada capa el gradiente local que indica cómo ajustar los pesos para reducir la pérdida.

Los elementos críticos para un entrenamiento exitoso incluyen:

1. **Inicialización apropiada** de los pesos para evitar saturación o desvanecimiento
2. **Normalización** de los datos de entrada
3. **Selección del tamaño de lote** que balancee estabilidad y eficiencia
4. **Tasa de aprendizaje** ajustada dinámicamente según la progresión del entrenamiento
5. **Funciones de activación** apropiadas al tipo de problema

La comprensión profunda de estos mecanismos permite al profesional ajustar redes neuronales para aplicaciones específicas, diagnosticando problemas de entrenamiento y aplicando las soluciones apropiadas. En la siguiente sección se exploran arquitecturas especializadas que extienden estos principios básicos a problemas más complejos.


## Funciones de Pérdida y Métricas de Evaluación

# Funciones de Pérdida y Métricas de Evaluación

Las funciones de pérdida constituyen el núcleo del proceso de aprendizaje en redes neuronales. Mientras que la arquitectura define *cómo* procesa información una red, la función de pérdida especifica *qué* significa aprender correctamente. Sin una función de pérdida bien diseñada, el optimizador no tiene una dirección clara para ajustar los pesos. En esta sección se analizan las funciones de pérdida más utilizadas, sus fundamentos matemáticos, cuándo emplearlas y cómo implementarlas en la práctica.

---

## 1. Fundamentos de las Funciones de Pérdida

Una **función de pérdida** (loss function) es una función objetivo que cuantifica la discrepancia entre las predicciones del modelo y los valores reales. El proceso de entrenamiento consiste en minimizar esta función, ajustando iterativamente los pesos de la red mediante gradiente descendente.

Matemáticamente, sea $\hat{y}$ la predicción del modelo e $y$ el valor verdadero. La pérdida $L(\hat{y}, y)$ debe satisfacer propiedades fundamentales:

- **No negatividad**: $L(\hat{y}, y) \geq 0$ para todo par $(\hat{y}, y)$
- **Cero solo en la predicción perfecta**: $L(y, y) = 0$
- **Derivabilidad**: Para permitir el cálculo de gradientes

La elección de la función de pérdida depende del tipo de problema (clasificación vs. regresión), la naturaleza de los datos y los requisitos específicos de la aplicación.

---

## 2. Funciones de Pérdida para Clasificación

### 2.1 Entropía Cruzada Binaria (Binary Cross-Entropy)

La **entropía cruzada binaria** es la función de pérdida estándar para problemas de clasificación binaria. Su formulaciónderive de la teoría de información y representa la divergencia de Kullback-Leibler entre la distribución verdadera y la predicción del modelo.

$$L_{BCE} = -[y \cdot \log(\hat{y}) + (1-y) \cdot \log(1-\hat{y})]$$

Donde $\hat{y} = P(y=1|x)$ representa la probabilidad predicha por el modelo de que la muestra pertenezca a la clase positiva.

**¿Por qué entropía cruzada?** Esta función penaliza fortemente las predicciones confidently incorrectas. Si el modelo predice 0.9 para una muestra de clase 0, el término $\log(1-0.9)$ contribuye significativamente a la pérdida, incentivando al modelo a ser más cauto en sus predicciones erróneas.

**Implementación en PyTorch:**

```python
import torch
import torch.nn as nn

# Definir la función de pérdida
criterion = nn.BCELoss()

# Predicciones (deben estar en rango [0, 1])
predictions = torch.tensor([0.85, 0.12, 0.73, 0.34])
labels = torch.tensor([1.0, 0.0, 1.0, 0.0])

# Cálculo de la pérdida
loss = criterion(predictions, labels)
print(f"Pérdida BCE: {loss.item():.4f}")
```

**Escenarios de uso:** Detección de spam, diagnóstico médico binario, predicción de churn, clasificación de sentimiento positivo/negativo.

### 2.2 Entropía Cruzada Categórica (Categorical Cross-Entropy)

Para problemas de **clasificación multiclase**, la entropía cruzada categórica extiende el concepto binario a $C$ clases:

$$L_{CE} = -\sum_{c=1}^{C} y_c \cdot \log(\hat{y}_c)$$

Donde $y_c$ es 1 si la muestra pertenece a la clase $c$ y 0 en caso contrario, y $\hat{y}_c$ es la probabilidad predicha para cada clase. La salida del modelo debe pasar por una capa **softmax** para obtener probabilidades válidas que sumen 1.

**Implementación:**

```python
# Clasificación multiclase con softmax integrado
criterion = nn.CrossEntropyLoss()

# Entrada: logits (antes de softmax), shape: (batch_size, num_classes)
logits = torch.tensor([[2.5, 0.8, -1.2], 
                       [0.3, 3.1, 1.5]])

# Etiquetas: índices de clase (no one-hot)
labels = torch.tensor([0, 1])

loss = criterion(logits, labels)
print(f"Pérdida CE: {loss.item():.4f}")
```

**Nota técnica:** `nn.CrossEntropyLoss` internally aplica softmax, por lo que se pasan logits directamente. Para usar `nn.BCEWithLogitsLoss`, se combinan sigmoid y BCE en una sola operación numéricamente estable.

### 2.3 Entropía Cruzada Dispersa (Sparse Cross-Entropy)

Cuando las etiquetas están codificadas como enteros en lugar de vectores one-hot, la **sparse categorical cross-entropy** ofrece eficiencia computacional:

```python
# Equivalente a CrossEntropyLoss pero acepta etiquetas como enteros
criterion = nn.CrossEntropyLoss()

logits = torch.randn(32, 10)  # Batch de 32, 10 clases
labels = torch.randint(0, 10, (32,))  # Etiquetas como enteros 0-9

loss = criterion(logits, labels)
```

Esta variante evita crear tensores one-hot grandes, reduciendo consumo de memoria en datasets con muchas clases.

---

## 3. Funciones de Pérdida para Regresión

### 3.1 Error Cuadrático Medio (Mean Squared Error)

El **MSE** es la función de pérdida más intuitiva para regresión:

$$L_{MSE} = \frac{1}{n}\sum_{i=1}^{n}(\hat{y}_i - y_i)^2$$

Su principal ventaja es que penaliza fuertemente los errores grandes (el cuadrado amplifica desviaciones). Sin embargo, esto la hace sensible a outliers: un solo valor atípico puede dominar la pérdida total.

**Implementación:**

```python
criterion = nn.MSELoss()

predictions = torch.tensor([2.5, 3.8, 4.2, 5.1])
targets = torch.tensor([2.3, 4.0, 4.5, 4.9])

loss = criterion(predictions, targets)
print(f"Pérdida MSE: {loss.item():.4f}")
print(f"RMSE: {torch.sqrt(loss).item():.4f}")
```

### 3.2 Error Absoluto Medio (Mean Absolute Error)

El **MAE** ofrece robustez frente a outliers:

$$L_{MAE} = \frac{1}{n}\sum_{i=1}^{n}|\hat{y}_i - y_i|$$

A diferencia del MSE, el MAE trata todos los errores proporcionalmente a su magnitud. El gradiente es constante, lo que puede causar dificultades en la convergencia cerca del óptimo.

```python
criterion = nn.L1Loss()  # L1 Loss = MAE

loss = criterion(predictions, targets)
print(f"Pérdida MAE: {loss.item():.4f}")
```

### 3.3 Pérdida Huber

La **pérdida Huber** combina las ventajas de MSE y MAE mediante una transición suave:

$$L_{Huber}(y, \hat{y}) = \begin{cases} \frac{1}{2}(y-\hat{y})^2 & \text{si } |y-\hat{y}| \leq \delta \\ \delta(|y-\hat{y}| - \frac{1}{2}\delta) & \text{si } |y-\hat{y}| > \delta \end{cases}$$

Para errores pequeños se comporta como MSE (gradiente suave); para errores grandes, como MAE (gradiente constante, robusta a outliers). El parámetro $\delta$ típicamente se establece en 1.0 o se aprende durante el entrenamiento.

```python
criterion = nn.HuberLoss(delta=1.0)

loss = criterion(predictions, targets)
print(f"Pérdida Huber: {loss.item():.4f}")
```

**Recomendación práctica:** Para datasets con outliers conocidos, Huber o MAE son preferibles a MSE. Para datos limpios sin valores atípicos, MSE ofrece mejor convergencia.

---

## 4. Funciones de Pérdida Avanzadas

### 4.1 Triplet Loss

En tareas de **aprendizaje de embeddings** (verificación facial, sistemas de recomendación), el **triplet loss** aprende a generar representaciones donde ejemplos similares están cerca en el espacio latente y ejemplos diferentes están separados:

$$L_{triplet} = \max(0, d(a, p) - d(a, n) + \margin)$$

Donde $a$ es un ancla, $p$ es un ejemplo positivo (misma identidad), $n$ es un ejemplo negativo (identidad diferente), y $d$ es la distancia euclidiana.

```python
import torch.nn.functional as F

def triplet_loss(anchor, positive, negative, margin=0.3):
    dist_pos = F.pairwise_distance(anchor, positive)
    dist_neg = F.pairwise_distance(anchor, negative)
    loss = F.relu(dist_pos - dist_neg + margin)
    return loss.mean()

# Ejemplo de uso
anchor = torch.randn(32, 128)   # Embeddings de anclas
positive = torch.randn(32, 128) # Embeddings positivos
negative = torch.randn(32, 128) # Embeddings negativos

loss = triplet_loss(anchor, positive, negative)
```

### 4.2 Focal Loss

Para **clasificación desbalanceada**, el **focal loss** reduce el peso de ejemplos fácil de clasificar y enfoca el entrenamiento en ejemplos difíciles:

$$L_{Focal} = -\alpha_t (1 - \hat{p}_t)^\gamma \log(\hat{p}_t)$$

Donde $\hat{p}_t$ es la probabilidad de la clase verdadera y $\gamma$ (típicamente 2) controla la tasa de enfoque.

```python
# Implementación de Focal Loss
class FocalLoss(nn.Module):
    def __init__(self, alpha=0.25, gamma=2.0):
        super().__init__()
        self.alpha = alpha
        self.gamma = gamma
    
    def forward(self, inputs, targets):
        bce_loss = F.binary_cross_entropy_with_logits(
            inputs, targets, reduction='none'
        )
        probs = torch.sigmoid(inputs)
        pt = torch.where(targets == 1, probs, 1 - probs)
        focal_weight = (1 - pt) ** self.gamma
        loss = self.alpha * focal_weight * bce_loss
        return loss.mean()
```

---

## 5. Métricas de Evaluación

Las funciones de pérdida guían el entrenamiento, pero las **métricas de evaluación** miden el desempeño real del modelo en producción. Es crucial distinguir ambas: una función de pérdida debe ser differentiable (para backpropagation), mientras que las métricas pueden ser做任何 cosa (no requieren gradientes).

### 5.1 Métricas para Clasificación

**Accuracy (Exactitud)** representa la fracción de predicciones correctas:

$$Accuracy = \frac{TP + TN}{TP + TN + FP + FN}$$

Aunque intuitiva, accuracy es problemática con classes desbalanceadas. Un modelo que predice siempre la clase mayoritaria puede lograr 90% accuracy en un dataset 90/10.

**Precision y Recall** ofrecen una visión más matizada:

$$Precision = \frac{TP}{TP + FP} \quad Recall = \frac{TP}{TP + FN}$$

Precision mide qué tan confiables son las predicciones positivas; recall mide qué fracción de positivos reales captura el modelo.

**F1-Score** harmoniza precision y recall en una sola métrica:

$$F1 = 2 \cdot \frac{Precision \times Recall}{Precision + Recall}$$

**Implementación completa:**

```python
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, 
    f1_score, classification_report, confusion_matrix
)
import numpy as np

# Predicciones y etiquetas reales
y_true = np.array([1, 0, 1, 1, 0, 1, 0, 0, 1, 1])
y_pred = np.array([1, 0, 1, 0, 0, 1, 1, 0, 1, 1])

print("Accuracy:", accuracy_score(y_true, y_pred))
print("Precision:", precision_score(y_true, y_pred))
print("Recall:", recall_score(y_true, y_pred))
print("F1-Score:", f1_score(y_true, y_pred))
print("\nReporte completo:")
print(classification_report(y_true, y_pred))

# Matriz de confusión
cm = confusion_matrix(y_true, y_pred)
print("Matriz de confusión:\n", cm)
```

### 5.2 AUC-ROC

El **Área Bajo la Curva ROC** (AUC-ROC) mide la capacidad del modelo para distinguir entre clases en todos los umbrales de decisión. Un AUC de 0.5 representa un clasificador aleatorio; 1.0 representa clasificación perfecta.

```python
from sklearn.metrics import roc_auc_score, roc_curve
import matplotlib.pyplot as plt

# Probabilidades predichas (no etiquetas)
y_proba = np.array([0.85, 0.23, 0.78, 0.56, 0.12, 0.91, 0.45, 0.34, 0.88, 0.92])

auc = roc_auc_score(y_true, y_proba)
print(f"AUC-ROC: {auc:.4f}")

# Curva ROC
fpr, tpr, thresholds = roc_curve(y_true, y_proba)

plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, label=f'ROC curve (AUC = {auc:.2f})')
plt.plot([0, 1], [0, 1], 'k--', label='Random classifier')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Curva ROC')
plt.legend()
plt.show()
```

### 5.3 Métricas para Regresión

**R² (Coeficiente de Determinación)** indica qué proporción de la varianza explica el modelo:

$$R^2 = 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}$$

Un R² de 1.0 indica ajuste perfecto; 0.0 indica que el modelo predice siempre la media; valores negativos indican que el modelo es peor que predecir la media.

**RMSE (Root Mean Squared Error)**:

$$RMSE = \sqrt{\frac{1}{n}\sum(y_i - \hat{y}_i)^2}$$

```python
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error

y_true = np.array([2.3, 4.0, 4.5, 4.9, 3.1, 5.8, 2.8, 6.2])
y_pred = np.array([2.5, 3.8, 4.2, 5.1, 3.3, 5.5, 3.0, 6.0])

print(f"R²: {r2_score(y_true, y_pred):.4f}")
print(f"MAE: {mean_absolute_error(y_true, y_pred):.4f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_true, y_pred)):.4f}")
```

---

## 6. Selección de Métricas según el Dominio

| Dominio | Métrica Primaria | Métricas Secundarias |
|---------|------------------|---------------------|
| Detección de fraude | F1-Score, AUC-ROC | Precision, Recall |
| Diagnóstico médico | Recall (sensitivity) | F1-Score, AUC-ROC |
| Sistemas de recomendación | NDCG, MAP | RMSE (para ratings) |
| Predicción financiera | MAE, RMSE | R², MAPE |
| Visión por computadora | IoU (segmentación) | Accuracy, F1-Score |

La selección debe reflejar el costo real de los errores. En detección de cáncer, un falso negativo (no detectar cáncer) es mucho más costoso que un falso positivo (biopsia innecesaria), por lo que se prioriza recall sobre precision.

---

## 7. Ejemplo Integrado: Pipeline de Entrenamiento

El siguiente ejemplo muestra cómo integrar funciones de pérdida y métricas en un flujo de entrenamiento completo:

```python
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.metrics import accuracy_score, f1_score

# Dataset sintético para clasificación multiclase
X = torch.randn(1000, 20)
y = torch.randint(0, 3, (1000,))  # 3 clases

dataset = TensorDataset(X, y)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

# Modelo simple
class Classifier(nn.Module):
    def __init__(self, input_dim, num_classes):
        super().__init__()
        self.fc = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes)
        )
    
    def forward(self, x):
        return self.fc(x)

model = Classifier(20, 3)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Entrenamiento
epochs = 10
for epoch in range(epochs):
    model.train()
    total_loss = 0
    
    for batch_X, batch_y in dataloader:
        optimizer.zero_grad()
        outputs = model(batch_X)
        loss = criterion(outputs, batch_y)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    
    # Evaluación al final de cada época
    model.eval()
    with torch.no_grad():
        all_preds = []
        all_labels = []
        
        for batch_X, batch_y in dataloader:
            outputs = model(batch_X)
            preds = torch.argmax(outputs, dim=1)
            all_preds.extend(preds.numpy())
            all_labels.extend(batch_y.numpy())
        
        acc = accuracy_score(all_labels, all_preds)
        f1 = f1_score(all_labels, all_preds, average='macro')
    
    print(f"Epoch {epoch+1}: Loss={total_loss/len(dataloader):.4f}, "
          f"Acc={acc:.4f}, F1={f1:.4f}")
```

---

## Resumen y Conexiones

Las funciones de pérdida y métricas de evaluación forman el sistema de navegación del entrenamiento de redes neuronales. La función de pérdida define el objetivo de aprendizaje; las métricas miden el progreso hacia metas prácticas. La selección apropiada de ambas determina el éxito de un proyecto de deep learning.

En secciones anteriores examinamos la propagación hacia atrás y el optimizador que conjuntamente reducen la pérdida. En secciones posteriores se abordará cómo las decisiones de arquitectura (número de capas, tipos de capas) interactúan con la función de pérdida elegida para determinar la capacidad de representación del modelo. La regularización (dropout, weight decay), tema de próximo estudio, trabaja en conjunto con la función de pérdida para prevenir el sobreajuste y mejorar la generalización.


## Regularización, Dropout y Técnicas de Optimización

# Regularización, Dropout y Técnicas de Optimización

En el capítulo anterior exploramos la arquitectura fundamental de las redes neuronales y el proceso de entrenamiento mediante retropropagación. Sin embargo, existe un conjunto de desafíos fundamentales que limitan el rendimiento de los modelos: el sobreajuste (overfitting), la dificultad de encontrar mínimos globales óptimos, y la necesidad de converger eficientemente durante el entrenamiento. Este capítulo aborda las técnicas más efectivas para mitigar estos problemas: regularización, dropout y métodos de optimización avanzados.

---

## El Problema del Sobreajuste

Una red neuronal con suficientes parámetros puede memorizar los datos de entrenamiento en lugar de aprender patrones generalizables. Este fenómeno, conocido como sobreajuste, se manifiesta cuando el modelo exhibe alta precisión en el conjunto de entrenamiento pero rendimiento deficiente en datos nunca vistos.

**Definición formal**: El sobreajuste ocurre cuando el error de entrenamiento es significativamente menor que el error de validación o prueba, indicando que el modelo ha aprendido ruido específico del conjunto de entrenamiento.

### Regularización L1 y L2

La regularización añade un término de penalización a la función de pérdida original, restringiendo la magnitud de los pesos durante el entrenamiento.

**Regularización L2 (weight decay)**

Añade la suma de cuadrados de los pesos multiplicada por un factor λ/2:

$$L_{total} = L_{original} + \frac{\lambda}{2}\sum_{i} w_i^2$$

La regularización L2 penaliza ponderaciones grandes, promoviendo soluciones más suaves y distribuidas entre todas las características.

**Regularización L1**

Añade la suma de valores absolutos de los pesos:

$$L_{total} = L_{original} + \lambda\sum_{i}|w_i|$$

L1 produce稀疏idad (sparsity): muchos pesos se reducen exactamente a cero, acting as un selector automático de características.

```python
import torch
import torch.nn as nn

class RegularizedMLP(nn.Module):
    """
    Red neuronal con opción de regularización L1 o L2.
    """
    def __init__(self, input_dim, hidden_dim, output_dim, regularization_type='l2', lambda_reg=0.01):
        super().__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, output_dim)
        self.relu = nn.ReLU()
        
        self.regularization_type = regularization_type
        self.lambda_reg = lambda_reg
    
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        return self.fc3(x)
    
    def compute_loss(self, predictions, targets):
        """Calcula pérdida con término de regularización."""
        # Pérdida original (entropía cruzada para clasificación)
        ce_loss = nn.functional.cross_entropy(predictions, targets)
        
        # Término de regularización
        reg_loss = 0
        for param in self.parameters():
            if self.regularization_type == 'l2':
                reg_loss += torch.sum(param ** 2)
            elif self.regularization_type == 'l1':
                reg_loss += torch.sum(torch.abs(param))
        
        return ce_loss + (self.lambda_reg * reg_loss)
```

### Early Stopping

El early stopping monitorea el rendimiento en un conjunto de validación durante el entrenamiento y detiene la ejecución cuando el error de validación deja de mejorar después de un número determinado de épocas (patience).

```python
class EarlyStopping:
    """
    Implementación de early stopping con patience configurable.
    """
    def __init__(self, patience=10, min_delta=0.001, mode='min'):
        self.patience = patience
        self.min_delta = min_delta
        self.mode = mode
        self.counter = 0
        self.best_score = None
        self.early_stop = False
    
    def __call__(self, validation_loss):
        score = -validation_loss if self.mode == 'min' else validation_loss
        
        if self.best_score is None:
            self.best_score = score
        elif score < self.best_score + self.min_delta:
            self.counter += 1
            if self.counter >= self.patience:
                self.early_stop = True
        else:
            self.best_score = score
            self.counter = 0
        
        return self.early_stop
```

---

## Dropout: Regularización Estocástica

El dropout, introducido por Srivastava et al. (2014), es una técnica que durante cada paso de entrenamiento desactiva aleatoriamente un subconjunto de neuronas con probabilidad p. Esto fuerza a la red a aprender representaciones redundantes y robustas.

### Mecanismo Fundamental

Durante el forward pass, cada neurona se conserva con probabilidad p y se elimina (estableciendo su salida a cero) con probabilidad 1-p:

$$h^{(l)} = a^{(l)} \cdot \mathbf{d}^{(l)}$$

donde $\mathbf{d}^{(l)}$ es un vector de variáveis de Bernoulli con probabilidad p de ser 1.

En tiempo de inferencia (evaluación), todas las neuronas permanecen activas, pero sus salidas se escalan por p para mantener el mismo valor esperado que durante el entrenamiento:

$$a_{inference}^{(l)} = p \cdot a^{(l)}$$

**Definición técnica**: Dropout implementa una aproximación estocástica a la agregación de modelos, entrenando implícitamente una ensemble de redes thinning (redes con subconjuntos de neuronas activas) y Promediando sus predicciones.

### Implementación en PyTorch

```python
class DropoutMLP(nn.Module):
    """
    Red neuronal con capas de dropout.
    """
    def __init__(self, input_dim, hidden_dim, output_dim, dropout_rate=0.5):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(p=dropout_rate),  # Dropout después de activación
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(p=dropout_rate),
            nn.Linear(hidden_dim, output_dim)
        )
    
    def forward(self, x):
        return self.network(x)

# Uso correcto: dropout solo afecta entrenamiento
model = DropoutMLP(784, 256, 10, dropout_rate=0.3)

model.train()  # Activa dropout
outputs_train = model(x_train)

model.eval()   # Desactiva dropout para evaluación
with torch.no_grad():
    outputs_eval = model(x_test)
```

### Consideraciones Prácticas

La tasa de dropout típicos oscila entre 0.1 y 0.5. Capas más cercanas a la entrada suelen beneficiarse de dropout más bajo (0.1-0.2), mientras que capas más profundas pueden usar tasas mayores. Para redes muy profundas, el dropout adaptativo o técnicas como DropConnect (desactivar conexiones en lugar de neuronas) pueden ser más efectivas.

---

## Técnicas de Optimización Avanzadas

El descenso de gradiente estocástico (SGD) básico frecuentemente converge lentamente o queda atrapado en mínimos locales subóptimos. Las técnicas de optimización modernas abordan estas limitaciones mediante momentum, tasas de aprendizaje adaptativas y programación de learning rate.

### Descenso de Gradiente con Momentum

El momentum acelera la convergencia acumulando gradientes anteriores para amortiguar oscilaciones:

$$v_{t+1} = \mu \cdot v_t + \eta \cdot \nabla_\theta L(\theta_t)$$
$$\theta_{t+1} = \theta_t - v_{t+1}$$

donde μ (típicamente 0.9) es el coeficiente de momentum y η es la tasa de aprendizaje.

```python
# Implementación manual de SGD con momentum
def sgd_momentum(parameters, gradients, velocities, lr=0.01, momentum=0.9):
    """
    Actualiza parámetros usando SGD con momentum.
    """
    for param, grad, vel in zip(parameters, gradients, velocities):
        # Acumular velocidad
        vel = momentum * vel + lr * grad
        # Actualizar parámetros
        param.data -= vel
    
    return velocities  # Retornar nuevas velocidades

# En PyTorch: optim.SGD con momentum
optimizer = torch.optim.SGD(
    model.parameters(),
    lr=0.01,
    momentum=0.9,
    weight_decay=1e-4  # Regularización L2 integrada
)
```

### Métodos Adaptativos

Los optimizadores adaptativos mantienen tasas de aprendizaje por parámetro, ajustándose automáticamente según la magnitud de los gradientes observados.

**Adam (Adaptive Moment Estimation)**

Combina momentum con escalado adaptativo porrms de los gradientes:

```python
# Adam: combinando las mejores prácticas
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.001,           # Tasa de aprendizaje base
    betas=(0.9, 0.999), # Coeficientes para momentos
    eps=1e-8,           # Estabilidad numérica
    weight_decay=1e-4   # Regularización L2
)

# Training loop típico
for epoch in range(num_epochs):
    model.train()
    for batch in train_loader:
        optimizer.zero_grad()
        outputs = model(batch.x)
        loss = criterion(outputs, batch.y)
        loss.backward()
        
        # Gradient clipping para estabilidad
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        
        optimizer.step()
```

**Comparación de optimizadores**:

| Optimizador | Ventajas | Desventajas |
|-------------|----------|-------------|
| SGD + Momentum | Generaliza bien, simple | Puede requerir tuning extenso |
| Adam | Convergencia rápida, poco tuning | Puede sobreajustar en algunos casos |
| RMSprop | Adaptativo, bueno para RNNs | Sensible a hyperparameters |
| AdamW | Adam con regularización correcta | Más reciente, menos documentado |

### Programación de Learning Rate

La tasa de aprendizaje inicial y su.scheduleo durante el entrenamiento impactan significativamente la convergencia.

```python
# Scheduler: Reduce LR cuando métrica se estanca
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer,
    mode='min',
    factor=0.5,          # Reduce a la mitad
    patience=5,          # Esperar 5 épocas sin mejora
    verbose=True
)

# En el loop de entrenamiento
for epoch in range(num_epochs):
    train_loss = train_epoch(model, train_loader)
    val_loss = validate(model, val_loader)
    
    # scheduler usa la métrica de validación
    scheduler.step(val_loss)
    
    current_lr = optimizer.param_groups[0]['lr']
    print(f"Epoch {epoch}: loss={val_loss:.4f}, lr={current_lr:.6f}")
```

### Gradient Clipping

El exploding gradients es particularmente problemático en redes profundas y RNNs. El gradient clipping limita la norma de los gradientes a un umbral máximo:

```python
# Clip por norma
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

# Clip por valor absoluto
for param in model.parameters():
    param.grad.data.clamp_(min=-1.0, max=1.0)
```

---

## Combinación de Técnicas: Pipeline Completo

Un pipeline de entrenamiento robusto integra todas las técnicas discutidas:

```python
class RobustTrainer:
    """
    Entrenador completo con regularización, dropout y optimización avanzada.
    """
    def __init__(self, model, lr=0.001, weight_decay=1e-4, dropout=0.3):
        self.model = model
        self.optimizer = torch.optim.AdamW(
            model.parameters(),
            lr=lr,
            weight_decay=weight_decay
        )
        
        self.scheduler = torch.optim.lr_scheduler.OneCycleLR(
            self.optimizer,
            max_lr=lr,
            epochs=50,
            steps_per_epoch=len(train_loader)
        )
        
        self.early_stopping = EarlyStopping(patience=10, mode='min')
        self.scaler = torch.cuda.amp.GradScaler()  # Mixed precision
    
    def train_epoch(self, train_loader):
        self.model.train()
        total_loss = 0
        
        for batch in train_loader:
            self.optimizer.zero_grad()
            
            # Mixed precision training
            with torch.cuda.amp.autocast():
                outputs = self.model(batch.x)
                loss = nn.functional.cross_entropy(outputs, batch.y)
            
            # Backward con scaling
            self.scaler.scale(loss).backward()
            
            # Gradient clipping
            self.scaler.unscale_(self.optimizer)
            torch.nn.utils.clip_grad_norm_(self.model.parameters(), max_norm=1.0)
            
            self.scaler.step(self.optimizer)
            self.scaler.update()
            
            self.scheduler.step()  # OneCycleLR por step
            total_loss += loss.item()
        
        return total_loss / len(train_loader)
    
    def train(self, train_loader, val_loader, max_epochs=50):
        best_val_loss = float('inf')
        
        for epoch in range(max_epochs):
            train_loss = self.train_epoch(train_loader)
            val_loss = self.validate(val_loader)
            
            print(f"Epoch {epoch}: train_loss={train_loss:.4f}, val_loss={val_loss:.4f}")
            
            if self.early_stopping(val_loss):
                print(f"Early stopping en epoch {epoch}")
                break
            
            if val_loss < best_val_loss:
                best_val_loss = val_loss
                self.save_best_model()
    
    def validate(self, val_loader):
        self.model.eval()
        total_loss = 0
        
        with torch.no_grad():
            for batch in val_loader:
                outputs = self.model(batch.x)
                loss = nn.functional.cross_entropy(outputs, batch.y)
                total_loss += loss.item()
        
        return total_loss / len(val_loader)
```

---

## Síntesis y Conexiones

Las técnicas presentadas forman un ecosistema coherente para el entrenamiento de redes neuronales robustas:

1. **Regularización L1/L2** limita la complejidad del modelo directamente en la función de pérdida
2. **Dropout** introduce estocasticidad que fuerza representaciones redundantes
3. **Early stopping** previene el sobreajuste detectando el punto óptimo de generalización
4. **Optimizadores adaptativos** (Adam, AdamW) garantizan convergencia eficiente
5. **Learning rate scheduling** refina la búsqueda de mínimos durante el entrenamiento
6. **Gradient clipping** mantiene la estabilidad numérica en redes profundas

Estas técnicas no son mutuamente excluyentes; la práctica estándar combina múltiples enfoques. En el siguiente capítulo, exploraremos arquitecturas especializadas (CNNs, RNNs, Transformers) que incorporan variaciones de estas técnicas según sus dominios específicos de aplicación.


## Tipos Especializados de Arquitecturas Neuronales

# Tipos Especializados de Arquitecturas Neuronales

Las arquitecturas neuronales especializadas representan la evolución natural de las redes neuronales básicas hacia soluciones diseñadas para resolver problemas específicos con eficiencia superior. Mientras que una red neuronal feedforward tradicional puede abordar tareas de clasificación o regresión general, existen patrones computacionales y estructuras que capturan mejor determinadas relaciones en los datos. Esta sección examina las arquitecturas especializadas más influyentes, su diseño interno, sus casos de uso óptimos y su implementación práctica.

## Redes Neuronales Convolucionales

Las Redes Neuronales Convolucionales (CNN, por sus siglas en inglés) constituyen la arquitectura dominante en el procesamiento de imágenes y datos con estructura espacial. Su innovación fundamental reside en la capacidad de detectar características jerárquicas sin necesidad de handcrafted features.

### Fundamentos Conceptuales

Una CNN opera mediante **capas convolucionales** que aplican filtros aprendibles sobre regiones locales de la entrada. Cada filtro detecta un patrón específico: bordes, texturas, formas complejas. La **operación de convolución** se define matemáticamente como:

$$(I * K)(i,j) = \sum_{m}\sum_{n} I(i+m, j+n) \cdot K(m,n)$$

donde *I* es la imagen de entrada, *K* es el kernel o filtro, y la operación produce un mapa de características (*feature map*). El proceso de aprendizaje ajusta los valores del kernel para minimizar la función de pérdida en la tarea objetivo.

La **operación de pooling** reduce la dimensionalidad espacial mientras preserva información esencial. El max pooling, por ejemplo, selecciona el valor máximo en cada ventana, proporcionando invariancia translacional.

### Arquitectura Típica

Una CNN clásica sigue el patrón: capa convolucional → activación → pooling → capa fully connected → salida. Las capas convolucionales tempranas capturan características de bajo nivel (bordes, colores), mientras que las capas profundas detectan estructuras de alto nivel (objetos, rostros).

### Ejemplo Práctico

```python
import torch
import torch.nn as nn

class CNNClasificador(nn.Module):
    """
    Red neuronal convolucional para clasificación de imágenes.
    Arquitectura referencia para tareas de visión por computadora.
    """
    def __init__(self, num_clases=10):
        super(CNNClasificador, self).__init__()
        
        # Primera capa convolucional
        # Entrada: 3 canales (RGB), salida: 32 filtros de 3x3
        self.conv1 = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2)  # Reduce 224x224 -> 112x112
        )
        
        # Segunda capa convolucional
        self.conv2 = nn.Sequential(
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2)  # 112x112 -> 56x56
        )
        
        # Tercera capa convolucional
        self.conv3 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(),
            nn.MaxPool2d(2)  # 56x56 -> 28x28
        )
        
        # Capas fully connected para clasificación
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 28 * 28, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, num_clases)
        )
    
    def forward(self, x):
        x = self.conv1(x)
        x = self.conv2(x)
        x = self.conv3(x)
        x = self.classifier(x)
        return x

# Verificación de arquitectura
modelo = CNNClasificador(num_clases=10)
entrada_ejemplo = torch.randn(1, 3, 224, 224)
salida = modelo(entrada_ejemplo)
print(f"Forma de salida: {salida.shape}")  # torch.Size([1, 10])
```

## Redes Neuronales Recurrentes

Las Redes Neuronales Recurrentes (RNN) abordan datos secuenciales donde el orden temporal importa: series temporales, texto, audio. Su característica distintiva es la **memoria** implícita mediante conexiones que propagan información a través del tiempo.

### Mecanismo de Recurrencia

Una RNN procesa cada elemento de la secuencia manteniendo un **estado oculto** que codifica información de elementos previos. La ecuación de recurrencia es:

$$h_t = \tanh(W_{hh} \cdot h_{t-1} + W_{xh} \cdot x_t + b_h)$$

donde $h_t$ es el estado oculto en el tiempo $t$, $x_t$ es la entrada en el tiempo $t$, y los pesos $W$ conectan estados previos, entradas actuales y sesgos.

El problema del **gradiente vanishing** limita la capacidad de las RNN básicas para aprender dependencias a largo plazo. Cuando la secuencia crece, los gradientes se multiplican repetidamente, convergiendo a cero o divergiendo, impediendo el aprendizaje de relaciones distantes.

### Implementación de RNN Básica

```python
import torch.nn as nn

class RNNBasica(nn.Module):
    """
    RNN vanilla para procesamiento de secuencias.
    Útil para series temporales cortas o demostración conceptual.
    """
    def __init__(self, input_size, hidden_size, output_size, num_layers=1):
        super(RNNBasica, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        # Capa RNN recurrente
        self.rnn = nn.RNN(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            nonlinearity='tanh'
        )
        
        # Capa de salida
        self.fc = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        # x forma: (batch, seq_len, input_size)
        out, hidden = self.rnn(x)
        # out: (batch, seq_len, hidden_size)
        # hidden: (num_layers, batch, hidden_size)
        
        # Usar solo el último estado oculto para clasificación
        out = self.fc(out[:, -1, :])
        return out

# Demostración con datos sintéticos
rnn = RNNBasica(input_size=10, hidden_size=32, output_size=5)
entrada = torch.randn(8, 20, 10)  # batch=8, seq_len=20, features=10
salida = rnn(entrada)
print(f"Salida shape: {salida.shape}")  # torch.Size([8, 5])
```

## Long Short-Term Memory (LSTM)

Las LSTM resuelven el problema del gradiente vanishing mediante una arquitectura de **puertas** (*gates*) que controlan el flujo de información. Introducidas por Hochreiter y Schmidhuber en 1997, se convirtieron en el estándar para dependencias a largo plazo.

### Arquitectura de Puertas

Una LSTM contiene tres puertas que regulan qué información almacenar, actualizar o descartar:

1. **Puerta de olvido** (*forget gate*): $f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f)$
2. **Puerta de entrada** (*input gate*): $i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i)$
3. **Puerta de salida** (*output gate*): $o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o)$

La **celda de memoria** $C_t$ se actualiza combinando información retenida de $C_{t-1}$ y nuevas候选 candidatas:

$$C_t = f_t \cdot C_{t-1} + i_t \cdot \tanh(W_c \cdot [h_{t-1}, x_t] + b_c)$$

El estado oculto final es $h_t = o_t \cdot \tanh(C_t)$.

### Ejemplo con LSTM

```python
class LSTMClasificador(nn.Module):
    """
    LSTM para clasificación de secuencias.
    Adecuado para texto, series temporales, datos de sensores.
    """
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim):
        super(LSTMClasificador, self).__init__()
        
        # Capa de embedding
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=0)
        
        # LSTM bidireccional
        self.lstm = nn.LSTM(
            input_size=embedding_dim,
            hidden_size=hidden_dim,
            num_layers=2,
            batch_first=True,
            bidirectional=True,
            dropout=0.3
        )
        
        # Capa fully connected
        self.fc = nn.Sequential(
            nn.Linear(hidden_dim * 2, hidden_dim),  # *2 por bidireccional
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(hidden_dim, output_dim)
        )
    
    def forward(self, x):
        # x forma: (batch, seq_len)
        embedded = self.embedding(x)  # (batch, seq_len, embedding_dim)
        
        # LSTM produce (output, (h_n, c_n))
        lstm_out, (hidden, cell) = self.lstm(embedded)
        
        # Concatenar estados ocultos finales de ambas direcciones
        hidden_concat = torch.cat((hidden[-2,:,:], hidden[-1,:,:]), dim=1)
        
        output = self.fc(hidden_concat)
        return output

# Ejemplo de uso
modelo = LSTMClasificador(
    vocab_size=10000,
    embedding_dim=128,
    hidden_dim=64,
    output_dim=2
)
entrada = torch.randint(1, 10000, (32, 50))  # batch=32, seq_len=50
salida = modelo(entrada)
print(f"Salida shape: {salida.shape}")  # torch.Size([32, 2])
```

## Gated Recurrent Unit (GRU)

Las GRU representan una variante simplificada de LSTM con menor número de parámetros. Fusionan las puertas de olvido y entrada en una sola **puerta de actualización**, y combinan el estado de celda con el estado oculto.

### Comparación con LSTM

La GRU usa dos puertas:

$$z_t = \sigma(W_z \cdot [h_{t-1}, x_t])$$
$$r_t = \sigma(W_r \cdot [h_{t-1}, x_t])$$
$$\tilde{h}_t = \tanh(W \cdot [r_t \cdot h_{t-1}, x_t])$$
$$h_t = (1 - z_t) \cdot h_{t-1} + z_t \cdot \tilde{h}_t$$

Donde $z_t$ es la puerta de actualización que controla cuánto del estado anterior preservar, y $r_t$ es la puerta de reinicio que determina cuánto ignorar el estado previo.

### Implementación

```python
class GRUTraductor(nn.Module):
    """
    GRU para secuencia a secuencia (traducción, resumen).
    Más eficiente computacionalmente que LSTM.
    """
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(GRUTraductor, self).__init__()
        
        self.encoder = nn.GRU(input_dim, hidden_dim, batch_first=True)
        self.decoder = nn.GRU(output_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)
    
    def forward(self, fuente, objetivo):
        # Codificar fuente
        _, estado_encoder = self.encoder(fuente)
        
        # Decodificar objetivo paso a paso
        decodificado, _ = self.decoder(objetivo, estado_encoder)
        
        # Proyección a vocabulario
        salida = self.fc(decodificado)
        return salida
```

## Redes Transformer

Los Transformers, introducidos en 2017, revolucionaron el procesamiento del lenguaje natural al eliminar la recurrencia completamente, relying en el **mecanismo de atención** para capturar dependencias sin importar la distancia temporal.

### Mecanismo de Atención

La atención escalable multi-cabeza (*scaled dot-product attention*) se define como:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

donde $Q$ (queries), $K$ (keys) y $V$ (values) son proyecciones lineales de la entrada. Multiples **cabezas de atención** permiten que el modelo atienda a diferentes subspaces de representación simultáneamente.

### Arquitectura Completa

```python
class TransformerClasificador(nn.Module):
    """
    Transformer para clasificación de texto.
    Utiliza embedding posicional + codificador Transformer.
    """
    def __init__(self, vocab_size, d_model, nhead, num_layers, num_clases):
        super(TransformerClasificador, self).__init__()
        
        # Embedding con información posicional
        self.embedding = nn.Embedding(vocab_size, d_model, padding_idx=0)
        self.pos_encoder = PositionalEncoding(d_model)
        
        # Codificador Transformer
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=nhead,
            dim_feedforward=d_model * 4,
            dropout=0.1,
            activation='gelu',
            batch_first=True
        )
        self.transformer_encoder = nn.TransformerEncoder(
            encoder_layer,
            num_layers=num_layers
        )
        
        # Clasificación
        self.classifier = nn.Sequential(
            nn.LayerNorm(d_model),
            nn.Linear(d_model, d_model // 2),
            nn.GELU(),
            nn.Dropout(0.1),
            nn.Linear(d_model // 2, num_clases)
        )
    
    def forward(self, x):
        # Crear máscara de padding
        mascara = (x == 0)
        
        # Embedding + codificación posicional
        x = self.embedding(x) * torch.sqrt(torch.tensor(x.shape[-1], dtype=torch.float32))
        x = self.pos_encoder(x)
        
        # Pasar por Transformer encoder
        x = self.transformer_encoder(x, src_key_padding_mask=mascara)
        
        # Pooling (media excluyendo padding) + clasificación
        x = x.masked_fill(mascara.unsqueeze(-1), 0)
        x = x.mean(dim=1)
        
        return self.classifier(x)


class PositionalEncoding(nn.Module):
    """Codificación posicional sinusoidal para Transformers."""
    
    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()
        
        # Crear matriz de codificación posicional
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * 
                            (-torch.log(torch.tensor(10000.0)) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0)
        
        self.register_buffer('pe', pe)
    
    def forward(self, x):
        return x + self.pe[:, :x.size(1), :]

# Uso del Transformer
transformer = TransformerClasificador(
    vocab_size=30000,
    d_model=256,
    nhead=8,
    num_layers=6,
    num_clases=2
)
entrada = torch.randint(1, 30000, (16, 128))
salida = transformer(entrada)
print(f"Salida shape: {salida.shape}")  # torch.Size([16, 2])
```

## Autoencoders

Los Autoencoders son redes que aprenden a comprimir datos en una representación latente y luego reconstruir la entrada. Su arquitectura codificador-decodificador sirve para reducción de dimensionalidad, detección de anomalías y aprendizaje de representaciones.

### Estructura

El **codificador** mapea $x \rightarrow z$, donde $z$ es el espacio latente. El **decodificador** reconstruye $\hat{x} \leftarrow z$. La función de pérdida típicamente es MSE: $\mathcal{L} = \|x - \hat{x}\|^2$.

### Autoencoder Variacional (VAE)

Los VAE añaden regularización al espacio latente, garantizando que siga una distribución normal. Esto permite generación de nuevas muestras.

```python
class AutoencoderVariacional(nn.Module):
    """
    VAE para aprendizaje de representación y generación.
    El espacio latente se regulariza hacia una distribución normal.
    """
    def __init__(self, input_dim, latent_dim):
        super(AutoencoderVariacional, self).__init__()
        
        # Codificador
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.ReLU(),
            nn.BatchNorm1d(256),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU()
        )
        
        # Parámetros de la distribución latente
        self.fc_mu = nn.Linear(64, latent_dim)
        self.fc_logvar = nn.Linear(64, latent_dim)
        
        # Decodificador
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 128),
            nn.ReLU(),
            nn.BatchNorm1d(128),
            nn.Linear(128, 256),
            nn.ReLU(),
            nn.Linear(256, input_dim)
        )
    
    def reparametrizar(self, mu, logvar):
        """Truco de reparametrización para diferenciabilidad."""
        std = torch.exp(0.5 * logvar)
        ruido = torch.randn_like(std)
        return mu + std * ruido
    
    def forward(self, x):
        # Codificar
        h = self.encoder(x)
        mu = self.fc_mu(h)
        logvar = self.fc_logvar(h)
        
        # Muestrear de la distribución
        z = self.reparametrizar(mu, logvar)
        
        # Decodificar
        reconstruido = self.decoder(z)
        
        return reconstruido, mu, logvar

def loss_vae(reconstruido, x, mu, logvar):
    """Pérdida combinando reconstrucción y regularización KL."""
    # Pérdida de reconstrucción
    recons_loss = nn.functional.mse_loss(reconstruido, x, reduction='sum')
    
    # Divergencia KL: regulariza hacia N(0,1)
    kl_loss = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())
    
    return recons_loss + kl_loss

# Ejemplo de uso
vae = AutoencoderVariacional(input_dim=784, latent_dim=32)
entrada = torch.randn(64, 784)  # Imágenes de 28x28 aplanadas
reconstruido, mu, logvar = vae(entrada)
print(f"Entrada: {entrada.shape}, Reconstruido: {reconstruido.shape}")
print(f"Espacio latente (mu): {mu.shape}")  # torch.Size([64, 32])
```

## Redes Generativas Adversarias (GAN)

Las GAN entrenan simultáneamente dos redes en un juego minimax: un **generador** crea muestras falsas, y un **discriminador** distingue reales de falsas. El generador mejora hasta que el discriminador no puede diferenciar.

###Formulación del Juego

El discriminador $D$ maximiza la probabilidad de clasificar correctamente ejemplos reales y generados. El generador $G$ minimiza la probabilidad de que $D$ clasifique sus muestras como falsas:

$$\min_G \max_D \mathbb{E}_{x \sim p_{data}}[\log D(x)] + \mathbb{E}_{z \sim p_z}[\log(1 - D(G(z)))]$$

### Implementación Conceptual

```python
class Generador(nn.Module):
    """Genera imágenes a partir de ruido aleatorio."""
    def __init__(self, latent_dim, img_channels, img_size):
        super(Generador, self).__init__()
        
        self.img_size = img_size
        
        self.model = nn.Sequential(
            nn.Linear(latent_dim, 128 * (img_size//4) * (img_size//4)),
            nn.LeakyReLU(0.2),
            nn.Reshape(128, img_size//4, img_size//4),
            
            nn.ConvTranspose2d(128, 64, kernel_size=4, stride=2, padding=1),
            nn.BatchNorm2d(64),
            nn.LeakyReLU(0.2),
            
            nn.ConvTranspose2d(64, img_channels, kernel_size=4, stride=2, padding=1),
            nn.Tanh()  # Salida en [-1, 1]
        )
    
    def forward(self, z):
        return self.model(z)


class Discriminador(nn.Module):
    """Clasifica imágenes como reales o generadas."""
    def __init__(self, img_channels, img_size):
        super(Discriminador, self).__init__()
        
        self.model = nn.Sequential(
            nn.Conv2d(img_channels, 64, kernel_size=4, stride=2, padding=1),
            nn.LeakyReLU(0.2),
            
            nn.Conv2d(64, 128, kernel_size=4, stride=2, padding=1),
            nn.BatchNorm2d(128),
            nn.LeakyReLU(0.2),
            
            nn.Flatten(),
            nn.Linear(128 * (img_size//4) * (img_size//4), 1),
            nn.Sigmoid()
        )
    
    def forward(self, img):
        return self.model(img)

# Inicialización
latent_dim = 100
img_channels = 3
img_size = 32

G = Generador(latent_dim, img_channels, img_size)
D = Discriminador(img_channels, img_size)

# Prueba de forward pass
ruido = torch.randn(8, latent_dim)
imagenes_falsas = G(ruido)
probabilidades = D(imagenes_falsas)

print(f"Forma imágenes generadas: {imagenes_falsas.shape}")
print(f"Probabilidades (deberían ser bajas para falsas): {probabilidades.mean().item():.4f}")
```

## Síntesis y Criterios de Selección

La selección de arquitectura depende fundamentalmente de la naturaleza de los datos y el problema específico:

**Datos espaciales (imágenes, video)**: Las CNN dominan mediante convoluciones que exploit la estructura espacial. Para segmentación semántica o detección de objetos, arquitecturas como U-Net o ResNet resultan más apropiadas que capas fully connected.

**Datos secuenciales**: Para secuencias cortas (<100 elementos) donde el orden importa, LSTM y GRU ofrecen buen balance entre capacidad y eficiencia. La bidireccionalidad mejora la comprensión en tareas como análisis de sentimiento.

**Secuencias largas y NLP**: Los Transformershan demostrado superioridad en tareas de lenguaje gracias a su mecanismo de atención paraleloizable. Modelos como BERT y GPT establecen el estado del arte en comprensión y generación de texto.

**Aprendizaje de representaciones**: Los Autoencoders, especialmente los variacionales, aprenden espacios latentes útiles para clustering, detección de anomalías y generación de datos.

**Generación de contenido**: Las GANs producen muestras de alta calidad pero requieren entrenamiento cuidadoso del balance generador-discriminador. Para generación de texto, modelos de lenguaje autoregresivos resultan más estables.

La tendencia actual involucra arquitecturas **híbridas**: Transformers con convoluciones para visión (Vision Transformers), atención en RNNs, o módulos de convolución dentro de arquitecturas transformer. El conocimiento profundo de cada arquitectura permite seleccionar y combinar herramientas apropiadas para problemas específicos.


## Implementación Práctica y Consideraciones de Diseño

# Implementación Práctica y Consideraciones de Diseño

La transición del conocimiento teórico sobre redes neuronales hacia su implementación efectiva requiere dominar un conjunto de decisiones de diseño que determinan significativamente el éxito de cualquier proyecto. Esta sección aborda las consideraciones prácticas fundamentales que todo practitioner debe conocer para construir modelos robustos y eficientes.

## 3.1 Selección de Arquitectura: Matching Problema-Representación

La elección de la arquitectura neuronal constituye la primera decisión crítica en cualquier implementación. Esta selección debe alinearse con la estructura intrínseca de los datos y la naturaleza del problema a resolver.

### 3.1.1 Arquitecturas Fundamentales y sus Dominios de Aplicación

**Redes Dense (Fully Connected):** Cada neurona conecta con todas las neuronas de la capa siguiente. Apropriadas cuando las características de entrada no poseen estructura espacial o temporal explícita.

```python
import torch.nn as nn

class RedDensa(nn.Module):
    """
    Arquitectura fully-connected para datos tabulares.
    Útil cuando las características son independientes entre sí.
    """
    def __init__(self, input_dim, output_dim, hidden_dims=[256, 128, 64]):
        super().__init__()
        
        capas = []
        prev_dim = input_dim
        
        for hidden_dim in hidden_dims:
            capas.extend([
                nn.Linear(prev_dim, hidden_dim),
                nn.ReLU(),
                nn.BatchNorm1d(hidden_dim),
                nn.Dropout(0.3)  # Regularización durante el entrenamiento
            ])
            prev_dim = hidden_dim
        
        capas.append(nn.Linear(prev_dim, output_dim))
        self.red = nn.Sequential(*capas)
    
    def forward(self, x):
        return self.red(x)
```

**Redes Convolucionales (CNN):** Explotan la localidad espacial en datos como imágenes, aprovechando la invariance translacional mediante kernels aprendibles.

**Redes Recurrentes (RNN/LSTM/GRU):** Diseñadas para secuencias donde el orden temporal importa, manteniendo estados hidden que propagan información temporal.

**Transformers:** Arquitectura basada en atención que ha dominar procesamiento de lenguaje y vision moderno, procesando secuencias en paralelo con mecanismos de self-attention.

### 3.1.2 Principio de Diseño: Mínima Viable

Se recomienda iniciar con la arquitectura más simple que capture la estructura del problema. La complejidad adicional debe justificarse empíricamente mediante mejoras de validación. Un MLP simple frecuentemente establece un baseline competitivo antes de introducir convoluciones o mecanismos de atención.

## 3.2 Inicialización de Pesos: Sentando las Bases del Entrenamiento

La inicialización de pesos determina el punto de partida del proceso de optimización y tiene impacto directo en la convergencia del modelo.

### 3.2.1 El Problema de la Escala Inicial

Sin una inicialización adecuada, las activaciones pueden crecer o decaer exponencialmente a través de las capas, causando:

- **Exploding Gradients:** Actualizaciones numerically estables pero que divergen el entrenamiento
- **Vanishing Gradients:** Gradientes que tienden a cero, paralizando el aprendizaje

### 3.2.2 Estrategias de Inicialización

**Xavier (Glorot):** Diseñada para sigmoid y tanh, equilibra la varianza de activaciones hacia adelante y backward:

$$W \sim \mathcal{N}\left(0, \sqrt{\frac{2}{n_{in} + n_{out}}}\right)$$

```python
import torch.nn.init as init

def inicializacion_xavier(modelo):
    """
    Aplica inicialización Xavier a todas las capas lineales.
    Adecuada para activaciones simétricas (tanh, sigmoid).
    """
    for nombre, param in modelo.named_parameters():
        if 'weight' in nombre and isinstance(param, nn.Linear):
            init.xavier_uniform_(param)
            print(f"Inicializado: {nombre} con Xavier")
        elif 'bias' in nombre:
            init.zeros_(param)

# Uso
modelo = RedDensa(input_dim=784, output_dim=10)
inicializacion_xavier(modelo)
```

**He Initialization:** Optimizada para ReLU y sus variantes, considera que las activaciones de ReLU cancelan la mitad de las varianzas:

$$W \sim \mathcal{N}\left(0, \sqrt{\frac{2}{n_{in}}}\right)$$

```python
def inicializacion_he(modelo):
    """
    Inicialización de He para redes con ReLU.
    Compensa el comportamiento de muerte de neuronas en ReLU.
    """
    for nombre, param in modelo.named_parameters():
        if 'weight' in nombre and isinstance(param, nn.Linear):
            init.kaiming_normal_(param, nonlinearity='relu')
        elif 'bias' in nombre:
            init.zeros_(param)
```

### 3.2.3 Recomendaciones Prácticas

La inicialización He es el default recomendado para redes modernas debido al dominio de ReLU y sus variantes. Sin embargo, arquitecturas específicas como Transformers requieren esquemas adaptados que consideren la profundidad de las capas.

## 3.3 Funciones de Activación: La No-Linealidad Esencial

Las funciones de activación introducen no-linealidades que permiten a la red aprender representaciones complejas. Sin ellas, múltiples capas lineales se colapsarían en una única transformación lineal.

### 3.3.1 Comparativa de Activaciones Comunes

| Función | Fórmula | Características | Uso Recomendado |
|---------|---------|-----------------|-----------------|
| ReLU | max(0, x) | Simple, eficiencia computacional, dying neurons | Default para hidden layers |
| Leaky ReLU | max(0.01x, x) | Evita neuronas muertas | Alternativa a ReLU |
| GELU | x·Φ(x) | Approximación neuronal natural | Transformers, estado del arte |
| Sigmoid | 1/(1+e^-x) | Interpretación probabilística | Output layer binaria |
| Softmax | e^x_i/Σe^x_j | Distribución sobre clases | Output layer multiclase |

### 3.3.2 Implementación de una Capa Personalizada

```python
class CapaPersonalizada(nn.Module):
    """
    Demonstra selección de activación según posición en la red.
    Hidden layers: GELU (moderno) o ReLU (clásico)
    Output: Depende de la tarea
    """
    def __init__(self, entrada, salida, es_output=False, es_ultima_capa=False):
        super().__init__()
        
        self.linear = nn.Linear(entrada, salida)
        self.es_output = es_output
        self.es_ultima_capa = es_ultima_capa
        
        # Activación para capas ocultas: GELU es el estándar moderno
        if not es_output:
            self.activacion = nn.GELU()
        else:
            # La activación de salida se maneja en el forward
            pass
    
    def forward(self, x):
        x = self.linear(x)
        
        if self.es_ultima_capa:
            # Softmax se aplica con CrossEntropyLoss en PyTorch
            return x
        else:
            return self.activacion(x)
```

### 3.3.3 Consideraciones de Diseño

La elección de activación impacta directamente la dinámica de entrenamiento. GELU ha demostrado consistentemente mejor rendimiento en arquitecturas profundas como Transformers. Sin embargo, ReLU mantiene relevancia por su simplicidad y eficiencia computacional en sistemas con recursos limitados.

## 3.4 Regularización: Controlando la Complejidad

La regularización evita el overfitting, permitiendo que el modelo generalice a datos no vistos. Múltiples técnicas combaten este problema desde diferentes ángulos.

### 3.4.1 Dropout: El Estándar de la Industria

Dropout temporalmente desactiva neuronas durante el entrenamiento, forzando redundancia y evitando co-adaptaciones dependientes:

```python
class RedConDropout(nn.Module):
    """
    Arquitectura que demuestra dropout estratégico.
    Tasas típicas: 0.1 - 0.5 según profundidad y tamaño de datos.
    """
    def __init__(self, input_dim, output_dim, dropout_rate=0.3):
        super().__init__()
        
        self.red = nn.Sequential(
            nn.Linear(input_dim, 512),
            nn.GELU(),
            nn.Dropout(dropout_rate),  # Después de activación
            
            nn.Linear(512, 256),
            nn.GELU(),
            nn.Dropout(dropout_rate),
            
            nn.Linear(256, 128),
            nn.GELU(),
            nn.Dropout(dropout_rate * 0.5),  # Menor dropout en capas tardías
            
            nn.Linear(128, output_dim)
        )
    
    def forward(self, x):
        return self.red(x)
```

**Principio de diseño:** Aumentar dropout gradualmente hacia las capas iniciales. Las capas cercanas a la entrada procesan representaciones más generales; las capas profundas contienen características más específicas de la tarea.

### 3.4.2 Weight Decay (L2 Regularization)

Implementada como término adicional en la función de pérdida:

$$\mathcal{L}_{total} = \mathcal{L}_{original} + \frac{\lambda}{2} \sum_i w_i^2$$

```python
# Configuración de optimizer con weight decay
optimizer = torch.optim.AdamW(
    model.parameters(),
    lr=1e-3,
    weight_decay=0.01  # Regularización L2
)
```

AdamW (Weight Decay correcto) es preferido sobre Adam con L2 tradicional porque implementa la regularización de forma matemáticamente correcta.

### 3.4.3 Early Stopping

```python
class EarlyStopping:
    """
    Detiene entrenamiento cuando validación no mejora.
    Previene overfitting sin requerir validación manual.
    """
    def __init__(self, paciencia=10, min_delta=1e-4):
        self.paciencia = paciencia
        self.min_delta = min_delta
        self.contador = 0
        self.best_loss = float('inf')
        self.early_stop = False
    
    def __call__(self, val_loss):
        if val_loss < self.best_loss - self.min_delta:
            self.best_loss = val_loss
            self.contador = 0
        else:
            self.contador += 1
            if self.contador >= self.paciencia:
                self.early_stop = True
        return self.early_stop

# Uso en entrenamiento
early_stopping = EarlyStopping(paciencia=7)

for epoch in range(num_epochs):
    train_loss = entrenamiento(modelo, train_loader)
    val_loss = evaluacion(modelo, val_loader)
    
    if early_stopping(val_loss):
        print(f"Early stopping en epoch {epoch}")
        break
```

## 3.5 Normalización: Estabilizando el Entrenamiento

Las técnicas de normalización reducen el Internal Covariate Shift, acelerando convergencia y permitiendo tasas de aprendizaje más altas.

### 3.5.1 Batch Normalization

Normaliza activaciones por mini-batch, aprenendo parámetros γ (scale) y β (shift):

```python
class RedConBatchNorm(nn.Module):
    """
    BatchNorm típicamente dopo Linear/Conv y antes de la activación.
    Mantiene estadísticas del mini-batch durante entrenamiento.
    """
    def __init__(self, entrada, salida):
        super().__init__()
        
        self.capa = nn.Sequential(
            nn.Linear(entrada, salida),
            nn.BatchNorm1d(salida),  # Normaliza pre-activación
            nn.ReLU()  # Activación después
        )
    
    def forward(self, x):
        return self.capa(x)
```

**Nota de implementación:** BatchNorm se comporta diferente en entrenamiento (usa estadísticas del batch) vs inferencia (usa estadísticas acumuladas). PyTorch maneja esto automáticamente con `model.train()` y `model.eval()`.

### 3.5.2 Layer Normalization vs Batch Normalization

- **Batch Norm:** Normaliza sobre el batch, efectivo en CNNs ybatch sizes grandes
- **Layer Norm:** Normaliza sobre características, estándar en RNNs y Transformers
- **Instance Norm:** Normaliza por muestra y canal, usado en style transfer
- **Group Norm:** Divide canales en grupos, alternativa a BatchNorm cuando batch size es pequeño

```python
# Comparación práctica
class ComparacionNorm(nn.Module):
    def __init__(self, tamano_features, tamano_batch):
        super().__init__()
        
        # BatchNorm: normaliza sobre batch (dim=0)
        self.batch_norm = nn.BatchNorm1d(tamano_features)
        
        # LayerNorm: normaliza sobre features (dim=1)
        self.layer_norm = nn.LayerNorm(tamano_features)
        
        # GroupNorm: normaliza grupos de canales
        self.group_norm = nn.GroupNorm(num_groups=4, num_channels=tamano_features)
    
    def forward_batch(self, x):
        # x shape: (batch, features)
        return self.batch_norm(x)
    
    def forward_layer(self, x):
        return self.layer_norm(x)
```

## 3.6 Implementación Integral: Pipeline Completo

El siguiente ejemplo integra todas las consideraciones discutidas en un pipeline de entrenamiento completo:

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader

class RedClasificador(nn.Module):
    """
    Arquitectura completa para clasificación de imágenes (flattened).
    Integra: He init, BatchNorm, GELU, Dropout escalonado.
    """
    def __init__(self, input_dim=784, num_classes=10):
        super().__init__()
        
        self.backbone = nn.Sequential(
            # Bloque 1
            nn.Linear(input_dim, 512),
            nn.BatchNorm1d(512),
            nn.GELU(),
            nn.Dropout(0.2),
            
            # Bloque 2
            nn.Linear(512, 256),
            nn.BatchNorm1d(256),
            nn.GELU(),
            nn.Dropout(0.2),
            
            # Bloque 3
            nn.Linear(256, 128),
            nn.BatchNorm1d(128),
            nn.GELU(),
            nn.Dropout(0.1),
        )
        
        # Head de clasificación
        self.classifier = nn.Linear(128, num_classes)
        
        # Inicialización
        self._inicializar_pesos()
    
    def _inicializar_pesos(self):
        for m in self.modules():
            if isinstance(m, nn.Linear):
                nn.init.kaiming_normal_(m.weight, nonlinearity='relu')
                if m.bias is not None:
                    nn.init.zeros_(m.bias)
            elif isinstance(m, nn.BatchNorm1d):
                nn.init.ones_(m.weight)
                nn.init.zeros_(m.bias)
    
    def forward(self, x):
        features = self.backbone(x)
        logits = self.classifier(features)
        return logits


def entrenamiento_completo(modelo, train_loader, val_loader, epochs=50):
    """
    Pipeline de entrenamiento con early stopping y logging.
    """
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    modelo = modelo.to(device)
    
    # Optimizador: AdamW con weight decay
    optimizer = optim.AdamW(modelo.parameters(), lr=1e-3, weight_decay=0.01)
    
    # Scheduler: Cosine annealing para decay suave
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=epochs)
    
    # Loss: CrossEntropy incluye Softmax internamente
    criterion = nn.CrossEntropyLoss()
    
    # Early stopping
    early_stopping = EarlyStopping(paciencia=10)
    
    historial = {'train': [], 'val': []}
    
    for epoch in range(epochs):
        # Fase entrenamiento
        modelo.train()
        train_loss = 0.0
        correctas = 0
        totales = 0
        
        for imagenes, etiquetas in train_loader:
            imagenes = imagenes.to(device)
            etiquetas = etiquetas.to(device)
            
            optimizer.zero_grad()
            outputs = modelo(imagenes)
            loss = criterion(outputs, etiquetas)
            loss.backward()
            
            # Gradient clipping previene exploding gradients
            torch.nn.utils.clip_grad_norm_(modelo.parameters(), max_norm=1.0)
            
            optimizer.step()
            
            train_loss += loss.item()
            _, predicted = outputs.max(1)
            totales += etiquetas.size(0)
            correctas += predicted.eq(etiquetas).sum().item()
        
        train_acc = 100. * correctas / totales
        historial['train'].append(train_loss / len(train_loader))
        
        # Fase validación
        modelo.eval()
        val_loss = 0.0
        correctas = 0
        totales = 0
        
        with torch.no_grad():
            for imagenes, etiquetas in val_loader:
                imagenes = imagenes.to(device)
                etiquetas = etiquetas.to(device)
                
                outputs = modelo(imagenes)
                loss = criterion(outputs, etiquetas)
                
                val_loss += loss.item()
                _, predicted = outputs.max(1)
                totales += etiquetas.size(0)
                correctas += predicted.eq(etiquetas).sum().item()
        
        val_acc = 100. * correctas / totales
        historial['val'].append(val_loss / len(val_loader))
        
        scheduler.step()
        
        print(f"Epoch {epoch+1}/{epochs} | "
              f"Train Loss: {historial['train'][-1]:.4f} | "
              f"Val Loss: {historial['val'][-1]:.4f} | "
              f"Val Acc: {val_acc:.2f}%")
        
        if early_stopping(val_loss):
            print(f"Early stopping triggered")
            break
    
    return modelo, historial
```

## 3.7 Consideraciones Avanzadas de Diseño

### 3.7.1 Depth vs Width

La profundidad captura representacion jerárquica; el ancho permite mayor capacidad por capa. Redes profundas y estrechas frecuentemente superan a redes superficiales y anchas para la misma cantidad de parámetros, pero son más difíciles de entrenar.

### 3.7.2 Residual Connections

Para redes muy profundas (>50 capas), conexiones de salto (skip connections) facilitan el flujo de gradientes:

```python
class BloqueResidual(nn.Module):
    """
    Bloque con conexión residual para redes profundas.
    La Skip connection permite flujo directo de gradientes.
    """
    def __init__(self, channels):
        super().__init__()
        
        self.conv1 = nn.Conv2d(channels, channels, 3, padding=1)
        self.bn1 = nn.BatchNorm2d(channels)
        self.conv2 = nn.Conv2d(channels, channels, 3, padding=1)
        self.bn2 = nn.BatchNorm2d(channels)
        self.activation = nn.GELU()
    
    def forward(self, x):
        residual = x
        
        out = self.conv1(x)
        out = self.bn1(out)
        out = self.activation(out)
        
        out = self.conv2(out)
        out = self.bn2(out)
        
        out += residual  # Skip connection
        out = self.activation(out)
        
        return out
```

### 3.7.3 Diseño de Loss Function

La función de pérdida debe reflejar directamente el objetivo de la tarea. Para clasificación con desbalance de clases:

```python
# Weighted CrossEntropy para clases desbalanceadas
class_weights = torch.tensor([1.0, 2.0, 0.5, 1.0])  # pesos por clase
criterion = nn.CrossEntropyLoss(weight=class_weights)
```

---

La implementación efectiva de redes neuronales requiere equilibrar múltiples factores interrelacionados: arquitectura apropiada, inicialización correcta, regularización adecuada, y normalización estratégica. Estas decisiones de diseño no son independientes; interactúan de manera compleja. El conocimiento profundo de cada componente permite al practitioner diagnosticar problemas de entrenamiento y adaptar la arquitectura a requisitos específicos del problema.

