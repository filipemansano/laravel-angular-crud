<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\City;
use App\Models\Client;
use App\Models\Plan;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Client::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'city_id' => City::factory(),
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'birth_day' => $this->faker->date(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }
}
