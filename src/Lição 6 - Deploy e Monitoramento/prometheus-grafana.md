O **monitoramento com Prometheus e Grafana** é uma combinação para observar e entender o desempenho e o comportamento de aplicações, sistemas e infraestruturas. Essas ferramentas permitem que você colete, analise, e visualize métricas em tempo real, ajudando na identificação de problemas e na otimização do sistema.

---

### **O que é Prometheus?**
Prometheus é uma ferramenta de monitoramento e alerta de código aberto desenvolvida pela SoundCloud. Ele coleta métricas de serviços configurados e armazena essas informações em um banco de dados de séries temporais.

#### **Principais Recursos do Prometheus**
- **Coleta de métricas baseada em pull:** Prometheus puxa as métricas diretamente dos serviços monitorados.
- **Linguagem PromQL:** Uma linguagem poderosa para consultas de métricas.
- **Alertmanager:** Sistema de alerta integrado para notificações baseadas em condições de métrica.
- **Autossuficiência:** Não depende de armazenamento remoto.
- **Exporters:** Ferramentas para coletar métricas de serviços populares, como Redis, PostgreSQL, e Docker.

---

### **O que é Grafana?**
Grafana é uma ferramenta de visualização de métricas que se integra ao Prometheus (e outros bancos de dados de séries temporais). Ele permite criar **dashboards interativos** para exibir métricas em gráficos, tabelas e outras formas visuais.

#### **Principais Recursos do Grafana**
- **Dashboards personalizáveis:** Permite criar visualizações específicas para suas necessidades.
- **Alertas visuais:** Gatilhos configuráveis para alertar quando métricas atingem valores críticos.
- **Integrações amplas:** Suporte a diversas fontes de dados, incluindo Prometheus, ElasticSearch, InfluxDB e outros.
- **Autenticação e permissões:** Controle de acesso por usuários.

---

### **Como Funciona o Monitoramento com Prometheus e Grafana?**
1. **Serviços Expõem Métricas:**
   Serviços e aplicações configuram endpoints (geralmente em `/metrics`) para expor métricas no formato que Prometheus entende.

2. **Prometheus Coleta as Métricas:**
   Ele consulta periodicamente os endpoints configurados, armazena os dados em seu banco de dados de séries temporais e pode gerar alertas.

3. **Grafana Visualiza as Métricas:**
   Grafana se conecta ao Prometheus e exibe os dados em dashboards personalizados, permitindo monitoramento em tempo real.

---

### **Implementação: Prometheus e Grafana**
#### 1. **Instalação**
- **Prometheus:**
  - Baixe e extraia o Prometheus do site oficial, ou use a imagem oficial do Docker com:
  ```bash
  docker run -d -p 9090:9090 prom/prometheus
  ```
  - Crie um arquivo `prometheus.yml` de configuração.

    Exemplo de configuração:
    ```yaml
    global:
      scrape_interval: 15s

    scrape_configs:
      - job_name: 'app-metrics'
        static_configs:
          - targets: ['localhost:3000']  # Endpoint que expõe métricas
    ```

  - Inicie o Prometheus:
    ```bash
    ./prometheus --config.file=prometheus.yml
    ```

- **Grafana:**
  - Baixe e instale o Grafana, ou use sua versão cloud online em [https://grafana.com/products/cloud/](https://grafana.com/products/cloud/)
  - Inicie o Grafana:
    ```bash
    grafana-server
    ```
  - Acesse o painel em `http://localhost:3000` e configure Prometheus como fonte de dados.

#### 2. **Exporters para Métricas**
- Use **exporters** para coletar métricas de serviços populares:
  - **Node Exporter:** Métricas de hardware e sistema operacional.
  - **Redis Exporter:** Métricas de Redis.
  - **PostgreSQL Exporter:** Métricas de banco de dados PostgreSQL.
  - **Docker Exporter:** Métricas de contêineres Docker.

  Instale e inicie o exporter:
  ```bash
  ./node_exporter
  ```

#### 3. **Exposição de Métricas em Aplicações**
- Em aplicações NestJS, você pode usar o pacote `@willsoto/nestjs-prometheus` para expor métricas.

  Instalação:
  ```bash
  npm install @willsoto/nestjs-prometheus prom-client
  ```

  Configuração no módulo:
  ```typescript
  import { Module } from '@nestjs/common';
  import { PrometheusModule } from '@willsoto/nestjs-prometheus';

  @Module({
    imports: [PrometheusModule.register()],
  })
  export class AppModule {}
  ```

  Exemplo de métrica personalizada:
  ```typescript
  import { Injectable } from '@nestjs/common';
  import { Counter } from 'prom-client';

  @Injectable()
  export class MetricsService {
    private readonly counter: Counter<string>;

    constructor() {
      this.counter = new Counter({
        name: 'my_custom_metric',
        help: 'Contador customizado para minha aplicação',
      });
    }

    increment() {
      this.counter.inc();
    }
  }
  ```

  Acesse as métricas em `http://localhost:3000/metrics`.

---

### **Alertas com Prometheus e Grafana**
- Instale o **Alertmanager** na sua máquina. Aqui irei instalar ele com Docker, usando:
```bash
docker run -d -p 9093:9093 prom/alertmanager
``` 
- Configure o **Alertmanager** no Prometheus:
  ```yaml
  alerting:
    alertmanagers:
      - static_configs:
          - targets: ['localhost:9093']

  rule_files:
    - "alerts.yml"
  ```

- Exemplo de regra de alerta:
  ```yaml
  groups:
    - name: instance_down
      rules:
        - alert: InstanceDown
          expr: up == 0
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "Instância está fora do ar"
            description: "A instância {{ $labels.instance }} está indisponível há 5 minutos."
  ```

- Configure alertas visuais e notificações no Grafana.
