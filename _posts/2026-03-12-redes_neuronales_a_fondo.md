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

