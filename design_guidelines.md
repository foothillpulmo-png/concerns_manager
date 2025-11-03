# Design Guidelines: Messenger-Style Patient Concerns Platform

## Design Approach

**Selected Approach:** Reference-Based (Telegram + WhatsApp + Linear hybrid)

**Justification:** This healthcare communication platform requires the familiar, intuitive messaging patterns users expect from modern chat applications, combined with the professional polish and organizational features of productivity tools. Drawing from Telegram's clean interface, WhatsApp's conversation flow, and Linear's elegant task management ensures both accessibility for healthcare staff and efficient patient concern tracking.

**Key Design Principles:**
1. Conversational clarity with distinct message bubbles
2. Instant visual feedback for status and read states
3. Minimal friction for creating threads and sending messages
4. Professional healthcare-appropriate aesthetic with trust signals

---

## Core Design Elements

### A. Typography

**Font System:** Inter (primary), SF Pro Display (headings), Roboto Mono (timestamps/metadata)

**Hierarchy:**
- Login/Auth Headers: 3xl, bold (Welcome messages, app name)
- Thread Titles: lg, semibold (Patient names in thread list)
- Message Content: base, regular (Chat messages, documentation)
- Sender Names: sm, semibold (Message attribution)
- Timestamps/Metadata: xs, regular (Message times, status indicators)
- Button Text: sm, medium (All action buttons)

---

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 3, 4, and 6 (e.g., p-2, gap-3, mb-4, h-6)

**Two-Column Messenger Layout:**

**Desktop (lg+):**
- Left Sidebar (380px fixed): Thread list with search, create thread button, user profile
- Right Panel (flex-1): Active conversation with header, message area, input bar

**Tablet/Mobile:**
- Single column with slide-over thread list
- Full-width conversation view
- Bottom-fixed message input bar

**Key Layout Patterns:**
- Full viewport height (h-screen) for app shell
- Sticky header and input areas
- Scrollable message container with reverse flex direction (newest at bottom)
- Thread list items: h-20 with p-4, gap-3 internal spacing

---

### C. Component Library

#### Authentication Components

**Login Screen:**
- Centered card (max-w-md) with subtle shadow
- Large app logo/icon at top (h-16)
- "Patient Concerns Messenger" heading (text-3xl, font-bold)
- Replit Auth button (w-full, prominent)
- Clean white background with subtle gradient overlay
- Footer text: "Secure healthcare communication platform" (text-sm)

**Pending Authorization Screen:**
- Centered message card (max-w-lg)
- Illustration of pending approval (h-48)
- "Access Pending" heading (text-2xl, font-semibold)
- Explanatory text: "Your account is awaiting admin approval"
- Contact admin information
- Logout option

**Admin Authorization Dashboard:**
- Full-width table layout with columns: Employee, Email, Requested, Status, Actions
- Approve button (inline-flex, px-4, py-2)
- Deny button (outline variant)
- Search/filter bar at top (w-full md:w-96)
- Pending count badge in admin nav item

#### Thread List Components (Left Sidebar)

**Search & Create Bar:**
- Search input with icon (w-full, h-12, rounded-lg)
- "Create Thread" button positioned directly beside/below search (inline-flex, gap-2, icon + text)
- Thread button uses plus icon with "New Thread" label

**Thread List Item:**
- Patient name (font-semibold, text-base, truncate)
- Last message preview (2 lines, text-sm, opacity-70)
- Timestamp (text-xs, absolute top-right)
- Unread badge (h-5 w-5, rounded-full, absolute, with count)
- Status indicator dot (h-3 w-3, positioned by name)
- Active thread: subtle left border accent (border-l-4)
- Divider between items (border-b, subtle)

**User Profile Section (Bottom of Sidebar):**
- Avatar (h-10 w-10, rounded-full)
- Name and role (truncate)
- Online status indicator
- Settings and logout icons

#### Conversation Components (Right Panel)

