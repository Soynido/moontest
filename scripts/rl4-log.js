#!/usr/bin/env node

/**
 * RL4 Logging Script
 * Logs command execution events to RL4 system
 * 
 * Usage:
 *   node scripts/rl4-log.js start <id> "<command>"
 *   node scripts/rl4-log.js end <id> <status> <exitCode>
 */

const fs = require('fs');
const path = require('path');

const RL4_LOG_DIR = path.join(__dirname, '..', '.reasoning_rl4', 'logs');
const RL4_LOG_FILE = path.join(RL4_LOG_DIR, 'command-execution.jsonl');

// Ensure log directory exists
if (!fs.existsSync(RL4_LOG_DIR)) {
  fs.mkdirSync(RL4_LOG_DIR, { recursive: true });
}

function logEvent(type, id, data) {
  const event = {
    timestamp: new Date().toISOString(),
    type,
    id,
    ...data
  };
  
  const line = JSON.stringify(event) + '\n';
  fs.appendFileSync(RL4_LOG_FILE, line, 'utf8');
  
  console.log(`[RL4-LOG] ${type.toUpperCase()}: ${id}`, data);
}

const [,, action, id, ...args] = process.argv;

if (action === 'start') {
  const command = args.join(' ');
  logEvent('start', id, { command });
} else if (action === 'end') {
  const [status, exitCode] = args;
  logEvent('end', id, { 
    status, 
    exitCode: parseInt(exitCode || '0', 10) 
  });
} else {
  console.error('Usage:');
  console.error('  node scripts/rl4-log.js start <id> "<command>"');
  console.error('  node scripts/rl4-log.js end <id> <status> <exitCode>');
  process.exit(1);
}

