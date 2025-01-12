O uso de **Redis** para implementar cache é usado para melhorar o desempenho e a escalabilidade de aplicações. Redis é um armazenamento de dados em memória, rápido e altamente eficiente, usado para armazenar informações temporárias ou frequentemente acessadas.

### **O que é Cache com Redis?**
O cache é uma técnica de armazenamento temporário que salva dados frequentemente acessados para acelerar as consultas e reduzir a carga sobre recursos mais lentos, como bancos de dados.

Redis funciona bem como cache porque:
- É extremamente rápido (opera em memória).
- Suporta estruturas de dados avançadas (strings, hashes, lists, sets, etc.).
- Permite definir um **tempo de expiração** para dados.

---

### **Outros Benefícios do Cache com Redis**
2. **Redução de Carga no Banco de Dados:** Diminui o número de chamadas ao banco.
3. **Escalabilidade:** Redis pode lidar com alto volume de solicitações simultâneas.
5. **Persistência Opcional:** Embora seja usado principalmente em memória, Redis pode persistir dados.

---

### **Quando Usar Cache?**
- **Dados frequentemente acessados:** Informações que não mudam frequentemente, como configurações ou resultados de consultas.
- **Dados temporários:** Sessões de usuário, tokens de autenticação, etc.
- **Dados demorados de calcular:** Resultados de cálculos complexos ou consultas demoradas.

---

### **Integração Redis com NestJS**

#### 1. **Instalar Dependências**
Adicione o Redis e o cliente do Redis para NestJS:

```bash
npm install redis @nestjs/cache-manager cache-manager
```

#### 2. **Configurar o Módulo de Cache**
Crie a configuração do Redis no seu projeto:

```typescript
import { Module } from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'localhost', // Endereço do Redis
            port: 6379,        // Porta do Redis
          },
        });

        return {
          store: store as unknown as CacheStore,// O 'store' está sendo convertido para o tipo 'CacheStore', primeiro sendo convertido para 'unknown' para contornar as verificações de tipo do TypeScript.
          ttl: 3 * 60000, // Tempo de expiração (em milissegundos)
        };
      },
    }),
  ],
})
export class AppModule {}
```

#### 3. **Usar o Cache no Serviço**
Use o cache para salvar e recuperar dados.

```typescript
import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class MyService {
  constructor(private cacheManager: Cache) {}

  async getData(key: string): Promise<any> {
    // Tentar recuperar do cache
    const cachedData = await this.cacheManager.get(key);
    if (cachedData) {
      return cachedData;
    }

    console.log('Cache não encontrado! Trazendo do banco...');
    // Simular busca no banco de dados
    const data = { id: key, value: 'Algum valor' };

    // Salvar no cache com tempo de expiração
    await this.cacheManager.set(key, data, (3 * 60000));

    return data;
  }
}
```

---

### **Recursos Úteis de Redis**
1. **TTL (Time-To-Live):**
   Cada chave no Redis pode ter um tempo de expiração definido:
   ```bash
   EXPIRE mykey 300
   ```
   A chave será removida automaticamente após 300 segundos.

2. **Evict Policies:**
   Redis suporta várias políticas de remoção, como LRU (Least Recently Used), útil quando a memória está cheia.

3. **Estruturas de Dados Avançadas:**
   - Strings: Simples valores chave.
   - Hashes: Dados estruturados (ótimos para objetos).
   - Lists: Listas ordenadas.
   - Sets: Conjuntos únicos.
   - Sorted Sets: Conjuntos ordenados por uma pontuação.

4. **Pub/Sub:**
   Redis suporta **Publicação/Assinatura**, permitindo comunicação entre serviços.

---

### **Comandos Básicos Redis**
1. **Setar um valor com TTL:**
   ```bash
   SET mykey "myvalue" EX 300
   ```
2. **Buscar um valor:**
   ```bash
   GET mykey
   ```
3. **Excluir um valor:**
   ```bash
   DEL mykey
   ```

---

### **Boas Práticas ao Usar Cache**
1. **Defina TTL adequados:** Dados devem expirar quando não forem mais úteis.
2. **Evite Cache Stale (desatualizado):** Atualize ou invalide o cache quando os dados de origem mudarem.
3. **Use chaves descritivas:** Utilize nomes únicos e claros para as chaves, como `user:123:profile`.
4. **Monitoramento:** Monitore o uso de memória e as taxas de acerto/erro.