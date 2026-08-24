# Validation des Données Structurées (JSON-LD)

## BloomLab® (Extracteur Botanique)

### Product Schema
- **@type**: `Product`
- **@id**: `https://bloombybotanik.com/bloomlab/#product`
- **name**: `BloomLab® - Extracteur Botanique`
- **sku**: `BLOOM-LAB-2026`
- **gtin13**: `3770000000001` (Générique - à valider avec GS1 si disponible)

### Merchant Listing (Offers)
- **price**: `239.00`
- **priceCurrency**: `EUR`
- **availability**: `InStock`
- **itemCondition**: `NewCondition`
- **priceValidUntil**: `2026-12-31`

### Return Policy (CRITIQUE)
- **returnPolicyCategory**: `https://schema.org/MerchantReturnFiniteReturnWindow` (CORRIGÉ - était `FiniteReturnPeriod`)
- **merchantReturnDays**: `14`
- **returnMethod**: `https://schema.org/ReturnByMail`
- **returnFees**: `https://schema.org/FreeReturn`

### Shipping Details
- **shippingRate**: `0` (Livraison offerte en France)
- **handlingTime**: `0-1 jour`
- **transitTime**: `2-4 jours`

---

## Organisation (Bloom by BotaniK)

- **@type**: `Organization`
- **logo**: `https://bloombybotanik.com/brand/logo-org.jpg` (1024x1024px)
- **social**: Instagram, YouTube, Facebook validés.
