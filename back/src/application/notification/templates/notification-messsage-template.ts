export class NotificationTemplate {
  domain: string;
  constructor() {
    this.domain = process.env.DOMAIN_NAME || 'http://localhost:5173';
  }

  createdTypeMessages() {
    return [
      `Olá meu consagrado, você tem uma nova encomenda para receber!\nClique no link para confirmar o recebimento: ${this.domain}/sign-order/{{orderId}} \n \nObrigado por usar o Deliveryhub! ❤️`,
      `Ei, uma nova encomenda foi criada para você!\nnClique no link para assinar: ${this.domain}/sign-order/{{orderId}} \n \nAgradecemos por utilizar o Deliveryhub! ❤️`,
      `Atenção! Uma nova encomenda está disponível para retirada!\nClique no link para confirmar o recebimento:${this.domain}/sign-order/{{orderId}} \n \nObrigado por escolher o Deliveryhub! ❤️`,
      `Uau! Você acaba de receber uma nova encomenda! Acesse ${this.domain}/sign-order/{{orderId}} para mais detalhes. \n \nObrigado por escolher o Deliveryhub! ❤️`,
      `Atenção! Temos uma encomenda especial esperando por você! \nAcesse ${this.domain}/sign-order/{{orderId}} para receber. \n \nObrigado por usar o Deliveryhub! ❤️`,
      `Preparado para uma nova encomenda? \nAcesse ${this.domain}/sign-order/{{orderId}} e acompanhe o processo. \n \nObrigado por confiar no Deliveryhub! ❤️`,
      `Você tem uma nova encomenda aguardando por você! \nAcesse ${this.domain}/sign-order/{{orderId}} para resgatá-la. \n \nObrigado por utilizar o Deliveryhub! ❤️`,
      `Parabéns! Você acaba de receber uma encomenda! \nAcesse ${this.domain}/sign-order/{{orderId}}  para mais informações. \n \nObrigado por escolher o Deliveryhub! ❤️`,
    ];
  }

  selectMessage() {
    const message = this.createdTypeMessages();
    const index = Math.floor(Math.random() * message.length);
    return message[index];
  }

  orderCreated(orderId) {
    return this.selectMessage().replace('{{orderId}}', orderId);
  }
}
