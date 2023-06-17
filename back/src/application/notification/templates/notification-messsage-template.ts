export class NotificationTemplate {
  orderCreated(orderId: string): string {
    const domain = process.env.DOMAIN_NAME || 'http://localhost.com';
    return `access ${domain}/order/${orderId}/`;
  }
}
