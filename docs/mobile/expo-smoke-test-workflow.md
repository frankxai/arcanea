# Expo Smoke Test Workflow for Arcanea Mobile

## Overview

This document outlines the smoke testing workflow for the Arcanea mobile app using Expo. Smoke tests ensure basic functionality works before broader testing and deployment.

## Prerequisites

- Node.js 18+
- Expo CLI installed (`npm install -g @expo/cli`)
- Expo Go app on mobile device
- QR code scanner capability

## Test Categories

### 1. Build & Bundle Tests

#### Local Development Build
```bash
# Navigate to mobile app
cd apps/mobile

# Install dependencies
pnpm install

# Start development server
expo start

# Verify QR code appears
# ✅ Should show QR code within 30 seconds
# ✅ Should display Metro bundler logs
# ✅ Should show available options (i, w, a, s, r, etc.)
```

#### Production Build Test
```bash
# Build for production
expo build:web

# Should complete without errors
# ✅ Bundle size should be < 10MB
# ✅ No critical webpack warnings
# ✅ All assets properly bundled
```

### 2. Core Navigation Tests

#### Tab Navigation Smoke Test
```bash
# With app running on device:

# Test 1: Tab Persistence
1. Open app → Should land on SuperAgent tab
2. Switch to Scripta tab
3. Switch to Lumina tab
4. Close and reopen app
✅ Should remember last selected tab (Lumina)

# Test 2: Tab Switching
1. Tap each tab in sequence
✅ Each tab should load within 2 seconds
✅ No white screens or crashes
✅ Tab icons should highlight correctly
```

#### Deep Navigation Test
```bash
# Test navigation states and memory
1. Navigate through multiple tabs
2. Trigger device rotation (if applicable)
3. Background and foreground app
✅ Navigation state preserved
✅ No memory leaks or crashes
```

### 3. Chat Functionality Tests

#### Basic Chat Flow
```bash
# Test the core chat interaction

# Test 1: Message Sending
1. Type message: "Hello Arcanea"
2. Tap send button
✅ Message appears immediately (optimistic)
✅ Shows "sending" indicator
✅ Status updates to "sent" within 5 seconds

# Test 2: Response Handling
1. Send message: "Tell me about creativity"
2. Wait for response
✅ Shows typing indicator
✅ Response appears within 10 seconds
✅ Response is formatted properly
✅ Speech button appears for AI responses

# Test 3: Error Handling
1. Turn off WiFi/data
2. Send message: "Test offline"
✅ Shows failure indicator
✅ "Tap to retry" appears
✅ Message retries when connectivity restored
```

#### Virtualization & Performance
```bash
# Test chat virtualization and performance

# Test 1: Message List Performance
1. Send 20+ messages back and forth
2. Scroll through message history
✅ Smooth scrolling (60fps)
✅ Messages render correctly
✅ No layout shifts or jumps

# Test 2: Loading States
1. Clear app data/reinstall
2. Open chat tab
✅ Shows shimmer loading for 1-2 seconds
✅ Graceful transition to empty state
✅ Welcome message displays properly
```

### 4. Device Integration Tests

#### Platform Features
```bash
# Test device-specific integrations

# Test 1: Speech Features
1. Send AI message
2. Tap speech/volume icon
✅ Text-to-speech works (if available)
✅ No crashes on unsupported devices

# Test 2: Keyboard Handling
1. Tap input field
2. Type long message (multiline)
3. Rotate device while typing
✅ Keyboard appears smoothly
✅ Input field expands properly
✅ Text preserved during rotation

# Test 3: Safe Area Handling
1. Test on devices with notches
2. Test in landscape mode
✅ Content doesn't get clipped
✅ Navigation remains accessible
✅ Input field positioned correctly
```

### 5. Performance & Memory Tests

#### Memory Usage
```bash
# Monitor memory during usage

# Test 1: Extended Usage
1. Use app for 10+ minutes
2. Switch between tabs frequently
3. Send many messages
✅ Memory usage stable (< 200MB)
✅ No memory leaks detected
✅ App doesn't slow down over time

# Test 2: Background/Foreground
1. Use app normally
2. Background app for 5 minutes
3. Return to foreground
✅ App resumes correctly
✅ State preserved
✅ No crashes or white screens
```

