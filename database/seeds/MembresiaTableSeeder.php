<?php

use App\Membresia;
use Illuminate\Database\Seeder;

class MembresiaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        Membresia::truncate();

        // Initialize the Faker package. We can use several different locales for it, so
        // let's use the german locale to play with it.
        $faker = \Faker\Factory::create('es_ES');

        // And now, let's create a few articles in our database:
        for ($i = 1; $i < 30; $i++) {
            Membresia::create([
                'name' => $faker->name,
                'dni' => $faker->randomNumber(5),
                'role' => $faker->name (),
                'status' => $faker->name (),
            ]);
        }

    }
}
