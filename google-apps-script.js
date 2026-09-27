/**
 * CSE-C Attendance — Google Apps Script bridge.
 *
 * Sheet layout this script produces (2 columns only: Roll No, Status):
 *
 *   CSE-C (26 September 2026) Morning
 *   5D3   Present
 *   5D4   Absent
 *   ...
 *   (blank spacer row)
 *   CSE-C (26 September 2026) Afternoon
 *   5D3   Present
 *   ...
 *
 * Each session (identified by its exact heading text) can only be written
 * once — a second attempt to submit the same date+session is refused. You
 * can still hand-edit any cell directly in the Sheet at any time; that is
 * completely separate from this write-once check.
 *
 * SETUP
 * 1. Open the "CSE-C Attendance Records" Google Sheet.
 * 2. IMPORTANT: delete the old header row 1 (Date, Session, Class, Roll No,
 *    Name, Status) if it's still there from the previous version — right
 *    click row 1 -> Delete row. This script expects a clean sheet.
 * 3. Extensions -> Apps Script.
 * 4. Delete anything in the editor and paste this whole file in.
 * 5. Deploy -> New deployment.
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Click Deploy, authorize it with your Google account when prompted.
 * 7. Copy the "Web app URL" it gives you.
 * 8. Paste that URL into GOOGLE_SHEET_WEBAPP_URL in
 *    src/config/constants.js in the React project, then rebuild/redeploy
 *    the site.
 *
 * Whenever you edit this script after the first deploy, you must use
 * Deploy -> Manage deployments -> Edit (pencil icon) -> New version,
 * otherwise the live Web app URL keeps running the old code.
 *
 * This uses GET requests (not POST) on purpose — Apps Script Web Apps
 * only reliably return a readable cross-origin response for GET, which
 * the website needs in order to check "has this session already been
 * recorded?" before writing.
 */

function doGet(e) {
  var action = e.parameter.action;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  if (action === 'check') {
    var heading = buildHeading(e.parameter.class, e.parameter.date, e.parameter.session);
    return jsonOutput({ exists: headingExists(sheet, heading) });
  }

  if (action === 'submit') {
    var heading = buildHeading(e.parameter.class, e.parameter.date, e.parameter.session);

    if (headingExists(sheet, heading)) {
      return jsonOutput({ ok: false, reason: 'duplicate' });
    }

    var recordsParam = e.parameter.records || '';
    var pairs = recordsParam.split(',').filter(function (p) {
      return p.indexOf(':') > -1;
    });

    var rows = [[heading, '']];
    pairs.forEach(function (pair) {
      var parts = pair.split(':');
      rows.push([parts[0], parts[1]]);
    });
    rows.push(['', '']); // spacer row before the next block

    var startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rows.length, 2).setValues(rows);

    return jsonOutput({ ok: true, inserted: pairs.length });
  }

  return ContentService.createTextOutput('CSE-C Attendance Web App is running.');
}

function buildHeading(className, date, session) {
  return className + ' (' + date + ') ' + session;
}

function headingExists(sheet, heading) {
  var lastRow = sheet.getLastRow();
  if (lastRow === 0) return false;
  var values = sheet.getRange(1, 1, lastRow, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === heading) return true;
  }
  return false;
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
