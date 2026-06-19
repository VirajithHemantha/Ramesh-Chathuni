const SPREADSHEET_ID = '1142ABNJVLxnSH7nUAf68-BjPh5CVTZX2ungN9ZRsHoA';
const SHEET_NAMES = {
  rsvp: 'rsvp',
  wish: 'wish',
};

function doPost(e) {
  try {
    const sheetKey = ((e && e.parameter && e.parameter.sheet) || '').toLowerCase();
    const payloadJson = (e && e.parameter && e.parameter.payload) || '{}';

    if (!SHEET_NAMES[sheetKey]) {
      return jsonResponse({ ok: false, error: 'Invalid sheet name. Use rsvp or wish.' });
    }

    const payload = JSON.parse(payloadJson);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetName = SHEET_NAMES[sheetKey];
    const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

    ensureHeaders(sheetKey, sheet);
    sheet.appendRow(buildRow(sheetKey, payload));

    return jsonResponse({ ok: true, sheet: sheetName });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  }
}

function doGet(e) {
  const action = ((e && e.parameter && e.parameter.action) || '').toLowerCase();

  if (action === 'health') {
    return jsonResponse({ ok: true, service: 'wedding-forms', timestamp: new Date().toISOString() });
  }

  return jsonResponse({ ok: true, message: 'Use POST with sheet=rsvp|wish and payload=<json>' });
}

function ensureHeaders(sheetKey, sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  if (sheetKey === 'rsvp') {
    sheet.appendRow(['Timestamp', 'Full Name', 'Guests', 'Dietary Notes', 'Submitted At (ISO)']);
    return;
  }

  if (sheetKey === 'wish') {
    sheet.appendRow(['Timestamp', 'Name', 'Message', 'Submitted At (ISO)']);
  }
}

function buildRow(sheetKey, payload) {
  const now = new Date();

  if (sheetKey === 'rsvp') {
    return [
      now,
      sanitize(payload.fullName),
      Number(payload.guests || 1),
      sanitize(payload.dietaryNotes),
      sanitize(payload.submittedAt),
    ];
  }

  if (sheetKey === 'wish') {
    return [
      now,
      sanitize(payload.name),
      sanitize(payload.message),
      sanitize(payload.submittedAt),
    ];
  }

  return [now, JSON.stringify(payload)];
}

function sanitize(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return String(value).trim();
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
