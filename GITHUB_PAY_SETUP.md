# 🐙 GitHub Pay Integration Setup

## Overview

This document explains how to configure and use the GitHub Sponsors payment integration in XperienceClimb.

## Features

✅ **GitHub Sponsors Integration**: Accept payments through GitHub Sponsors  
✅ **Automatic Currency Conversion**: BRL to USD conversion  
✅ **Webhook Support**: Automatic payment confirmation  
✅ **Order Tracking**: Full integration with existing order system  

## Configuration

### Environment Variables

Add these variables to your `.env.local` file:

```bash
# GitHub Sponsors Configuration
GITHUB_SPONSOR_USERNAME=govinda777
GITHUB_WEBHOOK_SECRET=your_webhook_secret_here

# Optional: Custom exchange rate API
EXCHANGE_RATE_API_KEY=your_api_key_here
```

### GitHub Sponsors Setup

1. **Enable GitHub Sponsors** for your account:
   - Go to https://github.com/sponsors/govinda777
   - Set up your sponsorship tiers
   - Configure one-time sponsorship options

2. **Configure Webhook** (Optional but recommended):
   - Go to your GitHub repository settings
   - Add webhook URL: `https://yourdomain.com/api/payments/github/webhook`
   - Select "Sponsorships" events
   - Set content type to `application/json`

## How It Works

### Payment Flow

1. **Customer selects GitHub Pay** in checkout
2. **System generates sponsorship URL** with the exact amount
3. **Customer is redirected** to GitHub Sponsors page
4. **Customer completes payment** on GitHub
5. **Webhook confirms payment** (if configured)
6. **Order is automatically processed**

### URL Generation

The system automatically generates GitHub Sponsors URLs like:
```
https://github.com/sponsors/govinda777/sponsorships?sponsor=govinda777&preview=true&frequency=one-time&amount=50
```

Where:
- `govinda777` is the sponsor username
- `amount=50` is the USD amount (converted from BRL)
- `frequency=one-time` for single payments

### Currency Conversion

- Cart total is in BRL (Brazilian Real)
- GitHub Sponsors requires USD
- System automatically converts using current exchange rate
- Amount is rounded up to ensure full payment coverage

## Testing

### Development Testing

1. Use the test URL format provided
2. Check console logs for payment creation
3. Verify webhook endpoint with GET request:
   ```bash
   curl https://yourdomain.com/api/payments/github/webhook
   ```

### Production Checklist

- [ ] Set correct `GITHUB_SPONSOR_USERNAME`
- [ ] Configure webhook secret
- [ ] Test webhook delivery
- [ ] Verify currency conversion rates
- [ ] Test full payment flow

## API Endpoints

### Webhook Endpoint
- **URL**: `/api/payments/github/webhook`
- **Method**: `POST`
- **Purpose**: Receive GitHub Sponsors notifications

### Health Check
- **URL**: `/api/payments/github/webhook`
- **Method**: `GET`
- **Purpose**: Verify webhook endpoint is active

## Troubleshooting

### Common Issues

1. **Invalid sponsorship URL**
   - Check `GITHUB_SPONSOR_USERNAME` environment variable
   - Ensure GitHub Sponsors is enabled for the account

2. **Currency conversion errors**
   - Verify exchange rate API is accessible
   - Check fallback rate configuration

3. **Webhook not receiving events**
   - Verify webhook URL is correct
   - Check GitHub webhook delivery logs
   - Ensure webhook secret matches

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=github-pay:*
```

## Security Considerations

1. **Webhook Signature Validation**: Always validate GitHub webhook signatures in production
2. **Environment Variables**: Keep webhook secrets secure
3. **HTTPS**: Use HTTPS for all webhook endpoints
4. **Rate Limiting**: Implement rate limiting for webhook endpoints

## Support

For issues with GitHub Pay integration:
1. Check GitHub Sponsors documentation
2. Verify webhook configuration
3. Review server logs for errors
4. Test with smaller amounts first

---

**Note**: This integration supports the GitHub Sponsors URL format as specified in the user requirements: `https://github.com/sponsors/govinda777/sponsorships?sponsor=govinda777&preview=true&frequency=one-time&amount=5`
