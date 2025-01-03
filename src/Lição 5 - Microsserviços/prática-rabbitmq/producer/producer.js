// Este script envia uma mensagem para a fila do RabbitMQ

// Importa o módulo amqplib para comunicação direta com RabbitMQ
const amqp = require('amqplib');

// Função para enviar mensagens manualmente para a fila do RabbitMQ
async function sendMessage() {

  const connection = await amqp.connect('amqp://localhost:5672'); // Conecta ao servidor RabbitMQ
  const channel = await connection.createChannel(); // Cria um canal de comunicação

  const route = 'notifications'; // Nome da fila para onde a mensagem será enviada
  await channel.assertQueue(route, { durable: true }); // Garante que a fila existe e é persistente

  // Define o conteúdo da mensagem em formato JSON
  const message = JSON.stringify({
    type: 'email', // Tipo de notificação (neste caso, email)
    to: 'test@example.com', // Destinatário
    content: 'E-mail teste', // Conteúdo da mensagem
  });

  channel.sendToQueue(route, Buffer.from(message)); // Envia a mensagem para a fila
  console.log('Mensagem enviada:', message); // Log confirmando o envio da mensagem

  // Fecha a conexão após um pequeno intervalo
  setTimeout(() => {
    connection.close(); // Fecha a conexão com o RabbitMQ
    process.exit(0); // Encerra o processo
  }, 500);
}

// Executa a função de envio de mensagem e trata erros, se ocorrerem
sendMessage().catch(console.error);
