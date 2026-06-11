const fs = require('fs');

const csvData = fs.readFileSync('บัญชีร้านบะหมี่สายฝอ By ซ้อเอ๋(สรุป).csv', 'utf-8');
const lines = csvData.split('\n').map(l => l.trim()).filter(l => l.length > 0);

// We need to parse CSV correctly, handling quotes
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

const incomeRow = parseCSVLine(lines[2]);
const expenseRow = parseCSVLine(lines[3]);

// Columns:
// idx 0: label
// idx 1: units
// idx 2-13: 2023 (Jan-Dec)
// idx 14-25: 2024 (Jan-Dec)
// idx 26-37: 2025 (Jan-Dec)
// idx 38+: 2026 (Jan-...)

const transactions = [];

function parseNumber(str) {
  if (!str) return 0;
  return Number(str.replace(/,/g, '').trim()) || 0;
}

function processYear(startIdx, yearStr) {
  for (let i = 0; i < 12; i++) {
    const colIdx = startIdx + i;
    if (colIdx >= incomeRow.length) break;
    
    const incVal = parseNumber(incomeRow[colIdx]);
    const expVal = parseNumber(expenseRow[colIdx]);
    
    if (incVal === 0 && expVal === 0) continue; // Skip empty months
    
    const monthStr = String(i + 1).padStart(2, '0');
    // We'll set the date to the last day of the month for the summary
    const dateStr = `${yearStr}-${monthStr}-28`; // Safe day
    
    if (incVal > 0) {
      transactions.push({
        id: `inc_csv_${yearStr}_${monthStr}`,
        type: 'income',
        date: dateStr,
        category: 'ยอดรวมรายรับประจำเดือน',
        emoji: '📊',
        amount: incVal,
        note: 'ข้อมูลนำเข้าจาก CSV',
        createdAt: `${dateStr}T12:00:00.000Z`
      });
    }
    
    if (expVal > 0) {
      transactions.push({
        id: `exp_csv_${yearStr}_${monthStr}`,
        type: 'expense',
        date: dateStr,
        category: 'ยอดรวมรายจ่ายประจำเดือน',
        emoji: '📉',
        amount: expVal,
        detail: '',
        note: 'ข้อมูลนำเข้าจาก CSV',
        createdAt: `${dateStr}T12:00:00.000Z`
      });
    }
  }
}

processYear(2, '2023');
processYear(14, '2024');
processYear(26, '2025');
processYear(38, '2026');

fs.writeFileSync('noodle-shop-backup.json', JSON.stringify(transactions, null, 2));
console.log(`Successfully generated noodle-shop-backup.json with ${transactions.length} items.`);