**Thread Header:**
- Patient name (text-xl, font-semibold)
- Patient DOB/ID (text-sm, opacity-75)
- Status badges (inline-flex, gap-2): Urgent/Pending/Overdue/Tasked/Done
- Info icon for thread details
- Height: h-16, sticky top-0

**Message Bubbles:**

Sent Messages (Staff):
- Align right (ml-auto)
- Rounded-2xl with sharp bottom-right corner
- Max width: max-w-lg
- Padding: px-4 py-2
- Sender name above (text-xs, font-semibold)
- Timestamp below (text-xs, opacity-60)

Received Messages (System/Other Staff):
- Align left (mr-auto)
- Rounded-2xl with sharp bottom-left corner
- Max width: max-w-lg
- Padding: px-4 py-2
- Sender name above with avatar (h-6 w-6)
- Timestamp below

**Message Input Bar:**
- Fixed bottom (sticky bottom-0)
- Full width container with inner max-w-4xl
- Height: min-h-14
- Input field: flex-1, rounded-full, px-4
- **Plus (+) icon button: positioned left of input (h-10 w-10, rounded-full)**
- File/image upload triggered by + icon
- Send button: positioned right (h-10 w-10, rounded-full, icon only)
- Typing indicator when others are typing

**File/Image Attachments:**
- Image previews in message bubble (rounded-lg, max-h-64)
- File cards with icon, name, size (p-3, rounded-lg)
- Download/view actions
- Thumbnail grid for multiple images (grid-cols-2, gap-2)

**Status Control Panel:**
- Toggle buttons for 5 statuses (inline-flex, gap-2)
- Active state: filled with checkmark
- Inactive state: outline only
- Positioned below thread header or in slide-out panel

#### Modal Components

**Create Thread Modal:**
- Overlay with centered card (max-w-lg)
- "New Patient Thread" heading (text-2xl)
- Patient name input with autocomplete
- Category selector (12 healthcare categories as dropdown)
- Initial message textarea (min-h-24)
- Create button (w-full) and Cancel link

**Thread Details Slide-Out:**
- Slides from right (w-80 md:w-96)
- Patient information section
- Thread metadata (created date, participants)
- Status history timeline
- Archive/delete actions

#### Real-Time Indicators

**Typing Indicator:**
- Animated dots (3 circles, pulse animation)
- Shown at bottom of message list
- "User is typing..." text (text-sm, opacity-75)

**Message Status Icons:**
- Sent: Single checkmark
- Delivered: Double checkmark
- Read: Double checkmark with color accent

**Notification Toasts:**
- Fixed top-right (w-80)
- New message preview with sender name
- Click to jump to thread
- Auto-dismiss after 5s

---

### D. Interaction Patterns

**Messaging Flow:**
- Click + icon to open attachment menu (slide-up sheet on mobile, popover on desktop)
- Attachment options: Photo, Document, Voice Note
- Type message and press Enter or click send icon
- Messages appear instantly with sending indicator
- Smooth scroll to bottom on new messages

**Thread Navigation:**
- Click thread in sidebar to open conversation
- Smooth transition (no page reload)
- Breadcrumb on mobile for back navigation
- Swipe gestures on mobile (left to return to list)

**Animations:**
- Message bubble fade-in (100ms)
- Thread list reorder on new message (smooth transform)
- Typing indicator pulse (continuous)
- Status badge change: brief scale pulse

---

## Images

**No Hero Image Needed** - This is a messenger application focused on functionality.

**Required Images:**
- User avatars throughout (circular, sourced from auth provider or initials)
- Empty state illustration: "No messages yet" (centered, max-w-xs, simple line art)
- Pending approval illustration: Hospital/clipboard waiting icon (max-w-sm)
- File type icons for document attachments (inline with file names)

Use healthcare-appropriate illustrations from unDraw or Streamline icons - professional, reassuring tone. All illustrations should use simple line art style with minimal visual weight.

**Image Upload Previews:**
- Inline image thumbnails in messages (rounded-lg, clickable to expand)
- Full-screen image viewer modal with download option
- Multiple image grid layout (2 columns for 2-4 images, 3 columns for 5+)