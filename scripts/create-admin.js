// Script to create an admin user
// Run this with: node scripts/create-admin.js

const { createClient } = require('@supabase/supabase-js');

// Replace with your Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseServiceKey = 'YOUR_SUPABASE_SERVICE_ROLE_KEY'; // Use service role key for admin operations

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  try {
    // Step 1: Create user in auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@busticket.com',
      password: 'Admin123!',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User',
        role: 'admin'
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return;
    }

    console.log('Auth user created:', authData.user.id);

    // Step 2: Create profile in users table
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: 'admin@busticket.com',
        full_name: 'Admin User',
        role: 'admin',
        phone: '+1234567890',
        gender: 'other',
        date_of_birth: '1990-01-01'
      })
      .select();

    if (profileError) {
      console.error('Error creating profile:', profileError);
      return;
    }

    console.log('Admin user created successfully!');
    console.log('Email: admin@busticket.com');
    console.log('Password: Admin123!');
    console.log('Profile:', profileData);

  } catch (error) {
    console.error('Error:', error);
  }
}

createAdminUser();
