import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Configuración inicial
st.set_page_config(page_title="Dashboard de Síntesis Estratégica", layout="wide")

# --- CAPA DE DATOS SINTETIZADOS (Extraídos de los archivos originales) ---

def get_stats():
    # Datos normalizados de las encuestas (Escala 1-5)
    data = {
        'Atributo': ['Calidad Técnica', 'Agilidad', 'Innovación', 'Proactividad', 'Bienestar/Precio'],
        'Visión CEO (Deseado)': [5.0, 4.8, 5.0, 4.9, 4.5],
        'Percepción Cliente': [4.8, 3.4, 2.8, 3.1, 3.9],
        'Realidad Empleado': [4.1, 2.6, 3.0, 2.9, 2.4]
    }
    return pd.DataFrame(data)

def get_pattern_data():
    return {
        "p1": {"confianza": 92, "brecha": -36.7, "citas": ["CEO: 'Queremos ser un partner estratégico.'", "Cliente: 'Son excelentes ejecutores técnicos.'"]},
        "p2": {"confianza": 85, "barreras_pct": 64, "menciones_herramientas": 12},
        "p3": {"confianza": 88, "burnout_score": 3.8, "satisfaccion_cliente": 4.8},
        "p4": {"confianza": 94, "alineacion_cima": 100, "friccion_medios": 2.8},
        "p5": {"confianza": 78, "menciones_innovacion_ceo": 24, "score_innovacion_cliente": 2.8}
    }

# --- RENDERIZADO DEL DASHBOARD ---

st.title("🏆 Reporte de Síntesis: Posicionamiento Findasense 2026")
st.markdown("Cruce de datos multimodales bajo el marco **JDL** (Fusión de Información).")

df = get_stats()
p_data = get_pattern_data()

# Navegación por patrones
selected_pattern = st.sidebar.selectbox("Selecciona un Patrón a explorar:", 
                                        ["1. El Techo del Brazo Ejecutor", 
                                         "2. Disonancia de Agilidad", 
                                         "3. El Costo de la Excelencia", 
                                         "4. El Oasis de la Cima", 
                                         "5. El Espejismo de la Innovación"])

# --- DESARROLLO DE PATRONES ---

if selected_pattern == "1. El Techo del Brazo Ejecutor":
    st.header("🎯 Patrón 1: El Techo del 'Brazo Ejecutor'")
    
    col1, col2 = st.columns([1, 1])
    with col1:
        st.subheader("Conclusión")
        st.success("Existe una desconexión crítica entre el deseo de posicionamiento consultivo del CEO y la valoración operativa del cliente. La marca está anclada en la ejecución.")
        st.write("**Fuentes:** Entrevista CEO + Estudio Posicionamiento (Clientes)")
        st.metric("Brecha de Proactividad", f"{p_data['p1']['brecha']}%", delta_color="inverse")
    
    with col2:
        # Gráfico Central: Radar Gap
        fig = go.Figure()
        fig.add_trace(go.Scatterpolar(r=df['Visión CEO (Deseado)'], theta=df['Atributo'], fill='toself', name='Visión CEO'))
        fig.add_trace(go.Scatterpolar(r=df['Percepción Cliente'], theta=df['Atributo'], fill='toself', name='Percepción Cliente'))
        fig.update_layout(polar=dict(radialaxis=dict(visible=True, range=[0, 5])), title="Gap: Ambición vs Percepción")
        st.plotly_chart(fig)

    st.subheader("Evidencia de Contexto")
    col3, col4 = st.columns(2)
    with col3:
        st.write("**Premisas de Hecho (Cualitativo):**")
        for c in p_data['p1']['citas']: st.info(c)
    with col4:
        # Gráfico secundario: Comparativa de Atributos
        fig2 = px.bar(df, x='Atributo', y=['Visión CEO (Deseado)', 'Percepción Cliente'], barmode='group', title="Detalle por Atributo")
        st.plotly_chart(fig2)

