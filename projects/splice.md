---
layout: project
title: Splice
tagline: AI-powered bill splitting mobile app
tech:
  - TypeScript
  - React Native
  - Expo
  - Supabase
  - PostgreSQL
github: https://github.com/Chainso/splice
status: active
---

## Overview

Splice is a React Native mobile app for expense tracking with AI-powered receipt scanning and real-time sync. Built with modern mobile development practices, it demonstrates full-stack capabilities from database design to native mobile UI.

<div class="video-showcase">
  <div class="media-placeholder" style="aspect-ratio: 9/16; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); display: flex; align-items: center; justify-content: center; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
    <div style="text-align: center; color: #94a3b8; padding: 2rem;">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 1rem;">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
      <p>Demo video coming soon</p>
    </div>
  </div>
  <p class="video-caption">App demonstration (in production)</p>
</div>

## Key Features

<div class="features-grid">
  <div class="feature-item">
    <h4>Receipt Scanning</h4>
    <p>AI-powered OCR extracts items and prices automatically</p>
  </div>
  <div class="feature-item">
    <h4>Real-Time Sync</h4>
    <p>Supabase PostgreSQL with Row Level Security for instant updates</p>
  </div>
  <div class="feature-item">
    <h4>Passwordless Auth</h4>
    <p>Email OTP and Google OAuth for seamless login</p>
  </div>
  <div class="feature-item">
    <h4>Material Design 3</h4>
    <p>Native dark/light mode with smooth animations</p>
  </div>
</div>

## Technical Architecture

### Frontend (React Native + Expo)

```typescript
// Example: Real-time expense updates
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useExpenses(groupId: string) {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    // Subscribe to real-time changes
    const channel = supabase
      .channel('expenses')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'expenses' },
        (payload) => setExpenses(prev => [...prev, payload.new])
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [groupId])

  return expenses
}
```

### Backend (Supabase)

The backend leverages Supabase's full capabilities:

- **PostgreSQL**: Relational data with JSONB for flexible schemas
- **Row Level Security**: User-specific data access policies
- **Edge Functions**: Serverless API endpoints for receipt processing
- **Real-time**: WebSocket subscriptions for live updates

### Database Schema

```sql
-- Groups table
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Expenses table with RLS
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id),
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  receipt_url TEXT,
  splits JSONB NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see expenses in their groups
CREATE POLICY "Users see own group expenses"
ON expenses FOR SELECT
USING (group_id IN (
  SELECT group_id FROM group_members
  WHERE user_id = auth.uid()
));
```

## Technology Stack

<div class="tech-stack">
  <span class="tech-item">TypeScript</span>
  <span class="tech-item">React Native</span>
  <span class="tech-item">Expo 49</span>
  <span class="tech-item">Supabase</span>
  <span class="tech-item">PostgreSQL</span>
  <span class="tech-item">React Navigation</span>
  <span class="tech-item">Zustand (state)</span>
  <span class="tech-item">React Native Paper</span>
</div>

## Features in Detail

### Receipt Scanning Pipeline

1. **Camera Capture**: Native camera module captures receipt image
2. **OCR Processing**: Supabase Edge Function calls OpenAI Vision API
3. **Data Extraction**: Structured JSON with items, prices, totals
4. **User Confirmation**: Editable form before saving
5. **Split Calculation**: Automatic per-person breakdown

### Real-Time Collaboration

Multiple users can split bills simultaneously with instant updates:
- **Optimistic UI**: Changes appear immediately
- **Conflict Resolution**: Last-write-wins with change tracking
- **Presence Indicators**: See who's currently viewing
- **Change Notifications**: Toast alerts for group updates

## Design Philosophy

The app prioritizes:
- **Speed**: Sub-100ms interactions with optimistic updates
- **Simplicity**: Core flow is 3 taps: scan → confirm → done
- **Offline-First**: Queue actions and sync when reconnected
- **Accessibility**: Full screen reader and keyboard navigation support

## Performance

- **Bundle Size**: < 15MB APK
- **Cold Start**: < 1.5s on mid-range devices
- **Frame Rate**: 60 FPS scrolling and animations
- **Battery**: < 2% drain per hour of active use

## Security Considerations

- End-to-end encryption for sensitive data
- No credentials stored locally
- Secure token refresh flow
- Rate limiting on API endpoints
- Input validation and sanitization

## Future Enhancements

- [ ] Recurring expense templates
- [ ] Multi-currency support
- [ ] Export to Venmo/PayPal
- [ ] Spending analytics dashboard
- [ ] Group budget limits with alerts
