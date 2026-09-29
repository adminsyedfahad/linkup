// ══════════════════════════════════════════════════════════════════════
// SHARED SUPPORT CONFIG — loaded by index.html, support.html and admin.html.
// Single source of truth for support hours: change SUPPORT_HOURS here and
// every page (customer chat header, agent hours pill, admin dashboard)
// picks it up automatically. Plain classic script (no export/import) so it
// works identically in all three pages without a build step.
// ══════════════════════════════════════════════════════════════════════
var SUPPORT_HOURS = { start: 9, end: 23 }; // 9:00 AM – 11:00 PM, in the visitor's local device time

function isWithinSupportHours(d) {
  var h = (d || new Date()).getHours();
  return h >= SUPPORT_HOURS.start && h < SUPPORT_HOURS.end;
}

function _fmtSupportHour(h) {
  var period = h >= 12 ? 'PM' : 'AM';
  var hh = h % 12;
  if (hh === 0) hh = 12;
  return hh + ':00 ' + period;
}

function formatSupportHoursLabel() {
  return _fmtSupportHour(SUPPORT_HOURS.start) + ' – ' + _fmtSupportHour(SUPPORT_HOURS.end);
}

// ══════════════════════════════════════════════════════════════════════
// CANNED STATEMENTS — default/fallback library for the agent's reply-box
// helper (support.html) and the seed content admin.html's editor starts
// from. The real, editable copy lives in Firestore at
// supportContent/statements (see firestore.rules); this constant is only
// the read-through default before that doc exists or if it's briefly
// unreadable — same fallback pattern as OFFERS_DEFAULTS in index.html.
// Placeholders {customer_name} and {order_id} are filled in from the open
// conversation at insert time.
// ══════════════════════════════════════════════════════════════════════
var STATEMENTS_DEFAULTS = {
  categories: [
    { id: 'opening',       name: 'Opening' },
    { id: 'empathy',       name: 'Empathy' },
    { id: 'apology',       name: 'Apology' },
    { id: 'order_status',  name: 'Order status' },
    { id: 'delivery_delay',name: 'Delivery delay' },
    { id: 'refund_cancel', name: 'Refund and cancellation' },
    { id: 'payment',       name: 'Payment' },
    { id: 'offers_points', name: 'Offers and points' },
    { id: 'appreciation',  name: 'Appreciation' },
    { id: 'hold_followup', name: 'Hold and follow-up' },
    { id: 'closing',       name: 'Closing' }
  ],
  statements: [
    { id: 'd_open_1', categoryId: 'opening', text: "Hi {customer_name}, thanks for reaching out to LinkUp. I'm looking into this for you now." },
    { id: 'd_open_2', categoryId: 'opening', text: "Hello! I've got your message — let me take a look at order {order_id} right away." },
    { id: 'd_open_3', categoryId: 'opening', text: "Hi there, I'm here to help. Could you tell me a bit more about what happened?" },
    { id: 'd_open_4', categoryId: 'opening', text: "Thanks for waiting — I'm on this now and will get you sorted." },

    { id: 'd_emp_1', categoryId: 'empathy', text: "That's frustrating, and I understand why you'd want this fixed quickly." },
    { id: 'd_emp_2', categoryId: 'empathy', text: "I can see why that's concerning — let's get this sorted for you." },
    { id: 'd_emp_3', categoryId: 'empathy', text: "I'd feel the same way in your position. Let me look into it properly." },
    { id: 'd_emp_4', categoryId: 'empathy', text: "Thanks for your patience while I check this." },

    { id: 'd_apo_1', categoryId: 'apology', text: "Sorry about that — this shouldn't have happened, and I'll get it corrected." },
    { id: 'd_apo_2', categoryId: 'apology', text: "That's on us. Let me fix this right away." },
    { id: 'd_apo_3', categoryId: 'apology', text: "Apologies for the inconvenience — here's what I'll do next." },

    { id: 'd_ord_1', categoryId: 'order_status', text: "Order {order_id} is currently being prepared and should be with you soon." },
    { id: 'd_ord_2', categoryId: 'order_status', text: "Your order is out for delivery now — you can track it live from the app." },
    { id: 'd_ord_3', categoryId: 'order_status', text: "I can see order {order_id} was delivered. Let me know if anything's missing or wrong." },
    { id: 'd_ord_4', categoryId: 'order_status', text: "Let me pull up the latest status on order {order_id} for you." },

    { id: 'd_del_1', categoryId: 'delivery_delay', text: "Your rider is running a little behind schedule — I'll keep an eye on it for you." },
    { id: 'd_del_2', categoryId: 'delivery_delay', text: "I can see there's a delay on order {order_id}. I'm checking with the rider now." },
    { id: 'd_del_3', categoryId: 'delivery_delay', text: "Thanks for bearing with us — I'll update you as soon as I hear back on the delivery." },
    { id: 'd_del_4', categoryId: 'delivery_delay', text: "I know waiting is frustrating. Here's the latest I have on your delivery." },

    { id: 'd_ref_1', categoryId: 'refund_cancel', text: "I've started a refund for order {order_id} — it'll reflect in your LinkUp wallet shortly." },
    { id: 'd_ref_2', categoryId: 'refund_cancel', text: "Since this hasn't been dispatched yet, I can cancel it now at no charge." },
    { id: 'd_ref_3', categoryId: 'refund_cancel', text: "This order's already with the rider, so it can't be cancelled — but if anything arrives wrong, I'll make sure you're refunded in full." },
    { id: 'd_ref_4', categoryId: 'refund_cancel', text: "Your refund for order {order_id} has been processed — it usually reflects within minutes in your wallet, or 3–5 business days for the original payment method." },

    { id: 'd_pay_1', categoryId: 'payment', text: "I can see the payment for order {order_id} went through — let me check why it's not reflecting." },
    { id: 'd_pay_2', categoryId: 'payment', text: "If you were charged twice, I'll investigate and refund the extra charge right away." },
    { id: 'd_pay_3', categoryId: 'payment', text: "Please don't place a duplicate order — I'll verify this payment first and let you know." },
    { id: 'd_pay_4', categoryId: 'payment', text: "That charge has been reversed — you should see it reflect shortly." },

    { id: 'd_off_1', categoryId: 'offers_points', text: "You've got LinkUp Points ready to use on your next order, {customer_name}." },
    { id: 'd_off_2', categoryId: 'offers_points', text: "This offer applies automatically at checkout — no code needed." },
    { id: 'd_off_3', categoryId: 'offers_points', text: "I've checked your wallet and points balance — let me walk you through what's available." },
    { id: 'd_off_4', categoryId: 'offers_points', text: "That cashback will be credited to your wallet once order {order_id} is marked delivered." },

    { id: 'd_app_1', categoryId: 'appreciation', text: "Thanks so much for your patience — I really appreciate it." },
    { id: 'd_app_2', categoryId: 'appreciation', text: "Thank you for flagging this — it helps us improve." },
    { id: 'd_app_3', categoryId: 'appreciation', text: "Really appreciate you giving us the chance to make this right." },
    { id: 'd_app_4', categoryId: 'appreciation', text: "Thanks for being a LinkUp customer — glad I could help today." },

    { id: 'd_hold_1', categoryId: 'hold_followup', text: "Give me a moment while I check this for you." },
    { id: 'd_hold_2', categoryId: 'hold_followup', text: "Still looking into this — thanks for your patience." },
    { id: 'd_hold_3', categoryId: 'hold_followup', text: "I haven't forgotten about this, just waiting on an update — I'll be right back." },
    { id: 'd_hold_4', categoryId: 'hold_followup', text: "I'll follow up as soon as I have an answer, shouldn't be long." },

    { id: 'd_close_1', categoryId: 'closing', text: "Is there anything else I can help you with today?" },
    { id: 'd_close_2', categoryId: 'closing', text: "Glad we could sort that out. Have a great day!" },
    { id: 'd_close_3', categoryId: 'closing', text: "That's all set on my end — thanks for chatting with LinkUp." },
    { id: 'd_close_4', categoryId: 'closing', text: "I'll go ahead and close this out — feel free to reach out again anytime." }
  ]
};

// Resolves {customer_name} / {order_id} against an open conversation,
// with graceful fallbacks when the value isn't known.
function fillStatementPlaceholders(text, convo) {
  var name = (convo && convo.customerName) ? convo.customerName.split(' ')[0] : 'there';
  var orderId = convo && convo.orderId;
  return String(text)
    .replace(/\{customer_name\}/g, name)
    .replace(/\{order_id\}/g, orderId ? ('#' + orderId) : 'your order');
}
