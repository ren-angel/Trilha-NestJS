import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  
    // Método para processar notificações recebidas
  processNotification(message: any): void {

    console.log('Processando notificação:', message); // Log para depuração

    // Verifica o tipo de notificação e processa de acordo
    if (message.type === 'email') {

      console.log(`Mandando E-mail para ${message.to} com o conteúdo: ${message.content}`); // Lógica de envio de email
    } else if (message.type === 'sms') {

      console.log(`Mandando SMS para ${message.to} com o conteúdo: ${message.content}`); // Lógica de envio de SMS
    } else {

      console.log('Tipo de notificação desconhecido'); // Tipo desconhecido de notificação
    }
  }
}