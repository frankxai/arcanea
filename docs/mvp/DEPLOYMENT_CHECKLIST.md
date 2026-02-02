# Gemini Integration Deployment Checklist

Complete checklist for deploying the Gemini integration to production.

## Pre-Deployment

### 1. Environment Setup

- [ ] Obtain Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Set `GEMINI_API_KEY` in production environment
- [ ] Verify Supabase credentials are set
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Test API key with verification script

```bash
export GEMINI_API_KEY=your_production_key
npm run verify:gemini
```

### 2. Database Setup

- [ ] Run database migrations

```sql
-- Create tables
CREATE TABLE ai_usage (...);
CREATE TABLE video_generation_jobs (...);
ALTER TABLE user_profiles ADD COLUMN video_credits INTEGER DEFAULT 0;

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('generated-images', 'generated-images', true);

-- Set up RLS policies
CREATE POLICY "Users can view own usage"
  ON ai_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own videos"
  ON video_generation_jobs FOR SELECT
  USING (auth.uid() = user_id);
```

- [ ] Verify tables created successfully
- [ ] Test RLS policies
- [ ] Verify storage bucket is accessible

### 3. Code Review

- [ ] All TypeScript files compile without errors
- [ ] No console.log statements in production code
- [ ] Error handling implemented for all API calls
- [ ] Rate limiting configured correctly
- [ ] Cost tracking enabled

### 4. Dependencies

- [ ] Install production dependencies

```bash
cd packages/ai-core
npm install --production
```

- [ ] Verify `@google/generative-ai` is installed
- [ ] Verify `eventsource-parser` is installed
- [ ] Run `npm audit` to check for vulnerabilities

### 5. Testing

- [ ] Run verification script

```bash
npm run verify:gemini
```

- [ ] Test chat API endpoint
- [ ] Test image generation API endpoint
- [ ] Test video generation API endpoint
- [ ] Verify streaming works correctly
- [ ] Test rate limiting
- [ ] Test error handling
- [ ] Test authentication
- [ ] Verify cost tracking

## Deployment

### 1. Build

- [ ] Build application

```bash
npm run build
```

- [ ] Verify build completes without errors
- [ ] Check bundle size is reasonable
- [ ] Test production build locally

### 2. Deploy

- [ ] Deploy to production environment
- [ ] Verify environment variables are set
- [ ] Check deployment logs for errors
- [ ] Test health check endpoints

```bash
curl https://your-domain.com/api/ai/chat
curl https://your-domain.com/api/ai/generate-image
curl https://your-domain.com/api/ai/generate-video
```

### 3. Smoke Tests

- [ ] Test chat from production
- [ ] Test image generation (1 test image)
- [ ] Verify video status endpoint
- [ ] Check usage tracking in database
- [ ] Verify costs are calculated correctly

## Post-Deployment

### 1. Monitoring

- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure cost alerts
- [ ] Set up usage monitoring dashboard
- [ ] Monitor API response times
- [ ] Track rate limit violations

### 2. Documentation

- [ ] Update team documentation
- [ ] Share API examples with frontend team
- [ ] Document any deployment-specific configurations
- [ ] Create runbook for common issues

### 3. User Communication

- [ ] Announce new features to users
- [ ] Update help documentation
- [ ] Provide cost information to users
- [ ] Explain video credit system

## Monitoring Checklist

### Daily

- [ ] Check error logs
- [ ] Review cost reports
- [ ] Monitor API response times
- [ ] Check rate limit violations

### Weekly

- [ ] Review usage patterns
- [ ] Analyze cost trends
- [ ] Check for API quota issues
- [ ] Review user feedback

### Monthly

- [ ] Cost analysis and optimization
- [ ] Review rate limit settings
- [ ] Evaluate model performance
- [ ] Plan capacity scaling

## Rollback Plan

If issues occur:

1. **Immediate Issues**
   - [ ] Disable affected endpoints
   - [ ] Switch to fallback provider if available
   - [ ] Notify users of issues

2. **Code Rollback**
   ```bash
   git revert HEAD
   npm run build
   # Deploy previous version
   ```

3. **Database Rollback**
   ```sql
   -- If needed, drop new tables
   DROP TABLE video_generation_jobs;
   -- Restore from backup
   ```

4. **Communication**
   - [ ] Notify team of rollback
   - [ ] Update status page
   - [ ] Communicate with affected users

## Cost Management

### Initial Limits

- [ ] Set daily spending limit: $100
- [ ] Set user video credits: 5 per user
- [ ] Configure rate limits conservatively
- [ ] Monitor costs closely for first week

### Alerts

- [ ] Alert when daily spend exceeds $50
- [ ] Alert when user exceeds rate limits
- [ ] Alert on API errors spike
- [ ] Alert on high latency

## Security Checklist

- [ ] API keys stored securely (not in code)
- [ ] Rate limiting enabled on all endpoints
- [ ] Authentication required on all routes
- [ ] Content safety filters enabled
- [ ] RLS policies configured correctly
- [ ] Signed URLs for sensitive content
- [ ] CORS configured properly
- [ ] Input validation on all endpoints

## Performance Checklist

- [ ] Response times < 2s for chat
- [ ] Streaming starts within 1s
- [ ] Image generation < 30s
- [ ] Video polling interval: 5s
- [ ] Queue management working
- [ ] No memory leaks
- [ ] Proper error handling

## Compliance Checklist

- [ ] Privacy policy updated
- [ ] Terms of service updated
- [ ] GDPR compliance verified
- [ ] Data retention policies set
- [ ] User consent for AI generation
- [ ] Content moderation enabled

## Final Verification

Before going live:

- [ ] All checklist items completed
- [ ] Team briefed on new features
- [ ] Support team trained
- [ ] Documentation updated
- [ ] Monitoring configured
- [ ] Rollback plan tested
- [ ] Stakeholders approved

## Go-Live

- [ ] Deploy to production
- [ ] Monitor for 1 hour
- [ ] Verify first user generations
- [ ] Check costs are tracking
- [ ] Confirm no errors in logs
- [ ] Announce to users
- [ ] Celebrate! 🎉

## Post-Launch (Week 1)

- [ ] Daily cost reviews
- [ ] User feedback collection
- [ ] Performance optimization
- [ ] Bug fixes as needed
- [ ] Adjust rate limits if needed
- [ ] Scale resources if needed

## Success Metrics

Track these for first month:

- [ ] Total API calls
- [ ] Total cost
- [ ] Average response time
- [ ] Error rate < 1%
- [ ] User satisfaction
- [ ] Rate limit violations
- [ ] Video completion rate

## Support Contacts

- **API Issues**: Google Cloud Support
- **Database Issues**: Supabase Support
- **Application Issues**: Internal team
- **Emergency**: On-call engineer

---

**Deployment Date**: _____________
**Deployed By**: _____________
**Sign-off**: _____________

**Status**: Ready for Production Deployment