#### Network Resilience
```bash
# Test network handling

# Test 1: Connectivity Changes
1. Start with good connection
2. Switch to poor connection
3. Go offline briefly
4. Restore connection
✅ App handles transitions gracefully
✅ Messages queue when offline
✅ Retry mechanism works
✅ User feedback appropriate

# Test 2: Slow Network
1. Throttle connection to 3G speeds
2. Send messages and interact
✅ Loading states show appropriately
✅ Timeouts handled gracefully
✅ No hanging or frozen states
```

## Automated Smoke Tests

### Jest Test Suite
```bash
# Run unit tests
cd apps/mobile
pnpm test

# Should pass:
✅ Component snapshot tests
✅ Hook behavior tests
✅ Utility function tests
✅ Navigation logic tests
```

### E2E Test Commands
```bash
# Basic E2E smoke test (when implemented)
pnpm test:e2e:smoke

# Tests should cover:
✅ App launches successfully
✅ Can navigate between tabs
✅ Can send a message
✅ Can receive a response
✅ No critical errors in logs
```

## Smoke Test Checklist

### Pre-Release Checklist
- [ ] Local development server starts cleanly
- [ ] Production build completes without errors
- [ ] App installs on test devices (iOS/Android)
- [ ] All tabs load and are navigable
- [ ] Chat sends/receives messages
- [ ] Optimistic updates work correctly
- [ ] Offline/online transitions handled
- [ ] No critical console errors
- [ ] Memory usage remains stable
- [ ] Performance metrics acceptable

### Device Matrix
Test on representative devices:
- [ ] iPhone (latest iOS)
- [ ] Android (recent version)
- [ ] Tablet (if supported)
- [ ] Various screen sizes
- [ ] Different network conditions

### Critical User Flows
- [ ] **Onboarding**: App opens → user can start chatting
- [ ] **Core Chat**: Send message → receive response → retry failed messages
- [ ] **Navigation**: Switch tabs → state persists → return to last tab
- [ ] **Persistence**: Close app → reopen → state restored

## Failure Handling

### Common Issues & Solutions

#### Build Failures
```bash
# Clear caches
expo r -c

# Reset Metro bundler
expo start --clear

# Check for dependency conflicts
pnpm install --frozen-lockfile
```

#### Runtime Crashes
```bash
# Check logs
expo logs

# Common fixes:
- Update to latest Expo SDK
- Clear AsyncStorage
- Reset app state
- Check for memory leaks
```

#### Performance Issues
```bash
# Profile performance
expo start --dev-client

# Common causes:
- Unoptimized images
- Memory leaks in components
- Inefficient list rendering
- Network request stacking
```

## Reporting & Monitoring

### Test Results Documentation
- Test execution time: `<duration>`
- Device/platform: `<device info>`
- Expo SDK version: `<version>`
- Pass/fail status for each test category
- Critical issues found (with steps to reproduce)
- Performance metrics (memory, render times)

### Continuous Monitoring
- Set up automated smoke tests in CI/CD
- Monitor crash reports in production
- Track performance metrics over time
- User feedback integration

## Integration with CI/CD

### GitHub Actions Workflow
```yaml
name: Mobile Smoke Tests
on: [push, pull_request]

jobs:
  smoke-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd apps/mobile && pnpm install
      - name: Run Jest tests
        run: cd apps/mobile && pnpm test --watchAll=false
      - name: Build for production
        run: cd apps/mobile && expo build:web
```

### Performance Benchmarks
- Initial load time: < 3 seconds
- Tab switch time: < 500ms
- Message send time: < 200ms (optimistic)
- Memory usage: < 200MB sustained
- Bundle size: < 10MB

---

**Note**: This workflow should be executed before every release and when major changes are made to navigation, chat functionality, or core user flows. Update this document as new features are added or test requirements change.