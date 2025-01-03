import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('notifications') // Define a rota do evento que o controlador ouvirá
  handleNotification(@Payload() data: any) { // O decorador `@Payload()` é usado para extrair o payload (dados) da mensagem

    console.log('Notificação recebida:', data); // Log para depuração
    this.notificationService.processNotification(data); // Chama o serviço para processar a notificação
  }
}
