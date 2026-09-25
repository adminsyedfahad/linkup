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
