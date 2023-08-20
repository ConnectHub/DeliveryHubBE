import { OrderCreatedTemplate } from '../interfaces';
import { Injectable } from '@nestjs/common';
import { env } from '../../../infra/env/env.service';

@Injectable()
export class NotificationTemplate {
  private readonly domain: string;

  constructor() {
    this.domain = env.DOMAIN;
  }

  messageList(): string[] {
    return [
      `Olá meu consagrado, você tem uma nova encomenda para receber!\nClique no link para confirmar o recebimento: ${this.domain}/sign-order/{{orderId}}\nCódigo de Rastreio: {{trackingCode}}\nDescrição: {{description}}\n\nObrigado por usar o Deliveryhub! ❤️`,
      `Ei, uma nova encomenda foi criada para você!\nClique no link para assinar: ${this.domain}/sign-order/{{orderId}}\nCódigo de Rastreio: {{trackingCode}}\nDescrição: {{description}}\n\nAgradecemos por utilizar o Deliveryhub! ❤️`,
      `Atenção! Uma nova encomenda está disponível para retirada!\nClique no link para confirmar o recebimento:${this.domain}/sign-order/{{orderId}}\nCódigo de Rastreio: {{trackingCode}}\nDescrição: {{description}}\n\nObrigado por escolher o Deliveryhub! ❤️`,
      `Uau! Você acaba de receber uma nova encomenda! Acesse ${this.domain}/sign-order/{{orderId}} para mais detalhes.\nCódigo de Rastreio: {{trackingCode}}\nDescrição: {{description}}\n\nObrigado por escolher o Deliveryhub! ❤️`,
      `Atenção! Temos uma encomenda especial esperando por você!\nAcesse ${this.domain}/sign-order/{{orderId}} para receber.\nCódigo de Rastreio: {{trackingCode}}\nDescrição: {{description}}\n\nObrigado por usar o Deliveryhub! ❤️`,
      `Preparado para uma nova encomenda?\nAcesse ${this.domain}/sign-order/{{orderId}} e acompanhe o processo.\nCódigo de Rastreio: {{trackingCode}}\nDescrição: {{description}}\n\nObrigado por confiar no Deliveryhub! ❤️`,
      `Você tem uma nova encomenda aguardando por você!\nAcesse ${this.domain}/sign-order/{{orderId}} para resgatá-la.\nCódigo de Rastreio: {{trackingCode}}\nDescrição: {{description}}\n\nObrigado por utilizar o Deliveryhub! ❤️`,
      `Parabéns! Você acaba de receber uma encomenda!\nAcesse ${this.domain}/sign-order/{{orderId}} para mais informações.\nCódigo de Rastreio: {{trackingCode}}\nDescrição: {{description}}\n\nObrigado por escolher o Deliveryhub! ❤️`,
    ];
  }

  captionMessage(): string[] {
    return [
      'Encomenda chegando!',
      'Uma surpresa especial está a caminho!',
      'Preparado para receber uma nova encomenda?',
      'Alegria! Sua encomenda está a poucos passos de distância.',
      'Toque para descobrir o que chegou para você!',
      'Notícia emocionante: sua encomenda está a ponto de chegar.',
      'Sinal de alerta: encomenda fresquinha a caminho!',
    ];
  }

  selectCaption(): string {
    const caption = this.captionMessage();
    const index = Math.floor(Math.random() * caption.length);
    return caption[index];
  }

  selectMessage(): string {
    const message = this.messageList();
    const index = Math.floor(Math.random() * message.length);
    return message[index];
  }

  mountedMessage(
    orderId: string,
    trackingCode: string,
    description: string,
  ): string {
    return this.selectMessage()
      .replace('{{orderId}}', orderId)
      .replace('{{trackingCode}}', trackingCode ?? 'Não informado')
      .replace('{{description}}', description ?? 'Não informado');
  }

  orderCreated(
    orderId: string,
    trackingCode: string,
    description: string,
  ): OrderCreatedTemplate {
    return {
      message: this.mountedMessage(orderId, trackingCode, description),
      caption: this.selectCaption(),
    };
  }
}
