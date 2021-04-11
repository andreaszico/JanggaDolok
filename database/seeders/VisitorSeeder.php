<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class VisitorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $backwardDays = 0;
        $backwardCreatedDays = rand($backwardDays, 100);
        
        foreach(range(0,15) as $i){
            DB::table('visitor')->insert([
                'article_id' => rand(1, 3),
                'created_at' => Carbon::now()->addDays(rand(1,10))->addMinutes(rand(0,
				60 * 23))->addSeconds(rand(0, 60))
            ]);
        }
    }
}
