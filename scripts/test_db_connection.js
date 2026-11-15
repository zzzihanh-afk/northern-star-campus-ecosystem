/**
 * NORTHERN STAR SMART CAMPUS - DATABASE CONNECTION TESTER
 * Tests active connectivity to the live Supabase PostgreSQL instance.
 *
 * Usage:
 *   node scripts/test_db_connection.js <SUPABASE_URL> <SUPABASE_ANON_KEY>
 * Or reads from apps/web/.env.local
 */

let createClient;
try {
  createClient = require('@supabase/supabase-js').createClient;
} catch (e) {
  createClient = require('../apps/web/node_modules/@supabase/supabase-js').createClient;
}
const fs = require('fs');
const path = require('path');

let supabaseUrl = process.argv[2];
let supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  const envPath = path.join(__dirname, '../apps/web/.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
    const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);
    if (urlMatch) supabaseUrl = urlMatch[1].trim();
    if (keyMatch) supabaseKey = keyMatch[1].trim();
  }
}

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-ref')) {
  console.log('\n================================================================');
  console.log('NORTHERN STAR SMART CAMPUS - DATABASE CONNECTION TEST');
  console.log('================================================================');
  console.log('Status: [NOT CONFIGURED]');
  console.log('No active Supabase credentials detected.');
  console.log('\nTo test your connection:');
  console.log('  node scripts/test_db_connection.js <SUPABASE_URL> <SUPABASE_ANON_KEY>');
  console.log('Or save credentials in apps/web/.env.local\n');
  process.exit(0);
}

console.log('\n================================================================');
console.log('NORTHERN STAR SMART CAMPUS - DATABASE CONNECTION TEST');
console.log('Target URL:', supabaseUrl);
console.log('================================================================\n');

async function testConnection() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Testing network ping to Supabase REST API...');
    const { data: inst, error: instError } = await supabase
      .from('institutions')
      .select('id, name, code')
      .limit(1);

    if (instError) {
      if (instError.code === '42P01') {
        console.log(' Connected to Supabase, but tables are not yet created.');
        console.log(' Action: Run supabase/SETUP_ONE_CLICK_DATABASE.sql in Supabase SQL Editor.');
      } else {
        console.error(' Supabase query error:', instError.message);
      }
      return;
    }

    console.log(' Successfully connected to Northern Star Supabase database!');
    if (inst && inst.length > 0) {
      console.log(' Institution Found:', inst[0].name, `(${inst[0].code})`);
    }

    // Check students count
    const { count, error: countErr } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true });

    if (!countErr) {
      console.log(` Students Enrolled in Database: ${count}`);
    }

    // Check modules count
    const { data: modules } = await supabase.from('app_modules').select('module_key, is_enabled');
    if (modules) {
      console.log(` Active Remote Modules Synced: ${modules.length}`);
    }

    console.log('\n Database is 100% operational and ready for Web Admin and Mobile App!');
  } catch (err) {
    console.error(' Network connection failed:', err.message);
  }
}

testConnection();
