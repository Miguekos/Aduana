<?php

use App\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	User::truncate();
        User::create([
        	'name' => 'Miguel Rodriguez',
        	'email' => 'admin@admin.com',
        	'password' => bcrypt('secret'),
        	]);

    }
}
