# Security Specification - Newsletter System

## Data Invariants
1. A subscriber must have a valid email and marketing consent status.
2. A customer must be linked to a valid subscriber.
3. A campaign event must be linked to a valid campaign and a valid subscriber.
4. Only admins can create or modify newsletter campaigns.
5. PII (emails) must be restricted to the owner or an admin.

## The "Dirty Dozen" Payloads
1. **Identity Spoofing**: Attempt to create a subscriber document for another user's UID.
2. **Privilege Escalation**: Attempt to set `email_status` to 'active' on a suppressed email as a normal user.
3. **Data Integrity**: Create a subscriber without `marketing_consent`.
4. **State Shortcutting**: Update a campaign status directly to 'sent' without it being 'approved'.
5. **PII Leak**: Read another user's subscriber document.
6. **Resource Poisoning**: Use a 2MB string for `first_name`.
7. **Shadow Update**: Add an undocumented field `isAdmin: true` to a subscriber document.
8. **Orphaned Record**: Create a campaign event for a non-existent campaign.
9. **Timestamp Spoofing**: Provide a future `created_at` date.
10. **Bypassing Validation**: Create a customer record as a non-admin.
11. **Mass Deletion**: Attempt to delete the entire `newsletter_campaigns` collection.
12. **Unauthorized Subscription**: Force subscribe an email without double opt-in (if enforced).

## Test Cases (Expected Denials)
- Non-admin creating a `NewsletterCampaign`.
- User reading `Subscriber` where `id != request.auth.uid` (if using UID mapping).
- Subscriber update with extra fields.
