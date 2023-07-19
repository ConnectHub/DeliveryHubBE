import { VenomBot } from './venom-bot';

describe('venom bot', () => {
  it('test_create_client', () => {
    const venomBot = new VenomBot();
    expect(venomBot).toBeInstanceOf(VenomBot);
  });
});
