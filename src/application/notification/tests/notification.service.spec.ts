import { BullModule } from '@nestjs/bull';
import { TestingModule, Test } from '@nestjs/testing';
import { MessagingModule } from 'src/infra/messaging/messaging.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { NotificationService } from '../notification.service';
import { NotificationConsumer } from '../processors/notification.consumer';
import { NotificationErrorRepository } from '../repository/notification-errors-repository';
import { NotificationTemplate } from '../templates/notification-messsage-template';
import { Messaging } from 'src/infra/messaging/messaging';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let messaging: Messaging;
  let notificationErrorRepository: NotificationErrorRepository;
  let notificationTemplate: NotificationTemplate;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'notification',
        }),
        MessagingModule,
        PrismaModule,
      ],
      providers: [
        NotificationService,
        NotificationConsumer,
        NotificationErrorRepository,
        NotificationTemplate,
      ],
      exports: [NotificationService],
    }).compile();

    messaging = module.get<Messaging>(Messaging);
    notificationErrorRepository = module.get<NotificationErrorRepository>(
      NotificationErrorRepository,
    );
    notificationTemplate =
      module.get<NotificationTemplate>(NotificationTemplate);
  });

  describe('sendOrderNotification', () => {
    it('should sender a notification', async () => {
      const mockOrderId = '123';
      const mockDescription = 'Description test';
      const mockTrackingCode = 'ABC123';
      const mockPhoneNumber = '123456789';
      const mockOrderImg = 'http://test.com';

      jest.spyOn(notificationTemplate, 'orderCreated').mockReturnValue({
        message: 'Test',
        caption: 'Test',
      });

      const result = await notificationService.sendOrderNotification(
        mockOrderId,
        mockDescription,
        mockTrackingCode,
        mockPhoneNumber,
        mockOrderImg,
      );
    });
  });
});
