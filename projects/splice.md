---
layout: project
title: Splice
hero_image: /assets/images/projects/splice.png
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

Bill splitting is a solved problem, but it's rarely a seamless one. Most apps require manual entry, complex setup, or fighting with a clunky interface. Splice was built to change that. It's a high-performance, real-time mobile app that uses AI to turn the chaos of a group dinner into a structured, fair breakdown in seconds. By combining React Native with a powerful Supabase backend, Splice demonstrates how modern full-stack engineering can make everyday problems disappear.

## What is Splice?

Splice is a mobile expense tracker designed for groups. Whether you're living with roommates or traveling with friends, the app provides a single source of truth for who owes what.

The standout feature is the AI-powered receipt scanner. Instead of typing in every item from a long grocery bill, you simply take a photo. The app uses [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) (OCR) and large language models to identify items, prices, and tax, then lets you assign them to people with a single tap. It handles the math, the currency conversions, and the notifications so you don't have to.

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

The app is built on the principle that the best interface is no interface. Splice aims to automate as much of the bill splitting process as possible. The core user flow is designed to be completed in just three taps: scan the receipt, confirm the items, and finish. By using Material Design 3 and native animations, the app feels lightweight and responsive, hiding the complexity of the backend sync and AI processing.

## Performance

Mobile performance is about more than just frame rates. It is about how quickly a user can go from an idea to an action:

- **Optimistic UI**: When you add an expense, it appears on your screen instantly while the background sync handles the network request.
- **Efficient OCR**: Image processing happens in the cloud to keep the local app bundle small and the battery usage low.
- **Native Experience**: By using React Native with the Hermes engine, the app achieves sub-second start times even on older hardware.

## Future Enhancements

The vision for Splice is to move beyond just tracking and into settlement. Upcoming features include direct integration with payment providers like Venmo and PayPal, multi-currency support for international travel, and deeper spending analytics to help groups understand their habits over time.
