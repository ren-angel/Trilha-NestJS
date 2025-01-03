import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {

  // Método para processar notificações recebidas
  processNotification(message: any): void {

    console.log('Processando notificação:', message); // Log para depuração

    // Verifica o tipo de notificação e simula o envio correspondente
    if (message.type === 'email') {

      console.log(`Enviando E-mail para ${message.to} com o conteúdo: ${message.content}`); // Lógica simulada para envio de email
    } else if (message.type === 'sms') {

      console.log(`Enviando SMS para ${message.to} com o conteúdo: ${message.content}`); // Lógica simulada para envio de SMS
    } else {

      console.log('Tipo de notificação desconhecido'); // Tipo desconhecido de notificação
    }
  }
}