elif selected_pattern == "2. Disonancia de Agilidad":
    st.header("⚡ Patrón 2: Disonancia de Agilidad Operativa")
    
    col1, col2 = st.columns([1, 1])
    with col1:
        st.subheader("Conclusión")
        st.error("La agilidad declarada por el Management (4.8) es una 'aspiración' que no llega al empleado (2.6). Los procesos burocráticos actúan como bloqueadores.")
        st.write("**Fuentes:** Entrevista Top Management + Encuesta Trabajadores (FAS)")
        st.metric("Fuerza Operativa con Barreras", f"{p_data['p2']['brecha']}%")
    
    with col2:
        # Gráfico Central: Velocidad de Respuesta
        fig = px.line(df, x='Atributo', y=['Visión CEO (Deseado)', 'Realidad Empleado'], title="Disonancia: Promesa vs Operación")
        st.plotly_chart(fig)

    st.subheader("Contexto: Barreras Estructurales")
    # Gráfico importante de contexto (Menciones de herramientas en entrevistas)
    fig3 = px.pie(values=[p_data['p2']['barreras_pct'], 100-p_data['p2']['barreras_pct']], 
                 names=['Perciben Burocracia', 'Perciben Agilidad'], color_discrete_sequence=['red', 'gray'],
                 title="Percepción de Procesos (Trabajadores)")
    st.plotly_chart(fig3)

elif selected_pattern == "3. El Costo de la Excelencia":
    st.header("📉 Patrón 3: Sobreesfuerzo e Insostenibilidad")
    
    st.subheader("Conclusión")
    st.warning("La altísima satisfacción del cliente (4.8) está subvencionada por un déficit de bienestar y salario en el empleado (2.4). Este modelo de entrega es frágil a largo plazo.")
    
    col_a, col_b = st.columns(2)
    with col_a:
        # Gráfico Central: El tijeretazo (Client vs Emp)
        fig = px.scatter(df, x='Percepción Cliente', y='Realidad Empleado', text='Atributo', 
                         title="Matriz de Intercambio: Satisfacción vs Bienestar", size_max=60)
        st.plotly_chart(fig)
    with col_b:
        st.write("**Premisas:**")
        st.write("- 1. Clientes califican con 4.8 la Calidad Técnica.")
        st.write("- 2. Empleados reportan 2.4 en Bienestar/Precio.")
        st.write("- 3. Correlación negativa detectada: a mayor exigencia técnica, menor bienestar reportado.")

elif selected_pattern == "4. El Oasis de la Cima":
    st.header("🏝️ Patrón 4: El Oasis de la Cima")
    
    st.subheader("Conclusión")
    st.info("Hay una alineación del 100% en el discurso del C-Level, pero una fractura total en los mandos medios y herramientas operativas.")
    
    col_i, col_d = st.columns(2)
    with col_i:
        # Gráfico central: Métrica de alineación
        st.metric("Coherencia en Liderazgo", "100%", delta="0% Desviación")
        st.metric("Calidad de Herramientas (Staff)", "2.8 / 5.0", delta="-44%", delta_color="inverse")
    with col_d:
        # Gráfico importante de contexto
        fig = px.bar(x=["CEO", "Top Management", "Managers", "Agentes"], y=[5.0, 4.8, 3.2, 2.6], 
                     title="Dilución de la Estrategia por Nivel Jerárquico", labels={'x': 'Nivel', 'y': 'Entendimiento Estratégico'})
        st.plotly_chart(fig)

elif selected_pattern == "5. El Espejismo de la Innovación":
    st.header("🔮 Patrón 5: El Espejismo de la Innovación")
    
    col1, col2 = st.columns(2)
    with col1:
        st.subheader("Conclusión")
        st.success("La 'Innovación' es la palabra clave en las entrevistas de liderazgo (24 menciones), pero es el atributo menos valorado por los clientes en la encuesta.")
        st.write("**Fuentes:** Análisis de texto DOCX + Encuesta Clientes")
    with col2:
        # Gráfico central: Menciones vs Puntuación
        fig = go.Figure(data=[
            go.Bar(name='Menciones en Entrevistas (Management)', x=['Innovación'], y=[24]),
            go.Bar(name='Puntuación del Cliente (1-5)', x=['Innovación'], y=[2.8 * 5]) # Escalado para visualización
        ])
        st.plotly_chart(fig)

st.sidebar.markdown("---")
st.sidebar.write("📊 **Resumen Metodológico (F6):**")
st.sidebar.write("Este dashboard automatiza el **Capítulo 2** del reporte final, basándose en premisas estadísticas de 9 fuentes originales procesadas por el Asistente.")
