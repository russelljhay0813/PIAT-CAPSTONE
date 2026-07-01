# Personal Notifications Bell System

This document explains the notifications system implementation for the BWEST College application.

## Features

The Personal Notifications Bell displays real-time notifications for:
- **Grade Posted**: When a faculty member posts a grade for a student
- **Payment Received**: When a payment is successfully processed
- **Schedule Change**: When a course schedule is modified

## Architecture

### Frontend

1. **notifications-store.ts** - React hooks and state management
   - `useNotifications(userId)` - Hook to fetch and manage notifications
   - `createNotification(userId, type, title, message, relatedId)` - Create a new notification
   - Uses localStorage and custom events for real-time updates

2. **NotificationsPopover.tsx** - UI component
   - Displays a popover with notification list
   - Shows unread count badge
   - Supports marking as read and clearing all
   - Uses Radix UI for accessibility

3. **DashboardHeader.tsx** - Integration point
   - Replaced hardcoded bell icon with `NotificationsPopover` component
   - Passes user ID to the popover

4. **notification-triggers.ts** - Helper functions
   - `notifyGradePosted(studentId, subjectTitle)`
   - `notifyPaymentReceived(studentId, amount, description)`
   - `notifyScheduleChange(studentId, subjectTitle, changeDetails)`

### Backend

1. **Database (db.js)**
   - New `notifications` table schema with fields:
     - `id`: Unique identifier (UUID)
     - `userId`: User who receives the notification
     - `type`: Notification type ('grade' | 'payment' | 'schedule')
     - `title`: Notification title
     - `message`: Notification message
     - `read`: Boolean flag for read status
     - `createdAt`: Timestamp
     - `relatedId`: Optional reference ID

2. **API Endpoints (index.js)**
   - `GET /api/notifications?userId=<id>` - Fetch all notifications for a user
   - `POST /api/notifications` - Create a new notification
   - `PATCH /api/notifications/:id/read` - Mark notification as read
   - `DELETE /api/notifications?userId=<id>` - Clear all notifications

## Usage Examples

### Basic Usage in Components

```tsx
import { useNotifications } from '@/lib/notifications-store';
import { NotificationsPopover } from '@/components/NotificationsPopover';

function MyComponent({ userId }: { userId: string }) {
  const { notifications, unreadCount } = useNotifications(userId);
  
  return (
    <div>
      <NotificationsPopover userId={userId} />
      <p>Unread: {unreadCount}</p>
    </div>
  );
}
```

### Triggering Notifications

In any component where you handle grades, payments, or schedule changes:

```tsx
import { notifyGradePosted, notifyPaymentReceived, notifyScheduleChange } from '@/lib/notification-triggers';

// When posting a grade
await addOrUpdateGrade(studentId, subjectId, grade);
await notifyGradePosted(studentId, subjectTitle);

// When processing a payment
await processPayment(paymentData);
await notifyPaymentReceived(studentId, amount, 'Tuition payment received');

// When updating schedule
await updateSubject(subjectId, newScheduleData);
await notifyScheduleChange(studentId, subjectTitle, 'Moved from MWF 10:00 AM to TuTh 2:00 PM');
```

### Testing with Demo Notifications

```tsx
import { createSampleNotifications } from '@/lib/demo-notifications';

// Create sample notifications for testing
await createSampleNotifications('1'); // for user with id '1'
```

## Integration Checklist

To fully integrate notifications throughout the app:

- [ ] Add notification triggers in grade posting flows
- [ ] Add notification triggers in payment processing
- [ ] Add notification triggers in schedule update forms
- [ ] Test notification display in different UI states
- [ ] Add sound/toast notifications (optional enhancement)
- [ ] Implement notification preferences (optional)
- [ ] Add notification history/archive view (optional)

## Styling

- Notifications use Tailwind CSS with color-coded badges:
  - **Grade**: Blue (📚)
  - **Payment**: Green (💰)
  - **Schedule**: Purple (📅)
- Timestamps use `date-fns` for relative time display
- Responsive design works on mobile and desktop

## Dependencies

- `@radix-ui/react-popover` - Popover component (already in project)
- `@radix-ui/react-scroll-area` - Scrollable area (already in project)
- `date-fns` - Date formatting (already in project)
- `lucide-react` - Icons (already in project)

All dependencies are already included in package.json.
